// src/pages/api/auth/login.ts
import type { APIRoute } from "astro";
import { usuarios, type user } from "../../../lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const clave = import.meta.env.CLAVE_SECRETA;

type DBUser = {
  id: number;
  username: string;
  password: string;
  role: string;
};

export const POST: APIRoute = async ({ request }) => {
  const { username, password } = await request.json();

    const stmt = usuarios.prepare<[string], DBUser>(`
    SELECT id, username, password, role
    FROM users
    WHERE username = ?
  `);

  const user = stmt.get(username);
  
  if (!user) {
    return new Response(JSON.stringify({ error: "Usuario no encontrado" }), { status: 404 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return new Response(JSON.stringify({ error: "Contraseña incorrecta" }), { status: 401 });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    clave.CLAVE_SECRETA,
    { expiresIn: "1d" }
  );

  return new Response(
    JSON.stringify({
      ok: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    }),
    {
      headers: {
        "Set-Cookie": `auth=${token}; HttpOnly; Path=/; SameSite=Strict`
      }
    }
  );

};
