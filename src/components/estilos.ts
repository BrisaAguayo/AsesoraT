// Estilos compartidos: colores sólidos, esquinas redondeadas y texto blanco o negro.

const base = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium disabled:opacity-60";

export const boton = {
  primario: `${base} bg-marca text-white hover:bg-marca/90`,
  exito: `${base} bg-marca-acento text-white hover:bg-marca-acento/90`,
  peligro: `${base} bg-red-700 text-white hover:bg-red-800`,
  claro: `${base} bg-white text-slate-900 hover:bg-slate-100`,
};

// Etiqueta del estado de una asesoría
export const colorEstado: Record<string, string> = {
  PENDIENTE: "bg-amber-400 text-slate-900",
  CONFIRMADA: "bg-marca-acento text-white",
  CANCELADA: "bg-red-700 text-white",
  COMPLETADA: "bg-marca text-white",
};

export const etiqueta = "rounded-md px-3 py-1 text-xs font-semibold";

// Mensajes de aviso
export const aviso = {
  exito: "rounded-md bg-marca-acento px-4 py-2 text-sm font-medium text-white",
  error: "rounded-md bg-red-700 px-4 py-2 text-sm font-medium text-white",
};
