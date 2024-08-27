const express = require('express');
const { Note } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// Get all details for a note
router.get('/:id', requireAuth, async(req, res) => {
    const { id } = req.params;
    const note = await Note.findByPk(id);

    if (!note) {
        return res.status(404).json({ message: 'Note not found.' });
    }
    
    if (note.ownerId !== req.user.id) {
        return res.status(404).json({ message: 'You do not have access to this note.' });
    }

    res.json(note);
});


// Create a new note for a notebook
router.post('/', requireAuth, async (req, res) => {
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
router.put('/:id', requireAuth, async(req, res) => {
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

module.exports = router;