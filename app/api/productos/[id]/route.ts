import pool from "@/lib/db"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { nombre, precio, stock } = await request.json()

    const { rows } = await pool.query(
      "UPDATE productos SET nombre = $1, precio = $2, stock = $3 WHERE id = $4 RETURNING *",
      [nombre, precio, stock, id]
    )

    if (rows.length === 0) {
      return Response.json({ error: "Producto no encontrado" }, { status: 404 })
    }

    return Response.json(rows[0])
  } catch (err: any) {
    console.error("Error al modificar producto:", err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await pool.query("DELETE FROM productos WHERE id = $1", [id])
    return Response.json({ ok: true })
  } catch (err: any) {
    console.error("Error al eliminar producto:", err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
