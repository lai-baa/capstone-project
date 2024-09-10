const express = require('express');
const { Task } = require('../../db/models');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateTask = [
    check('title')
      .exists({ checkFalsy: true })
      .withMessage('Task title is required.')
      .isLength({ max: 100 })
      .withMessage('Task title must be less than 100 characters.'),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('Description is required.')
      .isLength({ max: 500 })
      .withMessage('Description must be less than 500 characters.'),
    check('dueDate')
      .exists({ checkFalsy: true })
      .withMessage('Due date is required.')
      .isISO8601()
      .withMessage('Due date must be a valid date.'),
    check('priority')
      .exists({ checkFalsy: true })
      .withMessage('Priority is required.')
    //   .isIn(['low', 'medium', 'high'])
      .withMessage('Priority must be Low, Medium, or High.'),
    handleValidationErrors
];

// Get tasks due within the next 5 days
router.get('/reminders', requireAuth, async (req, res) => {
    const userId = req.user.id;

    try {
        const now = new Date();
        const fiveDaysFromNow = new Date();
        fiveDaysFromNow.setDate(now.getDate() + 5);

        const tasks = await Task.findAll({
            where: {
                userId,
                dueDate: {
                    [Op.between]: [now, fiveDaysFromNow]
                }
            }
        });

        // console.log("Fetched reminders:", tasks);  // Add this line for debugging
        return res.json({ tasks });
    } catch (error) {
        console.error('Error fetching reminders:', error);
        return res.status(500).json({ message: 'Failed to fetch reminders.' });
    }
});

// Get all completed tasks of a user
router.get('/completed', requireAuth, async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: { userId: req.user.id, completed: true },  // Only fetch completed tasks
        });
        return res.json(tasks);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch completed tasks.' });
    }
});

// Get all tasks of a user
router.get("/", requireAuth, async(req, res) => {
    try {
        const tasks = await Task.findAll({
            where: { userId: req.user.id },
        });
        return res.json(tasks);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch tasks.' });
    }
});

// Get all details of a task
router.get("/:id", requireAuth, async(req, res) => {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    try {
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        };
    
        if (task.userId !== req.user.id) {
            return res.status(404).json({ message: 'You do not have access to this task.' });
        }

        return res.json(task);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch task details.' });
    }
});

// Create a new task
router.post('/', requireAuth, validateTask, async (req, res) => {
    const { title, description, dueDate, priority } = req.body;
    const userId = req.user.id;
  
    try {
      const task = await Task.create({ title, description, dueDate, priority, userId, completed: false });
      return res.json(task);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ errors: error.errors.map(e => e.message) });
    }
});

// Edit an existing task
router.put('/:id', requireAuth, validateTask, async (req, res) => {
    const { id } = req.params;
    const { title, description, dueDate, priority, completed } = req.body;

    try {
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        if (task.userId !== req.user.id) {
            return res.status(403).json({ message: 'You do not have access to edit this task.' });
        }

        // Update the task fields
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.priority = priority;
        task.completed = completed;

        await task.save(); // Save the updated task

        return res.json(task);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to update task.' });
    }
});

// Delete task
router.delete('/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await Task.findOne({
        where: {
            id,
            userId,
        },
    });

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();
    return res.json({ message: 'Task successfully deleted' });
});

module.exports = router;