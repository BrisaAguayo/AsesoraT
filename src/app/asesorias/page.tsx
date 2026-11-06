import type { Modalidad, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { dias } from "@/lib/formato";
import { TarjetaAsesoria, type BloqueDisponible } from "@/components/TarjetaAsesoria";

export const dynamic = "force-dynamic";

type Filtros = { materia?: string; modalidad?: string; dia?: string };

export default async function BuscarAsesorias({ searchParams }: { searchParams: Promise<Filtros> }) {
  const filtros = await searchParams;
  const modalidad = filtros.modalidad === "PRESENCIAL" || filtros.modalidad === "VIRTUAL" ? (filtros.modalidad as Modalidad) : undefined;
  const dia = Number(filtros.dia) || undefined;

  const where: Prisma.DisponibilidadWhereInput = {
    modalidad,
    diaSemana: dia,
    tutor: { rol: "TUTOR", materiasQueImparte: filtros.materia ? { some: { materiaId: filtros.materia } } : { some: {} } },
  };

  const [materias, disponibilidad] = await Promise.all([
    prisma.materia.findMany({ orderBy: { nombre: "asc" } }),
    prisma.disponibilidad.findMany({
      where,
      orderBy: [{ diaSemana: "asc" }, { horaInicio: "asc" }],
      // RNF-07: solo se consultan nombre, semestre y materias del tutor
      include: { tutor: { select: { nombre: true, semestre: true, materiasQueImparte: { include: { materia: true } } } } },
    }),
  ]);

  // Una tarjeta por cada materia que el tutor asesora en ese horario
  const bloques: BloqueDisponible[] = disponibilidad.flatMap((d) =>
    d.tutor.materiasQueImparte
      .filter((tm) => !filtros.materia || tm.materiaId === filtros.materia)
      .map((tm) => ({
        id: `${d.id}-${tm.materiaId}`,
        tutor: d.tutor.nombre,
        semestreTutor: d.tutor.semestre,
        materia: tm.materia.nombre,
        diaSemana: d.diaSemana,
        horaInicio: d.horaInicio,
        horaFin: d.horaFin,
        modalidad: d.modalidad,
        lugar: d.lugar,
      })),
  );

  const estiloFiltro = "rounded border border-slate-300 bg-white px-3 py-2 text-sm";

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-marca">Buscar asesorías</h1>
        <p className="text-slate-500">Filtra por materia, día y modalidad, y elige un horario disponible.</p>
      </div>
      <form className="flex flex-wrap gap-3">
        <select name="materia" defaultValue={filtros.materia ?? ""} className={estiloFiltro}>
          <option value="">Todas las materias</option>
          {materias.map((m) => <option key={m.id} value={m.id}>{m.nombre}</option>)}
        </select>
        <select name="dia" defaultValue={filtros.dia ?? ""} className={estiloFiltro}>
          <option value="">Cualquier día</option>
          {[1, 2, 3, 4, 5].map((d) => <option key={d} value={d}>{dias[d]}</option>)}
        </select>
        <select name="modalidad" defaultValue={filtros.modalidad ?? ""} className={estiloFiltro}>
          <option value="">Cualquier modalidad</option>
          <option value="PRESENCIAL">Presencial</option>
          <option value="VIRTUAL">Virtual</option>
        </select>
        <button className="rounded bg-marca px-4 py-2 text-sm font-medium text-white">Buscar</button>
      </form>

      <p className="text-sm text-slate-500">{bloques.length} horario{bloques.length === 1 ? "" : "s"} disponible{bloques.length === 1 ? "" : "s"}</p>

      {bloques.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center text-slate-500">
          No hay horarios con esos filtros. Prueba con otra materia o día.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bloques.map((b) => <TarjetaAsesoria key={b.id} bloque={b} />)}
        </div>
      )}
    </section>
  );
}
