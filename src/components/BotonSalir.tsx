"use client";

import { signOut } from "next-auth/react";

export function BotonSalir() {
  return (
    <button onClick={() => signOut({ callbackUrl: "/" })} className="rounded bg-white/15 px-3 py-1 hover:bg-white/25">
      Salir
    </button>
  );
}
