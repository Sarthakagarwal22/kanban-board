import express from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  moveTask
} from '../controllers/tasksController.js';
const router = express.Router();

// Get all tasks in a list (listId from body)
router.post('/v1/getAll', async (req, res) => {
  try {
    const { listId } = req.body;
    if (!listId) {
      return res.status(400).json({ error: 'listId is required in body' });
    }
    const tasks = await getTasks(listId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a task
router.post('/v1/create', async (req, res) => {
  try {
    const { listId, title } = req.body;
    if (!listId || !title) {
      return res.status(400).json({ error: 'listId and title are required in body' });
    }
    const task = await createTask(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update task (taskId from body)
router.patch('/v1/update', async (req, res) => {
  try {
    const { taskId } = req.body;
    if (!taskId) {
      return res.status(400).json({ error: 'taskId is required in body' });
    }
    const updated = await updateTask(taskId, req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete task (taskId from body)
router.delete('/v1/delete', async (req, res) => {
  try {
    const { taskId } = req.body;
    if (!taskId) {
      return res.status(400).json({ error: 'taskId is required in body' });
    }
    await deleteTask(taskId);
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Move task to another list
router.patch('/v1/move', async (req, res) => {
  try {
    const { taskId, toListId } = req.body;
    if (!taskId || !toListId) {
      return res.status(400).json({ error: 'taskId and toListId are required in body' });
    }
    const moved = await moveTask(taskId, req.body);
    res.status(200).json(moved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;