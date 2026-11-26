// Reglas de horarios compartidas por disponibilidad (HU-03), agendar (HU-05),
// cancelar (HU-07) y el reporte de horas (HU-11).

export const ZONA_HORARIA = "America/Tijuana";
export const HORAS_MINIMAS_CANCELAR = 2;
/** Último día del semestre Ago-Dic 2026. */
export const FIN_DE_SEMESTRE = new Date(Date.UTC(2026, 11, 11));

export interface Bloque {
  id?: string;
  diaSemana: number;
  horaInicio: string;
  horaFin: string;
}

/** Hora válida en formato "HH:MM" (00:00 a 23:59). */
export function esHora(hora: string): boolean {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(hora);
}

/** Convierte "HH:MM" a minutos desde la medianoche. */
export function aMinutos(hora: string): number {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}

/** Dos bloques se empalman si son el mismo día y sus horarios se cruzan. */
export function seEmpalman(a: Bloque, b: Bloque): boolean {
  if (a.diaSemana !== b.diaSemana) return false;
  return aMinutos(a.horaInicio) < aMinutos(b.horaFin) && aMinutos(b.horaInicio) < aMinutos(a.horaFin);
}

export type ResultadoBloque = { ok: true } | { ok: false; error: string };

/** HU-03: valida un bloque de disponibilidad contra los bloques que ya tiene el tutor. */
export function validarBloque(bloque: Bloque, existentes: Bloque[]): ResultadoBloque {
  if (!Number.isInteger(bloque.diaSemana) || bloque.diaSemana < 1 || bloque.diaSemana > 5) {
    return { ok: false, error: "Elige un día de lunes a viernes." };
  }
  if (!esHora(bloque.horaInicio) || !esHora(bloque.horaFin)) {
    return { ok: false, error: "Escribe las horas en formato HH:MM." };
  }
  if (aMinutos(bloque.horaInicio) >= aMinutos(bloque.horaFin)) {
    return { ok: false, error: "La hora de inicio debe ser antes de la hora de fin." };
  }
  const choque = existentes.find((e) => e.id !== bloque.id && seEmpalman(bloque, e));
  if (choque) {
    return { ok: false, error: `Se empalma con tu bloque de ${choque.horaInicio} a ${choque.horaFin}.` };
  }
  return { ok: true };
}

/** Diferencia en minutos entre la hora de la zona y UTC en un instante dado. */
function desfaseMinutos(instante: Date, zona: string): number {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: zona, hourCycle: "h23",
    year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit",
  }).formatToParts(instante);
  const valor = (tipo: string) => Number(partes.find((p) => p.type === tipo)?.value);
  const comoUtc = Date.UTC(valor("year"), valor("month") - 1, valor("day"), valor("hour"), valor("minute"));
  return Math.round((comoUtc - instante.getTime()) / 60000);
}

/** Instante real en que empieza una asesoría (la fecha se guarda como día sin hora). */
export function inicioAsesoria(fecha: Date, horaInicio: string, zona = ZONA_HORARIA): Date {
  const local = Date.UTC(fecha.getUTCFullYear(), fecha.getUTCMonth(), fecha.getUTCDate()) + aMinutos(horaInicio) * 60000;
  const desfase = desfaseMinutos(new Date(local), zona);
  return new Date(local - desfase * 60000);
}

/** HU-07 (RF-07): solo se puede cancelar hasta 2 horas antes del inicio. */
export function puedeCancelar(fecha: Date, horaInicio: string, ahora = new Date()): boolean {
  const limite = inicioAsesoria(fecha, horaInicio).getTime() - HORAS_MINIMAS_CANCELAR * 3600000;
  return ahora.getTime() <= limite;
}

/** Fecha de hoy en Tijuana, como día sin hora (UTC medianoche). */
export function hoyEnZona(ahora = new Date(), zona = ZONA_HORARIA): Date {
  const local = new Date(ahora.getTime() + desfaseMinutos(ahora, zona) * 60000);
  return new Date(Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate()));
}

/**
 * HU-05: próximas fechas de un bloque semanal (día 1 = lunes ... 5 = viernes),
 * sin incluir las que ya empezaron.
 */
export function proximasFechas(diaSemana: number, horaInicio: string, cantidad: number, ahora = new Date()): Date[] {
  const fechas: Date[] = [];
  const dia = hoyEnZona(ahora);
  while (fechas.length < cantidad) {
    const diaJs = dia.getUTCDay(); // 0 = domingo
    if (diaJs === diaSemana && inicioAsesoria(dia, horaInicio).getTime() > ahora.getTime()) {
      fechas.push(new Date(dia));
    }
    dia.setUTCDate(dia.getUTCDate() + 1);
  }
  return fechas;
}

/** Fecha en formato AAAA-MM-DD (para formularios y enlaces). */
export function fechaISO(fecha: Date): string {
  return fecha.toISOString().slice(0, 10);
}

/** Convierte "AAAA-MM-DD" a fecha sin hora; null si no es válida. */
export function leerFechaISO(texto: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(texto)) return null;
  const fecha = new Date(`${texto}T00:00:00Z`);
  return Number.isNaN(fecha.getTime()) || fechaISO(fecha) !== texto ? null : fecha;
}

/** HU-11: duración de una asesoría en horas. */
export function duracionHoras(horaInicio: string, horaFin: string): number {
  return (aMinutos(horaFin) - aMinutos(horaInicio)) / 60;
}
