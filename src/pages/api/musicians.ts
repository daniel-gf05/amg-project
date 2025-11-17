import type { APIRoute } from 'astro';
import { db } from 'astro:db';
import { Musicians } from '../../../db/config';

export const GET: APIRoute = async () => {
    const musicians = await db.select().from(Musicians);
    return new Response(JSON.stringify(musicians), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
};

export const POST: APIRoute = async ({ request }) => {
    const { name, description, image } = await request.json();
    await db.insert(Musicians).values({ name, description, image });
    return new Response(null, { status: 201 });
};
