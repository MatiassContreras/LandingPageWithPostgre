"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ModificarTarea() {
  const [id, setId] = useState(0)
  const [nuevoEstado, setNuevoEstado] = useState(false)
  const [cargando, setCargando] = useState(false)
  const router = useRouter()

  async function handleSubmit() {
    if (id === 0) return

    setCargando(true)

    await fetch("/api/tareas", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, nuevoEstado }),
    })

    setCargando(false)
    router.refresh()
  }

  return (
    <div className="flex gap-2 mb-6">
      <input
        type="number"
        value={id}
        onChange={(e) => setId(parseInt(e.target.value || "0", 10) || 0)}
        placeholder="ID de la tarea a modificar..."
        className="border rounded p-2 flex-1"
      />
      <input
        type="checkbox"
        checked={nuevoEstado}
        onChange={(e) => setNuevoEstado(e.target.checked)}
        className="form-checkbox h-5 w-5 text-blue-600"
      />
      <button
        onClick={handleSubmit}
        disabled={cargando}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {cargando ? "Guardando..." : "Modificar"}
      </button>
    </div>
  )
}
