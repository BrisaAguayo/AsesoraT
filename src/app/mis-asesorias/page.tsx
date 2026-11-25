import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { obtenerSesion } from "@/lib/sesion";
import { formatearFecha, nombreEstado, nombreModalidad } from "@/lib/formato";
import { HORAS_MINIMAS_CANCELAR, puedeCancelar } from "@/lib/horarios";
import { cancelarAsesoria } from "./actions";

export const dynamic = "force-dynamic";

const colorEstado: Record<string, string> = {
  CONFIRMADA: "bg-emerald-100 text-emerald-800",
  PENDIENTE: "bg-amber-100 text-amber-800",
  COMPLETADA: "bg-slate-200 text-slate-700",
  CANCELADA: "bg-red-100 text-red-800",
};

const avisos: Record<string, { texto: string; error?: boolean }> = {
  cancelada: { texto: "Asesoría cancelada. El horario quedó libre." },
  tarde: { texto: `Ya no se puede cancelar: solo se permite hasta ${HORAS_MINIMAS_CANCELAR} horas antes.`, error: true },
  "no-cancelable": { texto: "Esa asesoría ya no se puede cancelar.", error: true },
};

export default async function MisAsesorias({ searchParams }: { searchParams: Promise<{ aviso?: string }> }) {
  const sesion = await obtenerSesion();
  if (!sesion) redirect("/login");

  const esTutor = sesion.user.rol === "TUTOR";
  const [asesorias, { aviso }] = await Promise.all([
    prisma.asesoria.findMany({
      where: esTutor ? { tutorId: sesion.user.id } : { estudianteId: sesion.user.id },
      orderBy: { fecha: "desc" },
      include: { materia: true, tutor: { select: { nombre: true } }, estudiante: { select: { nombre: true } } },
    }),
    searchParams,
  ]);
  const mensaje = aviso ? avisos[aviso] : undefined;

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-marca">Mis asesorías</h1>

      {mensaje && (
        <p role="status" className={`rounded border px-4 py-2 text-sm ${mensaje.error ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}>
          {mensaje.texto}
        </p>
      )}

      {asesorias.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center text-slate-500">
          <p>Todavía no tienes asesorías.</p>
          {!esTutor && <Link href="/asesorias" className="mt-2 inline-block font-medium text-marca underline">Buscar asesorías</Link>}
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {asesorias.map((a) => {
            const activa = a.estado === "PENDIENTE" || a.estado === "CONFIRMADA";
            return (
              <li key={a.id} className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm">
                  <p className="text-base font-semibold">{a.materia.nombre}</p>
                  <p className="text-slate-500">
                    {esTutor ? a.estudiante.nombre : a.tutor.nombre} · {formatearFecha(a.fecha)} · {a.horaInicio} - {a.horaFin}
                  </p>
                  <p className="text-slate-500">{nombreModalidad[a.modalidad]}, {a.lugar} · Tema: {a.tema}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${colorEstado[a.estado]}`}>{nombreEstado[a.estado]}</span>
                  {activa && puedeCancelar(a.fecha, a.horaInicio) && (
                    <form action={cancelarAsesoria}>
                      <input type="hidden" name="id" value={a.id} />
                      <button className="text-sm font-medium text-red-700 underline">Cancelar</button>
                    </form>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
