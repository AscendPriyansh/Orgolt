import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createList, deleteList, getList, updateList } from "../controllers/list.controller.js";
import { authValidator } from "../middlewares/auth.validation.middleware.js";
import { listSchema } from "../validators/list.validator.js";

const router = express.Router({ mergeParams: true });

router.get("/", authMiddleware, getList);
router.post("/", authMiddleware, authValidator(listSchema.createListSchema), createList);
router.patch("/:listId", authMiddleware, authValidator(listSchema.updateListSchema), updateList);
router.delete("/:listId", authMiddleware, deleteList);

export default router;