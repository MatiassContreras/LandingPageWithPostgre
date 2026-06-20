"use client"

import { useState, type ComponentType } from "react"
import { useRouter } from "next/navigation"
import FormularioProducto from "./FormularioProducto"
import UserProductoCard from "./UserProductCard"
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
  const router = useRouter()

  function handleCambio() {
    handleCambioShared(router)
  }

  return (
    <div>
      

    
        <div className="ap-prod-grid">
          {productosIniciales.length === 0 && (
            <p className="ap-empty">No hay cargado ningun producto.</p>
          )}
          {productosIniciales.map((producto) => (
            <UserProductoCard
              key={producto.id}
              producto={producto}
              onCambio={handleCambio}
            />
          ))}
        </div>
  


    </div>
  )
}
