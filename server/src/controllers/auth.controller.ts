import type {Request, Response} from "express";
import { loginUserService, registerUserService } from "../services/auth.service.js";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const {name, email, password } = req.body;

        const registerUser = await registerUserService({name, email, password});

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                "id": registerUser.id,
                "name": registerUser.name,
                "email": registerUser.email
            }
        });

    } catch(error: unknown) {
        if(error instanceof Error && error.message === "Email_already_exists") {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const userExists = await loginUserService({email, password});

        return res.status(200).json({
            success: true,
            message: "User logged in successfully.",
            user: userExists
        });

    } catch(error: unknown) {
        if(error instanceof Error && error.message === "Invalid email or password.") {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}