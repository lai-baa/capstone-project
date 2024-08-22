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
})

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
})

module.exports = router;