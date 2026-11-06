# Seguimiento y control del proyecto

Corte: 6 de noviembre de 2026 (fin del Sprint 2). Responsable de todas las actividades: Brisa Julianna Aguayo Virgen.

## Avance por actividad

| ID | Actividad | Planeado (línea base) | Real o plan vigente | Estado | Avance | Problemas identificados | Acción correctiva o ajuste |
|---|---|---|---|---|---|---|---|
| A1 | Definir problema, objetivo y alcance | 23 a 26 sep | 23 a 26 sep | Terminada | 100 % | Ninguno | - |
| A2 | Plan de Calidad (Etapa I) | 27 sep a 6 oct | 27 sep a 11 oct | Terminada | 100 % | Se entregó 2 días después de la fecha (9 oct). | Calendario de entregas con recordatorios. |
| A3 | Requerimientos e historias de usuario | 27 sep a 1 oct | 27 sep a 11 oct | Terminada | 100 % | Ninguno | - |
| A4 | Diagramas iniciales | 2 a 4 oct | 2 a 11 oct | Terminada | 100 % | Ninguno | - |
| A5 | Repositorio y pantallas iniciales | 2 a 6 oct | 11 oct | Terminada | 100 % | `CHANGELOG.md` se borró por error desde GitHub (28 oct). | Se restauró con un commit de reversión; los cambios se hacen solo por rama y pull request. |
| A6 | Plan del Proyecto (Etapa II) | 7 a 27 oct | 28 oct a 6 nov | Terminada | 100 % | Retraso de 10 días por carga laboral y de otras materias. | Reprogramación del cronograma (CC-003). |
| A7 | Conexión a la base de datos y migración | 7 a 9 oct | 6 nov | Terminada | 100 % | La cuenta de Neon no estaba lista. | Desarrollo con PostgreSQL 16 local y la misma migración (CC-002). |
| A8 | HU-01 Registro e inicio de sesión | 10 a 16 oct | 6 nov | Terminada | 100 % | Los formularios se borraban al mostrar errores (defecto). | Corregido el mismo día (commit `fix:`). |
| A9 | HU-02 Materias del tutor | 17 a 20 oct | 6 nov | Terminada | 100 % | Ninguno | - |
| A10 | Búsqueda y mis asesorías desde la BD | No planeada en Sprint 2 | 6 nov | Terminada | 100 % | - | Se adelantó parte de HU-04 para aligerar el Sprint 3. |
| A11 | HU-03 Disponibilidad del tutor | 21 a 27 oct | 9 a 13 nov | Reprogramada | 0 % | Depende de A9, terminada tarde. | Sprint 3 de 1 semana (CC-003). |
| A12 | HU-04 Completar la búsqueda | 28 oct a 3 nov | 9 a 13 nov | Reprogramada | 40 % | Falta disponibilidad editable. | Se completa en el Sprint 3. |
| A13 | HU-05 y HU-06 Agendar y confirmar | 4 a 17 nov | 16 a 20 nov | Reprogramada | 0 % | La línea base terminaba después del fin del semestre (11 dic). | Sprint de 1 semana (CC-003). |
| A14 | HU-07 y HU-09 Cancelar e historial | 18 nov a 1 dic | 23 a 27 nov | Ajustada | 20 % | HU-08 (correos) no cabe antes del fin del semestre. | HU-08 pasa a la versión 1.1; "Mis asesorías" ya lee de la BD. |
| A15 | HU-11 Reporte de horas | 2 a 15 dic | 23 a 27 nov | Ajustada | 0 % | HU-10 (calificación, prioridad Baja) no cabe. | HU-10 pasa a la versión 1.1. |
| A16 | Pruebas con usuarios | 16 a 29 dic | 30 nov a 2 dic | Ajustada | 0 % | Poco tiempo antes del cierre. | Pruebas con 5 estudiantes y 2 tutores. |
| A17 | Despliegue en Vercel y Neon | 30 dic a 5 ene | 2 a 3 dic | Reprogramada | 0 % | - | Se adelanta al Sprint 6. |
| A18 | Manual de usuario y entrega | 6 a 12 ene | 3 a 4 dic | Reprogramada | 0 % | - | Entrega de la versión 1.0.0 el 4 dic. |

## Indicadores

| Métrica | Meta | Resultado al corte | Lectura |
|---|---|---|---|
| M8 Avance del Sprint 2 | ≥ 80 % | 8 de 8 puntos (100 %) | Cumple |
| M2 Casos de prueba aprobados | ≥ 90 % | 17 de 17 (100 %): 7 automatizados y 10 manuales | Cumple |
| M3 Defectos críticos abiertos | 0 | 0 | Cumple |
| M10 Tiempo de corrección de defectos | ≤ 3 días | 1 defecto, corregido el mismo día | Cumple |
| M9 Desviación del cronograma | ≤ 10 % | Sprint 2 terminó 17 días tarde | No cumple: se reprogramó (CC-003) |

## Acciones para los siguientes sprints

1. Sprints de 1 semana (lunes a viernes) con bloques fijos de trabajo: 2 horas diarias entre semana y 4 a 6 horas el sábado.
2. Priorizar historias de prioridad Alta; HU-08 y HU-10 quedan para la versión 1.1.
3. Revisar este documento y el tablero al cierre de cada sprint.
4. Si un sprint se retrasa más de 2 días, se recorta el reporte (HU-11) a una vista simple sin exportación.
