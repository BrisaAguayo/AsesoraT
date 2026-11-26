import Link from "next/link";
import { redirect } from "next/navigation";
import { nombreDelUsuario, obtenerSesion } from "@/lib/sesion";
import { aviso as estiloAviso, etiqueta } from "@/components/estilos";
import { TarjetaNombre } from "./TarjetaNombre";

export const dynamic = "force-dynamic";

type Opcion = { titulo: string; descripcion: string; href: string };

// HU-01: al entrar, cada usuario ve su panel según su rol
const opcionesPorRol: Record<string, Opcion[]> = {
  ESTUDIANTE: [
    { titulo: "Buscar asesorías", descripcion: "Encuentra tutores por materia, tutor, día y modalidad.", href: "/asesorias" },
    { titulo: "Mis asesorías", descripcion: "Consulta tus asesorías y su estado.", href: "/mis-asesorias" },
    { titulo: "Calendario", descripcion: "Tus asesorías del mes en un calendario.", href: "/calendario" },
  ],
  TUTOR: [
    { titulo: "Mis materias", descripcion: "Elige las materias que puedes asesorar.", href: "/tutor/materias" },
    { titulo: "Mi disponibilidad", descripcion: "Registra tus horarios semanales.", href: "/tutor/disponibilidad" },
    { titulo: "Solicitudes", descripcion: "Confirma o rechaza asesorías.", href: "/tutor/solicitudes" },
    { titulo: "Mis asesorías", descripcion: "Tu agenda e historial de asesorías.", href: "/mis-asesorias" },
    { titulo: "Calendario", descripcion: "Tus asesorías del mes en un calendario.", href: "/calendario" },
  ],
  COORDINADOR: [
    { titulo: "Reporte de horas", descripcion: "Asesorías y horas por tutor.", href: "/coordinacion/reporte" },
  ],
};

const nombreRol: Record<string, string> = { ESTUDIANTE: "Estudiante", TUTOR: "Tutor", COORDINADOR: "Coordinación" };

// Avisos del panel: cambio de nombre (CC-008) y acceso a una pantalla de otro rol
const avisosPanel: Record<string, { texto: string; error?: boolean }> = {
  "nombre-cambiado": { texto: "El nombre ha sido cambiado con éxito." },
  "nombre-invalido": { texto: "Escribe tu nombre completo.", error: true },
  "sin-acceso": { texto: "No tienes acceso a esa pantalla.", error: true },
};

export default async function Panel({ searchParams }: { searchParams: Promise<{ aviso?: string }> }) {
  const sesion = await obtenerSesion();
  if (!sesion) redirect("/login");

  const { rol } = sesion.user;
  const [name, { aviso }] = await Promise.all([nombreDelUsuario(sesion.user.id), searchParams]);
  const mensaje = aviso ? avisosPanel[aviso] : undefined;
  const puedeCambiarNombre = rol === "ESTUDIANTE" || rol === "TUTOR";

  return (
    <section className="flex flex-col gap-6">
      {mensaje && <p role="status" className={mensaje.error ? estiloAviso.error : estiloAviso.exito}>{mensaje.texto}</p>}
      <div>
        <span className={`${etiqueta} bg-marca text-white`}>{nombreRol[rol]}</span>
        <h1 className="mt-3 text-2xl font-bold text-marca">Hola, {name?.split(" ")[0]}</h1>
        <p className="text-slate-500">¿Qué quieres hacer hoy?</p>
      </div>
      {/* items-start: al abrir "Cambiar nombre" solo crece esa tarjeta */}
      <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {opcionesPorRol[rol].map((o) => (
          <Link key={o.titulo} href={o.href} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-marca">
            <h2 className="font-semibold text-marca">{o.titulo}</h2>
            <p className="mt-1 text-sm text-slate-500">{o.descripcion}</p>
          </Link>
        ))}
        {puedeCambiarNombre && <TarjetaNombre key={name} nombre={name} abrirAlInicio={aviso === "nombre-invalido"} />}
      </div>
    </section>
  );
}
