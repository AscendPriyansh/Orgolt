import { Router } from "express";
import { authMiddleware } from "../middlewares/authmiddleware";
import { createList, getLists, updateList, deleteList } from "../controllers/listsController";

const router = Router({ mergeParams: true });

router.post("/", authMiddleware, createList);
router.get("/", authMiddleware, getLists);
router.put("/:listId", authMiddleware, updateList);
router.delete("/:listId", authMiddleware, deleteList);

export default router;