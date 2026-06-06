import express from "express";
import { Router } from "express";
import { authMiddleware } from "../middlewares/authmiddleware";
import { createBoard, getBoards, getBoardByName, updateBoard, deleteBoard } from "../controllers/boardsController";

const router = Router({ mergeParams: true });

router.post("/", authMiddleware, createBoard);
router.get("/", authMiddleware, getBoards);
router.get("/:name", authMiddleware, getBoardByName);
router.put("/:name", authMiddleware, updateBoard);
router.delete("/:name", authMiddleware, deleteBoard);

export default router;