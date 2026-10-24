import type { Request, Response, NextFunction } from "express";
import { authUserSchema } from "../validators/auth.validator.js";
import * as z from "zod";

export const authValidator = (authUserSchema: z.ZodType) => {
        return (req: Request, res: Response, next: NextFunction) => {

        const result = authUserSchema.safeParse(req.body);

        if(!result.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid request data",
                errors: result.error.flatten().fieldErrors
            });
        }

        req.body = result.data;

        next();
    }
}