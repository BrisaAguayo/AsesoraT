import Link from "next/link";
import { boton, enGrupo, grupoBotones } from "@/components/estilos";
import { obtenerSesion } from "@/lib/sesion";

export const dynamic = "force-dynamic";

export default async function Inicio() {
  const sesion = await obtenerSesion();

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
        {/* Con sesión iniciada, el botón lleva al panel en lugar de crear cuenta */}
        <Link href={sesion ? "/panel" : "/registro"} className={`${boton.exito} ${enGrupo}`}>
          {sesion ? "Ir a mi panel" : "Crear cuenta"}
        </Link>
      </div>
    </section>
  );
}
