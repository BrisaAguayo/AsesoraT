"use server";

import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { validarRegistro, type DatosRegistro } from "@/lib/validaciones";

export type EstadoRegistro =
  | { ok: true }
  | { ok: false; mensaje?: string; errores?: Partial<Record<keyof DatosRegistro, string>> };

// HU-01: crea la cuenta con la contraseña cifrada (RNF-04)
export async function registrarUsuario(formData: FormData): Promise<EstadoRegistro> {
  const resultado = validarRegistro(Object.fromEntries(formData));
  if (!resultado.ok) return { ok: false, errores: resultado.errores };

  const { password, ...datos } = resultado.datos;
  try {
    await prisma.usuario.create({
      data: { ...datos, passwordHash: await bcrypt.hash(password, 10) },
    });
    return { ok: true };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      const campo = String(e.meta?.target ?? "");
      if (campo.includes("numeroControl")) {
        return { ok: false, errores: { numeroControl: "Ese número de control ya está registrado." } };
      }
      return { ok: false, errores: { correo: "Ese correo ya está registrado. Inicia sesión." } };
    }
    console.error(e);
    return { ok: false, mensaje: "No se pudo crear la cuenta. Intenta de nuevo." };
  }
}
