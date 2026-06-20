// app/api/productos/route.ts
import pool from "@/lib/db"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const nombre = formData.get("nombre") as string
    const precio = formData.get("precio") as string
    const archivo = formData.get("imagen") as File | null

    if (!nombre || !precio) {
      return Response.json({ error: "Nombre y precio son obligatorios" }, { status: 400 })
    }

    let imagenUrl = null

    if (archivo && archivo.size > 0) {
      const nombreArchivo = `${Date.now()}-${archivo.name}`

      const { error: uploadError } = await supabase.storage
        .from("productos")
        .upload(nombreArchivo, archivo)

      if (uploadError) {
        console.error("Error subiendo a Supabase:", uploadError)
        return Response.json(
          { error: `Error al subir la imagen: ${uploadError.message}` },
          { status: 500 }
        )
      }

      const { data } = supabase.storage
        .from("productos")
        .getPublicUrl(nombreArchivo)

      imagenUrl = data.publicUrl
    }

    const { rows } = await pool.query(
      "INSERT INTO productos (nombre, precio, imagen_url) VALUES ($1, $2, $3) RETURNING *",
      [nombre, precio, imagenUrl]
    )

    return Response.json(rows[0], { status: 201 })

  } catch (err: any) {
    console.error("Error al crear producto:", err)
    return Response.json(
      { error: err.message || "Error interno del servidor" },
      { status: 500 }
    )
  }
}