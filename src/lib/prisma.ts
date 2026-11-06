import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Cliente único de Prisma conectado a PostgreSQL mediante el adaptador "pg".
// Funciona igual con PostgreSQL local y con Neon (solo cambia DATABASE_URL).
function crearCliente() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  return new PrismaClient({ adapter });
}

// Reutiliza una sola instancia en desarrollo para no abrir conexiones de más
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? crearCliente();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
