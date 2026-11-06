"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Campo, estiloInput } from "@/components/Campo";
import { esCorreoInstitucional } from "@/lib/validaciones";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pendiente, iniciar] = useTransition();

  function enviar(evento: React.FormEvent<HTMLFormElement>) {
    // Se usa onSubmit (y no action) para que el formulario no se borre si hay errores
    evento.preventDefault();
    const formData = new FormData(evento.currentTarget);
    const correo = String(formData.get("correo") ?? "");
    const password = String(formData.get("password") ?? "");

    if (!esCorreoInstitucional(correo)) {
      setError("Usa tu correo institucional @tectijuana.edu.mx.");
      return;
    }

    iniciar(async () => {
      const respuesta = await signIn("credentials", { correo, password, redirect: false });
      if (!respuesta || respuesta.error) {
        setError("Correo o contraseña incorrectos.");
        return;
      }
      router.push("/panel");
      router.refresh();
    });
  }

  return (
    <section className="mx-auto max-w-sm rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="mb-1 text-xl font-bold text-marca">Iniciar sesión</h1>
      <p className="mb-5 text-sm text-slate-500">Usa tu correo institucional.</p>
      <form onSubmit={enviar} className="flex flex-col gap-4" noValidate>
        <Campo etiqueta="Correo">
          <input name="correo" type="email" placeholder="l00000000@tectijuana.edu.mx" className={estiloInput} />
        </Campo>
        <Campo etiqueta="Contraseña">
          <input name="password" type="password" autoComplete="current-password" className={estiloInput} />
        </Campo>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button type="submit" disabled={pendiente} className="rounded bg-marca py-2 font-medium text-white disabled:opacity-60">
          {pendiente ? "Entrando..." : "Entrar"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-500">
        ¿No tienes cuenta? <Link href="/registro" className="font-medium text-marca underline">Regístrate</Link>
      </p>
    </section>
  );
}
