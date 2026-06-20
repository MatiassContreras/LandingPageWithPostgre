import { getSesion } from "@/lib/session"
import { redirect } from "next/navigation"
import { Metadata } from "next"
import pool from "@/lib/db"
import AdminPanel from "../components/AdminPanel"


export const metadata: Metadata = {
  title: "Administrar - Zaragoza II",
  description: "Panel de administración",
}

export default async function Admin() {
  const sesion = await getSesion()

  if (!sesion?.admin) {
    redirect("/")
  }

  const { rows: productos } = await pool.query(
    "SELECT * FROM productos ORDER BY creado_at DESC"
  )

  return (
    <div className="ap-page">
      <h1 className="ap-title">Panel de administración</h1>
      <p className="ap-saludo">Bienvenido, {sesion.username}.</p>

      <AdminPanel productos={productos} />
    </div>
  )
}
