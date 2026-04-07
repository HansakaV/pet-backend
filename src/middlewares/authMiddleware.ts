import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../errors/apiError";

interface AuthRequest extends Request {
  userId?: string;
  user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return next(new ApiError(401, "Authentication token is required"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret") as any;
    req.userId = decoded.id;
    req.user = decoded;
    next();
  } catch (error) {
    next(new ApiError(401, "Invalid or expired token"));
  }
};
