import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Pantallas que solo puede abrir un rol (RNF-04)
const pantallasPorRol: [string, string[]][] = [
  ["/tutor", ["TUTOR"]],
  ["/coordinacion", ["COORDINADOR"]],
  ["/asesorias/agendar", ["ESTUDIANTE"]],
  ["/calendario", ["ESTUDIANTE", "TUTOR"]],
];

// Protege las pantallas que requieren sesión y las limita según el rol.
// Sin sesión: al inicio de sesión, con la dirección de regreso.
// Con sesión pero de otro rol: al panel con el aviso "No tienes acceso a esa pantalla."
// Con sesión en /login o /registro: al panel.
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const ruta = req.nextUrl.pathname;

  // Inicio de sesión y registro: solo sin sesión; con sesión llevan al panel
  if (ruta === "/login" || ruta === "/registro") {
    return token ? NextResponse.redirect(new URL("/panel", req.url)) : NextResponse.next();
  }

  if (!token) {
    const login = new URL("/login", req.url);
    login.searchParams.set("callbackUrl", ruta + req.nextUrl.search);
    return NextResponse.redirect(login);
  }

  const regla = pantallasPorRol.find(([prefijo]) => ruta.startsWith(prefijo));
  if (regla && !regla[1].includes(token.rol)) {
    return NextResponse.redirect(new URL("/panel?aviso=sin-acceso", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/registro", "/panel/:path*", "/tutor/:path*", "/mis-asesorias/:path*", "/asesorias/agendar/:path*", "/coordinacion/:path*", "/calendario/:path*"],
};
