import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getBoards } from "../controllers/board.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getBoards);

export default router;