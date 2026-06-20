import pool from "@/lib/db"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  const { username, password } = await request.json()

  const { rows } = await pool.query(
    "SELECT * FROM usuarios WHERE username = $1",
    [username]
  )
  const usuario = rows[0]

  if (!usuario) {
    return Response.json({ error: "El nombre de usuario es incorrecto o no existe" }, { status: 401 })
  }


  const passwordValida = await bcrypt.compare(password, usuario.password_hash)
  if (!passwordValida) {
    return Response.json({ error: "Contraseña incorrecta" }, { status: 401 })
  }

  const token = jwt.sign(
    { id: usuario.id, username: usuario.username, admin: usuario.admin },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  )

  const cookieStore = await cookies()
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })

  return Response.json({ ok: true, admin: usuario.admin })
}
