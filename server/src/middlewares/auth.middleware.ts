import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      success: false,
      message: "Token Malfunctioned",
    });
  }

  const token = authHeader.split(" ")[1];

  if(!token) {
    return res.status(401).json({
        success: false,
        message: "Invalid authentication header"
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!,
    ) as jwt.JwtPayload;
    (req as any).userId = decoded.id;

    next();
  } catch(err) {
    console.log(err);

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};