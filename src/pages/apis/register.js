import {apis} from 'astro';

export const prerender = false;

export async function POST({ request }) {
  const { username: username, password: password, phone: phone } = await request.json();
    if (username && password && phone) {   
        return new Response(
      JSON.stringify({ success: true, message: "Login correcto" }),
      { status: 200 }
    );
    }

  return new Response(
    JSON.stringify({ success: false, message: "Faltan datos" }),
    { status: 401 }
  );
}