import jwt from "jsonwebtoken";
import { Request } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

interface DecodedUser {
  _id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export const authMiddleware = async ({ req }: { req: Request }) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return { user: null };

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedUser;
    return { user: decoded };
  } catch (err) {
    console.error("Token verification failed:", err);
    return { user: null };
  }
};
