import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { esCorreoInstitucional, normalizarCorreo } from "@/lib/validaciones";

// Configuración de NextAuth.js: inicio de sesión con correo institucional y contraseña (HU-01).
export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt", maxAge: 60 * 60 * 8 }, // la sesión dura 8 horas
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Correo institucional",
      credentials: {
        correo: { label: "Correo", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const correo = normalizarCorreo(credentials?.correo ?? "");
        const password = credentials?.password ?? "";
        if (!esCorreoInstitucional(correo) || password.length === 0) return null;

        const usuario = await prisma.usuario.findUnique({ where: { correo } });
        if (!usuario) return null;

        const coincide = await bcrypt.compare(password, usuario.passwordHash);
        if (!coincide) return null;

        return { id: usuario.id, name: usuario.nombre, email: usuario.correo, rol: usuario.rol };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.rol = user.rol;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.rol = token.rol;
      }
      return session;
    },
  },
};
