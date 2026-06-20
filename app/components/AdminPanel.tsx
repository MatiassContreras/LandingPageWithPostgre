"use client"

import { useState } from "react"
import ProductosPanel from "./ProductosPanel"

type Producto = {
  id: number
  nombre: string
  precio: string
  imagen_url: string | null
  stock: number
}

export default function AdminPanel({ productos }: { productos: Producto[] }) {
  const [tab, setTab] = useState<"estadisticas" | "productos">("estadisticas")

  const totalProductos = productos.length
  const totalStock = productos.reduce((acc, p) => acc + (p.stock || 0), 0)
  const sinImagen = productos.filter((p) => !p.imagen_url).length
  const valorInventario = productos.reduce(
    (acc, p) => acc + Number(p.precio) * (p.stock || 0),
    0
  )

  return (
    <div className="ap-wrap">
      <div className="ap-tabs">
        <button
          className={`ap-tab ${tab === "estadisticas" ? "ap-tab-active" : ""}`}
          onClick={() => setTab("estadisticas")}
        >
          Estadísticas
        </button>
        <button
          className={`ap-tab ${tab === "productos" ? "ap-tab-active" : ""}`}
          onClick={() => setTab("productos")}
        >
          Productos
        </button>
      </div>

      <div className="ap-content">
        {tab === "estadisticas" && (
          <div className="ap-stats-grid">
            <div className="ap-stat-card">
              <span className="ap-stat-n">{totalProductos}</span>
              <span className="ap-stat-l">Productos totales</span>
            </div>
            <div className="ap-stat-card">
              <span className="ap-stat-n">{totalStock}</span>
              <span className="ap-stat-l">Unidades en stock</span>
            </div>
            <div className="ap-stat-card">
              <span className="ap-stat-n">${valorInventario.toFixed(2)}</span>
              <span className="ap-stat-l">Valor de inventario</span>
            </div>
            <div className="ap-stat-card">
              <span className="ap-stat-n">{sinImagen}</span>
              <span className="ap-stat-l">Sin imagen cargada</span>
            </div>
          </div>
        )}

        {tab === "productos" && <ProductosPanel productosIniciales={productos} />}
      </div>
    </div>
  )
}
