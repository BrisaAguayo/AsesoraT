import type { BloqueDisponible } from "@/lib/datos-ejemplo";

export function TarjetaAsesoria({ bloque }: { bloque: BloqueDisponible }) {
  return (
    <article className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <span className="text-xs font-semibold uppercase text-marca-acento">{bloque.materia}</span>
      <h3 className="font-semibold">{bloque.tutor}</h3>
      <p className="text-sm text-slate-500">Tutor de {bloque.semestreTutor}.º semestre</p>
      <p className="text-sm">{bloque.dia} · {bloque.horario}</p>
      <p className="text-sm text-slate-500">{bloque.modalidad}, {bloque.lugar}</p>
      <button className="mt-2 rounded bg-marca px-3 py-2 text-sm font-medium text-white hover:opacity-90">
        Agendar
      </button>
    </article>
  );
}
