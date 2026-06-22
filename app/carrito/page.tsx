import pool from "@/lib/db"
import { cookies } from "next/headers"

export default async function CarritoPage() {
  const cookieStore = await cookies()
  const actual = cookieStore.get("carrito")?.value
  const carrito = actual ? JSON.parse(actual) : []

  if (carrito.length === 0) {
    return <p className="ap-cart-empty">Tu carrito está vacío</p>
  }

  const ids = carrito.map((item: any) => item.producto_id)

  const { rows: productos } = await pool.query(
    "SELECT * FROM productos WHERE id = ANY($1)",
    [ids]
  )

  return (
    <ul className="ap-cart-list">
      {carrito.map((item: any) => {
        const producto = productos.find((p) => p.id === item.producto_id)
        if (!producto) return null

        return (
          <li key={item.producto_id} className="ap-cart-item">
            <div className="ap-cart-img">
              {producto.imagen_url ? (
                <img src={producto.imagen_url} alt={producto.nombre} />
              ) : (
                <span className="ap-card-noimg">Sin imagen</span>
              )}
            </div>

            <div className="ap-cart-info">
              <h3 className="ap-cart-nombre">{producto.nombre}</h3>
              <p className="ap-cart-precio">
                ${Number(producto.precio).toFixed(2)}
              </p>
            </div>

            <span className="ap-cart-cantidad">x{item.cantidad}</span>
          </li>
        )
      })}
    </ul>
  )
}