import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { obtenerSesion } from "@/lib/sesion";
import { formatearFecha, nombreEstado } from "@/lib/formato";

export const dynamic = "force-dynamic";

const colorEstado: Record<string, string> = {
  CONFIRMADA: "bg-emerald-100 text-emerald-800",
  PENDIENTE: "bg-amber-100 text-amber-800",
  COMPLETADA: "bg-slate-200 text-slate-700",
  CANCELADA: "bg-red-100 text-red-800",
};

export default async function MisAsesorias() {
  const sesion = await obtenerSesion();
  if (!sesion) redirect("/login");

  const esTutor = sesion.user.rol === "TUTOR";
  const asesorias = await prisma.asesoria.findMany({
    where: esTutor ? { tutorId: sesion.user.id } : { estudianteId: sesion.user.id },
    orderBy: { fecha: "desc" },
    include: { materia: true, tutor: { select: { nombre: true } }, estudiante: { select: { nombre: true } } },
  });

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-marca">Mis asesorías</h1>
      {asesorias.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center text-slate-500">
          <p>Todavía no tienes asesorías.</p>
          {!esTutor && <Link href="/asesorias" className="mt-2 inline-block font-medium text-marca underline">Buscar asesorías</Link>}
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {asesorias.map((a) => (
            <li key={a.id} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4">
              <div>
                <p className="font-semibold">{a.materia.nombre}</p>
                <p className="text-sm text-slate-500">
                  {esTutor ? a.estudiante.nombre : a.tutor.nombre} · {formatearFecha(a.fecha)} · {a.horaInicio} - {a.horaFin}
                </p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${colorEstado[a.estado]}`}>{nombreEstado[a.estado]}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
