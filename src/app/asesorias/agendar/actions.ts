"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { obtenerSesion } from "@/lib/sesion";
import { inicioAsesoria, leerFechaISO, seEmpalman } from "@/lib/horarios";

export type EstadoAgendar = { ok: true; id: string } | { ok: false; error: string };

const OCUPADO = "Ese horario ya está ocupado. Elige otra fecha.";

// HU-05: el estudiante agenda una asesoría en un horario libre (RF-05, RF-06)
export async function agendarAsesoria(formData: FormData): Promise<EstadoAgendar> {
  const sesion = await obtenerSesion();
  if (!sesion || sesion.user.rol !== "ESTUDIANTE") return { ok: false, error: "Inicia sesión como estudiante para agendar." };
  const estudianteId = sesion.user.id;

  const texto = (campo: string) => String(formData.get(campo) ?? "").trim();
  const tema = texto("tema");
  const fecha = leerFechaISO(texto("fecha"));

  if (tema.length < 3) return { ok: false, error: "Escribe el tema que quieres revisar." };
  if (tema.length > 200) return { ok: false, error: "El tema debe tener máximo 200 caracteres." };
  if (!fecha) return { ok: false, error: "Elige una fecha." };

  const bloque = await prisma.disponibilidad.findUnique({
    where: { id: texto("bloque") },
    include: { tutor: { select: { materiasQueImparte: { select: { materiaId: true } } } } },
  });
  const materiaId = texto("materia");
  if (!bloque || !bloque.tutor.materiasQueImparte.some((m) => m.materiaId === materiaId)) {
    return { ok: false, error: "Ese horario ya no está disponible." };
  }
  if (fecha.getUTCDay() !== bloque.diaSemana || inicioAsesoria(fecha, bloque.horaInicio) <= new Date()) {
    return { ok: false, error: "Esa fecha no corresponde al horario elegido." };
  }

  // RF-06: se valida en la lógica antes de guardar; las canceladas no ocupan el horario
  const mismoDia = await prisma.asesoria.findMany({
    where: { fecha, estado: { not: "CANCELADA" }, OR: [{ tutorId: bloque.tutorId }, { estudianteId }] },
  });
  const nuevo = { diaSemana: 0, horaInicio: bloque.horaInicio, horaFin: bloque.horaFin };
  const choques = mismoDia.filter((a) => seEmpalman(nuevo, { diaSemana: 0, horaInicio: a.horaInicio, horaFin: a.horaFin }));
  if (choques.some((a) => a.tutorId === bloque.tutorId)) return { ok: false, error: OCUPADO };
  if (choques.some((a) => a.estudianteId === estudianteId)) {
    return { ok: false, error: "Ya tienes otra asesoría a esa hora." };
  }

  try {
    const asesoria = await prisma.asesoria.create({
      data: {
        estudianteId, tutorId: bloque.tutorId, materiaId, fecha,
        horaInicio: bloque.horaInicio, horaFin: bloque.horaFin, modalidad: bloque.modalidad, lugar: bloque.lugar, tema,
      },
    });
    revalidatePath("/mis-asesorias");
    revalidatePath("/tutor/solicitudes");
    return { ok: true, id: asesoria.id };
  } catch (e) {
    // La base de datos también impide el empalme si dos personas reservan al mismo tiempo
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") return { ok: false, error: OCUPADO };
    console.error(e);
    return { ok: false, error: "No se pudo agendar. Intenta de nuevo." };
  }
}
