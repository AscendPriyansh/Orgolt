import express from "express";
import { authMiddleware } from "../middlewares/authmiddleware";
import { createOrg, getOrgs, getOrgByName, updateOrg, deleteOrg } from "../controllers/organizationsController";

const router = express.Router();

router.post("/", authMiddleware, createOrg);
router.get("/", authMiddleware, getOrgs);
router.get("/:name", authMiddleware, getOrgByName);
router.put("/:name", authMiddleware, updateOrg);
router.delete("/:id", authMiddleware, deleteOrg);

export default router;