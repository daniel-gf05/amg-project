import type { APIRoute } from "astro";
// Tengo que importar tanto la base de datos {db} como las tablas que voy a usar {Musicians}
import { db, desc, Musicians } from "astro:db"

// Desactivo el prerender, ya que la página es ServerSideRendering(SSR)
export const prerender = false;

/*
 export const POST define la función pública, el POST le indica a Astro que es una petición POST
 : APIRoute define el tipo de la función, que será APIRoute
 el parámetro request se asocia al contenido de la petición HTTP (POST en este caso)
*/

export const POST: APIRoute = async ({ request }) => {
    // Almacena en un array con la información recibida
    // const data = await request.formData(); -> Esto se usaría si solicitara un formulario, pero como envío un JSON, debo usar request.json()
    const data = await request.json();
    const name = data.name
    const description = data.description
    const image = data.image

    // Compruebo
    if (!name || !description || !image) {
        return new Response(
            JSON.stringify({
                message: "Missing required fields",
            }),
            { status: 400 }
        );
    }

    // name -> es el campo en la bbdd
    // String(name) -> es la variable local de la función
    await db.insert(Musicians).values({
        name: String(name),
        description: String(description),
        image: String(image)
    })

    return new Response(
        JSON.stringify({
            message: "ok"
        }),
        { status: 200 })

}

export const GET: APIRoute = async () => {
    const musicians =  await db.select().from(Musicians).all()
    return new Response(
        JSON.stringify(musicians),
        {status:200}
    )
}