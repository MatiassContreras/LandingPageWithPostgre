"use client"
import { agregarAlCarrito } from "../../lib/carrito"
type Producto = {
  id: number
  nombre: string
  precio: string
  imagen_url: string | null
  stock: number
}

async function comprar(productoId: number) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items: [{ producto_id: productoId, cantidad: 1 }],
    }),
  })

  const data = await res.json()

  if (data.checkoutUrl) {
    window.location.href = data.checkoutUrl  // ← redirige a Mercado Pago
  }
}

export default function UserProductoCard({
  producto,
  onCambio,
}: {
  producto: Producto
  onCambio: () => void
}) {
  return (
    <div className="ap-card">
      <div className="ap-card-img">
        {producto.imagen_url ? (
          <img src={producto.imagen_url} alt={producto.nombre} />
        ) : (
          <span className="ap-card-noimg">Sin imagen</span>
        )}
      </div>
      <div className="ap-card-body">
        <h3 className="ap-card-nombre">{producto.nombre}</h3>
        <p className="ap-card-precio">${Number(producto.precio).toFixed(2)}</p>
        <p className="ap-card-stock">Stock: {producto.stock}</p>
        <button className="ap-btn-edit" onClick={async () => {
          await agregarAlCarrito(producto.id)
          onCambio()
        }}>
          Comprar
        </button>
      </div>
    </div>

  )


}

