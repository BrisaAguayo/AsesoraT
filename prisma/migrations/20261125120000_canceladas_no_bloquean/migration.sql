-- Las asesorías canceladas se conservan como registro informativo y ya no ocupan el horario (CC-004, HU-07).
-- Se cambia la restricción única por un índice único parcial que ignora las canceladas (RF-06).

-- DropIndex
DROP INDEX "Asesoria_tutorId_fecha_horaInicio_key";

-- CreateIndex
CREATE UNIQUE INDEX "Asesoria_tutor_horario_activo_key" ON "Asesoria"("tutorId", "fecha", "horaInicio") WHERE "estado" <> 'CANCELADA';

-- CreateIndex
CREATE INDEX "Asesoria_tutorId_fecha_idx" ON "Asesoria"("tutorId", "fecha");
