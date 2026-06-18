import pool from "@/lib/db"
import FormularioTarea from "../components/FormularioTarea"
import ModificarTarea from "../components/ModificarTarea"

export default async function Inicio() {
  const { rows: tareas } = await pool.query(
    "SELECT * FROM tareas ORDER BY creada_at DESC"
  )

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Mis Tareas</h1>

      <FormularioTarea />
      <ModificarTarea />
      <ul className="flex flex-col gap-3">
        {tareas.map((tarea) => (
          <li
            key={tarea.id}
            className="border p-4 rounded-lg flex justify-between"
          >
            <span>{tarea.titulo}</span>
            <span>{tarea.completada ? "✅" : "⏳"}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}