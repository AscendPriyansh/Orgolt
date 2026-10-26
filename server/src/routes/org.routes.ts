import express from "express";
import { authValidator } from "../middlewares/auth.validation.middleware.js";
import { orgSchema } from "../validators/org.validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/org", authMiddleware, getOrg);

export default router;