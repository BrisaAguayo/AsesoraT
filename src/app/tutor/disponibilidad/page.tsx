import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { obtenerSesion } from "@/lib/sesion";
import { dias, nombreModalidad } from "@/lib/formato";
import { eliminarBloque } from "./actions";
import { FormBloque } from "./FormBloque";
import { boton, aviso, enGrupo, grupoBotones } from "@/components/estilos";

export const dynamic = "force-dynamic";

// HU-03: el tutor registra, edita y borra sus horarios semanales
export default async function MiDisponibilidad({ searchParams }: { searchParams: Promise<{ guardado?: string; editar?: string }> }) {
  const sesion = await obtenerSesion();
  if (!sesion || sesion.user.rol !== "TUTOR") redirect("/login");

  const [bloques, { guardado, editar }] = await Promise.all([
    prisma.disponibilidad.findMany({ where: { tutorId: sesion.user.id }, orderBy: [{ diaSemana: "asc" }, { horaInicio: "asc" }] }),
    searchParams,
  ]);
  const enEdicion = bloques.find((b) => b.id === editar);

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-marca">Mi disponibilidad</h1>
        <p className="text-slate-500">Registra los horarios semanales en los que puedes dar asesoría. Los estudiantes reservarán en estos bloques.</p>
      </div>

      {guardado && (
        <p role="status" className={aviso.exito}>
          Cambios guardados.
        </p>
      )}

      <FormBloque valores={enEdicion ? { ...enEdicion, lugar: enEdicion.lugar ?? "" } : undefined} />

      {bloques.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center text-slate-500">
          Todavía no registras horarios.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {bloques.map((b) => (
            <li key={b.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4">
              <div>
                <p className="font-semibold">{dias[b.diaSemana]} · {b.horaInicio} - {b.horaFin}</p>
                <p className="text-sm text-slate-500">{nombreModalidad[b.modalidad]}, {b.lugar}</p>
              </div>
              <div className={`${grupoBotones} w-full sm:w-56`}>
                <Link href={`/tutor/disponibilidad?editar=${b.id}`} className={`${boton.primario} ${enGrupo}`}>Editar</Link>
                <form action={eliminarBloque}>
                  <input type="hidden" name="id" value={b.id} />
                  <button type="submit" className={`${boton.peligro} ${enGrupo}`}>Borrar</button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
