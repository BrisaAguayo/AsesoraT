"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Campo, estiloInput } from "@/components/Campo";
import { registrarUsuario, type EstadoRegistro } from "./actions";

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

  function enviar(formData: FormData) {
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

      <form action={enviar} className="flex flex-col gap-4" noValidate>
        <fieldset className="flex gap-3">
          <legend className="mb-1 text-sm font-medium text-slate-700">Me registro como</legend>
          <label className="flex flex-1 cursor-pointer items-center gap-2 rounded border border-slate-300 px-3 py-2 text-sm has-[:checked]:border-marca has-[:checked]:bg-marca-claro">
            <input type="radio" name="rol" value="ESTUDIANTE" defaultChecked /> Estudiante
          </label>
          <label className="flex flex-1 cursor-pointer items-center gap-2 rounded border border-slate-300 px-3 py-2 text-sm has-[:checked]:border-marca has-[:checked]:bg-marca-claro">
            <input type="radio" name="rol" value="TUTOR" /> Tutor (6.º semestre o más)
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
            <select name="semestre" defaultValue="1" className={estiloInput}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((s) => (
                <option key={s} value={s}>{s}.º</option>
              ))}
            </select>
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

        {estado && !estado.ok && estado.mensaje && <p className="text-sm text-red-700">{estado.mensaje}</p>}

        <button type="submit" disabled={pendiente} className="rounded bg-marca py-2 font-medium text-white disabled:opacity-60">
          {pendiente ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-500">
        ¿Ya tienes cuenta? <Link href="/login" className="font-medium text-marca underline">Inicia sesión</Link>
      </p>
    </section>
  );
}
