import { prisma } from "@/lib/prisma";
import { fechaISO, hoyEnZona, leerFechaISO } from "@/lib/horarios";
import { resumirPorTutor } from "@/lib/reporte";

/** Periodo del reporte: por defecto del día 1 del mes actual a hoy. */
export function leerPeriodo(desdeTexto?: string, hastaTexto?: string) {
  const hoy = hoyEnZona();
  const inicioMes = new Date(Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth(), 1));
  let desde = leerFechaISO(desdeTexto ?? "") ?? inicioMes;
  let hasta = leerFechaISO(hastaTexto ?? "") ?? hoy;
  if (desde > hasta) [desde, hasta] = [hasta, desde];
  return { desde, hasta, desdeISO: fechaISO(desde), hastaISO: fechaISO(hasta) };
}

// HU-11: asesorías completadas en el periodo, agrupadas por tutor
export async function consultarReporte(desde: Date, hasta: Date) {
  const completadas = await prisma.asesoria.findMany({
    where: { estado: "COMPLETADA", fecha: { gte: desde, lte: hasta } },
    select: { horaInicio: true, horaFin: true, tutor: { select: { nombre: true } } },
  });
  return resumirPorTutor(completadas.map((a) => ({ tutor: a.tutor.nombre, horaInicio: a.horaInicio, horaFin: a.horaFin })));
}
