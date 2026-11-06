import { PrismaClient, type Modalidad } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

// Contraseña de las cuentas de demostración (solo para desarrollo)
const PASSWORD_DEMO = "Asesorat2026";

const materias = [
  { clave: "ACF-0901", nombre: "Cálculo Diferencial", semestre: 1 },
  { clave: "SCD-1008", nombre: "Fundamentos de Programación", semestre: 1 },
  { clave: "ACF-0902", nombre: "Cálculo Integral", semestre: 2 },
  { clave: "SCD-1020", nombre: "Programación Orientada a Objetos", semestre: 2 },
  { clave: "AED-1026", nombre: "Estructura de Datos", semestre: 3 },
  { clave: "ACF-0903", nombre: "Álgebra Lineal", semestre: 2 },
  { clave: "AEF-1031", nombre: "Fundamentos de Bases de Datos", semestre: 4 },
  { clave: "SCC-1017", nombre: "Métodos Numéricos", semestre: 4 },
];

type Bloque = { dia: number; inicio: string; fin: string; modalidad: Modalidad; lugar: string };

const tutores: {
  nombre: string; correo: string; numeroControl: string; semestre: number; materias: string[]; bloques: Bloque[];
}[] = [
  {
    nombre: "Andrea López", correo: "tutora.demo@tectijuana.edu.mx", numeroControl: "00000001", semestre: 8,
    materias: ["ACF-0901", "ACF-0902"],
    bloques: [
      { dia: 1, inicio: "13:00", fin: "14:00", modalidad: "PRESENCIAL", lugar: "Edificio J, aula 5" },
      { dia: 3, inicio: "12:00", fin: "13:00", modalidad: "PRESENCIAL", lugar: "Biblioteca, cubículo 2" },
    ],
  },
  {
    nombre: "Diego Ramírez", correo: "diego.demo@tectijuana.edu.mx", numeroControl: "00000002", semestre: 7,
    materias: ["AED-1026", "SCD-1008"],
    bloques: [{ dia: 2, inicio: "16:00", fin: "17:00", modalidad: "VIRTUAL", lugar: "Google Meet" }],
  },
  {
    nombre: "Mariana Soto", correo: "mariana.demo@tectijuana.edu.mx", numeroControl: "00000003", semestre: 9,
    materias: ["AEF-1031"],
    bloques: [{ dia: 4, inicio: "15:00", fin: "16:00", modalidad: "VIRTUAL", lugar: "Microsoft Teams" }],
  },
  {
    nombre: "Luis Hernández", correo: "luis.demo@tectijuana.edu.mx", numeroControl: "00000004", semestre: 7,
    materias: ["SCD-1020", "SCD-1008"],
    bloques: [{ dia: 5, inicio: "11:00", fin: "12:00", modalidad: "PRESENCIAL", lugar: "Laboratorio de cómputo 3" }],
  },
];

async function main() {
  const passwordHash = await bcrypt.hash(PASSWORD_DEMO, 10);

  for (const m of materias) {
    await prisma.materia.upsert({ where: { clave: m.clave }, update: { nombre: m.nombre, semestre: m.semestre }, create: m });
  }

  for (const t of tutores) {
    const tutor = await prisma.usuario.upsert({
      where: { correo: t.correo },
      update: { passwordHash },
      create: {
        nombre: t.nombre, correo: t.correo, numeroControl: t.numeroControl,
        carrera: "Ingeniería en Sistemas Computacionales", semestre: t.semestre, rol: "TUTOR", passwordHash,
      },
    });

    const ids = await prisma.materia.findMany({ where: { clave: { in: t.materias } }, select: { id: true } });
    await prisma.tutorMateria.createMany({
      data: ids.map((m) => ({ tutorId: tutor.id, materiaId: m.id })),
      skipDuplicates: true,
    });

    // Evita duplicar bloques si el seed se corre otra vez
    await prisma.disponibilidad.deleteMany({ where: { tutorId: tutor.id } });
    await prisma.disponibilidad.createMany({
      data: t.bloques.map((b) => ({
        tutorId: tutor.id, diaSemana: b.dia, horaInicio: b.inicio, horaFin: b.fin, modalidad: b.modalidad, lugar: b.lugar,
      })),
    });
  }

  await prisma.usuario.upsert({
    where: { correo: "estudiante.demo@tectijuana.edu.mx" },
    update: { passwordHash },
    create: {
      nombre: "Carlos Méndez", correo: "estudiante.demo@tectijuana.edu.mx", numeroControl: "00000010",
      carrera: "Ingeniería en Sistemas Computacionales", semestre: 2, rol: "ESTUDIANTE", passwordHash,
    },
  });

  await prisma.usuario.upsert({
    where: { correo: "coordinacion.demo@tectijuana.edu.mx" },
    update: { passwordHash },
    create: {
      nombre: "Coordinación ISC", correo: "coordinacion.demo@tectijuana.edu.mx", numeroControl: "00000099",
      carrera: "Ingeniería en Sistemas Computacionales", semestre: 0, rol: "COORDINADOR", passwordHash,
    },
  });

  console.log(`Seed listo: ${materias.length} materias, ${tutores.length} tutores, 1 estudiante y 1 coordinación.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
