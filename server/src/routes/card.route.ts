import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createCard, deleteCard, getCard, updateCard } from "../controllers/card.controller.js";
import { authValidator } from "../middlewares/auth.validation.middleware.js";
import { cardSchema } from "../validators/card.validator.js";

const router = express.Router({ mergeParams: true });

router.get("/:cardId", authMiddleware, getCard);
router.post("/", authMiddleware, authValidator(cardSchema.createCardSchema), createCard);
router.patch("/:cardId", authMiddleware, authValidator(cardSchema.updateCardSchema), updateCard);
router.delete("/:card", authMiddleware, deleteCard);

export default router;