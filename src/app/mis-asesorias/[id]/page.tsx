import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { obtenerSesion } from "@/lib/sesion";
import { formatearFecha, nombreEstado, nombreModalidad } from "@/lib/formato";
import { inicioAsesoria, puedeCancelar } from "@/lib/horarios";
import { CampoEnlace } from "./CampoEnlace";
import { aviso as estiloAviso, boton, colorEstado, etiqueta } from "@/components/estilos";
import { cancelarAsesoria, marcarCompletada } from "../actions";
import { avisos } from "../avisos";

export const dynamic = "force-dynamic";

// Detalle de una asesoría (HU-09, CC-005): datos y estado
export default async function DetalleAsesoria({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ aviso?: string }>;
}) {
  const sesion = await obtenerSesion();
  if (!sesion) redirect("/login");

  const [{ id }, { aviso }] = await Promise.all([params, searchParams]);
  // Solo el estudiante o el tutor de la asesoría pueden verla
  const a = await prisma.asesoria.findFirst({
    where: { id, OR: [{ estudianteId: sesion.user.id }, { tutorId: sesion.user.id }] },
    // RNF-07: de la otra persona solo se muestra el nombre
    include: { materia: true, tutor: { select: { nombre: true } }, estudiante: { select: { nombre: true } } },
  });
  if (!a) notFound();

  const esTutor = a.tutorId === sesion.user.id;
  const ahora = new Date();
  const yaEmpezo = inicioAsesoria(a.fecha, a.horaInicio) <= ahora;
  const activa = a.estado === "PENDIENTE" || a.estado === "CONFIRMADA";
  const mensaje = aviso ? avisos[aviso] : undefined;
  // CC-007: link de la videollamada en las asesorías virtuales confirmadas
  const llevaEnlace = a.modalidad === "VIRTUAL" && a.estado === "CONFIRMADA";

  const datos: [string, string][] = [
    [esTutor ? "Estudiante" : "Tutor", esTutor ? a.estudiante.nombre : a.tutor.nombre],
    ["Fecha", formatearFecha(a.fecha)],
    ["Horario", `${a.horaInicio} - ${a.horaFin}`],
    ["Lugar", `${nombreModalidad[a.modalidad]}, ${a.lugar ?? ""}`],
    ["Tema", a.tema],
  ];

  return (
    <section className="mx-auto flex max-w-lg flex-col gap-6">
      <Link href="/mis-asesorias" className="text-sm text-slate-500 underline">‹ Volver a Mis asesorías</Link>

      {mensaje && (
        <p role="status" className={mensaje.error ? estiloAviso.error : estiloAviso.exito}>{mensaje.texto}</p>
      )}

      <div className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-marca">{a.materia.nombre}</h1>
          <span className={`${etiqueta} ${colorEstado[a.estado]}`}>{nombreEstado[a.estado]}</span>
        </div>

        <dl className="grid grid-cols-3 gap-y-2 text-sm">
          {datos.map(([titulo, valor]) => (
            <div key={titulo} className="contents">
              <dt className="text-slate-500">{titulo}</dt>
              <dd className="col-span-2">{valor}</dd>
            </div>
          ))}
          {llevaEnlace && (
            <>
              <dt className={`text-slate-500 ${esTutor ? "self-center" : ""}`}>Link de la reunión</dt>
              <dd className="col-span-2 min-w-0">
                {esTutor ? (
                  <CampoEnlace key={a.enlaceReunion ?? ""} id={a.id} enlace={a.enlaceReunion} />
                ) : a.enlaceReunion ? (
                  <a href={a.enlaceReunion} target="_blank" rel="noopener noreferrer" className="break-all text-marca underline">
                    {a.enlaceReunion}
                  </a>
                ) : (
                  <span className="italic text-slate-500">El tutor no ha adjuntado ningún link.</span>
                )}
              </dd>
            </>
          )}
        </dl>

        {esTutor && a.estado === "CONFIRMADA" && yaEmpezo && (
          <form action={marcarCompletada}>
            <input type="hidden" name="id" value={a.id} />
            <input type="hidden" name="origen" value="detalle" />
            <button className={`${boton.exito} w-full`}>Marcar como completada</button>
          </form>
        )}

        {activa && puedeCancelar(a.fecha, a.horaInicio, ahora) && (
          <form action={cancelarAsesoria}>
            <input type="hidden" name="id" value={a.id} />
            <input type="hidden" name="origen" value="detalle" />
            <button className={`${boton.peligro} w-full`}>Cancelar asesoría</button>
          </form>
        )}
      </div>
    </section>
  );
}
