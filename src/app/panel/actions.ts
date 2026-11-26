"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { obtenerSesion } from "@/lib/sesion";
import { esNombreValido, normalizarNombre } from "@/lib/validaciones";

// CC-008: el estudiante o el tutor corrige su nombre completo desde el panel
export async function cambiarNombre(formData: FormData) {
  const sesion = await obtenerSesion();
  if (!sesion || (sesion.user.rol !== "ESTUDIANTE" && sesion.user.rol !== "TUTOR")) redirect("/login");

  const nombre = normalizarNombre(String(formData.get("nombre") ?? ""));
  if (!esNombreValido(nombre)) redirect("/panel?aviso=nombre-invalido");

  await prisma.usuario.update({ where: { id: sesion.user.id }, data: { nombre } });

  revalidatePath("/", "layout");
  redirect("/panel?aviso=nombre-cambiado");
}
