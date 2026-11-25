import { test } from "node:test";
import assert from "node:assert/strict";
import {
  duracionHoras, esHora, inicioAsesoria, leerFechaISO, proximasFechas, puedeCancelar, seEmpalman, validarBloque,
} from "./horarios";

const lunes13 = { id: "a", diaSemana: 1, horaInicio: "13:00", horaFin: "14:00" };

test("CP-08 valida el formato de hora", () => {
  assert.equal(esHora("09:30"), true);
  assert.equal(esHora("23:59"), true);
  assert.equal(esHora("24:00"), false);
  assert.equal(esHora("9:30"), false);
});

test("CP-09 detecta bloques que se empalman", () => {
  assert.equal(seEmpalman(lunes13, { diaSemana: 1, horaInicio: "13:30", horaFin: "15:00" }), true);
  assert.equal(seEmpalman(lunes13, { diaSemana: 1, horaInicio: "14:00", horaFin: "15:00" }), false);
  assert.equal(seEmpalman(lunes13, { diaSemana: 2, horaInicio: "13:00", horaFin: "14:00" }), false);
});

test("CP-10 rechaza bloques inválidos o empalmados", () => {
  assert.equal(validarBloque({ diaSemana: 1, horaInicio: "15:00", horaFin: "14:00" }, []).ok, false);
  assert.equal(validarBloque({ diaSemana: 6, horaInicio: "10:00", horaFin: "11:00" }, []).ok, false);
  assert.equal(validarBloque({ diaSemana: 1, horaInicio: "12:30", horaFin: "13:30" }, [lunes13]).ok, false);
  assert.equal(validarBloque({ diaSemana: 1, horaInicio: "14:00", horaFin: "15:00" }, [lunes13]).ok, true);
  // Al editar, el bloque no choca consigo mismo
  assert.equal(validarBloque({ ...lunes13, horaFin: "14:30" }, [lunes13]).ok, true);
});

test("CP-11 calcula el inicio de la asesoría con la hora de Tijuana", () => {
  // 30 nov 2026, 13:00 en Tijuana (UTC-8) = 21:00 UTC
  assert.equal(inicioAsesoria(new Date("2026-11-30"), "13:00").toISOString(), "2026-11-30T21:00:00.000Z");
  // En horario de verano (UTC-7)
  assert.equal(inicioAsesoria(new Date("2026-06-01"), "13:00").toISOString(), "2026-06-01T20:00:00.000Z");
});

test("CP-12 solo permite cancelar hasta 2 horas antes", () => {
  const fecha = new Date("2026-11-30");
  assert.equal(puedeCancelar(fecha, "13:00", new Date("2026-11-30T19:00:00Z")), true); // 11:00 local
  assert.equal(puedeCancelar(fecha, "13:00", new Date("2026-11-30T19:30:00Z")), false); // 11:30 local
});

test("CP-13 propone las próximas fechas del día del bloque", () => {
  // Miércoles 25 nov 2026, 10:00 en Tijuana
  const ahora = new Date("2026-11-25T18:00:00Z");
  const lunes = proximasFechas(1, "13:00", 2, ahora).map((f) => f.toISOString().slice(0, 10));
  assert.deepEqual(lunes, ["2026-11-30", "2026-12-07"]);
  // Hoy a las 12:00 todavía no empieza; hoy a las 09:00 ya pasó
  assert.equal(proximasFechas(3, "12:00", 1, ahora)[0].toISOString().slice(0, 10), "2026-11-25");
  assert.equal(proximasFechas(3, "09:00", 1, ahora)[0].toISOString().slice(0, 10), "2026-12-02");
});

test("CP-14 lee fechas AAAA-MM-DD y calcula la duración", () => {
  assert.equal(leerFechaISO("2026-11-30")?.toISOString(), "2026-11-30T00:00:00.000Z");
  assert.equal(leerFechaISO("2026-02-30"), null);
  assert.equal(leerFechaISO("30/11/2026"), null);
  assert.equal(duracionHoras("13:00", "14:30"), 1.5);
});
