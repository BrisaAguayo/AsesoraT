# Bitácora de control de cambios

Cada solicitud se abre como Issue con la plantilla **Solicitud de cambio** y se registra aquí. Procedimiento completo en [CONTRIBUTING.md](../CONTRIBUTING.md).

| Folio | Fecha | Descripción | Solicitó | Impacto | Decisión | Versión |
|---|---|---|---|---|---|---|
| CC-001 | 2026-10-11 | Agregar modalidad **virtual** además de presencial, con enlace de videollamada en lugar del aula. | Líder de proyecto (a partir de la idea original) | Campo `modalidad` en Disponibilidad y Asesoria; filtro en búsqueda. ~3 h. Sin cambio de fechas. | ✅ Aprobado | 0.1.0 |
| CC-002 | 2026-11-06 | Desarrollar con **PostgreSQL 16 local** y dejar **Neon** para el despliegue. | Líder de proyecto | La cuenta de Neon no estaba lista al iniciar el Sprint 2. Se usa la misma migración en ambos; solo cambia `DATABASE_URL`. Sin impacto en requerimientos. ~1 h. | ✅ Aprobado | 0.2.0 |
| CC-003 | 2026-11-06 | **Reprogramar el cronograma**: el Sprint 2 terminó el 6 nov (plan: 20 oct). Se agrega el receso de invierno y se fusionan los Sprints 7 y 8 en uno de pruebas, despliegue y cierre. | Líder de proyecto | Fecha de cierre pasa del 12 ene al 30 ene 2027 (+18 días, desviación 16 %). Sin cambios de alcance. | ✅ Aprobado | 0.2.0 |
