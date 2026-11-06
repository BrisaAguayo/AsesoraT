import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/** Devuelve la sesión actual en componentes y acciones del servidor. */
export function obtenerSesion() {
  return getServerSession(authOptions);
}
