"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { obtenerSesion } from "@/lib/sesion";
import { validarBloque } from "@/lib/horarios";

export type EstadoBloque = { ok: true } | { ok: false; error: string };

async function tutorActual() {
  const sesion = await obtenerSesion();
  if (!sesion || sesion.user.rol !== "TUTOR") redirect("/login");
  return sesion.user.id;
}

// HU-03: el tutor agrega o edita un bloque de disponibilidad semanal
export async function guardarBloque(formData: FormData): Promise<EstadoBloque> {
  const tutorId = await tutorActual();
  const texto = (campo: string) => String(formData.get(campo) ?? "").trim();

  const id = texto("id") || undefined;
  const bloque = { id, diaSemana: Number(texto("diaSemana")), horaInicio: texto("horaInicio"), horaFin: texto("horaFin") };
  const modalidad = texto("modalidad");
  const lugar = texto("lugar");

  if (modalidad !== "PRESENCIAL" && modalidad !== "VIRTUAL") return { ok: false, error: "Elige la modalidad." };
  if (lugar.length < 3) {
    return { ok: false, error: modalidad === "VIRTUAL" ? "Escribe el enlace o la plataforma de la videollamada." : "Escribe el aula o lugar." };
  }

  const existentes = await prisma.disponibilidad.findMany({ where: { tutorId } });
  if (id && !existentes.some((e) => e.id === id)) return { ok: false, error: "Ese bloque no existe." };

  const resultado = validarBloque(bloque, existentes);
  if (!resultado.ok) return resultado;

  const datos = { diaSemana: bloque.diaSemana, horaInicio: bloque.horaInicio, horaFin: bloque.horaFin, modalidad, lugar } as const;
  if (id) {
    await prisma.disponibilidad.update({ where: { id }, data: datos });
  } else {
    await prisma.disponibilidad.create({ data: { ...datos, tutorId } });
  }

  revalidatePath("/tutor/disponibilidad");
  revalidatePath("/asesorias");
  return { ok: true };
}

// HU-03: el tutor borra uno de sus bloques
export async function eliminarBloque(formData: FormData) {
  const tutorId = await tutorActual();
  await prisma.disponibilidad.deleteMany({ where: { id: String(formData.get("id")), tutorId } });

  revalidatePath("/tutor/disponibilidad");
  revalidatePath("/asesorias");
  redirect("/tutor/disponibilidad?guardado=1");
}
