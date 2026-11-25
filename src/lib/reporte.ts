// HU-11: reporte de asesorías completadas y horas por tutor (RF-11).
import { duracionHoras } from "./horarios";

export interface AsesoriaReporte {
  tutor: string;
  horaInicio: string;
  horaFin: string;
}

export interface FilaReporte {
  tutor: string;
  asesorias: number;
  horas: number;
}

/** Agrupa las asesorías completadas por tutor y suma sus horas (ordenado por horas). */
export function resumirPorTutor(asesorias: AsesoriaReporte[]): FilaReporte[] {
  const porTutor = new Map<string, FilaReporte>();
  for (const a of asesorias) {
    const fila = porTutor.get(a.tutor) ?? { tutor: a.tutor, asesorias: 0, horas: 0 };
    fila.asesorias += 1;
    fila.horas += duracionHoras(a.horaInicio, a.horaFin);
    porTutor.set(a.tutor, fila);
  }
  return [...porTutor.values()].sort((a, b) => b.horas - a.horas || a.tutor.localeCompare(b.tutor, "es"));
}

function celda(valor: string | number): string {
  const texto = String(valor);
  return /[",\n]/.test(texto) ? `"${texto.replace(/"/g, '""')}"` : texto;
}

/** Genera el CSV del reporte (con BOM para que Excel muestre bien los acentos). */
export function reporteACsv(filas: FilaReporte[], desde: string, hasta: string): string {
  const lineas = [
    ["Periodo", `${desde} a ${hasta}`],
    ["Tutor", "Asesorías completadas", "Horas"],
    ...filas.map((f) => [f.tutor, f.asesorias, f.horas]),
    ["Total", filas.reduce((s, f) => s + f.asesorias, 0), filas.reduce((s, f) => s + f.horas, 0)],
  ];
  return "﻿" + lineas.map((l) => l.map(celda).join(",")).join("\r\n") + "\r\n";
}
