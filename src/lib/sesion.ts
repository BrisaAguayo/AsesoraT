import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/** Devuelve la sesión actual en componentes y acciones del servidor. */
export function obtenerSesion() {
  return getServerSession(authOptions);
}

/** Nombre actual del usuario desde la base de datos (puede haberlo cambiado después de iniciar sesión). */
export async function nombreDelUsuario(id: string): Promise<string> {
  const usuario = await prisma.usuario.findUnique({ where: { id }, select: { nombre: true } });
  return usuario?.nombre ?? "";
}
