# Flujo de trabajo y control de cambios

## Ramas

| Rama | Uso |
|---|---|
| `main` | Versión estable. Solo recibe cambios por pull request. |
| `feature/<id>-descripcion` | Nueva funcionalidad, ligada a una historia de usuario (ej. `feature/HU-03-agendar`). |
| `fix/<id>-descripcion` | Corrección de un defecto reportado en un issue. |
| `docs/<descripcion>` | Cambios solo de documentación. |

## Commits

Se usa el formato **Conventional Commits**:

```
feat: agrega pantalla para buscar asesorías
fix: evita reservar un horario ya ocupado
docs: actualiza requerimientos no funcionales
chore: configura ESLint
```

## Versionado

Versionado semántico `MAYOR.MENOR.PARCHE`. Cada versión se documenta en `CHANGELOG.md`.

## Procedimiento de control de cambios

1. **Solicitud.** Todo cambio a requerimientos, alcance o diseño se registra como *Issue* con la plantilla **Solicitud de cambio** (etiqueta `cambio`). Se le asigna un folio `CC-###`.
2. **Análisis de impacto.** Se evalúa qué requerimientos, pantallas, tablas y fechas afecta, y se estima el esfuerzo en horas.
3. **Decisión.** La líder de proyecto aprueba, rechaza o pospone el cambio. Si modifica el alcance acordado, se valida con el promotor (Coordinación académica) en la revisión quincenal.
4. **Registro.** La decisión se anota en `docs/bitacora-cambios.md` con fecha, motivo y responsable.
5. **Implementación.** Se trabaja en una rama propia y se integra con un pull request que referencia el issue (`Closes #N`).
6. **Verificación y cierre.** El cambio pasa las pruebas, se actualiza `CHANGELOG.md` y se cierra el issue.

## Definición de terminado (DoD)

Una historia de usuario se considera terminada cuando:

- Cumple sus criterios de aceptación.
- Pasa el linter y la verificación de tipos (`npm run lint`, `npm run typecheck`).
- Sus casos de prueba están aprobados.
- Funciona en pantalla de celular (360 px) y escritorio.
- Está integrada en `main` mediante pull request.
