import jwt from "jsonwebtoken";

const JWT_SECRET = String(process.env.JWT_SECRET);  // <-- FIX. Forces correct type

export const signToken = (payload: object) =>
  jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });

export const verifyToken = (token: string) =>
  jwt.verify(token, JWT_SECRET);

export const decodeToken = (token: string) =>
  jwt.decode(token);
