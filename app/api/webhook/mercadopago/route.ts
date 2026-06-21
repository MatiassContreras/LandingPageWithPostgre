// app/api/webhook/mercadopago/route.ts
import pool from "@/lib/db"
import { MercadoPagoConfig, Payment } from "mercadopago"

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! })
const paymentClient = new Payment(client)

export async function GET() {
  return Response.json({ ok: true })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (body.type === "payment") {
      const paymentId = body.data.id
      const payment = await paymentClient.get({ id: paymentId })

      const pedidoId = payment.external_reference
      const estado = payment.status === "approved" ? "pagado" : "rechazado"

      await pool.query(
        "UPDATE pedidos SET estado = $1, mp_payment_id = $2 WHERE id = $3",
        [estado, paymentId, pedidoId]
      )

      console.log(`Pedido ${pedidoId} actualizado a estado: ${estado}`)
    }

    return Response.json({ ok: true })
  } catch (err: any) {
    console.error("Error en webhook:", err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}