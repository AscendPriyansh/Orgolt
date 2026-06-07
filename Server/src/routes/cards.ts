import { Router } from "express";
import { authMiddleware } from "../middlewares/authmiddleware";
import { createCard } from "../controllers/cardController";

const router = Router({mergeParams: true});

router.post("/", authMiddleware, createCard);
// router.post("/", authMiddleware, getCardList);

export default router;