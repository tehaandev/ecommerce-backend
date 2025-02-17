import { JWT_SECRET } from "../constants";
import { Request, Response, NextFunction } from "express";
import { JWTPayload, jwtVerify, JWTVerifyResult } from "jose";

declare global {
  namespace Express {
    interface Request {
      user?: JWTVerifyResult<JWTPayload>;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    // Decode and verify the JWT token
    const decoded = await jwtVerify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

