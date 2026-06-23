"use client"

type ItemCarrito = {
  producto_id: number
  cantidad: number
}

async function comprar(items: ItemCarrito[]) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  })

  const data = await res.json()

  if (data.checkoutUrl) {
    window.location.href = data.checkoutUrl // ← redirige a Mercado Pago
  }
}

export default function Comprar({
  items,
}: {
  items: ItemCarrito[]
}) {
  return (
    <button onClick={() => comprar(items)}>
      Comprar
    </button>
  )
}