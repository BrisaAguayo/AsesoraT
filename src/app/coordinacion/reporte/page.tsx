import { redirect } from "next/navigation";
import { obtenerSesion } from "@/lib/sesion";
import { consultarReporte, leerPeriodo } from "@/lib/consultaReporte";
import { boton } from "@/components/estilos";

export const dynamic = "force-dynamic";

// HU-11: la coordinación consulta las asesorías completadas y las horas por tutor
export default async function Reporte({ searchParams }: { searchParams: Promise<{ desde?: string; hasta?: string }> }) {
  const sesion = await obtenerSesion();
  if (!sesion || sesion.user.rol !== "COORDINADOR") redirect("/login");

  const { desde: d, hasta: h } = await searchParams;
  const periodo = leerPeriodo(d, h);
  const filas = await consultarReporte(periodo.desde, periodo.hasta);
  const totalAsesorias = filas.reduce((s, f) => s + f.asesorias, 0);
  const totalHoras = filas.reduce((s, f) => s + f.horas, 0);
  const estiloFiltro = "rounded border border-slate-300 bg-white px-3 py-2 text-sm";

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-marca">Reporte de horas</h1>
        <p className="text-slate-500">Asesorías completadas y horas impartidas por cada tutor en el periodo.</p>
      </div>

      <form className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-slate-700">Desde</span>
          <input type="date" name="desde" defaultValue={periodo.desdeISO} className={estiloFiltro} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-slate-700">Hasta</span>
          <input type="date" name="hasta" defaultValue={periodo.hastaISO} className={estiloFiltro} />
        </label>
        <button className={boton.primario}>Consultar</button>
        <a href={`/coordinacion/reporte/csv?desde=${periodo.desdeISO}&hasta=${periodo.hastaISO}`}
          className={boton.exito}>
          Exportar CSV
        </a>
      </form>

      {filas.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center text-slate-500">
          No hay asesorías completadas en este periodo.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-marca-claro text-marca">
              <tr>
                <th className="px-4 py-2">Tutor</th>
                <th className="px-4 py-2 text-right">Asesorías completadas</th>
                <th className="px-4 py-2 text-right">Horas</th>
              </tr>
            </thead>
            <tbody>
              {filas.map((f) => (
                <tr key={f.tutor} className="border-t border-slate-100">
                  <td className="px-4 py-2">{f.tutor}</td>
                  <td className="px-4 py-2 text-right">{f.asesorias}</td>
                  <td className="px-4 py-2 text-right">{f.horas}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-slate-200 font-semibold">
                <td className="px-4 py-2">Total</td>
                <td className="px-4 py-2 text-right">{totalAsesorias}</td>
                <td className="px-4 py-2 text-right">{totalHoras}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </section>
  );
}
