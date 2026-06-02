import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !(authHeader.startsWith('Bearer '))) {
        return res.status(403).json({
            message: "Token Malfunctioned"
        });
    };

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {id: string};

        // for onwer_id in organization creation etc
        (req as any).userId = decoded.id;

        next();

    } catch {
        return res.status(401).json({
            message: "Invalid token",
        })
    }
}

module.exports = {
    authMiddleware: authMiddleware
}