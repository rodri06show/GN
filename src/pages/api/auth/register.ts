import type { APIRoute } from "astro";
import { usuarios, tel } from "../../../lib/db";
import bcrypt from "bcrypt";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { username, password, tlf } = body;

  if (!username || !password || !tlf) {
    return new Response(
      JSON.stringify({ success: false, message: "Falta información" }),
      { status: 400 }
    );
  }

  // Verificar que el teléfono exista
  const phoneRow = tel.prepare("SELECT * FROM phones WHERE phone = ?").get(tlf);
  if (!phoneRow) {
    return new Response(
      JSON.stringify({ success: false, message: "Teléfono no registrado" }),
      { status: 400 }
    );
  }

  try {
    // Hashear la contraseña
    const hash = await bcrypt.hash(password, 10);

    // Insertar usuario
    usuarios
      .prepare(
        "INSERT INTO users (username, password, role, phone) VALUES (?, ?, ?, ?)"
      )
      .run(username, hash, "estandar", tlf);

    // Borrar teléfono de la lista de teléfonos disponibles
    tel.prepare("DELETE FROM phones WHERE phone = ?").run(tlf);

    return new Response(
      JSON.stringify({ ok: true }),
      { status: 201 }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ ok: false, error: err.message }),
      { status: 500 }
    );
  }
};
