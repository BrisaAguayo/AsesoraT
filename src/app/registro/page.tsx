"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Campo, estiloInput } from "@/components/Campo";
import { registrarUsuario, type EstadoRegistro } from "./actions";
import { boton, aviso } from "@/components/estilos";
import { SEMESTRE_MINIMO_TUTOR } from "@/lib/validaciones";

const carreras = [
  "Ingeniería en Sistemas Computacionales",
  "Ingeniería Informática",
  "Ingeniería en Tecnologías de la Información y Comunicaciones",
  "Ingeniería Industrial",
  "Ingeniería Electrónica",
  "Ingeniería Mecatrónica",
];

export default function Registro() {
  const router = useRouter();
  const [estado, setEstado] = useState<EstadoRegistro | null>(null);
  const [pendiente, iniciar] = useTransition();
  const errores = estado && !estado.ok ? estado.errores ?? {} : {};
  const [esTutor, setEsTutor] = useState(false);
  const [semestre, setSemestre] = useState(1);

  // El mismo selector sirve a los dos roles: con Tutor se deshabilitan los semestres menores al mínimo
  function cambiarRol(evento: React.ChangeEvent<HTMLInputElement>) {
    const tutor = evento.target.value === "TUTOR";
    setEsTutor(tutor);
    if (tutor && semestre < SEMESTRE_MINIMO_TUTOR) setSemestre(SEMESTRE_MINIMO_TUTOR);
  }

  function enviar(evento: React.FormEvent<HTMLFormElement>) {
    // Se usa onSubmit (y no action) para que el formulario no se borre si hay errores
    evento.preventDefault();
    const formData = new FormData(evento.currentTarget);
    iniciar(async () => {
      const resultado = await registrarUsuario(formData);
      setEstado(resultado);
      if (!resultado.ok) return;

      // Cuenta creada: inicia sesión y lleva al panel según el rol
      await signIn("credentials", {
        correo: formData.get("correo"),
        password: formData.get("password"),
        redirect: false,
      });
      router.push("/panel");
      router.refresh();
    });
  }

  return (
    <section className="mx-auto max-w-lg rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="mb-1 text-xl font-bold text-marca">Crear cuenta</h1>
      <p className="mb-5 text-sm text-slate-500">Regístrate con tu correo institucional del Tecnológico de Tijuana.</p>

      <form onSubmit={enviar} className="flex flex-col gap-4" noValidate>
        <fieldset className="flex gap-3">
          <legend className="mb-1 text-sm font-medium text-slate-700">Me registro como</legend>
          <label className="flex flex-1 cursor-pointer items-center gap-2 rounded border border-slate-300 px-3 py-2 text-sm has-[:checked]:border-marca has-[:checked]:bg-marca-claro">
            <input type="radio" name="rol" value="ESTUDIANTE" defaultChecked onChange={cambiarRol} /> Estudiante
          </label>
          <label className="flex flex-1 cursor-pointer items-center gap-2 rounded border border-slate-300 px-3 py-2 text-sm has-[:checked]:border-marca has-[:checked]:bg-marca-claro">
            <input type="radio" name="rol" value="TUTOR" onChange={cambiarRol} /> Tutor (6.º semestre o más)
          </label>
        </fieldset>
        {errores.rol && <p className="text-xs text-red-700">{errores.rol}</p>}

        <Campo etiqueta="Nombre completo" error={errores.nombre}>
          <input name="nombre" autoComplete="name" className={estiloInput} />
        </Campo>
        <Campo etiqueta="Correo institucional" error={errores.correo}>
          <input name="correo" type="email" placeholder="l00000000@tectijuana.edu.mx" className={estiloInput} />
        </Campo>
        <div className="grid grid-cols-2 gap-3">
          <Campo etiqueta="Número de control" error={errores.numeroControl}>
            <input name="numeroControl" inputMode="numeric" placeholder="00000000" className={estiloInput} />
          </Campo>
          <Campo etiqueta="Semestre" error={errores.semestre}>
            <select name="semestre" value={semestre} onChange={(e) => setSemestre(Number(e.target.value))} className={estiloInput}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((s) => (
                <option key={s} value={s} disabled={esTutor && s < SEMESTRE_MINIMO_TUTOR}>{s}.º</option>
              ))}
            </select>
            {esTutor && <span className="text-xs text-slate-500">Los tutores deben cursar {SEMESTRE_MINIMO_TUTOR}.º semestre o más.</span>}
          </Campo>
        </div>
        <Campo etiqueta="Carrera" error={errores.carrera}>
          <select name="carrera" defaultValue={carreras[0]} className={estiloInput}>
            {carreras.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Campo>
        <Campo etiqueta="Contraseña" error={errores.password}>
          <input name="password" type="password" autoComplete="new-password" className={estiloInput} />
        </Campo>

        {estado && !estado.ok && estado.mensaje && <p role="alert" className={aviso.error}>{estado.mensaje}</p>}

        <button type="submit" disabled={pendiente} className={boton.primario}>
          {pendiente ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-500">
        ¿Ya tienes cuenta? <Link href="/login" className="font-medium text-marca underline">Inicia sesión</Link>
      </p>
    </section>
  );
}
