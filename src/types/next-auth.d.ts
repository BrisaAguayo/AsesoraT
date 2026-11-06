import type { Rol } from "@prisma/client";
import type { DefaultSession } from "next-auth";

// Agrega el id y el rol del usuario a la sesión de NextAuth
declare module "next-auth" {
  interface User {
    rol: Rol;
  }
  interface Session {
    user: DefaultSession["user"] & { id: string; rol: Rol };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    rol: Rol;
  }
}
