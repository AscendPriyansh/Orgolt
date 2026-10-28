import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createCard, getCard } from "../controllers/card.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/:cardId", authMiddleware, getCard);
router.post("/", authMiddleware, createCard);

export default router;