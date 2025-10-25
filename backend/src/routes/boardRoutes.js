import express from "express";
import {createBoard, getAllBoards} from "../controllers/boardController.js";

const router = express.Router();

// CREATE a new board
router.post("/v1/create", async (req, res) => {
  try {
    const response = await createBoard(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all boards
router.get("/v1/getAll", async (_, res) => {
  try {
    const response = await getAllBoards();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;