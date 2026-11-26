# Seguimiento y control del proyecto

Corte final: 26 de noviembre de 2026 (entrega de la versión 1.0.0). Responsable de todas las actividades: Brisa Julianna Aguayo Virgen.

## Resumen

| Concepto | Resultado |
|---|---|
| Actividades terminadas | 25 de 25 (100 %) |
| Historias de la versión 1.0.0 | 9 de 9 terminadas (40 de 40 puntos) |
| Requerimientos funcionales de la versión 1.0.0 | 9 de 9 implementados (RF-01 a RF-07, RF-09 y RF-11) |
| Casos de prueba aprobados | 52 de 52 (20 automatizados y 32 de punta a punta) |
| Defectos encontrados en la etapa final | 2, corregidos el mismo día |
| Actividades pendientes | Ninguna de la versión 1.0.0. Las mejoras de la versión 1.1 se listan al final. |

## Avance por actividad

| ID | Actividad | Planeado (CC-003) | Real | Estado | Avance | Problemas identificados | Acción correctiva o ajuste |
|---|---|---|---|---|---|---|---|
| A1 | Definir problema, objetivo y alcance | 23 a 26 sep | 23 a 26 sep | Terminada | 100 % | Ninguno | - |
| A2 | Plan de Calidad (Etapa I) | 27 sep a 6 oct | 27 sep a 11 oct | Terminada | 100 % | Se entregó 2 días después de la fecha (9 oct). | Calendario de entregas con recordatorios. |
| A3 | Requerimientos e historias de usuario | 27 sep a 1 oct | 27 sep a 11 oct | Terminada | 100 % | Ninguno | - |
| A4 | Diagramas iniciales | 2 a 4 oct | 2 a 11 oct | Terminada | 100 % | Ninguno | - |
| A5 | Repositorio y pantallas iniciales | 2 a 6 oct | 11 oct | Terminada | 100 % | `CHANGELOG.md` se borró por error desde GitHub (28 oct). | Se restauró con un commit de reversión; los cambios se hacen solo por rama y pull request. |
| A6 | Plan del Proyecto (Etapa II) | 7 a 27 oct | 28 oct a 6 nov | Terminada | 100 % | Retraso de 10 días por carga laboral y de otras materias. | Reprogramación del cronograma (CC-003). |
| A7 | Conexión a la base de datos y migración | 7 a 9 oct | 6 nov | Terminada | 100 % | La cuenta de Neon no estaba lista. | Desarrollo con PostgreSQL 16 local y la misma migración (CC-002). |
| A8 | HU-01 Registro e inicio de sesión | 10 a 16 oct | 6 nov | Terminada | 100 % | Los formularios se borraban al mostrar errores (defecto). | Corregido el mismo día (commit `d2465f4`). |
| A9 | HU-02 Materias del tutor | 17 a 20 oct | 6 nov | Terminada | 100 % | Ninguno | - |
| A10 | Búsqueda y mis asesorías desde la BD | No planeada en Sprint 2 | 6 nov | Terminada | 100 % | - | Se adelantó parte de HU-04. |
| A11 | Base de datos en Neon | 2 a 3 dic | 25 nov | Terminada | 100 % | El equipo de desarrollo nuevo no tenía PostgreSQL ni dependencias actualizadas. | Se usó Neon desde desarrollo y se reinstalaron las dependencias con `npm ci`. |
| A12 | HU-03 Disponibilidad del tutor | 9 a 13 nov | 25 nov | Terminada | 100 % | No avanzó en su fecha por carga laboral y de otras materias. | Cronograma ajustado a la entrega final (CC-004). |
| A13 | HU-04 Completar la búsqueda | 9 a 13 nov | 25 nov | Terminada | 100 % | Faltaba el filtro por tutor que pide RF-04. | Se agregó el filtro por tutor. |
| A14 | HU-05 Agendar sin empalmes | 16 a 20 nov | 25 nov | Terminada | 100 % | La restricción única también contaba las asesorías canceladas y el horario nunca se liberaba. | Índice único parcial que ignora las canceladas (CC-004). |
| A15 | HU-06 Confirmar o rechazar | 16 a 20 nov | 25 nov | Terminada | 100 % | Confirmar o rechazar no cambiaba el estado (defecto D-01). | Corregido el mismo día (commit `fb7e225`). |
| A16 | HU-07 Cancelar | 23 a 27 nov | 25 nov | Terminada | 100 % | Ninguno | - |
| A17 | HU-09 Historial | 23 a 27 nov | 25 nov | Terminada | 100 % | Ninguna historia marcaba las asesorías como completadas y el reporte no tenía datos. | El tutor marca como completada una asesoría confirmada que ya ocurrió, desde su detalle (CC-005). |
| A18 | HU-11 Reporte de horas | 23 a 27 nov | 25 nov | Terminada | 100 % | Ninguno | - |
| A19 | Pruebas y correcciones | 30 nov a 2 dic | 25 nov | Terminada | 100 % | 2 defectos (D-01 y D-02). | Corregidos y verificados con una nueva ejecución de todas las pruebas. |
| A20 | Despliegue en Vercel y Neon | 2 a 3 dic | 25 nov | Terminada | 100 % | El primer despliegue respondía error 500 porque no leía `NEXTAUTH_SECRET`. | Se agregaron las variables de entorno y se volvió a desplegar; sistema en https://asesora-t.vercel.app |
| A21 | Manual de usuario y evidencias | 3 a 4 dic | 25 a 26 nov | Terminada | 100 % | - | - |
| A22 | Presentación y entrega de la versión 1.0.0 | 4 dic | 26 nov | Terminada | 100 % | La consigna fija la entrega el 26 nov, antes del 4 dic planeado. | Sprint 6 reducido a 2 días (CC-004). |
| A23 | Detalle de la asesoría y colores sólidos (CC-005) | No planeada | 25 nov | Terminada | 100 % | En la revisión de la interfaz se pidió ver el detalle de cada asesoría y botones más claros. | CC-005; 3 pruebas nuevas (P-22 a P-24). |
| A24 | Calendario de asesorías (CC-006) y ajustes de la interfaz | No planeada | 26 nov | Terminada | 100 % | En la revisión se pidió ver las asesorías en un calendario, limitar el semestre del tutor en el registro y que la flecha de los selectores no sobresaliera, y separar el nombre y los apellidos en el registro. | CC-006; 5 pruebas nuevas (CP-17, CP-18 y P-25 a P-28). |
| A25 | Link de la reunión en asesorías virtuales (CC-007) | No planeada | 26 nov | Terminada | 100 % | En la revisión se pidió que el tutor comparta el link de la videollamada. Las pruebas modificaban los datos del sistema en línea porque desarrollo y producción usaban la misma base. | CC-007; base local con `prisma dev` para las pruebas; 5 pruebas nuevas (CP-19 y P-29 a P-32); defectos D-03 y D-04 corregidos. |

