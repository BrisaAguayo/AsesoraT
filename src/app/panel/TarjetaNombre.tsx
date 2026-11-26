"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { estiloInput } from "@/components/Campo";
import { boton } from "@/components/estilos";
import { normalizarNombre } from "@/lib/validaciones";
import { cambiarNombre } from "./actions";

const botonIcono = `${boton.claro} h-10 w-10 flex-none border border-slate-300 !px-0`;

// CC-008: tarjeta "Cambiar nombre". Cerrada muestra solo título y descripción;
// al seleccionarla aparecen la caja y el lápiz. Un clic fuera de la tarjeta guarda el nombre.
export function TarjetaNombre({ nombre, abrirAlInicio }: { nombre: string; abrirAlInicio: boolean }) {
  const [abierta, setAbierta] = useState(abrirAlInicio);
  const [editando, setEditando] = useState(abrirAlInicio);
  const [, iniciar] = useTransition();
  const tarjeta = useRef<HTMLDivElement>(null);
  const caja = useRef<HTMLInputElement>(null);

  function guardar() {
    const valor = normalizarNombre(caja.current?.value ?? "");
    setEditando(false);
    if (valor === nombre) {
      setAbierta(false);
      return;
    }
    const datos = new FormData();
    datos.set("nombre", valor);
    iniciar(() => cambiarNombre(datos));
  }

  // Clic fuera de la tarjeta abierta: guarda si se estaba editando y la cierra
  useEffect(() => {
    if (!abierta) return;
    function alHacerClic(evento: MouseEvent) {
      if (tarjeta.current?.contains(evento.target as Node)) return;
      if (editando) guardar();
      else setAbierta(false);
    }
    document.addEventListener("mousedown", alHacerClic);
    return () => document.removeEventListener("mousedown", alHacerClic);
  });

  function alternar(evento: React.MouseEvent) {
    if ((evento.target as HTMLElement).closest("[data-fila-nombre]")) return;
    if (abierta && editando) guardar();
    else setAbierta(!abierta);
  }

  function editar() {
    setEditando(true);
    requestAnimationFrame(() => {
      caja.current?.focus();
      caja.current?.select();
    });
  }

  return (
    <div ref={tarjeta} onClick={alternar}
      className={`cursor-pointer rounded-lg border bg-white p-5 shadow-sm transition hover:border-marca ${abierta ? "border-marca" : "border-slate-200"}`}>
      <h2 className="font-semibold text-marca">Cambiar nombre</h2>
      <p className="mt-1 text-sm text-slate-500">Corrige tu nombre completo.</p>
      {abierta && (
        <form data-fila-nombre onSubmit={(e) => { e.preventDefault(); guardar(); }} className="mt-3 flex items-center gap-2">
          <input ref={caja} name="nombre" defaultValue={nombre} readOnly={!editando} autoComplete="name"
            aria-label="Nombre completo" className={`${estiloInput} min-w-0 text-sm ${editando ? "" : "bg-slate-50 text-slate-700"}`} />
          {editando ? (
            <button key="guardar" type="submit" className={botonIcono} aria-label="Guardar nombre" title="Guardar nombre">
              <svg viewBox="0 0 20 20" className="h-4 w-4 flex-none" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 10.5l4 4 8-9" />
              </svg>
            </button>
          ) : (
            <button key="editar" type="button" onClick={editar} className={botonIcono} aria-label="Editar nombre" title="Editar nombre">
              <svg viewBox="0 0 20 20" className="h-4 w-4 flex-none" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M13.5 3.5l3 3L7 16H4v-3z" />
                <path d="M11.5 5.5l3 3" />
              </svg>
            </button>
          )}
        </form>
      )}
    </div>
  );
}
