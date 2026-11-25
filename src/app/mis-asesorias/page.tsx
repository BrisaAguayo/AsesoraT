import Link from "next/link";
import { redirect } from "next/navigation";
import type { Asesoria, Materia } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { obtenerSesion } from "@/lib/sesion";
import { formatearFecha, nombreEstado, nombreModalidad, nombreResultado } from "@/lib/formato";
import { inicioAsesoria, puedeCancelar } from "@/lib/horarios";
import { aviso as estiloAviso, boton, colorEstado, colorResultado, etiqueta } from "@/components/estilos";
import { cancelarAsesoria } from "./actions";
import { avisos } from "./avisos";

export const dynamic = "force-dynamic";

type Fila = Asesoria & { materia: Materia; tutor: { nombre: string }; estudiante: { nombre: string } };

// HU-09: historial de asesorías ordenado por fecha, con el estado de cada una
export default async function MisAsesorias({ searchParams }: { searchParams: Promise<{ aviso?: string }> }) {
  const sesion = await obtenerSesion();
  if (!sesion) redirect("/login");

  const esTutor = sesion.user.rol === "TUTOR";
  const [asesorias, { aviso }] = await Promise.all([
    prisma.asesoria.findMany({
      where: esTutor ? { tutorId: sesion.user.id } : { estudianteId: sesion.user.id },
      orderBy: [{ fecha: "desc" }, { horaInicio: "desc" }],
      include: { materia: true, tutor: { select: { nombre: true } }, estudiante: { select: { nombre: true } } },
    }),
    searchParams,
  ]);
  const mensaje = aviso ? avisos[aviso] : undefined;

  const ahora = new Date();
  const yaEmpezo = (a: Fila) => inicioAsesoria(a.fecha, a.horaInicio) <= ahora;
  const activa = (a: Fila) => a.estado === "PENDIENTE" || a.estado === "CONFIRMADA";
  // Próximas: de la más cercana a la más lejana. Historial: de la más reciente a la más antigua.
  const proximas = asesorias.filter((a) => activa(a) && !yaEmpezo(a)).reverse();
  const historial = asesorias.filter((a) => !activa(a) || yaEmpezo(a));

  function Tarjeta({ a }: { a: Fila }) {
    return (
      <li className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 hover:border-marca sm:flex-row sm:items-center sm:justify-between">
        <Link href={`/mis-asesorias/${a.id}`} className="text-sm">
          <p className="text-base font-semibold">{a.materia.nombre}</p>
          <p className="text-slate-500">
            {esTutor ? a.estudiante.nombre : a.tutor.nombre} · {formatearFecha(a.fecha)} · {a.horaInicio} - {a.horaFin}
          </p>
          <p className="text-slate-500">{nombreModalidad[a.modalidad]}, {a.lugar} · Tema: {a.tema}</p>
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <span className={`${etiqueta} ${colorEstado[a.estado]}`}>{nombreEstado[a.estado]}</span>
          {a.resultado && <span className={`${etiqueta} ${colorResultado[a.resultado]}`}>{nombreResultado[a.resultado]}</span>}
          {activa(a) && puedeCancelar(a.fecha, a.horaInicio, ahora) && (
            <form action={cancelarAsesoria}>
              <input type="hidden" name="id" value={a.id} />
              <button className={boton.peligro}>Cancelar</button>
            </form>
          )}
          <Link href={`/mis-asesorias/${a.id}`} className="text-sm font-medium text-marca">Ver detalle ›</Link>
        </div>
      </li>
    );
  }

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-marca">Mis asesorías</h1>

      {mensaje && (
        <p role="status" className={mensaje.error ? estiloAviso.error : estiloAviso.exito}>
          {mensaje.texto}
        </p>
      )}

      {asesorias.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center text-slate-500">
          <p>Todavía no tienes asesorías.</p>
          {!esTutor && <Link href="/asesorias" className="mt-2 inline-block font-medium text-marca underline">Buscar asesorías</Link>}
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-slate-700">Próximas ({proximas.length})</h2>
            {proximas.length === 0 ? (
              <p className="text-sm text-slate-500">No tienes asesorías próximas.</p>
            ) : (
              <ul className="flex flex-col gap-3">{proximas.map((a) => <Tarjeta key={a.id} a={a} />)}</ul>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-slate-700">Historial ({historial.length})</h2>
            {historial.length === 0 ? (
              <p className="text-sm text-slate-500">Todavía no hay asesorías pasadas.</p>
            ) : (
              <ul className="flex flex-col gap-3">{historial.map((a) => <Tarjeta key={a.id} a={a} />)}</ul>
            )}
          </div>
        </>
      )}
    </section>
  );
}
