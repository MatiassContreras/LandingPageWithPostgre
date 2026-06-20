"use client"

import { useState, type ComponentType } from "react"
import { useRouter } from "next/navigation"
import FormularioProducto from "./FormularioProducto"
import ProductoCard from "./ProductCard"
import { handleCambio as handleCambioShared } from "./refresh"

type Producto = {
  id: number
  nombre: string
  precio: string
  imagen_url: string | null
  stock: number
}

type FormularioProductoProps = {
  onCreado: () => void
}

const FormularioProductoTyped = FormularioProducto as ComponentType<FormularioProductoProps>

export default function ProductosPanel({
  productosIniciales,
}: {
  productosIniciales: Producto[]
}) {
  const [subTab, setSubTab] = useState<"visualizar" | "agregar">("visualizar")
  const router = useRouter()

  function handleCambio() {
    handleCambioShared(router)
    router.refresh()
  }

  return (
    <div>
      <div className="ap-subtabs">
        <button
          className={`ap-subtab ${subTab === "visualizar" ? "ap-subtab-active" : ""}`}
          onClick={() => setSubTab("visualizar")}
        >
          Visualizar productos
        </button>
        <button
          className={`ap-subtab ${subTab === "agregar" ? "ap-subtab-active" : ""}`}
          onClick={() => setSubTab("agregar")}
        >
          Agregar producto
        </button>
      </div>

      {subTab === "visualizar" && (
        <div className="ap-prod-grid">
          {productosIniciales.length === 0 && (
            <p className="ap-empty">Todavía no cargaste ningún producto.</p>
          )}
          {productosIniciales.map((producto) => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              onCambio={handleCambio}
            />
          ))}
        </div>
      )}

      {subTab === "agregar" && (
        <div className="ap-form-wrap">
          <FormularioProductoTyped onCreado={handleCambio} />
        </div>
      )}
    </div>
  )
}
