import { usuarios } from "../../../lib/db";
import type { user } from "../../../lib/db";
import  type { APIRoute } from "astro";

type TopUser = {
  username: string;
  points: number;
};

export const POST: APIRoute = async ({ request }) => {

const stmt = usuarios.prepare("SELECT username, points FROM users ORDER BY points DESC");
const usuariosList: TopUser[] = stmt.all() as TopUser[];

    return new Response(
        JSON.stringify({ ok: true, top5: usuariosList }),
        { status: 200 }
    );
};
