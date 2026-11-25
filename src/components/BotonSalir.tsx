"use client";

import { signOut } from "next-auth/react";
import { boton } from "@/components/estilos";

export function BotonSalir() {
  return (
    <button onClick={() => signOut({ callbackUrl: "/" })} className={boton.claro}>
      Salir
    </button>
  );
}
