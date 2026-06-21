"use server"
import { cookies } from "next/headers"

export async function agregarAlCarrito(productoId: number) {
  const cookieStore = await cookies()
  const actual = cookieStore.get("carrito")?.value
  const carrito = actual ? JSON.parse(actual) : []

  const existente = carrito.find((i: any) => i.producto_id === productoId)
  if (existente) {
    existente.cantidad += 1
  } else {
    carrito.push({ producto_id: productoId, cantidad: 1 })
  }

  cookieStore.set("carrito", JSON.stringify(carrito), {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 días
  })
}