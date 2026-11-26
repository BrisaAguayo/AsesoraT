import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { obtenerSesion } from "@/lib/sesion";
import { formatearFecha, nombreModalidad } from "@/lib/formato";
import { responderSolicitud } from "./actions";
import { boton, aviso, enGrupo, grupoBotones } from "@/components/estilos";

export const dynamic = "force-dynamic";

// HU-06: el tutor ve sus solicitudes pendientes y las confirma o rechaza
export default async function Solicitudes({ searchParams }: { searchParams: Promise<{ respuesta?: string }> }) {
  const sesion = await obtenerSesion();
  if (!sesion) redirect("/login");
  // Con sesión pero de otro rol: al panel con aviso
  if (sesion.user.rol !== "TUTOR") redirect("/panel?aviso=sin-acceso");

  const [pendientes, { respuesta }] = await Promise.all([
    prisma.asesoria.findMany({
      where: { tutorId: sesion.user.id, estado: "PENDIENTE" },
      orderBy: [{ fecha: "asc" }, { horaInicio: "asc" }],
      // RNF-07: del estudiante solo se muestra el nombre
      include: { materia: true, estudiante: { select: { nombre: true, semestre: true } } },
    }),
    searchParams,
  ]);

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-marca">Solicitudes</h1>
        <p className="text-slate-500">Confirma o rechaza las asesorías que te pidieron. El estudiante verá el nuevo estado.</p>
      </div>

      {respuesta && (
        <p role="status" className={aviso.exito}>
          Solicitud {respuesta === "confirmada" ? "confirmada" : "rechazada"}.
        </p>
      )}

      {pendientes.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center text-slate-500">
          No tienes solicitudes pendientes.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {pendientes.map((a) => (
            <li key={a.id} className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm">
                <p className="text-base font-semibold">{a.materia.nombre}</p>
                <p className="text-slate-500">{a.estudiante.nombre} · {a.estudiante.semestre}.º semestre</p>
                <p>{formatearFecha(a.fecha)} · {a.horaInicio} - {a.horaFin} · {nombreModalidad[a.modalidad]}, {a.lugar}</p>
                <p className="text-slate-500">Tema: {a.tema}</p>
              </div>
              {/* Un formulario por botón: la decisión viaja en un campo oculto */}
              <div className={`${grupoBotones} sm:w-64`}>
                <form action={responderSolicitud}>
                  <input type="hidden" name="id" value={a.id} />
                  <input type="hidden" name="decision" value="confirmar" />
                  <button className={`${boton.exito} ${enGrupo}`}>Confirmar</button>
                </form>
                <form action={responderSolicitud}>
                  <input type="hidden" name="id" value={a.id} />
                  <input type="hidden" name="decision" value="rechazar" />
                  <button className={`${boton.peligro} ${enGrupo}`}>Rechazar</button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
