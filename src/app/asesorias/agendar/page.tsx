import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { obtenerSesion } from "@/lib/sesion";
import { dias, formatearFecha, nombreModalidad } from "@/lib/formato";
import { fechaISO, proximasFechas, seEmpalman } from "@/lib/horarios";
import { FormAgendar } from "./FormAgendar";

export const dynamic = "force-dynamic";

const SEMANAS_A_MOSTRAR = 4;

// HU-05, paso 2: el estudiante elige la fecha y escribe el tema
export default async function Agendar({ searchParams }: { searchParams: Promise<{ bloque?: string; materia?: string }> }) {
  const sesion = await obtenerSesion();
  if (!sesion) redirect("/login");
  // Con sesión pero de otro rol: al panel con aviso
  if (sesion.user.rol !== "ESTUDIANTE") redirect("/panel?aviso=sin-acceso");

  const { bloque: bloqueId = "", materia: materiaId = "" } = await searchParams;
  const [bloque, materia] = await Promise.all([
    prisma.disponibilidad.findUnique({
      where: { id: bloqueId },
      // RNF-07: solo nombre, semestre y materias del tutor
      include: { tutor: { select: { nombre: true, semestre: true, materiasQueImparte: { select: { materiaId: true } } } } },
    }),
    prisma.materia.findUnique({ where: { id: materiaId } }),
  ]);

  if (!bloque || !materia || !bloque.tutor.materiasQueImparte.some((m) => m.materiaId === materia.id)) {
    return (
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-marca">Agendar asesoría</h1>
        <p className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center text-slate-500">
          Ese horario ya no está disponible. <Link href="/asesorias" className="font-medium text-marca underline">Buscar otro</Link>
        </p>
      </section>
    );
  }

  // Fechas de las próximas semanas sin las que ya están ocupadas (las canceladas no ocupan)
  const candidatas = proximasFechas(bloque.diaSemana, bloque.horaInicio, SEMANAS_A_MOSTRAR);
  const ocupadas = await prisma.asesoria.findMany({
    where: { tutorId: bloque.tutorId, fecha: { in: candidatas }, estado: { not: "CANCELADA" } },
    select: { fecha: true, horaInicio: true, horaFin: true },
  });
  const libres = candidatas.filter(
    (f) => !ocupadas.some((o) => fechaISO(o.fecha) === fechaISO(f) &&
      seEmpalman({ diaSemana: 0, horaInicio: o.horaInicio, horaFin: o.horaFin }, { diaSemana: 0, horaInicio: bloque.horaInicio, horaFin: bloque.horaFin })),
  );

  const resumen = {
    materia: materia.nombre,
    tutor: bloque.tutor.nombre,
    horario: `${dias[bloque.diaSemana]} · ${bloque.horaInicio} - ${bloque.horaFin}`,
    lugar: `${nombreModalidad[bloque.modalidad]}, ${bloque.lugar ?? ""}`,
  };

  return (
    <section className="mx-auto flex max-w-lg flex-col gap-6">
      <div>
        <Link href="/asesorias" className="text-sm text-slate-500 underline">Volver a la búsqueda</Link>
        <h1 className="mt-2 text-2xl font-bold text-marca">Agendar asesoría</h1>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm">
        <p className="text-xs font-semibold uppercase text-marca-acento">{resumen.materia}</p>
        <p className="mt-1 font-semibold">{resumen.tutor}</p>
        <p className="text-slate-500">Tutor de {bloque.tutor.semestre}.º semestre</p>
        <p className="mt-2">{resumen.horario}</p>
        <p className="text-slate-500">{resumen.lugar}</p>
      </div>

      {libres.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center text-slate-500">
          Este horario está ocupado las próximas {SEMANAS_A_MOSTRAR} semanas. <Link href="/asesorias" className="font-medium text-marca underline">Buscar otro</Link>
        </p>
      ) : (
        <FormAgendar
          bloqueId={bloque.id}
          materiaId={materia.id}
          resumen={resumen}
          fechas={libres.map((f) => ({ valor: fechaISO(f), texto: formatearFecha(f) }))}
        />
      )}
    </section>
  );
}
