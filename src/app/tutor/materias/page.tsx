import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { obtenerSesion } from "@/lib/sesion";
import { guardarMaterias } from "./actions";

export const dynamic = "force-dynamic";

export default async function MisMaterias({ searchParams }: { searchParams: Promise<{ guardado?: string }> }) {
  const sesion = await obtenerSesion();
  if (!sesion || sesion.user.rol !== "TUTOR") redirect("/login");

  const [catalogo, actuales, { guardado }] = await Promise.all([
    prisma.materia.findMany({ orderBy: [{ semestre: "asc" }, { nombre: "asc" }] }),
    prisma.tutorMateria.findMany({ where: { tutorId: sesion.user.id }, include: { materia: true } }),
    searchParams,
  ]);
  const elegidas = new Set(actuales.map((a) => a.materiaId));

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-marca">Mis materias</h1>
        <p className="text-slate-500">Marca las materias que puedes asesorar. Los estudiantes te encontrarán al buscarlas.</p>
      </div>

      {guardado && (
        <p role="status" className="rounded border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-800">
          Cambios guardados.
        </p>
      )}

      <form action={guardarMaterias} className="flex flex-col gap-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {catalogo.map((m) => (
            <label key={m.id} className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 has-[:checked]:border-marca has-[:checked]:bg-marca-claro">
              <input type="checkbox" name="materias" value={m.id} defaultChecked={elegidas.has(m.id)} className="h-4 w-4" />
              <span className="flex flex-col">
                <span className="font-medium">{m.nombre}</span>
                <span className="text-xs text-slate-500">{m.clave} · {m.semestre}.º semestre</span>
              </span>
            </label>
          ))}
        </div>
        <button type="submit" className="self-start rounded bg-marca px-5 py-2 font-medium text-white">Guardar materias</button>
      </form>

      <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm">
        <p className="font-medium text-slate-700">Apareces en las búsquedas de:</p>
        <p className="mt-1 text-slate-500">
          {actuales.length > 0 ? actuales.map((a) => a.materia.nombre).join(", ") : "Ninguna materia todavía."}
        </p>
      </div>
    </section>
  );
}
