"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function FormularioTarea() {
  const [titulo, setTitulo] = useState("")
  const [cargando, setCargando] = useState(false)
  const router = useRouter()

  async function handleSubmit() {
    if (!titulo.trim()) return

    setCargando(true)

    await fetch("/api/tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo }),
    })

    setTitulo("")
    setCargando(false)
    router.refresh()
  }

  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Nueva tarea..."
        className="border rounded p-2 flex-1"
      />
      <button
        onClick={handleSubmit}
        disabled={cargando}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {cargando ? "Guardando..." : "Agregar"}
      </button>
    </div>
  )
}
