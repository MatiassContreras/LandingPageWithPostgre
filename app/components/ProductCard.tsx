"use client"
import { useState } from "react"

type Producto = {
  id: number
  nombre: string
  precio: string
  imagen_url: string | null
  stock: number
}

export default function ProductoCard({
  producto,
  onCambio,
}: {
  producto: Producto
  onCambio: () => void
}) {
  const [editando, setEditando] = useState(false)
  const [nombre, setNombre] = useState(producto.nombre)
  const [precio, setPrecio] = useState(producto.precio)
  const [stock, setStock] = useState(producto.stock)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState("")

  // MODIFICAR PRODUCTO - GUARDAR CAMBIOS
  async function handleGuardar() {
    setCargando(true)
    setError("")

    try {
      const res = await fetch(`/api/productos/${producto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, precio, stock }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Error al guardar")
        return
      }

      setEditando(false)
      onCambio()
    } catch {
      setError("No se pudo conectar con el servidor")
    } finally {
      setCargando(false)
    }
  }
  // ELIMINAR PRODUCTO - CONFIRMAR Y ELIMINAR
  async function handleEliminar() {
    if (!confirm(`¿Eliminar "${producto.nombre}"? Esta acción no se puede deshacer.`)) {
      return
    }

    setCargando(true)
    try {
      await fetch(`/api/productos/${producto.id}`, { method: "DELETE" })
      onCambio()
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="ap-card">
      <div className="ap-card-img">
        {producto.imagen_url ? (
          <img src={producto.imagen_url} alt={producto.nombre} />
        ) : (
          <span className="ap-card-noimg">Sin imagen</span>
        )}
      </div>

      {!editando ? (
        <>
          <div className="ap-card-body">
            <h3 className="ap-card-nombre">{producto.nombre}</h3>
            <p className="ap-card-precio">${Number(producto.precio).toFixed(2)}</p>
            <p className="ap-card-stock">Stock: {producto.stock}</p>
          </div>
          <div className="ap-card-actions">
            <button className="ap-btn-edit" onClick={() => setEditando(true)}>
              Modificar
            </button>
            <button className="ap-btn-del" onClick={handleEliminar} disabled={cargando}>
              {cargando ? "..." : "Eliminar"}
            </button>
          </div>
        </>
      ) : (
        <div className="ap-card-edit">
          <input
            className="ap-card-input"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
          />
          <input
            className="ap-card-input"
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Precio"
          />
          <input
            className="ap-card-input"
            type="number"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value || "0", 10))}
            placeholder="Stock"
          />

          {error && <p className="producto-error">{error}</p>}

          <div className="ap-card-actions">
            <button className="ap-btn-edit" onClick={handleGuardar} disabled={cargando}>
              {cargando ? "Guardando..." : "Guardar"}
            </button>
            <button className="ap-btn-cancel" onClick={() => setEditando(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
