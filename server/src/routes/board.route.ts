import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createBoard, getBoards, updateBoard } from "../controllers/board.controller.js";
import { authValidator } from "../middlewares/auth.validation.middleware.js";
import { boardSchema } from "../validators/board.validator.js";

const router = express.Router({ mergeParams: true });

router.get("/", authMiddleware, getBoards);
router.post("/", authMiddleware, authValidator(boardSchema.createBoardSchema), createBoard);
router.patch("/:boardId", authMiddleware, authValidator(boardSchema.updateBoardSchema), updateBoard);

export default router;