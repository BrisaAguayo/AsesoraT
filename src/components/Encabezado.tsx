import Link from "next/link";
import { obtenerSesion } from "@/lib/sesion";
import { BotonSalir } from "@/components/BotonSalir";

export async function Encabezado() {
  const sesion = await obtenerSesion();

  return (
    <header className="bg-marca text-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href={sesion ? "/panel" : "/"} className="text-lg font-bold tracking-tight">
          Asesora<span className="text-emerald-300">T</span>
        </Link>
        <div className="flex items-center gap-3 whitespace-nowrap text-sm">
          <Link href="/asesorias" className="hover:underline">Buscar</Link>
          {sesion ? (
            <>
              <Link href="/panel" className="hidden hover:underline sm:inline">
                {sesion.user.name?.split(" ")[0]}
              </Link>
              <BotonSalir />
            </>
          ) : (
            <Link href="/login" className="rounded bg-white/15 px-3 py-1 hover:bg-white/25">Entrar</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
