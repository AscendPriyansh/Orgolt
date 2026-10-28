import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getList } from "../controllers/list.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/", authMiddleware, getList);

export default router;