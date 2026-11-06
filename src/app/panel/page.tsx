import Link from "next/link";
import { redirect } from "next/navigation";
import { obtenerSesion } from "@/lib/sesion";

export const dynamic = "force-dynamic";

type Opcion = { titulo: string; descripcion: string; href?: string; proximamente?: string };

// HU-01: al entrar, cada usuario ve su panel según su rol
const opcionesPorRol: Record<string, Opcion[]> = {
  ESTUDIANTE: [
    { titulo: "Buscar asesorías", descripcion: "Encuentra tutores por materia, día y modalidad.", href: "/asesorias" },
    { titulo: "Mis asesorías", descripcion: "Consulta tus asesorías y su estado.", href: "/mis-asesorias" },
  ],
  TUTOR: [
    { titulo: "Mis materias", descripcion: "Elige las materias que puedes asesorar.", href: "/tutor/materias" },
    { titulo: "Mi disponibilidad", descripcion: "Registra tus horarios semanales.", proximamente: "Sprint 3" },
    { titulo: "Solicitudes", descripcion: "Confirma o rechaza asesorías.", proximamente: "Sprint 4" },
  ],
  COORDINADOR: [
    { titulo: "Reporte de horas", descripcion: "Asesorías y horas por tutor.", proximamente: "Sprint 6" },
  ],
};

const nombreRol: Record<string, string> = { ESTUDIANTE: "Estudiante", TUTOR: "Tutor", COORDINADOR: "Coordinación" };

export default async function Panel() {
  const sesion = await obtenerSesion();
  if (!sesion) redirect("/login");

  const { name, rol } = sesion.user;

  return (
    <section className="flex flex-col gap-6">
      <div>
        <span className="rounded-full bg-marca-claro px-3 py-1 text-xs font-semibold text-marca">{nombreRol[rol]}</span>
        <h1 className="mt-3 text-2xl font-bold text-marca">Hola, {name?.split(" ")[0]}</h1>
        <p className="text-slate-500">¿Qué quieres hacer hoy?</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {opcionesPorRol[rol].map((o) =>
          o.href ? (
            <Link key={o.titulo} href={o.href} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-marca">
              <h2 className="font-semibold text-marca">{o.titulo}</h2>
              <p className="mt-1 text-sm text-slate-500">{o.descripcion}</p>
            </Link>
          ) : (
            <div key={o.titulo} className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5">
              <h2 className="font-semibold text-slate-500">{o.titulo}</h2>
              <p className="mt-1 text-sm text-slate-400">{o.descripcion}</p>
              <p className="mt-3 text-xs font-medium text-slate-400">Disponible en el {o.proximamente}</p>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
