import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const materias = await Promise.all(
    [
      { clave: "ACF-0901", nombre: "Cálculo Diferencial", semestre: 1 },
      { clave: "ACF-0902", nombre: "Cálculo Integral", semestre: 2 },
      { clave: "SCD-1008", nombre: "Fundamentos de Programación", semestre: 1 },
      { clave: "AED-1026", nombre: "Estructura de Datos", semestre: 3 },
    ].map((m) => prisma.materia.upsert({ where: { clave: m.clave }, update: {}, create: m })),
  );

  const tutora = await prisma.usuario.upsert({
    where: { correo: "tutora.demo@tectijuana.edu.mx" },
    update: {},
    create: {
      nombre: "Andrea López",
      correo: "tutora.demo@tectijuana.edu.mx",
      numeroControl: "00000001",
      carrera: "Ingeniería en Sistemas Computacionales",
      semestre: 8,
      rol: "TUTOR",
      passwordHash: "pendiente-sprint-2",
    },
  });

  await prisma.tutorMateria.createMany({
    data: materias.slice(0, 2).map((m) => ({ tutorId: tutora.id, materiaId: m.id })),
    skipDuplicates: true,
  });

  // Evita duplicar bloques si el seed se corre otra vez
  await prisma.disponibilidad.deleteMany({ where: { tutorId: tutora.id } });
  await prisma.disponibilidad.create({
    data: { tutorId: tutora.id, diaSemana: 1, horaInicio: "13:00", horaFin: "14:00", modalidad: "PRESENCIAL", lugar: "Edificio J, aula 5" },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
