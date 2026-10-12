import { misAsesorias } from "@/lib/datos-ejemplo";

const colorEstado: Record<string, string> = {
  Confirmada: "bg-emerald-100 text-emerald-800",
  Pendiente: "bg-amber-100 text-amber-800",
  Completada: "bg-slate-200 text-slate-700",
};

export default function MisAsesorias() {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-marca">Mis asesorías</h1>
      <ul className="flex flex-col gap-3">
        {misAsesorias.map((a) => (
          <li key={a.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4">
            <div>
              <p className="font-semibold">{a.materia}</p>
              <p className="text-sm text-slate-500">{a.tutor} · {a.fecha} · {a.horario}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${colorEstado[a.estado]}`}>{a.estado}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