## Indicadores

| Métrica | Meta | Resultado final | Lectura |
|---|---|---|---|
| M1 Requerimientos funcionales implementados (versión 1.0.0) | 100 % | 9 de 9 (100 %) | Cumple |
| M2 Casos de prueba aprobados | ≥ 90 % | 52 de 52 (100 %) después de las correcciones | Cumple |
| M3 Defectos críticos abiertos al entregar | 0 | 0 | Cumple |
| M8 Historias completadas por sprint | ≥ 80 % | Sprints 3 a 5: 7 de 7 historias (100 %) | Cumple |
| M9 Desviación del cronograma | ≤ 10 % | Los Sprints 3 y 4 no avanzaron en sus fechas; la versión 1.0.0 se entregó el 26 nov, 8 días antes de la línea base del 4 dic | Se controló con CC-004 |
| M10 Tiempo de corrección de defectos | ≤ 3 días | 2 defectos, corregidos el mismo día | Cumple |
| Reservas empalmadas | 0 | 0 (prueba E2E-10 y regla en la base de datos) | Cumple |

## Incidencias

| # | Fecha | Incidencia | Impacto | Acción correctiva |
|---|---|---|---|---|
| I-01 | 9 oct | El Plan de Calidad se entregó 2 días tarde. | Bajo | Calendario de entregas con recordatorios. |
| I-02 | 28 oct | `CHANGELOG.md` se borró desde la web de GitHub. | Bajo | Commit de reversión; cambios solo por rama y pull request. |
| I-03 | 6 nov | La cuenta de Neon no estaba lista al iniciar el Sprint 2. | Bajo | PostgreSQL local con la misma migración (CC-002). |
| I-04 | 6 nov | El Sprint 2 terminó 17 días tarde. | Alto | Reprogramación a sprints de 1 semana (CC-003). |
| I-05 | 9 a 20 nov | Los Sprints 3 y 4 no avanzaron por carga laboral y de otras materias. | Alto | Cronograma ajustado a la entrega final del 26 nov (CC-004). |
| I-06 | 25 nov | Las asesorías canceladas seguían ocupando el horario. | Medio | Migración `20261125120000_canceladas_no_bloquean` (CC-004). |
| I-07 | 25 nov | Defecto D-01: confirmar o rechazar no cambiaba el estado. | Alto | Commit `fb7e225`. |
| I-08 | 25 nov | Defecto D-02: las horas de disponibilidad se cortaban en celular. | Bajo | Commit `638c03c`. |
| I-09 | 25 nov | El primer despliegue en Vercel respondía error 500: no leía la variable `NEXTAUTH_SECRET`. | Alto | Variables de entorno revisadas y nuevo despliegue. |
| I-10 | 26 nov | Las pruebas modificaban los datos del sistema en línea porque desarrollo y producción usaban la misma base de Neon. | Medio | Base local con `prisma dev` para las pruebas; Neon solo se actualiza al publicar una versión. |
| I-11 | 26 nov | Defecto D-03: "Ver detalle" en el calendario parecía no responder. Defecto D-04: el lápiz del link enviaba el formulario. | Medio | Aviso "Abriendo..." y botones separados para editar y guardar. |

