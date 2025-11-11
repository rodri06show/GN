import { APIRoute } from 'astro';

export const prerender = false;

export async function POST({ request }) {
  const { username: username, password: password } = await request.json();
  
  if (username == "admin" && password == "1234") {
    return new Response(
      JSON.stringify({ success: true, message: "Login correcto" }),
      { status: 200 }
    );
  }

  return new Response(
    JSON.stringify({ success: false, message: "Credenciales incorrectas" }),
    { status: 401 }
  );
}