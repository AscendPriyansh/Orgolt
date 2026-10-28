import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getCard } from "../controllers/card.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/:cardId", authMiddleware, getCard);

export default router;