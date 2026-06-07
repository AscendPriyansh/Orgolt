import { Router } from "express";
import { authMiddleware } from "../middlewares/authmiddleware";
import { addMember, getMembers } from "../controllers/membersController";


const router = Router({ mergeParams: true });

router.post("/", authMiddleware, addMember);
router.get("/", authMiddleware, getMembers);

export default router;