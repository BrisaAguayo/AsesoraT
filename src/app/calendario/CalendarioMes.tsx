"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { nombreEstado } from "@/lib/formato";
import { boton, colorEstado, etiqueta } from "@/components/estilos";

export interface AsesoriaDelDia {
  id: string;
  fecha: string; // AAAA-MM-DD
  horario: string;
  horaInicio: string;
  materia: string;
  otraPersona: string;
  estado: keyof typeof nombreEstado;
  lugar: string;
  tema: string;
}

interface Dia {
  fecha: string;
  numero: number;
  delMes: boolean;
}

// Punto pequeño con el color del estado
const colorPunto: Record<string, string> = {
  PENDIENTE: "bg-amber-400",
  CONFIRMADA: "bg-marca-acento",
  COMPLETADA: "bg-marca",
};

const diasSemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

function tituloDelDia(fecha: string) {
  const texto = new Intl.DateTimeFormat("es-MX", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" })
    .format(new Date(`${fecha}T00:00:00Z`))
    .replace(",", "");
  return `${texto[0].toUpperCase()}${texto.slice(1)}`;
}

export function CalendarioMes({
  dias,
  hoy,
  asesorias,
  etiquetaOtraPersona,
}: {
  dias: Dia[];
  hoy: string;
  asesorias: AsesoriaDelDia[];
  etiquetaOtraPersona: string;
}) {
  const [abierto, setAbierto] = useState<string | null>(null);
  const delDia = (fecha: string) => asesorias.filter((a) => a.fecha === fecha);

  // El modal se cierra con la tecla Esc
  useEffect(() => {
    if (!abierto) return;
    const cerrarConEsc = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(null);
    window.addEventListener("keydown", cerrarConEsc);
    return () => window.removeEventListener("keydown", cerrarConEsc);
  }, [abierto]);

  const seleccionadas = abierto ? delDia(abierto) : [];

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="grid grid-cols-7 border-b border-slate-200">
          {diasSemana.map((d) => (
            <div key={d} className="py-2 text-center text-xs font-semibold text-slate-500">
              <span className="sm:hidden">{d[0]}</span>
              <span className="hidden sm:inline">{d}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {dias.map((d) => {
            const suyas = delDia(d.fecha);
            const esHoy = d.fecha === hoy;
            const contenido = (
              <>
                <span className={`mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded-md text-xs font-medium sm:mx-0 ${esHoy ? "bg-marca text-white" : ""}`}>
                  {d.numero}
                </span>
                {/* Celular: solo puntos */}
                <span className="flex justify-center gap-1 sm:hidden">
                  {suyas.map((a) => <span key={a.id} className={`h-2 w-2 rounded-full ${colorPunto[a.estado]}`} />)}
                </span>
                {/* Escritorio: hora y materia */}
                <span className="hidden flex-col gap-1 sm:flex">
                  {suyas.map((a) => (
                    <span key={a.id} className="flex items-start gap-1.5 text-left text-xs leading-tight">
                      <span className={`mt-1 h-2 w-2 flex-none rounded-full ${colorPunto[a.estado]}`} />
                      <span className="line-clamp-2"><span className="text-slate-500">{a.horaInicio}</span> {a.materia}</span>
                    </span>
                  ))}
                </span>
              </>
            );
            const clases = `min-h-14 border-b border-r border-slate-200 p-1 text-center [&:nth-child(7n)]:border-r-0 sm:min-h-24 sm:p-1.5 sm:text-left ${d.delMes ? "" : "bg-slate-50 text-slate-300"}`;
            return suyas.length > 0 ? (
              <button key={d.fecha} type="button" onClick={() => setAbierto(d.fecha)}
                className={`${clases} flex flex-col hover:bg-marca-claro`} aria-label={`${tituloDelDia(d.fecha)}: ${suyas.length} asesoría${suyas.length === 1 ? "" : "s"}`}>
                {contenido}
              </button>
            ) : (
              <div key={d.fecha} className={`${clases} flex flex-col`}>{contenido}</div>
            );
          })}
        </div>
      </div>

      {asesorias.length > 0 && (
        <div className="flex flex-wrap gap-4 text-xs text-slate-500">
          {(["PENDIENTE", "CONFIRMADA", "COMPLETADA"] as const).map((e) => (
            <span key={e} className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${colorPunto[e]}`} /> {nombreEstado[e]}
            </span>
          ))}
        </div>
      )}

      {abierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" onClick={() => setAbierto(null)}>
          <div role="dialog" aria-modal="true" aria-labelledby="titulo-dia" onClick={(e) => e.stopPropagation()}
            className="max-h-full w-full max-w-md overflow-y-auto rounded-lg bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 id="titulo-dia" className="text-lg font-bold text-marca">{tituloDelDia(abierto)}</h2>
              <button type="button" onClick={() => setAbierto(null)} aria-label="Cerrar"
                className="rounded-md px-2 py-1 text-2xl leading-none text-slate-500 hover:bg-slate-100">×</button>
            </div>
            <div className="flex flex-col gap-3">
              {seleccionadas.map((a) => (
                <article key={a.id} className="flex flex-col gap-2 rounded-lg border border-slate-200 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold">{a.materia}</h3>
                    <span className={`${etiqueta} flex-none ${colorEstado[a.estado]}`}>{nombreEstado[a.estado]}</span>
                  </div>
                  <dl className="grid grid-cols-[5.5rem_1fr] gap-x-2 gap-y-1 text-sm">
                    <dt className="text-slate-500">Horario</dt><dd>{a.horario}</dd>
                    <dt className="text-slate-500">{etiquetaOtraPersona}</dt><dd>{a.otraPersona}</dd>
                    <dt className="text-slate-500">Lugar</dt><dd>{a.lugar}</dd>
                    <dt className="text-slate-500">Tema</dt><dd>{a.tema}</dd>
                  </dl>
                  <Link href={`/mis-asesorias/${a.id}`} className={`${boton.primario} w-full`}>Ver detalle</Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
