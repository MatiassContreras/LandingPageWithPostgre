import pool from "@/lib/db"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  const { username, password, email } = await request.json()

  if (!EMAIL_REGEX.test(email)) {
    return Response.json({ error: "El email no tiene un formato válido" }, { status: 400 })
  }

  if (password.length < 3) {
    return Response.json({ error: "La contraseña debe tener al menos 3 caracteres" }, { status: 400 })
  }

  const { rows } = await pool.query(
    "SELECT * FROM usuarios WHERE username = $1 OR email = $2",
    [username, email.toLowerCase()]
  )
  const usuario = rows[0]

  if (usuario && usuario.username === username) {
    return Response.json({ error: "El nombre de usuario ya existe" }, { status: 409 })
  }
  if (usuario && usuario.email === email.toLowerCase()) {
    return Response.json({ error: "El correo electrónico ya está registrado" }, { status: 409 })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  let usuarioNuevo
  try {
    const { rows: newUserRows } = await pool.query(
      "INSERT INTO usuarios (username, password_hash, email) VALUES ($1, $2, $3) RETURNING *",
      [username, passwordHash, email.toLowerCase()]
    )
    usuarioNuevo = newUserRows[0]
  } catch (err: any) {
    if (err.code === "23505") {
      return Response.json({ error: "El email o usuario ya está registrado" }, { status: 409 })
    }
    throw err
  }

  const token = jwt.sign(
    { id: usuarioNuevo.id, username: usuarioNuevo.username, admin: usuarioNuevo.admin },
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

  return Response.json({ ok: true })
}