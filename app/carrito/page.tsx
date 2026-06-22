import pool from "@/lib/db"

import { cookies } from "next/headers"
import ProductosUsuario from "../components/ProductosUsuario"
export default async function CarritoPage() {
  const cookieStore = await cookies()
  const actual = cookieStore.get("carrito")?.value
  const carrito = actual ? JSON.parse(actual) : []



  if (carrito.length === 0) {
    return <p>Tu carrito está vacío</p>
  }

  const ids = carrito.map((item: any) => item.producto_id)

  const { rows: productos } = await pool.query(
    "SELECT * FROM productos WHERE id = ANY($1)",
    [ids]
  )

  return (
    <div>
      <ul>
        {carrito.map((item: any) => {
          const producto = productos.find((p) => p.id === item.producto_id)
          if (!producto) return null // por si el producto fue eliminado

          return (
            <li key={item.producto_id} className="width-100" >
              {producto.imagen_url ? (
                <img src={producto.imagen_url} alt={producto.nombre} />
              ) : (
                <span className="ap-card-noimg">Sin imagen</span>
              )}
              <h3>{producto.nombre}</h3>
              <p>${Number(producto.precio).toFixed(2)} x {item.cantidad}</p>            
              <h3> Cantidad: {item.cantidad}</h3>
              </li>
                   
        )

        }
        )}
      </ul>
    </div>
  )
}