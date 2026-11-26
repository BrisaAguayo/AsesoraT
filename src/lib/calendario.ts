// Reglas de la pantalla Calendario (CC-006): mes que se muestra y días de la rejilla.

export interface Mes {
  anio: number;
  mes: number; // 0 = enero ... 11 = diciembre
}

/** Lee "AAAA-MM" del enlace; si falta o no es válido, usa el mes de la fecha de hoy. */
export function leerMes(texto: string | undefined, hoy: Date): Mes {
  const coincide = texto?.match(/^(\d{4})-(\d{2})$/);
  if (coincide) {
    const anio = Number(coincide[1]);
    const mes = Number(coincide[2]) - 1;
    if (anio >= 2000 && anio <= 2100 && mes >= 0 && mes <= 11) return { anio, mes };
  }
  return { anio: hoy.getUTCFullYear(), mes: hoy.getUTCMonth() };
}

/** Mes en formato "AAAA-MM", desplazado los meses que se indiquen (para las flechas). */
export function mesISO({ anio, mes }: Mes, desplazamiento = 0): string {
  const fecha = new Date(Date.UTC(anio, mes + desplazamiento, 1));
  return fecha.toISOString().slice(0, 7);
}

/**
 * Días de la rejilla del mes, de lunes a domingo y en semanas completas:
 * empieza con los últimos días del mes anterior y termina con los primeros del siguiente.
 */
export function diasDelCalendario({ anio, mes }: Mes): Date[] {
  const primero = new Date(Date.UTC(anio, mes, 1));
  const ultimo = new Date(Date.UTC(anio, mes + 1, 0));
  const inicio = new Date(primero);
  inicio.setUTCDate(1 - ((primero.getUTCDay() + 6) % 7)); // retrocede al lunes
  const fin = new Date(ultimo);
  fin.setUTCDate(ultimo.getUTCDate() + ((7 - ultimo.getUTCDay()) % 7)); // avanza al domingo

  const dias: Date[] = [];
  for (const dia = new Date(inicio); dia <= fin; dia.setUTCDate(dia.getUTCDate() + 1)) {
    dias.push(new Date(dia));
  }
  return dias;
}

/** Nombre del mes con mayúscula inicial, por ejemplo "Noviembre 2026". */
export function nombreMes({ anio, mes }: Mes): string {
  const texto = new Intl.DateTimeFormat("es-MX", { month: "long", timeZone: "UTC" }).format(new Date(Date.UTC(anio, mes, 1)));
  return `${texto[0].toUpperCase()}${texto.slice(1)} ${anio}`;
}
