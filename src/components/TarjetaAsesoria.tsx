import Link from "next/link";
import type { Modalidad } from "@prisma/client";
import { dias, nombreModalidad } from "@/lib/formato";
import { boton } from "@/components/estilos";

export interface BloqueDisponible {
  id: string;
  disponibilidadId: string;
  materiaId: string;
  tutor: string;
  semestreTutor: number;
  materia: string;
  diaSemana: number;
  horaInicio: string;
  horaFin: string;
  modalidad: Modalidad;
  lugar: string | null;
}

export function TarjetaAsesoria({ bloque, puedeAgendar }: { bloque: BloqueDisponible; puedeAgendar: boolean }) {
  return (
    <article className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <span className="text-xs font-semibold uppercase text-marca-acento">{bloque.materia}</span>
      <h3 className="font-semibold">{bloque.tutor}</h3>
      <p className="text-sm text-slate-500">Tutor de {bloque.semestreTutor}.º semestre</p>
      <p className="text-sm">{dias[bloque.diaSemana]} · {bloque.horaInicio} - {bloque.horaFin}</p>
      <p className="text-sm text-slate-500">{nombreModalidad[bloque.modalidad]}, {bloque.lugar}</p>
      {/* HU-05, paso 1: el estudiante elige el horario */}
      {puedeAgendar ? (
        <Link href={`/asesorias/agendar?bloque=${bloque.disponibilidadId}&materia=${bloque.materiaId}`}
          className={`mt-2 ${boton.primario}`}>
          Agendar
        </Link>
      ) : (
        <p className="mt-2 text-xs text-slate-400">Solo los estudiantes pueden agendar.</p>
      )}
    </article>
  );
}
