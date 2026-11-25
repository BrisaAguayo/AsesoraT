import { test } from "node:test";
import assert from "node:assert/strict";
import { reporteACsv, resumirPorTutor } from "./reporte";

const completadas = [
  { tutor: "Andrea López", horaInicio: "13:00", horaFin: "14:00" },
  { tutor: "Diego Ramírez", horaInicio: "16:00", horaFin: "17:00" },
  { tutor: "Andrea López", horaInicio: "12:00", horaFin: "13:30" },
];

test("CP-15 suma asesorías y horas por tutor", () => {
  assert.deepEqual(resumirPorTutor(completadas), [
    { tutor: "Andrea López", asesorias: 2, horas: 2.5 },
    { tutor: "Diego Ramírez", asesorias: 1, horas: 1 },
  ]);
  assert.deepEqual(resumirPorTutor([]), []);
});

test("CP-16 exporta el reporte a CSV", () => {
  const csv = reporteACsv(resumirPorTutor(completadas), "2026-11-01", "2026-11-30");
  const lineas = csv.replace("﻿", "").trim().split("\r\n");
  assert.equal(lineas[0], "Periodo,2026-11-01 a 2026-11-30");
  assert.equal(lineas[1], "Tutor,Asesorías completadas,Horas");
  assert.equal(lineas[2], "Andrea López,2,2.5");
  assert.equal(lineas[4], "Total,3,3.5");
  // Escapa comas y comillas en los nombres
  assert.ok(reporteACsv([{ tutor: 'López, "Andy"', asesorias: 1, horas: 1 }], "a", "b").includes('"López, ""Andy"""'));
});
