import { withAuth } from "next-auth/middleware";

// Protege las pantallas que requieren sesión y las limita según el rol (RNF-04)
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (!token) return false;
      const ruta = req.nextUrl.pathname;
      if (ruta.startsWith("/tutor")) return token.rol === "TUTOR";
      if (ruta.startsWith("/coordinacion")) return token.rol === "COORDINADOR";
      if (ruta.startsWith("/asesorias/agendar")) return token.rol === "ESTUDIANTE";
      return true;
    },
  },
});

export const config = {
  matcher: ["/panel/:path*", "/tutor/:path*", "/mis-asesorias/:path*", "/asesorias/agendar/:path*", "/coordinacion/:path*"],
};
