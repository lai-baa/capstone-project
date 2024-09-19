const express = require('express');
const { Op } = require('sequelize');
const { Note, Tag, NoteTag } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// Validation middleware for notes
const validateNote = [
    check('title')
      .exists({ checkFalsy: true })
      .withMessage('Note title is required.')
      .isLength({ max: 100 })
      .withMessage('Note title must be less than 100 characters.'),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('Note description is required.')
      .isLength({ max: 1000 })
      .withMessage('Note description must be less than 1000 characters.'),
    handleValidationErrors
];

// Search notes by tag
router.get('/search', requireAuth, async (req, res) => {
    const { searchTerm } = req.query;

    try {
        const notes = await Note.findAll({
            include: {
                model: Tag,
                as: 'Tags',
                where: {
                    // Use LOWER to make the comparison case-insensitive
                    name: {
                        [Op.like]: `%${searchTerm.toLowerCase()}%`
                    }
                }
            }
        });

        if (!notes.length) {
            return res.status(404).json({ message: 'No notes found matching the search criteria.' });
        }

        res.json(notes);
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({ message: 'Error during search.' });
    }
});

// Get all details for a note
router.get('/:id', requireAuth, async(req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const note = await Note.findByPk(id, {
            include: [
                {
                    model: Tag,
                    as: 'Tags',
                    through: { attributes: [] }
                }
            ]
        });

        if (!note) {
            return res.status(404).json({ message: 'Note not found.' });
        }

        if (note.ownerId !== userId) {
            return res.status(403).json({ message: 'You do not have access to this note.' });
        }

        res.json(note);
    } catch (error) {
        console.error('Error fetching note:', error);
        res.status(500).json({ message: 'Failed to fetch note details.' });
    }
});

// Create a new note for a notebook
router.post('/', requireAuth, validateNote, async (req, res) => {
    const { title, description, notebookId } = req.body;
    const ownerId = req.user.id;
    // console.log("Received data:", { title, description, notebookId });
    
    if (!title || !description || !notebookId) {
        // console.log("Missing required fields");
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const note = await Note.create({ title, description, notebookId, ownerId });
        return res.json(note);
    } catch (error) {
        // console.log("Error creating note:", error);
        return res.status(400).json({ errors: error.errors.map(e => e.message) });
    }
});

// Edit an existing note
router.put('/:id', requireAuth, validateNote, async(req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const note = await Note.findByPk(id);

    if (!note) {
        return res.status(404).json({ message: 'Note not found.' });
    }
    
    if (note.ownerId !== req.user.id) {
        return res.status(403).json({ message: 'You do not have access to this note.' });
    }

    note.title = title;
    note.description = description;

    try {
        await note.save();
        // Fetch the updated note with tags
        const updatedNote = await Note.findByPk(id, {
            include: [{ model: Tag, as: 'Tags', through: { attributes: [] } }]
        });
        res.json(updatedNote);
    } catch (error) {
        res.status(400).json({ errors: error.errors.map(e => e.message) });
    }
});

// Delete a note by note id
router.delete('/:id', requireAuth, async (req, res) => {
    const noteId = req.params.id;
    const userId = req.user.id;

    try {
        // Find the note to delete
        const note = await Note.findOne({
            where: {
                id: noteId,
                ownerId: userId, // Ensure the user owns the note
            },
            include: [{ model: Tag, as: 'Tags' }] // Include associated tags
        });

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Remove all associated tags before deleting the note
        await note.setTags([]); // This removes all associations in the NoteTag join table

        // Delete the note itself
        await note.destroy();

        return res.json({ message: 'Note and its associated tags successfully deleted' });
    } catch (error) {
        console.error("Error deleting note and tags:", error);
        return res.status(500).json({ message: 'Failed to delete note and associated tags.' });
    }
});

// Add a new tag to a note
router.post('/:id/tags', requireAuth, async (req, res) => {
    const { id } = req.params;
    const { tagName } = req.body;
    const userId = req.user.id;

    try {
        // Find the note by ID
        const note = await Note.findByPk(id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found.' });
        }

        if (note.ownerId !== userId) {
            return res.status(403).json({ message: 'You do not have access to this note.' });
        }

        // Check if the tag already exists
        const [tag, created] = await Tag.findOrCreate({
            where: { name: tagName, userId },
            defaults: { userId }
        });

        // Associate the tag with the note
        await note.addTag(tag);

        // Fetch updated note with tags to return
        const updatedNote = await Note.findByPk(id, {
            include: [{ model: Tag, as: 'Tags', through: { attributes: [] } }]
        });

        res.json(updatedNote);
    } catch (error) {
        console.error('Error adding tag to note:', error);
        res.status(500).json({ message: 'Failed to add tag to note.' });
    }
});

// Delete a tag from a note
router.delete('/:noteId/tags/:tagId', requireAuth, async (req, res) => {
    const { noteId, tagId } = req.params;
    const userId = req.user.id;

    try {
        // Find the note by ID
        const note = await Note.findByPk(noteId, {
            include: [{ model: Tag, as: 'Tags' }]
        });

        if (!note) {
            return res.status(404).json({ message: 'Note not found.' });
        }

        if (note.ownerId !== userId) {
            return res.status(403).json({ message: 'You do not have access to this note.' });
        }

        // Find the tag to be removed
        const tag = await Tag.findByPk(tagId);

       if (!tag) {
            return res.status(404).json({ message: 'Tag not found.' });
        }

        if (tag.userId !== userId) {
            return res.status(403).json({ message: 'You do not have access to this tag.' });
        }

        // Remove the tag association with the note
        await note.removeTag(tag);

        // Fetch updated note with tags to return
        const updatedNote = await Note.findByPk(noteId, {
            include: [{ model: Tag, as: 'Tags', through: { attributes: [] } }]
        });

        res.json(updatedNote);
    } catch (error) {
        console.error('Error deleting tag from note:', error);
        res.status(500).json({ message: 'Failed to delete tag from note.' });
    }
});

module.exports = router;