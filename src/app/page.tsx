import Link from "next/link";

export default function Inicio() {
  return (
    <section className="flex flex-col gap-6 py-10">
      <h1 className="text-3xl font-bold text-marca sm:text-4xl">
        Encuentra una asesoría para tu materia en minutos
      </h1>
      <p className="max-w-2xl text-slate-600">
        AsesoraT reúne en un solo lugar los horarios de los tutores de semestres avanzados.
        Busca por materia, elige un horario disponible y agenda tu asesoría.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/asesorias" className="rounded bg-marca px-4 py-2 font-medium text-white">
          Buscar asesorías
        </Link>
        <Link href="/login" className="rounded border border-marca px-4 py-2 font-medium text-marca">
          Quiero ser tutor
        </Link>
      </div>
    </section>
  );
}
