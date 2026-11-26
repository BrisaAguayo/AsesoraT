"use client";

import { useRef, useState } from "react";
import { estiloInput } from "@/components/Campo";
import { boton } from "@/components/estilos";
import { guardarEnlace } from "../actions";

const botonIcono = `${boton.claro} h-10 w-10 flex-none border border-slate-300 !px-0`;

// CC-007: el tutor escribe el link de la reunión en la misma fila que los demás datos.
// Con el lápiz se edita; si se guarda vacío, el link se elimina.
export function CampoEnlace({ id, enlace }: { id: string; enlace: string | null }) {
  const [editando, setEditando] = useState(false);
  const caja = useRef<HTMLInputElement>(null);

  function editar() {
    setEditando(true);
    requestAnimationFrame(() => caja.current?.focus());
  }

  return (
    // Al guardar, la caja vuelve a quedar solo de lectura con el lápiz
    <form action={guardarEnlace} onSubmit={() => setEditando(false)} className="flex items-center gap-2">
      <input type="hidden" name="id" value={id} />
      <input ref={caja} id="enlaceReunion" name="enlaceReunion" type="url" inputMode="url" defaultValue={enlace ?? ""}
        readOnly={!editando} placeholder="Ingresa el link de la reunión" aria-label="Link de la reunión"
        className={`${estiloInput} min-w-0 text-sm ${editando ? "" : "bg-slate-50 text-slate-700"}`} />
      {editando ? (
        <button key="guardar" type="submit" className={botonIcono} aria-label="Guardar link" title="Guardar link">
          <svg viewBox="0 0 20 20" className="h-4 w-4 flex-none" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 10.5l4 4 8-9" />
          </svg>
        </button>
      ) : (
        <button key="editar" type="button" onClick={editar} className={botonIcono} aria-label="Editar link" title="Editar link">
          <svg viewBox="0 0 20 20" className="h-4 w-4 flex-none" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M13.5 3.5l3 3L7 16H4v-3z" />
            <path d="M11.5 5.5l3 3" />
          </svg>
        </button>
      )}
    </form>
  );
}
