import pool from "@/lib/db"

// GET — traer todas las tareas
export async function GET() {
  const { rows } = await pool.query(
    "SELECT * FROM tareas ORDER BY creada_at DESC"
  )
  return Response.json(rows)
}

// POST — modificar una tarea existente
export async function POST(request: Request) {
  const { id, nuevoEstado } = await request.json()

  if (!id) {
    return Response.json({ error: "El id a modificar es requerido" }, { status: 400 })
  }

  const { rows } = await pool.query(
    "UPDATE tareas SET completada = $2 WHERE id = $1 RETURNING *",
    [id, nuevoEstado]
  )

  return Response.json(rows[0], { status: 201 })
}