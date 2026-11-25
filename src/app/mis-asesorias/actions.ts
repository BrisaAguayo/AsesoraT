"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { obtenerSesion } from "@/lib/sesion";
import { inicioAsesoria, puedeCancelar } from "@/lib/horarios";

// HU-07 (RF-07): estudiante o tutor cancelan hasta 2 horas antes.
// La asesoría queda registrada como cancelada y el horario vuelve a estar disponible.
export async function cancelarAsesoria(formData: FormData) {
  const sesion = await obtenerSesion();
  if (!sesion) redirect("/login");

  const id = String(formData.get("id"));
  const asesoria = await prisma.asesoria.findFirst({
    where: { id, OR: [{ estudianteId: sesion.user.id }, { tutorId: sesion.user.id }] },
  });

  if (!asesoria || (asesoria.estado !== "PENDIENTE" && asesoria.estado !== "CONFIRMADA")) {
    redirect("/mis-asesorias?aviso=no-cancelable");
  }
  if (!puedeCancelar(asesoria.fecha, asesoria.horaInicio)) redirect("/mis-asesorias?aviso=tarde");

  await prisma.asesoria.update({ where: { id }, data: { estado: "CANCELADA" } });

  revalidatePath("/mis-asesorias");
  revalidatePath("/tutor/solicitudes");
  redirect("/mis-asesorias?aviso=cancelada");
}

// HU-09: el tutor marca como completada una asesoría confirmada que ya ocurrió.
// Las completadas son las que cuenta el reporte de horas (HU-11).
export async function completarAsesoria(formData: FormData) {
  const sesion = await obtenerSesion();
  if (!sesion || sesion.user.rol !== "TUTOR") redirect("/login");

  const id = String(formData.get("id"));
  const asesoria = await prisma.asesoria.findFirst({ where: { id, tutorId: sesion.user.id, estado: "CONFIRMADA" } });
  if (!asesoria || inicioAsesoria(asesoria.fecha, asesoria.horaInicio) > new Date()) {
    redirect("/mis-asesorias?aviso=no-completable");
  }

  await prisma.asesoria.update({ where: { id }, data: { estado: "COMPLETADA" } });

  revalidatePath("/mis-asesorias");
  revalidatePath("/coordinacion/reporte");
  redirect("/mis-asesorias?aviso=completada");
}
