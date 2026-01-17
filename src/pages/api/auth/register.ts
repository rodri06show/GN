import  type { APIRoute } from "astro";
import { db } from "../../../lib/db";
import bcrypt from "bcrypt";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { username, password } = body;

  const existing = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
  if (existing) return new Response("User already exists", { status: 400 });

  const hashed = await bcrypt.hash(password, 10);


  db.prepare("INSERT INTO users (username, password) VALUES (?, ?)")
    .run(username, hashed);

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
