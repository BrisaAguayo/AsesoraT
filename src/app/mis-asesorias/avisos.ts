import { HORAS_MINIMAS_CANCELAR } from "@/lib/horarios";

// Mensajes que se muestran después de cancelar o marcar como completada
export const avisos: Record<string, { texto: string; error?: boolean }> = {
  cancelada: { texto: "Asesoría cancelada. El horario quedó libre." },
  completada: { texto: "La asesoría quedó como completada." },
  tarde: { texto: `Ya no se puede cancelar: solo se permite hasta ${HORAS_MINIMAS_CANCELAR} horas antes.`, error: true },
  "no-cancelable": { texto: "Esa asesoría ya no se puede cancelar.", error: true },
  "no-completable": { texto: "Solo se pueden completar asesorías confirmadas que ya ocurrieron.", error: true },
};
