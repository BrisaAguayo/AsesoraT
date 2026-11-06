# Registro de versiones

Formato basado en *Keep a Changelog* y versionado semántico.

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
