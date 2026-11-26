# Registro de versiones

Formato basado en *Keep a Changelog* y versionado semántico.

## [1.0.0] - 2026-11-26

Versión final del semestre: Sprints 3 a 6.

### Agregado
- Mi disponibilidad: el tutor registra, edita y borra sus bloques semanales con día, horario, modalidad y lugar; no se aceptan bloques empalmados (HU-03).
- Filtro por tutor en la búsqueda de asesorías (HU-04, RF-04).
- Agendar en 3 pasos: elegir horario, elegir una fecha libre de las próximas 4 semanas con el tema y ver la confirmación en pantalla. Se validan los empalmes del tutor y del estudiante antes de guardar (HU-05, RF-05, RF-06, RNF-01).
- Solicitudes: el tutor confirma o rechaza las asesorías pendientes (HU-06).
- Cancelar una asesoría hasta 2 horas antes, con la hora de Tijuana (HU-07, RF-07).
- Mis asesorías con Próximas e Historial ordenados por fecha (HU-09).
- Detalle de cada asesoría al hacer clic en ella; desde ahí el tutor marca como completada una asesoría confirmada que ya ocurrió (HU-09, CC-005).
- Calendario mensual con las asesorías del estudiante o del tutor; al elegir un día se abre un modal con su información y, si no hay asesorías agendadas, el pie lo indica (CC-006).
- Link de la reunión: en una asesoría virtual confirmada el tutor publica el link desde el detalle y el estudiante lo ve ahí; mientras no lo publique, el estudiante ve "El tutor no ha adjuntado ningún link." (CC-007).
- Reporte de asesorías completadas y horas por tutor con filtro por periodo y exportación a CSV, solo para coordinación (HU-11).
- Migración `20261125120000_canceladas_no_bloquean`: las canceladas quedan como registro y ya no ocupan el horario (CC-004).
- Migración `20261126180000_enlace_reunion`: campo `enlaceReunion` de las asesorías (CC-007).
- 12 pruebas automatizadas nuevas (19 en total) y bitácora de 31 pruebas de punta a punta.
- Manual de usuario, bitácora de pruebas, bitácora individual y capturas de la versión 1.0.0.
- Datos de ejemplo con asesorías en todos los estados, incluida una virtual confirmada sin link.

### Cambiado
- Cronograma ajustado a la entrega final del 26 nov 2026 (CC-004).
- Solo los estudiantes pueden agendar; el inicio de sesión regresa al horario elegido.
- El panel de cada rol muestra todas sus opciones activas.
- Botones, estados y avisos con colores sólidos, esquinas redondeadas y texto blanco o negro; los botones que comparten un área tienen el mismo ancho (CC-005).
- Al registrarse como tutor, el selector de semestre deshabilita del 1.º al 5.º.
- La flecha de los selectores queda dentro del recuadro.

### Corregido
- Confirmar o rechazar una solicitud no cambiaba su estado (D-01).
- Las horas de disponibilidad se cortaban en celular (D-02).

## [0.2.1] - 2026-11-06

### Cambiado
- Cronograma reprogramado para terminar antes del fin del semestre: sprints de 1 semana desde el Sprint 3 y entrega de la versión 1.0.0 el 4 dic 2026 (CC-003).
- Avisos por correo (HU-08) y calificación (HU-10) pasan a la versión 1.1.
- El panel de coordinación indica que el reporte llega en el Sprint 5.

## [0.2.0] - 2026-11-06

Sprint 2: acceso y perfil de tutor.

### Agregado
- Conexión a PostgreSQL con Prisma (adaptador `pg`) y migración inicial `20261106120000_init` con las 6 tablas.
- Registro con correo institucional `@tectijuana.edu.mx`, número de control, semestre, carrera y rol (HU-01).
- Inicio de sesión con NextAuth.js, sesión JWT de 8 horas y contraseñas cifradas con bcrypt (HU-01, RNF-04).
- Panel según el rol: estudiante, tutor y coordinación (HU-01).
- Protección de rutas por sesión y por rol con middleware (RNF-04).
- Pantalla "Mis materias" para que el tutor elija las materias que asesora (HU-02).
- Búsqueda de asesorías y "Mis asesorías" leyendo de la base de datos, con filtros por materia, día y modalidad.
- 7 pruebas automatizadas de las reglas de registro (`npm test`).
- Datos de ejemplo con 8 materias, 4 tutores, 1 estudiante y 1 cuenta de coordinación.
- Diagramas de arquitectura y de flujo de acceso.

### Cambiado
- La búsqueda solo muestra nombre, semestre y materias del tutor (RNF-07).
- El botón "Agendar" queda deshabilitado hasta el Sprint 4.

### Corregido
- Los formularios de registro e inicio de sesión ya no se borran al mostrar errores.

### Eliminado
- Archivo de datos de ejemplo `src/lib/datos-ejemplo.ts`; las pantallas ya usan la base de datos.

## [0.1.0] - 2026-10-11

### Agregado
- Estructura inicial del proyecto con Next.js, TypeScript y Tailwind CSS.
- Modelo de datos inicial en Prisma: Usuario, Materia, TutorMateria, Disponibilidad, Asesoria y Evaluacion.
- Datos de ejemplo (`prisma/seed.ts`).
- Pantallas iniciales: inicio, inicio de sesión, búsqueda de asesorías y mis asesorías (con datos de ejemplo).
- Documentación: requerimientos, historias de usuario, backlog, diagramas y bitácora de cambios.
- Plantillas de GitHub para issues (historia de usuario, defecto, solicitud de cambio) y pull requests.
