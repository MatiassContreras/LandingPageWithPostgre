"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function FormularioProducto() {
  const [nombre, setNombre] = useState("")
  const [precio, setPrecio] = useState("")
  const [imagen, setImagen] = useState<File | null>(null)
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(false)
  const router = useRouter()

  //CREAR PRODUCTO
  async function handleSubmit() {
    if (!nombre.trim() || !precio.trim()) {
      setError("Nombre y precio son obligatorios")
      return
    }

    setCargando(true)
    setError("")

    const formData = new FormData()
    formData.append("nombre", nombre)
    formData.append("precio", precio)
    if (imagen) formData.append("imagen", imagen)

    try {
      const res = await fetch("/api/productos", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Error al crear el producto")
        return
      }

      setNombre("")
      setPrecio("")
      setImagen(null)
      router.refresh()
    } catch (err) {
      setError("No se pudo conectar con el servidor")
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="producto-form">
      <input
        className="producto-input"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
      />
      <input
        className="producto-input"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        placeholder="Precio"
        type="number"
      />
      <input
        className="producto-input producto-input-file"
        type="file"
        accept="image/*"
        onChange={(e) => setImagen(e.target.files?.[0] || null)}
      />

      {error && <p className="producto-error">{error}</p>}

      <button className="producto-btn" onClick={handleSubmit} disabled={cargando}>
        {cargando ? "Creando..." : "Crear producto"}
      </button>
    </div>
  )
}