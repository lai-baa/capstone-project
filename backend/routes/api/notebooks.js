// backend/routes/api/notebooks.js
const express = require('express');
const { Notebook } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

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

// Create a new notebook
router.post('/', requireAuth, async (req, res) => {
    const { name, favorite } = req.body;
    const ownerId = req.user.id;

    try {
        const notebook = await Notebook.create({ name, favorite, ownerId });
        return res.json(notebook);
    } catch {
        return res.status(400).json({ errors: error.errors.map(e => e.message) });
    }
});

// Edit a notebook by notebook id
router.put("/:id", requireAuth, async(req, res) => {
    const notebookId = req.params.id;
    const { name, favorite } = req.body;
    const userId = req.user.id;

    const notebook = await Notebook.findByPk(notebookId);

    if (!notebook || notebook.ownerId !== userId) {
        return res.status(404).json({ error: "Notebook not found" });
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

    const notebook = await Notebook.findOne({
        where: {
            id: notebookId,
            ownerId: userId,
        },
    });

    if (!notebook) {
        return res.status(404).json({ message: 'Notebook not found' });
    }

    await notebook.destroy();
    return res.json({ message: 'Notebook successfully deleted' });
});

module.exports = router;