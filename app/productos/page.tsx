import pool from "@/lib/db"
import ProductoCard from "../components/ProductCard"
import ProductosUsuario from "../components/ProductosUsuario"
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface"


export const metadata: Metadata = {
  title: "Productos - Zaragoza II",
  description: "Panel de administración",
}


export default async function Inicio() {
  const tab = "productos"
const { rows: productos } = await pool.query(
    "SELECT * FROM productos ORDER BY creado_at DESC"
  )
  return (
    <>
       {tab === "productos" && <ProductosUsuario productosIniciales={productos} />}
    </>
  )
}