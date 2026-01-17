import jwt from "jsonwebtoken";

const SECRET = import.meta.env.JWT_SECRET || "dev_secret";

export type DecodedToken = {
  username: string;};

export function createToken(payload: { username: string; role: string }) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
};