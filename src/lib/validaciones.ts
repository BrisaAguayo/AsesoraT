// Reglas de validación compartidas por el registro y el inicio de sesión (HU-01).

export const DOMINIO_INSTITUCIONAL = "tectijuana.edu.mx";
export const SEMESTRE_MINIMO_TUTOR = 6;

export type RolRegistro = "ESTUDIANTE" | "TUTOR";

export interface DatosRegistro {
  nombre: string;
  correo: string;
  numeroControl: string;
  carrera: string;
  semestre: number;
  rol: RolRegistro;
  password: string;
}

export type ResultadoValidacion =
  | { ok: true; datos: DatosRegistro }
  | { ok: false; errores: Partial<Record<keyof DatosRegistro, string>> };

/** Normaliza el correo: sin espacios y en minúsculas. */
export function normalizarCorreo(correo: string): string {
  return correo.trim().toLowerCase();
}

/** RF-01: solo se aceptan correos @tectijuana.edu.mx */
export function esCorreoInstitucional(correo: string): boolean {
  const c = normalizarCorreo(correo);
  return /^[a-z0-9._%+-]+@tectijuana\.edu\.mx$/.test(c);
}

/** Número de control: 8 dígitos, con una letra opcional al inicio (ej. 22211514, C19210001). */
export function esNumeroControlValido(numero: string): boolean {
  return /^[A-Za-z]?\d{8}$/.test(numero.trim());
}

/** Mínimo 8 caracteres, con al menos una letra y un número. */
export function esPasswordSegura(password: string): boolean {
  return password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password);
}

export function validarRegistro(entrada: Record<string, unknown>): ResultadoValidacion {
  const texto = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const nombre = texto(entrada.nombre);
  const correo = normalizarCorreo(texto(entrada.correo));
  const numeroControl = texto(entrada.numeroControl).toUpperCase();
  const carrera = texto(entrada.carrera);
  const semestre = Number(entrada.semestre);
  const rol = texto(entrada.rol);
  const password = typeof entrada.password === "string" ? entrada.password : "";

  const errores: Partial<Record<keyof DatosRegistro, string>> = {};

  if (nombre.length < 3) errores.nombre = "Escribe tu nombre completo.";
  if (!esCorreoInstitucional(correo)) errores.correo = `Usa tu correo institucional @${DOMINIO_INSTITUCIONAL}.`;
  if (!esNumeroControlValido(numeroControl)) errores.numeroControl = "El número de control debe tener 8 dígitos.";
  if (carrera.length === 0) errores.carrera = "Selecciona tu carrera.";
  if (!Number.isInteger(semestre) || semestre < 1 || semestre > 12) errores.semestre = "El semestre debe estar entre 1 y 12.";
  if (rol !== "ESTUDIANTE" && rol !== "TUTOR") errores.rol = "Elige si te registras como estudiante o tutor.";
  if (rol === "TUTOR" && Number.isInteger(semestre) && semestre < SEMESTRE_MINIMO_TUTOR) {
    errores.semestre = `Para ser tutor debes cursar ${SEMESTRE_MINIMO_TUTOR}.º semestre o más.`;
  }
  if (!esPasswordSegura(password)) errores.password = "La contraseña debe tener al menos 8 caracteres, letras y números.";

  if (Object.keys(errores).length > 0) return { ok: false, errores };

  return { ok: true, datos: { nombre, correo, numeroControl, carrera, semestre, rol: rol as RolRegistro, password } };
}
