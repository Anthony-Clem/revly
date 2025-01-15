import { RequestHandler } from "express";

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

interface JWTPayload {
  userId: string;
}

declare global {
  namespace Express {
    export interface Request {
      userId: string;
    }
  }
}

export const authenticate: RequestHandler = (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401).json({ message: "Authentication required." });
      return;
    }

    const { userId } = jwt.verify(token, JWT_SECRET) as JWTPayload;

    req.userId = userId;

    return next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      res.status(401).json({ message: "Token expired. Please log in again." });
    } else {
      res
        .status(401)
        .json({ message: "Invalid token. Authentication failed." });
    }
    return;
  }
};
