const express = require('express');
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
            return res.status(404).json({ message: 'You do not have access to this note.' });
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
    console.log("Received data:", { title, description, notebookId });
    
    if (!title || !description || !notebookId) {
        console.log("Missing required fields");
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const note = await Note.create({ title, description, notebookId, ownerId });
        return res.json(note);
    } catch (error) {
        console.log("Error creating note:", error);
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
        return res.status(404).json({ message: 'You do not have access to this note.' });
    }

    note.title = title;
    note.description = description;

    try {
        await note.save();
        res.json(note);
    } catch (error) {
        res.status(400).json({ errors: error.errors.map(e => e.message) });
    }
});

// Delete a note by note id
router.delete('/:id', requireAuth, async (req, res) => {
    const noteId = req.params.id;
    const userId = req.user.id;

    const note = await Note.findOne({
        where: {
            id: noteId,
            ownerId: userId, // Ensure the user owns the note
        },
    });

    if (!note) {
        return res.status(404).json({ message: 'Note not found' });
    }

    await note.destroy();
    return res.json({ message: 'Note successfully deleted' });
});

// Add a new tag to a note
router.post('/:id/tags', requireAuth, async (req, res) => {
    const { id } = req.params;
    const { tagName } = req.body;
    const userId = req.user.id;

    try {
        // Find the note by ID
        const note = await Note.findByPk(id);
        if (!note || note.ownerId !== userId) {
            return res.status(404).json({ message: 'Note not found or you do not have access.' });
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

        if (!note || note.ownerId !== userId) {
            return res.status(404).json({ message: 'Note not found or you do not have access.' });
        }

        // Find the tag to be removed
        const tag = await Tag.findByPk(tagId);

        if (!tag || tag.userId !== userId) {
            return res.status(404).json({ message: 'Tag not found or you do not have access.' });
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