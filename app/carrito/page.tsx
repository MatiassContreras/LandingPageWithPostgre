import { cookies } from "next/headers"

export default async function CarritoPage() {
  const cookieStore = await cookies()
  const actual = cookieStore.get("carrito")?.value
  const carrito = actual ? JSON.parse(actual) : []

  return (
    <div>
      {carrito.map((item: any) => (
        <p key={item.producto_id}>Producto {item.producto_id} x{item.cantidad}</p>
      ))}
    </div>
  )
}