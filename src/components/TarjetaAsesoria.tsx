import type { Modalidad } from "@prisma/client";
import { dias, nombreModalidad } from "@/lib/formato";

export interface BloqueDisponible {
  id: string;
  tutor: string;
  semestreTutor: number;
  materia: string;
  diaSemana: number;
  horaInicio: string;
  horaFin: string;
  modalidad: Modalidad;
  lugar: string | null;
}

export function TarjetaAsesoria({ bloque }: { bloque: BloqueDisponible }) {
  return (
    <article className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <span className="text-xs font-semibold uppercase text-marca-acento">{bloque.materia}</span>
      <h3 className="font-semibold">{bloque.tutor}</h3>
      <p className="text-sm text-slate-500">Tutor de {bloque.semestreTutor}.º semestre</p>
      <p className="text-sm">{dias[bloque.diaSemana]} · {bloque.horaInicio} - {bloque.horaFin}</p>
      <p className="text-sm text-slate-500">{nombreModalidad[bloque.modalidad]}, {bloque.lugar}</p>
      <button disabled title="Agendar estará disponible en el Sprint 4"
        className="mt-2 cursor-not-allowed rounded bg-marca px-3 py-2 text-sm font-medium text-white opacity-60">
        Agendar (próximamente)
      </button>
    </article>
  );
}
