import express from "express";
import { authValidator } from "../middlewares/auth.validation.middleware.js";
import { orgSchema } from "../validators/org.validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getOrg } from "../controllers/org.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getOrg);
// router.post("/", authMiddleware, createOrg);

export default router;