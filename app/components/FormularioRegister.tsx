"use client"

import Link from "next/dist/client/link"
import { useState } from "react"

export default function FormularioRegister() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(false)
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  async function handleSubmit() {
    if (!EMAIL_REGEX.test(email)) {
      setError("El email no tiene un formato válido")
      return
    }
    if (!username.trim() || !password.trim() || !email.trim()) return

    setCargando(true)
    setError("")

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    })

    if (res.ok) {
      window.location.href = "/"
    } else {
      const data = await res.json()
      setError(data.error || "Error al registrar usuario")
      setCargando(false)
    }
  }

  return (
    <div className="login-wrap">
      <h2>Registrarse</h2>

      <div className="form">
        <input
          type="text"
          className="mb-4"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="mb-4"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="email"
          className="mb-4"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />


        {error && <p style={{ color: "red", fontSize: 14, marginBottom: 10 , marginLeft: 60}}>{error}</p>}

        <button onClick={handleSubmit} disabled={cargando}>
          {cargando ? "Registrando..." : "Sign up"}
        </button>

        <Link href="/auth/login">
          <p className="register-link" >Already have an account? Login</p>
        </Link>
      </div>
    </div>
  )
}
