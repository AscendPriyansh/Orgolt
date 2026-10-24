import express from "express";
import { registerUser } from "../controllers/auth.controller.js";
import { authValidator } from "../middlewares/auth.validation.middleware.js"; 
import { authUserSchema } from "../validators/auth.validator.js";

const router = express.Router();

router.post("/register", authValidator(authUserSchema.registerUserSchema), registerUser);

export default router;