import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { obtenerSesion } from "@/lib/sesion";
import { nombreModalidad } from "@/lib/formato";
import { fechaISO, hoyEnZona } from "@/lib/horarios";
import { diasDelCalendario, leerMes, mesISO, nombreMes } from "@/lib/calendario";
import { boton } from "@/components/estilos";
import { CalendarioMes, type AsesoriaDelDia } from "./CalendarioMes";

export const dynamic = "force-dynamic";

// CC-006: calendario mensual con las asesorías del estudiante o del tutor
export default async function Calendario({ searchParams }: { searchParams: Promise<{ mes?: string }> }) {
  const sesion = await obtenerSesion();
  if (!sesion) redirect("/login");

  const esTutor = sesion.user.rol === "TUTOR";
  const hoy = hoyEnZona();
  const mes = leerMes((await searchParams).mes, hoy);
  const dias = diasDelCalendario(mes);
  const propias = esTutor ? { tutorId: sesion.user.id } : { estudianteId: sesion.user.id };

  const [asesorias, agendadas] = await Promise.all([
    // Las canceladas no se muestran en el calendario
    prisma.asesoria.findMany({
      where: { ...propias, estado: { not: "CANCELADA" }, fecha: { gte: dias[0], lte: dias[dias.length - 1] } },
      orderBy: [{ fecha: "asc" }, { horaInicio: "asc" }],
      // RNF-07: de la otra persona solo se muestra el nombre
      include: { materia: true, tutor: { select: { nombre: true } }, estudiante: { select: { nombre: true } } },
    }),
    // Asesorías agendadas de hoy en adelante, para el aviso del pie
    prisma.asesoria.count({ where: { ...propias, estado: { in: ["PENDIENTE", "CONFIRMADA"] }, fecha: { gte: hoy } } }),
  ]);

  const datos: AsesoriaDelDia[] = asesorias.map((a) => ({
    id: a.id,
    fecha: fechaISO(a.fecha),
    horario: `${a.horaInicio} - ${a.horaFin}`,
    horaInicio: a.horaInicio,
    materia: a.materia.nombre,
    otraPersona: esTutor ? a.estudiante.nombre : a.tutor.nombre,
    estado: a.estado,
    lugar: `${nombreModalidad[a.modalidad]}, ${a.lugar ?? ""}`,
    tema: a.tema,
  }));

  const flecha = `${boton.claro} h-9 w-9 border border-slate-300 px-0`;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-marca">Calendario</h1>
          <p className="text-slate-500">Tus asesorías del mes.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/calendario?mes=${mesISO(mes, -1)}`} className={flecha} aria-label="Mes anterior">‹</Link>
          <span className="min-w-36 text-center font-semibold">{nombreMes(mes)}</span>
          <Link href={`/calendario?mes=${mesISO(mes, 1)}`} className={flecha} aria-label="Mes siguiente">›</Link>
          <Link href="/calendario" className={`${boton.claro} h-9 border border-slate-300 px-3`}>Hoy</Link>
        </div>
      </div>

      <CalendarioMes
        dias={dias.map((d) => ({ fecha: fechaISO(d), numero: d.getUTCDate(), delMes: d.getUTCMonth() === mes.mes }))}
        hoy={fechaISO(hoy)}
        asesorias={datos}
        etiquetaOtraPersona={esTutor ? "Estudiante" : "Tutor"}
      />

      {agendadas === 0 && (
        <p className="mt-2 text-center text-sm text-slate-400">No tienes asesorías agendadas por el momento.</p>
      )}
    </section>
  );
}
