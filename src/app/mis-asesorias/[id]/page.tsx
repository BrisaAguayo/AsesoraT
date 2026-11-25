import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { obtenerSesion } from "@/lib/sesion";
import { formatearFecha, nombreEstado, nombreModalidad, nombreResultado } from "@/lib/formato";
import { inicioAsesoria, puedeCancelar } from "@/lib/horarios";
import { aviso as estiloAviso, boton, colorEstado, colorResultado, enGrupo, etiqueta, grupoBotones } from "@/components/estilos";
import { cancelarAsesoria, registrarResultado } from "../actions";
import { avisos } from "../avisos";

export const dynamic = "force-dynamic";

// Detalle de una asesoría (HU-09, CC-005): datos, estado y resultado si ya se completó
export default async function DetalleAsesoria({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ aviso?: string }>;
}) {
  const sesion = await obtenerSesion();
  if (!sesion) redirect("/login");

  const [{ id }, { aviso }] = await Promise.all([params, searchParams]);
  // Solo el estudiante o el tutor de la asesoría pueden verla
  const a = await prisma.asesoria.findFirst({
    where: { id, OR: [{ estudianteId: sesion.user.id }, { tutorId: sesion.user.id }] },
    // RNF-07: de la otra persona solo se muestra el nombre
    include: { materia: true, tutor: { select: { nombre: true } }, estudiante: { select: { nombre: true } } },
  });
  if (!a) notFound();

  const esTutor = a.tutorId === sesion.user.id;
  const ahora = new Date();
  const yaEmpezo = inicioAsesoria(a.fecha, a.horaInicio) <= ahora;
  const activa = a.estado === "PENDIENTE" || a.estado === "CONFIRMADA";
  const mensaje = aviso ? avisos[aviso] : undefined;

  const datos: [string, string][] = [
    [esTutor ? "Estudiante" : "Tutor", esTutor ? a.estudiante.nombre : a.tutor.nombre],
    ["Fecha", formatearFecha(a.fecha)],
    ["Horario", `${a.horaInicio} - ${a.horaFin}`],
    ["Lugar", `${nombreModalidad[a.modalidad]}, ${a.lugar ?? ""}`],
    ["Tema", a.tema],
  ];

  return (
    <section className="mx-auto flex max-w-lg flex-col gap-6">
      <Link href="/mis-asesorias" className="text-sm text-slate-500 underline">‹ Volver a Mis asesorías</Link>

      {mensaje && (
        <p role="status" className={mensaje.error ? estiloAviso.error : estiloAviso.exito}>{mensaje.texto}</p>
      )}

      <div className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-marca">{a.materia.nombre}</h1>
          <span className={`${etiqueta} ${colorEstado[a.estado]}`}>{nombreEstado[a.estado]}</span>
        </div>

        <dl className="grid grid-cols-3 gap-y-2 text-sm">
          {datos.map(([titulo, valor]) => (
            <div key={titulo} className="contents">
              <dt className="text-slate-500">{titulo}</dt>
              <dd className="col-span-2">{valor}</dd>
            </div>
          ))}
        </dl>

        {a.estado === "COMPLETADA" && (
          a.resultado ? (
            <div className={`flex items-center justify-between rounded-md px-4 py-3 ${colorResultado[a.resultado]}`}>
              <span className="text-sm font-medium">Resultado</span>
              <span className="text-base font-bold">{nombreResultado[a.resultado]}</span>
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-md bg-slate-300 px-4 py-3 text-slate-900">
              <span className="text-sm font-medium">Resultado</span>
              <span className="text-base font-bold">Sin resultado</span>
            </div>
          )
        )}

        {esTutor && a.estado === "CONFIRMADA" && yaEmpezo && (
          <div className="flex flex-col gap-3 rounded-md border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-700">Registrar resultado y marcar como completada</p>
            <div className={grupoBotones}>
              <form action={registrarResultado}>
                <input type="hidden" name="id" value={a.id} />
                <input type="hidden" name="origen" value="detalle" />
                <input type="hidden" name="resultado" value="APROBADA" />
                <button className={`${boton.base} ${enGrupo} bg-emerald-700 text-white hover:bg-emerald-800`}>✓ Aprobada</button>
              </form>
              <form action={registrarResultado}>
                <input type="hidden" name="id" value={a.id} />
                <input type="hidden" name="origen" value="detalle" />
                <input type="hidden" name="resultado" value="NO_APROBADA" />
                <button className={`${boton.base} ${enGrupo} bg-orange-700 text-white hover:bg-orange-800`}>✗ No aprobada</button>
              </form>
            </div>
          </div>
        )}

        {activa && puedeCancelar(a.fecha, a.horaInicio, ahora) && (
          <form action={cancelarAsesoria}>
            <input type="hidden" name="id" value={a.id} />
            <input type="hidden" name="origen" value="detalle" />
            <button className={`${boton.peligro} w-full`}>Cancelar asesoría</button>
          </form>
        )}
      </div>
    </section>
  );
}
