import Link from "next/link";
import { boton, enGrupo, grupoBotones } from "@/components/estilos";

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
      <div className={`${grupoBotones} w-full sm:w-96`}>
        <Link href="/asesorias" className={`${boton.primario} ${enGrupo}`}>
          Buscar asesorías
        </Link>
        <Link href="/registro" className={`${boton.exito} ${enGrupo}`}>
          Crear cuenta
        </Link>
      </div>
    </section>
  );
}
