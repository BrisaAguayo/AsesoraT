import { test } from "node:test";
import assert from "node:assert/strict";
import { esCorreoInstitucional, esEnlaceValido, esNumeroControlValido, esPasswordSegura, validarRegistro } from "./validaciones";

const base = {
  nombre: "Carlos",
  apellidos: "Méndez",
  correo: "l00000010@tectijuana.edu.mx",
  numeroControl: "00000010",
  carrera: "Ingeniería en Sistemas Computacionales",
  semestre: "2",
  rol: "ESTUDIANTE",
  password: "Asesorat2026",
};

test("CP-01 acepta correo institucional", () => {
  assert.equal(esCorreoInstitucional("l22211514@tectijuana.edu.mx"), true);
  assert.equal(esCorreoInstitucional("  Tutora.Demo@TecTijuana.edu.mx "), true);
});

test("CP-02 rechaza correos que no son institucionales", () => {
  assert.equal(esCorreoInstitucional("alumno@gmail.com"), false);
  assert.equal(esCorreoInstitucional("alumno@tectijuana.edu.mx.com"), false);
  assert.equal(esCorreoInstitucional("alumno@otrotec.edu.mx"), false);
});

test("CP-03 valida el número de control", () => {
  assert.equal(esNumeroControlValido("22211514"), true);
  assert.equal(esNumeroControlValido("C19210001"), true);
  assert.equal(esNumeroControlValido("1234"), false);
});

test("CP-04 exige contraseña con letras y números", () => {
  assert.equal(esPasswordSegura("Asesorat2026"), true);
  assert.equal(esPasswordSegura("corta1"), false);
  assert.equal(esPasswordSegura("solamenteletras"), false);
});

test("CP-05 registro válido de estudiante", () => {
  const r = validarRegistro(base);
  assert.equal(r.ok, true);
  if (r.ok) assert.equal(r.datos.semestre, 2);
});

test("CP-06 un tutor debe ser de 6.º semestre o más", () => {
  const r = validarRegistro({ ...base, rol: "TUTOR", semestre: "4" });
  assert.equal(r.ok, false);
  if (!r.ok) assert.ok(r.errores.semestre);
  assert.equal(validarRegistro({ ...base, rol: "TUTOR", semestre: "7" }).ok, true);
});

test("CP-07 no se permite registrarse como coordinación", () => {
  const r = validarRegistro({ ...base, rol: "COORDINADOR" });
  assert.equal(r.ok, false);
});

test("CP-19 el link de la reunión debe ser una dirección web válida", () => {
  assert.equal(esEnlaceValido("https://meet.google.com/abc-defg-hij"), true);
  assert.equal(esEnlaceValido("  https://teams.microsoft.com/l/meetup-join/123  "), true);
  assert.equal(esEnlaceValido(""), false);
  assert.equal(esEnlaceValido("meet.google.com/abc"), false);
  assert.equal(esEnlaceValido("javascript:alert(1)"), false);
  assert.equal(esEnlaceValido("https://localhost"), false);
});

test("CP-20 el nombre y los apellidos se piden por separado y se guardan juntos", () => {
  const r = validarRegistro({ ...base, nombre: "  Carlos  Iván ", apellidos: "Méndez  Ruiz " });
  assert.equal(r.ok, true);
  if (r.ok) assert.equal(r.datos.nombre, "Carlos Iván Méndez Ruiz");
  const sinApellidos = validarRegistro({ ...base, apellidos: "" });
  assert.equal(sinApellidos.ok, false);
  if (!sinApellidos.ok) assert.ok(sinApellidos.errores.apellidos && !sinApellidos.errores.nombre);
});
