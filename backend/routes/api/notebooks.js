// backend/routes/api/notebooks.js
const express = require('express');
const { Notebook, Note, Tag, NoteTag } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// Validation middleware for notebooks
const validateNotebook = [
    check('name')
      .exists({ checkFalsy: true })
      .withMessage('Notebook name is required.')
      .isLength({ max: 50 })
      .withMessage('Notebook name must be less than 50 characters.'),
    handleValidationErrors
];

// Get all favorite notebooks for the logged-in user
router.get('/favorites', requireAuth, async (req, res) => {
    const { user } = req;
    const favoriteNotebooks = await Notebook.findAll({
        where: {
            ownerId: user.id,
            favorite: true // Only fetch notebooks marked as favorite
        },
    });
    res.json({ notebooks: favoriteNotebooks });
});

// Get all notebooks for logged in user
router.get('/', requireAuth, async (req, res) => {
    const {user} = req;
    const notebooks = await Notebook.findAll({
        where: {
            ownerId: user.id,
        },
    });
    res.json({notebooks});
});

// Get notebook details (notes) by notebook id
router.get('/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    const notebook = await Notebook.findByPk(id, {
        include: [{ model: Note }]
    });

    if (!notebook) {
        return res.status(404).json({ message: 'Notebook not found.' });
    };

    if (notebook.ownerId !== req.user.id) {
        return res.status(404).json({ message: 'You do not have access to this notebook.' });
    }

    // console.log('NOTES >>>>>>>>>', notebook.Notes);
    res.json(notebook);
});

// Create a new notebook
router.post('/', requireAuth, validateNotebook, async (req, res) => {
    // console.log('Request Body:', req.body);  // Debugging line
    const { name } = req.body;
    const ownerId = req.user.id;

    try {
        const notebook = await Notebook.create({ name, ownerId, favorite: false });
        return res.json(notebook);
    } catch(error) {
        console.error('Error creating notebook:', error);
        return res.status(400).json({ errors: error.errors.map(e => e.message) });
    }
});

// Edit a notebook by notebook id
router.put("/:id", requireAuth, validateNotebook, async(req, res) => {
    const notebookId = req.params.id;
    const { name, favorite } = req.body;
    const userId = req.user.id;

    const notebook = await Notebook.findByPk(notebookId);

    if (!notebook) {
        return res.status(404).json({ error: "Notebook not found." });
    }

    if (notebook.ownerId !== userId) {
        return res.status(404).json({ error: "You do not have access to this notebook." });
    }

    notebook.name = name;
    notebook.favorite = favorite;
    await notebook.save();

    return res.json(notebook);
});

// Delete a notebook by notebook id
router.delete('/:id', requireAuth, async (req, res) => {
    const notebookId = req.params.id;
    const userId = req.user.id;

    try {
        // Find the notebook to delete
        const notebook = await Notebook.findOne({
            where: {
                id: notebookId,
                ownerId: userId, // Ensure the user owns the notebook
            },
            include: [{
                model: Note,
                include: [{ model: Tag, as: 'Tags' }] // Include associated notes and their tags
            }]
        });

        if (!notebook) {
            return res.status(404).json({ message: 'Notebook not found' });
        }

        // Loop through each note to remove associated tags
        for (const note of notebook.Notes) {
            // Remove all associated tags for each note
            await note.setTags([]);
        }

        // Delete all notes associated with the notebook
        await Note.destroy({
            where: { notebookId }
        });

        // Delete the notebook itself
        await notebook.destroy();

        return res.json({ message: 'Notebook, its notes, and associated tags successfully deleted' });
    } catch (error) {
        console.error("Error deleting notebook, notes, and tags:", error);
        return res.status(500).json({ message: 'Failed to delete notebook, its notes, and associated tags.' });
    }
});

module.exports = router;