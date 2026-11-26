import Link from "next/link";
import { obtenerSesion } from "@/lib/sesion";
import { BotonSalir } from "@/components/BotonSalir";
import { boton } from "@/components/estilos";

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
              {(sesion.user.rol === "ESTUDIANTE" || sesion.user.rol === "TUTOR") && (
                <Link href="/calendario" className="hover:underline">Calendario</Link>
              )}
              <Link href="/panel" className="hidden hover:underline sm:inline">
                {sesion.user.name?.split(" ")[0]}
              </Link>
              <BotonSalir />
            </>
          ) : (
            <Link href="/login" className={boton.claro}>Entrar</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
