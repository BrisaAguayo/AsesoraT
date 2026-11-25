"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Campo, estiloInput } from "@/components/Campo";
import { dias } from "@/lib/formato";
import { guardarBloque } from "./actions";

export interface ValoresBloque {
  id?: string;
  diaSemana: number;
  horaInicio: string;
  horaFin: string;
  modalidad: "PRESENCIAL" | "VIRTUAL";
  lugar: string;
}

const nuevo: ValoresBloque = { diaSemana: 1, horaInicio: "13:00", horaFin: "14:00", modalidad: "PRESENCIAL", lugar: "" };

export function FormBloque({ valores }: { valores?: ValoresBloque }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pendiente, iniciar] = useTransition();
  const v = valores ?? nuevo;

  function enviar(evento: React.FormEvent<HTMLFormElement>) {
    // Se usa onSubmit (y no action) para que el formulario no se borre si hay errores
    evento.preventDefault();
    const formData = new FormData(evento.currentTarget);
    iniciar(async () => {
      const resultado = await guardarBloque(formData);
      if (!resultado.ok) {
        setError(resultado.error);
        return;
      }
      setError("");
      router.push("/tutor/disponibilidad?guardado=1");
      router.refresh();
    });
  }

  return (
    <form key={v.id ?? "nuevo"} onSubmit={enviar} className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4" noValidate>
      <h2 className="font-semibold text-marca">{v.id ? "Editar bloque" : "Agregar bloque"}</h2>
      {v.id && <input type="hidden" name="id" value={v.id} />}
      <div className="grid grid-cols-3 gap-3">
        <Campo etiqueta="Día">
          <select name="diaSemana" defaultValue={v.diaSemana} className={estiloInput}>
            {[1, 2, 3, 4, 5].map((d) => <option key={d} value={d}>{dias[d]}</option>)}
          </select>
        </Campo>
        <Campo etiqueta="Inicio">
          <input name="horaInicio" type="time" step={1800} defaultValue={v.horaInicio} className={estiloInput} />
        </Campo>
        <Campo etiqueta="Fin">
          <input name="horaFin" type="time" step={1800} defaultValue={v.horaFin} className={estiloInput} />
        </Campo>
      </div>
      <fieldset className="flex gap-3">
        <legend className="mb-1 text-sm font-medium text-slate-700">Modalidad</legend>
        {(["PRESENCIAL", "VIRTUAL"] as const).map((m) => (
          <label key={m} className="flex flex-1 cursor-pointer items-center gap-2 rounded border border-slate-300 px-3 py-2 text-sm has-[:checked]:border-marca has-[:checked]:bg-marca-claro">
            <input type="radio" name="modalidad" value={m} defaultChecked={v.modalidad === m} /> {m === "PRESENCIAL" ? "Presencial" : "Virtual"}
          </label>
        ))}
      </fieldset>
      <Campo etiqueta="Lugar o enlace">
        <input name="lugar" defaultValue={v.lugar} placeholder="Edificio J, aula 5 o enlace de Google Meet" className={estiloInput} />
      </Campo>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <div className="flex items-center gap-3">
        <button type="submit" disabled={pendiente} className="rounded bg-marca px-5 py-2 font-medium text-white disabled:opacity-60">
          {pendiente ? "Guardando..." : v.id ? "Guardar cambios" : "Agregar bloque"}
        </button>
        {v.id && <Link href="/tutor/disponibilidad" className="text-sm text-slate-500 underline">Cancelar edición</Link>}
      </div>
    </form>
  );
}
