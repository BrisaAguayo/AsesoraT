-- Resultado de una asesoría completada: aprobada o no aprobada (CC-005).

-- CreateEnum
CREATE TYPE "ResultadoAsesoria" AS ENUM ('APROBADA', 'NO_APROBADA');

-- AlterTable
ALTER TABLE "Asesoria" ADD COLUMN "resultado" "ResultadoAsesoria";
