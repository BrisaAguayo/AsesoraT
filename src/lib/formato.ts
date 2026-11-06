// Textos que se muestran en la interfaz

export const dias = ["", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

export const nombreModalidad = { PRESENCIAL: "Presencial", VIRTUAL: "Virtual" } as const;

export const nombreEstado = {
  PENDIENTE: "Pendiente",
  CONFIRMADA: "Confirmada",
  CANCELADA: "Cancelada",
  COMPLETADA: "Completada",
} as const;

export function formatearFecha(fecha: Date) {
  return new Intl.DateTimeFormat("es-MX", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" }).format(fecha);
}