## Cambios realizados durante el desarrollo

| Folio | Fecha | Cambio | Versión |
|---|---|---|---|
| CC-001 | 11 oct | Modalidad virtual además de presencial. | 0.1.0 |
| CC-002 | 6 nov | PostgreSQL local en desarrollo y Neon en despliegue. | 0.2.0 |
| CC-003 | 6 nov | Sprints de 1 semana; HU-08 y HU-10 a la versión 1.1. | 0.2.1 |
| CC-004 | 25 nov | Cronograma ajustado a la entrega del 26 nov; las canceladas ya no ocupan el horario. | 1.0.0 |
| CC-005 | 25 nov | Detalle de cada asesoría y colores sólidos en la interfaz. | 1.0.0 |
| CC-006 | 26 nov | Pantalla Calendario para el estudiante y el tutor. | 1.0.0 |
| CC-007 | 26 nov | Link de la reunión en asesorías virtuales confirmadas. | 1.0.0 |

Detalle completo en [bitacora-cambios.md](bitacora-cambios.md).

## Historial de versiones

| Versión | Fecha | Contenido |
|---|---|---|
| 0.1.0 | 11 oct 2026 | Estructura del proyecto, modelo de datos, pantallas iniciales y documentación. |
| 0.2.0 | 6 nov 2026 | Base de datos, registro e inicio de sesión, panel por rol, materias del tutor y búsqueda desde la BD. |
| 0.2.1 | 6 nov 2026 | Cronograma reprogramado (CC-003). |
| 1.0.0 | 26 nov 2026 | Disponibilidad, agendar, confirmar, cancelar, historial con detalle, calendario y reporte de horas. Versión final del semestre. |

Detalle en [CHANGELOG.md](../CHANGELOG.md). Cada versión tiene su etiqueta en GitHub (`v0.1.0`, `v0.2.0`, `v0.2.1` y `v1.0.0`).

## Evidencias del seguimiento en GitHub

- **Repositorio:** https://github.com/BrisaAguayo/AsesoraT
- **Sistema en línea:** https://asesora-t.vercel.app
- **Commits:** historial con *Conventional Commits* (`feat:`, `fix:`, `docs:`, `chore:`), uno por cambio.
- **Ramas:** una rama por historia (`feature/HU-03-disponibilidad` a `feature/HU-11-reporte`), una por defecto (`fix/HU-06-confirmar-solicitud`, `fix/HU-03-horas-en-celular`), una para el despliegue (`chore/despliegue-vercel`), dos de la revisión de la interfaz (`feature/estilos-solidos`, `feature/HU-09-detalle-resultado`) y una de documentación (`docs/entrega-final`), integradas a `main` con un merge por rama (commits "Merge: ...").
- **Tablero Kanban:** GitHub Projects con las columnas Por hacer, En progreso, En revisión y Terminado.
- **Etiquetas de versión:** `v0.1.0`, `v0.2.0`, `v0.2.1` y `v1.0.0`.

## Mejoras futuras (versión 1.1)

| Mejora | Descripción |
|---|---|
| HU-08 Avisos por correo | Correo al agendar, confirmar o cancelar, con Resend. |
| HU-10 Calificar asesoría | Calificación de 1 a 5 y comentario para asesorías completadas. |
| Pruebas con usuarios | Sesión con estudiantes y tutores, cuestionario SUS y tiempo para agendar. |
