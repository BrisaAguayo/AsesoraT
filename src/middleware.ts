import { withAuth } from "next-auth/middleware";

// Protege las pantallas que requieren sesión y las limita según el rol (RNF-04)
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (!token) return false;
      if (req.nextUrl.pathname.startsWith("/tutor")) return token.rol === "TUTOR";
      return true;
    },
  },
});

export const config = {
  matcher: ["/panel/:path*", "/tutor/:path*", "/mis-asesorias/:path*"],
};
