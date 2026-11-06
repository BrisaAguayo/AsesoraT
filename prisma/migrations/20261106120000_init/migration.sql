-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ESTUDIANTE', 'TUTOR', 'COORDINADOR');

-- CreateEnum
CREATE TYPE "Modalidad" AS ENUM ('PRESENCIAL', 'VIRTUAL');

-- CreateEnum
CREATE TYPE "EstadoAsesoria" AS ENUM ('PENDIENTE', 'CONFIRMADA', 'CANCELADA', 'COMPLETADA');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "numeroControl" TEXT NOT NULL,
    "carrera" TEXT NOT NULL,
    "semestre" INTEGER NOT NULL,
    "rol" "Rol" NOT NULL DEFAULT 'ESTUDIANTE',
    "passwordHash" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Materia" (
    "id" TEXT NOT NULL,
    "clave" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "semestre" INTEGER NOT NULL,

    CONSTRAINT "Materia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TutorMateria" (
    "tutorId" TEXT NOT NULL,
    "materiaId" TEXT NOT NULL,

    CONSTRAINT "TutorMateria_pkey" PRIMARY KEY ("tutorId","materiaId")
);

-- CreateTable
CREATE TABLE "Disponibilidad" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "diaSemana" INTEGER NOT NULL,
    "horaInicio" TEXT NOT NULL,
    "horaFin" TEXT NOT NULL,
    "modalidad" "Modalidad" NOT NULL,
    "lugar" TEXT,

    CONSTRAINT "Disponibilidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asesoria" (
    "id" TEXT NOT NULL,
    "estudianteId" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "materiaId" TEXT NOT NULL,
    "fecha" DATE NOT NULL,
    "horaInicio" TEXT NOT NULL,
    "horaFin" TEXT NOT NULL,
    "modalidad" "Modalidad" NOT NULL,
    "lugar" TEXT,
    "tema" TEXT NOT NULL,
    "estado" "EstadoAsesoria" NOT NULL DEFAULT 'PENDIENTE',
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Asesoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evaluacion" (
    "id" TEXT NOT NULL,
    "asesoriaId" TEXT NOT NULL,
    "calificacion" INTEGER NOT NULL,
    "comentario" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Evaluacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_numeroControl_key" ON "Usuario"("numeroControl");

-- CreateIndex
CREATE UNIQUE INDEX "Materia_clave_key" ON "Materia"("clave");

-- CreateIndex
CREATE UNIQUE INDEX "Asesoria_tutorId_fecha_horaInicio_key" ON "Asesoria"("tutorId", "fecha", "horaInicio");

-- CreateIndex
CREATE UNIQUE INDEX "Evaluacion_asesoriaId_key" ON "Evaluacion"("asesoriaId");

-- AddForeignKey
ALTER TABLE "TutorMateria" ADD CONSTRAINT "TutorMateria_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorMateria" ADD CONSTRAINT "TutorMateria_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disponibilidad" ADD CONSTRAINT "Disponibilidad_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asesoria" ADD CONSTRAINT "Asesoria_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asesoria" ADD CONSTRAINT "Asesoria_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asesoria" ADD CONSTRAINT "Asesoria_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluacion" ADD CONSTRAINT "Evaluacion_asesoriaId_fkey" FOREIGN KEY ("asesoriaId") REFERENCES "Asesoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

