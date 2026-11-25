"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { obtenerSesion } from "@/lib/sesion";

// HU-06: el tutor confirma o rechaza una solicitud pendiente (RF-07).
// Rechazar deja la asesoría como cancelada y libera el horario.
export async function responderSolicitud(formData: FormData) {
  const sesion = await obtenerSesion();
  if (!sesion || sesion.user.rol !== "TUTOR") redirect("/login");

  const decision = String(formData.get("decision"));
  if (decision !== "confirmar" && decision !== "rechazar") redirect("/tutor/solicitudes");

  await prisma.asesoria.updateMany({
    where: { id: String(formData.get("id")), tutorId: sesion.user.id, estado: "PENDIENTE" },
    data: { estado: decision === "confirmar" ? "CONFIRMADA" : "CANCELADA" },
  });

  revalidatePath("/tutor/solicitudes");
  revalidatePath("/mis-asesorias");
  redirect(`/tutor/solicitudes?respuesta=${decision === "confirmar" ? "confirmada" : "rechazada"}`);
}
