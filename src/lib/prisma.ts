import { PrismaClient } from "@prisma/client";

// Reutiliza una sola instancia de Prisma en desarrollo para no abrir conexiones de más
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
