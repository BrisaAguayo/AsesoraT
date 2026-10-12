import { TarjetaAsesoria } from "@/components/TarjetaAsesoria";
import { bloquesDisponibles, materias } from "@/lib/datos-ejemplo";

export default function BuscarAsesorias() {
  return (
    <section className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-marca">Buscar asesorías</h1>
        <p className="text-slate-500">Filtra por materia y elige un horario disponible.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <select className="rounded border border-slate-300 bg-white px-3 py-2 text-sm">
          <option>Todas las materias</option>
          {materias.map((m) => <option key={m}>{m}</option>)}
        </select>
        <select className="rounded border border-slate-300 bg-white px-3 py-2 text-sm">
          <option>Cualquier modalidad</option>
          <option>Presencial</option>
          <option>Virtual</option>
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {bloquesDisponibles.map((b) => <TarjetaAsesoria key={b.id} bloque={b} />)}
      </div>
    </section>
  );
}
