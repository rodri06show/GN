// src/pages/api/auth/login.ts
import type { APIRoute } from "astro";
import { db, type User } from "../../../lib/db";
import bcrypt from "bcrypt";
import { createToken } from "../../../lib/auth";

export const POST: APIRoute = async ({ request }) => {
  const { username, password } = await request.json();

  // Tipamos el usuario que recibimos desde SQLite
  const user = db
    .prepare("SELECT * FROM users WHERE username = ?")
    .get(username) as User | undefined;

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return new Response("Invalid credentials", { status: 401 });
  }

  // Aquí le pasamos el nombre + rol al token
  const token = createToken({ username: user.username, role: user.role });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=604800`,
      "Content-Type": "application/json",
    },
  });
};
