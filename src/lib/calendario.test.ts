import { test } from "node:test";
import assert from "node:assert/strict";
import { diasDelCalendario, leerMes, mesISO, nombreMes } from "./calendario";

const hoy = new Date(Date.UTC(2026, 10, 26)); // 26 nov 2026

test("CP-17 lee el mes del enlace y cambia de mes con las flechas", () => {
  assert.deepEqual(leerMes("2026-12", hoy), { anio: 2026, mes: 11 });
  assert.deepEqual(leerMes(undefined, hoy), { anio: 2026, mes: 10 });
  assert.deepEqual(leerMes("2026-13", hoy), { anio: 2026, mes: 10 });
  assert.deepEqual(leerMes("noviembre", hoy), { anio: 2026, mes: 10 });
  assert.equal(mesISO({ anio: 2026, mes: 11 }, 1), "2027-01");
  assert.equal(mesISO({ anio: 2026, mes: 0 }, -1), "2025-12");
  assert.equal(nombreMes({ anio: 2026, mes: 10 }), "Noviembre 2026");
});

test("CP-18 la rejilla va de lunes a domingo en semanas completas", () => {
  const noviembre = diasDelCalendario({ anio: 2026, mes: 10 });
  assert.equal(noviembre.length, 42);
  assert.equal(noviembre[0].toISOString().slice(0, 10), "2026-10-26"); // lunes
  assert.equal(noviembre.at(-1)?.toISOString().slice(0, 10), "2026-12-06"); // domingo
  // Febrero de 2027 empieza en lunes y termina en domingo: 4 semanas exactas
  const febrero = diasDelCalendario({ anio: 2027, mes: 1 });
  assert.equal(febrero.length, 28);
  assert.equal(febrero[0].getUTCDay(), 1);
  assert.equal(febrero.at(-1)?.getUTCDay(), 0);
});
