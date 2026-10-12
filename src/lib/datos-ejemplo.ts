// Datos de ejemplo para las pantallas iniciales, mientras se conecta la base de datos.

export type Modalidad = "Presencial" | "Virtual";

export interface BloqueDisponible {
  id: string;
  tutor: string;
  semestreTutor: number;
  materia: string;
  dia: string;
  horario: string;
  modalidad: Modalidad;
  lugar: string;
}

export const materias = [
  "Cálculo Diferencial",
  "Cálculo Integral",
  "Fundamentos de Programación",
  "Programación Orientada a Objetos",
  "Estructura de Datos",
  "Fundamentos de Bases de Datos",
];

export const bloquesDisponibles: BloqueDisponible[] = [
  { id: "b1", tutor: "Andrea López", semestreTutor: 8, materia: "Cálculo Integral", dia: "Lunes", horario: "13:00 - 14:00", modalidad: "Presencial", lugar: "Edificio J, aula 5" },
  { id: "b2", tutor: "Diego Ramírez", semestreTutor: 7, materia: "Estructura de Datos", dia: "Martes", horario: "16:00 - 17:00", modalidad: "Virtual", lugar: "Google Meet" },
  { id: "b3", tutor: "Andrea López", semestreTutor: 8, materia: "Cálculo Diferencial", dia: "Miércoles", horario: "12:00 - 13:00", modalidad: "Presencial", lugar: "Biblioteca, cubículo 2" },
  { id: "b4", tutor: "Mariana Soto", semestreTutor: 9, materia: "Fundamentos de Bases de Datos", dia: "Jueves", horario: "15:00 - 16:00", modalidad: "Virtual", lugar: "Microsoft Teams" },
  { id: "b5", tutor: "Luis Hernández", semestreTutor: 7, materia: "Programación Orientada a Objetos", dia: "Viernes", horario: "11:00 - 12:00", modalidad: "Presencial", lugar: "Laboratorio de cómputo 3" },
];

export const misAsesorias = [
  { id: "a1", materia: "Cálculo Integral", tutor: "Andrea López", fecha: "Lun 19 oct", horario: "13:00 - 14:00", estado: "Confirmada" },
  { id: "a2", materia: "Estructura de Datos", tutor: "Diego Ramírez", fecha: "Mar 20 oct", horario: "16:00 - 17:00", estado: "Pendiente" },
  { id: "a3", materia: "Fundamentos de Programación", tutor: "Luis Hernández", fecha: "Vie 9 oct", horario: "11:00 - 12:00", estado: "Completada" },
] as const;
