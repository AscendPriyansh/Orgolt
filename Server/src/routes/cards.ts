import { Router } from "express";
import { authMiddleware } from "../middlewares/authmiddleware";
import { createCard, getCards, deleteCard } from "../controllers/cardController";

const router = Router({mergeParams: true});

router.post("/", authMiddleware, createCard);
router.get("/", authMiddleware, getCards);
router.delete("/:cardId", authMiddleware, deleteCard);

export default router;