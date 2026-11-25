import { obtenerSesion } from "@/lib/sesion";
import { consultarReporte, leerPeriodo } from "@/lib/consultaReporte";
import { reporteACsv } from "@/lib/reporte";

export const dynamic = "force-dynamic";

// HU-11: exporta el reporte de horas a CSV
export async function GET(request: Request) {
  const sesion = await obtenerSesion();
  if (!sesion || sesion.user.rol !== "COORDINADOR") return new Response("No autorizado", { status: 403 });

  const parametros = new URL(request.url).searchParams;
  const periodo = leerPeriodo(parametros.get("desde") ?? undefined, parametros.get("hasta") ?? undefined);
  const filas = await consultarReporte(periodo.desde, periodo.hasta);

  return new Response(reporteACsv(filas, periodo.desdeISO, periodo.hastaISO), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="reporte-horas-${periodo.desdeISO}-a-${periodo.hastaISO}.csv"`,
    },
  });
}
