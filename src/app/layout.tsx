import type { Metadata } from "next";
import "./globals.css";
import { Encabezado } from "@/components/Encabezado";

export const metadata: Metadata = {
  title: "AsesoraT",
  description: "Agenda asesorías con tutores del Tecnológico de Tijuana",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Encabezado />
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
