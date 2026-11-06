# Seguimiento y control del proyecto

Corte: 6 de noviembre de 2026 (fin del Sprint 2). Responsable de todas las actividades: Brisa Julianna Aguayo Virgen.

## Avance por actividad

| ID | Actividad | Planeado | Real | Estado | Avance | Problemas identificados | Acción correctiva o ajuste |
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
| A11 | HU-03 Disponibilidad del tutor | 21 oct a 3 nov | 9 a 20 nov | Reprogramada | 0 % | Depende de A9, terminada tarde. | Movida al Sprint 3 (CC-003). |

## Indicadores

| Métrica | Meta | Resultado al corte | Lectura |
|---|---|---|---|
| M8 Avance del Sprint 2 | ≥ 80 % | 8 de 8 puntos (100 %) | Cumple |
| M2 Casos de prueba aprobados | ≥ 90 % | 17 de 17 (100 %): 7 automatizados y 10 manuales | Cumple |
| M3 Defectos críticos abiertos | 0 | 0 | Cumple |
| M10 Tiempo de corrección de defectos | ≤ 3 días | 1 defecto, corregido el mismo día | Cumple |
| M9 Desviación del cronograma | ≤ 10 % | Sprint 2: 17 días tarde. Proyecto: +18 días sobre 112 (16 %) | No cumple: se reprogramó (CC-003) |

## Acciones para los siguientes sprints

1. Bloques fijos de trabajo: 1 hora diaria entre semana y 3 horas el sábado.
2. Priorizar historias de prioridad Alta; si hay nuevo retraso, HU-10 (prioridad Baja) pasa a una versión posterior.
3. Revisar este documento y el tablero al final de cada sprint.
