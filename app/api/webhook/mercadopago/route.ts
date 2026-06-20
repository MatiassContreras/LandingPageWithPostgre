// app/api/webhook/mercadopago/route.ts
import pool from "@/lib/db"
import { MercadoPagoConfig, Payment } from "mercadopago"

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! })
const paymentClient = new Payment(client)

export async function GET() {
  return Response.json({ ok: true })
}

export async function POST(request: Request) {
  let body: any

  try {
    body = await request.json()
  } catch (err) {
    console.error("Webhook: body inválido", err)
    return Response.json({ ok: true }) // respondemos 200 igual para que MP no reintente algo que nunca va a poder leer
  }

  // Respondemos 200 ya mismo. El procesamiento real sigue después, sin bloquear la respuesta a Mercado Pago.
  procesarNotificacion(body).catch((err) => {
    console.error("Error procesando notificación de MP:", err)
  })

  return Response.json({ ok: true })
}

async function procesarNotificacion(body: any) {
  if (body?.type !== "payment") return

  const paymentId = body.data?.id
  if (!paymentId) return

  // Reintentamos un par de veces por si MP todavía no propagó el pago internamente
  let payment
  for (let intento = 1; intento <= 3; intento++) {
    try {
      payment = await paymentClient.get({ id: paymentId })
      break
    } catch (err: any) {
      console.error(`Intento ${intento} fallo buscando pago ${paymentId}:`, err.message)
      if (intento === 3) return
      await new Promise((r) => setTimeout(r, 1000 * intento)) // backoff simple
    }
  }

  if (!payment) return

  const pedidoId = payment.external_reference
  const estado = payment.status === "approved" ? "pagado" : "rechazado"

  await pool.query(
    "UPDATE pedidos SET estado = $1, mp_payment_id = $2 WHERE id = $3",
    [estado, paymentId, pedidoId]
  )

  console.log(`Pedido ${pedidoId} actualizado a estado: ${estado}`)
}