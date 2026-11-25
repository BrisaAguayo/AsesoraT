"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Campo, estiloInput } from "@/components/Campo";
import { agendarAsesoria } from "./actions";
import { boton, aviso, enGrupo, grupoBotones } from "@/components/estilos";

interface Props {
  bloqueId: string;
  materiaId: string;
  resumen: { materia: string; tutor: string; horario: string; lugar: string };
  fechas: { valor: string; texto: string }[];
}

export function FormAgendar({ bloqueId, materiaId, resumen, fechas }: Props) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [agendada, setAgendada] = useState<{ fecha: string; tema: string } | null>(null);
  const [pendiente, iniciar] = useTransition();

  function enviar(evento: React.FormEvent<HTMLFormElement>) {
    // Se usa onSubmit (y no action) para que el formulario no se borre si hay errores
    evento.preventDefault();
    const formData = new FormData(evento.currentTarget);
    iniciar(async () => {
      const resultado = await agendarAsesoria(formData);
      if (!resultado.ok) {
        setError(resultado.error);
        router.refresh(); // actualiza las fechas libres por si alguien ocupó el horario
        return;
      }
      const fecha = fechas.find((f) => f.valor === formData.get("fecha"))?.texto ?? "";
      setAgendada({ fecha, tema: String(formData.get("tema")) });
    });
  }

  // HU-05, paso 3: confirmación en pantalla
  if (agendada) {
    return (
      <div role="status" className="flex flex-col gap-3 rounded-md bg-marca-acento p-5 text-sm text-white">
        <p className="text-lg font-semibold">Solicitud enviada</p>
        <p>
          Agendaste <strong>{resumen.materia}</strong> con {resumen.tutor} el <strong>{agendada.fecha}</strong> ({resumen.horario.split(" · ")[1]}).
        </p>
        <p>Tema: {agendada.tema}</p>
        <p>{resumen.lugar}</p>
        <p>Tu asesoría queda <strong>pendiente</strong> hasta que el tutor la confirme. Puedes ver su estado en Mis asesorías.</p>
        <div className={grupoBotones}>
          <Link href="/mis-asesorias" className={`${boton.claro} ${enGrupo}`}>Ir a Mis asesorías</Link>
          <Link href="/asesorias" className={`${boton.claro} ${enGrupo}`}>Buscar otra</Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4" noValidate>
      <input type="hidden" name="bloque" value={bloqueId} />
      <input type="hidden" name="materia" value={materiaId} />
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1 text-sm font-medium text-slate-700">Fecha</legend>
        <div className="grid grid-cols-2 gap-2">
          {fechas.map((f, i) => (
            <label key={f.valor} className="flex cursor-pointer items-center gap-2 rounded border border-slate-300 px-3 py-2 text-sm has-[:checked]:border-marca has-[:checked]:bg-marca-claro">
              <input type="radio" name="fecha" value={f.valor} defaultChecked={i === 0} /> {f.texto}
            </label>
          ))}
        </div>
      </fieldset>
      <Campo etiqueta="Tema a revisar">
        <textarea name="tema" rows={3} maxLength={200} placeholder="Ej. Integración por partes" className={estiloInput} />
      </Campo>
      {error && <p role="alert" className={aviso.error}>{error}</p>}
      <button type="submit" disabled={pendiente} className={boton.primario}>
        {pendiente ? "Agendando..." : "Confirmar solicitud"}
      </button>
    </form>
  );
}
