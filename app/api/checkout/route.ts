// app/api/checkout/route.ts
import pool from "@/lib/db"
import { preferenceClient } from "@/lib/mercadopago"
import { getSesion } from "@/lib/session"

export async function POST(request: Request) {
  const sesion = await getSesion()
  if (!sesion) {
    return Response.json({ error: "Tenés que iniciar sesión" }, { status: 401 })
  }

  const { items } = await request.json()
  // items = [{ producto_id: 1, cantidad: 2 }, { producto_id: 3, cantidad: 1 }]

  // 1. Traemos los productos reales de la BD (nunca confiar en precios del frontend)
  const ids = items.map((i: any) => i.producto_id)
  const { rows: productos } = await pool.query(
    "SELECT * FROM productos WHERE id = ANY($1)",
    [ids]
  )

  // 2. Armamos el total y los items para Mercado Pago
  let total = 0
  const mpItems = items.map((item: any) => {
    const producto = productos.find((p) => p.id === item.producto_id)
    total += Number(producto.precio) * item.cantidad
    return {
      id: String(producto.id),
      title: producto.nombre,
      quantity: item.cantidad,
      unit_price: Number(producto.precio),
      currency_id: "ARS",
    }
  })

  // 3. Creamos el pedido en nuestra BD, estado "pendiente"
  const { rows: pedidoRows } = await pool.query(
    "INSERT INTO pedidos (usuario_id, total, estado) VALUES ($1, $2, 'pendiente') RETURNING *",
    [sesion.id, total]
  )
  const pedido = pedidoRows[0]

  for (const item of items) {
    const producto = productos.find((p) => p.id === item.producto_id)
    await pool.query(
      "INSERT INTO pedido_items (pedido_id, producto_id, cantidad, precio_unitario) VALUES ($1, $2, $3, $4)",
      [pedido.id, producto.id, item.cantidad, producto.precio]
    )
  }

  // 4. Creamos la preferencia en Mercado Pago
  const preference = await preferenceClient.create({
    body: {
      items: mpItems,
      external_reference: String(pedido.id), // así sabemos a qué pedido corresponde el pago
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/exito`,
        failure: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/error`,
        pending: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/pendiente`,
      },
      auto_return: "approved",
      //notification_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhook/mercadopago`,
    },
  })

  return Response.json({ checkoutUrl: preference.init_point })
}