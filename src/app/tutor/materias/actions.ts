"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { obtenerSesion } from "@/lib/sesion";

// HU-02: el tutor guarda las materias que puede asesorar
export async function guardarMaterias(formData: FormData) {
  const sesion = await obtenerSesion();
  if (!sesion || sesion.user.rol !== "TUTOR") redirect("/login");

  const tutorId = sesion.user.id;
  const seleccionadas = formData.getAll("materias").map(String);

  // Solo se aceptan materias que existen en el catálogo
  const validas = await prisma.materia.findMany({ where: { id: { in: seleccionadas } }, select: { id: true } });
  const ids = validas.map((m) => m.id);

  await prisma.$transaction([
    prisma.tutorMateria.deleteMany({ where: { tutorId, materiaId: { notIn: ids } } }),
    prisma.tutorMateria.createMany({ data: ids.map((materiaId) => ({ tutorId, materiaId })), skipDuplicates: true }),
  ]);

  revalidatePath("/tutor/materias");
  revalidatePath("/asesorias");
  redirect("/tutor/materias?guardado=1");
}
