import express from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { authValidator } from "../middlewares/auth.validation.middleware.js"; 
import { authUserSchema } from "../validators/auth.validator.js";

const router = express.Router();

router.post("/register", authValidator(authUserSchema.registerUserSchema), registerUser);
router.post("/login", authValidator(authUserSchema.loginUserSchema), loginUser);

export default router;