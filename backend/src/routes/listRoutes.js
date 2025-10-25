import express from 'express';
import {
	getLists,
	createList,
	updateList,
	deleteList
} from '../controllers/listController.js';
const router = express.Router();

// Get all lists for a board
router.get('/v1/getAll/:boardId', async (req, res) => {
	try {
		const lists = await getLists(req.params.boardId);
		res.status(200).json(lists);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Create a list (boardId from req.body)
router.post('/v1/create', async (req, res) => {
	try {
		const { boardId } = req.body;
		if (!boardId) {
			return res.status(400).json({ error: 'boardId is required in body' });
		}
		const list = await createList(req.body);
		res.status(200).json(list);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Update list (listId from req.body)
router.patch('/v1/update', async (req, res) => {
	try {
		const { listId } = req.body;
		if (!listId) {
			return res.status(400).json({ error: 'listId is required in body' });
		}
		const updated = await updateList(listId, req.body);
		res.status(200).json(updated);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Delete list (listId from req.body)
router.delete('/v1/delete', async (req, res) => {
	try {
		const { listId } = req.body;
		if (!listId) {
			return res.status(400).json({ error: 'listId is required in body' });
		}
		await deleteList(listId);
		res.status(200).json({ message: 'List deleted' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

export default router;
