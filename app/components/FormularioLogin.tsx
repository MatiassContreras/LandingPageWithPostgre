"use client"

import Link from "next/link"
import { useState } from "react"

export default function FormularioLogin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(false)

  async function handleSubmit() {
    if (!username.trim() || !password.trim()) return

    setCargando(true)
    setError("")

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })

    if (res.ok) {
      window.location.href = "/"
    } else {
      const data = await res.json()
      setError(data.error || "Error al iniciar sesión")
      setCargando(false)
    }
  }

  return (
    <div className="login-wrap">
      <h2>Iniciar sesión</h2>

      <div className="form">
        <input
          type="text"
              className="mb-4"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
              className="mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: "red", fontSize: 14, marginBottom: 10 , marginLeft: 25}}>{error}</p>}

        <button onClick={handleSubmit} disabled={cargando}>
          {cargando ? "Iniciando sesión..." : "Sign in"}
        </button>

        <Link href="/auth/register">
          <p className="register-link" >Don&apos;t have an account? Register</p>
        </Link>
      </div>
    </div>
  )
}
