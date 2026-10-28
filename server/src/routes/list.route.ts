import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createList, getList } from "../controllers/list.controller.js";
import { authValidator } from "../middlewares/auth.validation.middleware.js";
import { listSchema } from "../validators/list.validator.js";

const router = express.Router({ mergeParams: true });

router.get("/", authMiddleware, getList);
router.post("/", authMiddleware, authValidator(listSchema.createListSchema), createList);

export default router;