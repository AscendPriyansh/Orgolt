import express from "express";
import { authValidator } from "../middlewares/auth.validation.middleware.js";
import { orgSchema } from "../validators/org.validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createOrg, getOrg, updateOrg } from "../controllers/org.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getOrg);
router.post("/", authMiddleware, authValidator(orgSchema.createOrgSchema), createOrg);
router.patch("/:orgId", authMiddleware, authValidator(orgSchema.updateOrgSchema), updateOrg);

export default router;