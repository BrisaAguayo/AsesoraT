# Bitácora de supervisión y pruebas

**Proyecto:** AsesoraT, versión 1.0.0  
**Responsable:** Brisa Julianna Aguayo Virgen (22211514)  
**Ambiente:** aplicación compilada para producción (`npm run build` y `npm run start`), base de datos PostgreSQL en Neon con los datos de ejemplo (`npm run db:seed`), Google Chrome en escritorio (1280 px) y en celular (360 px).

## Cómo se probó

1. **Pruebas automatizadas** de las reglas de negocio con `npm test` (16 casos, CP-01 a CP-16).
2. **Pruebas de punta a punta** en el navegador con las cuentas de ejemplo de los 3 roles (21 casos, P-01 a P-21). Cada prueba sigue los pasos que haría un usuario y revisa lo que aparece en pantalla y en la base de datos.
3. **Revisión de código** antes de integrar cada rama: `npm run build`, `npm run typecheck` y `npm run lint` sin errores.
4. Si una prueba falla, se registra el defecto, se corrige en una rama `fix/` y se vuelven a correr **todas** las pruebas.

## Registro de pruebas

| ID | Funcionalidad probada | Fecha | Responsable | Resultado esperado | Resultado obtenido | Error detectado | Prioridad | Acción correctiva | Estado final |
|---|---|---|---|---|---|---|---|---|---|
| P-01 | Búsqueda pública (HU-04) | 25 nov 2026 | Brisa Aguayo | Sin iniciar sesión se ven los horarios disponibles con tutor, semestre, horario y lugar. | Se muestran 9 horarios disponibles. | Ninguno | Alta | No aplica | No aplica |
| P-02 | Filtro por tutor y búsqueda sin resultados (HU-04, RF-04) | 25 nov 2026 | Brisa Aguayo | Al filtrar por "Andrea López" solo aparecen sus horarios; sin coincidencias se muestra un mensaje claro. | Solo aparecen tarjetas de Andrea López; con viernes aparece "No hay horarios con esos filtros". | Ninguno | Alta | No aplica | No aplica |
| P-03 | Agendar sin sesión (HU-05, RNF-04) | 25 nov 2026 | Brisa Aguayo | Al pulsar "Agendar" sin sesión se pide iniciar sesión y después regresa al horario elegido. | Redirige a `/login` con la dirección de regreso. | Ninguno | Media | No aplica | No aplica |
| P-04 | Registro de estudiante (HU-01, regresión) | 25 nov 2026 | Brisa Aguayo | Con datos válidos se crea la cuenta y entra a su panel. | La cuenta se creó y mostró "Hola, Sofía". | Ninguno | Alta | No aplica | No aplica |
| P-05 | Panel del tutor (HU-01) | 25 nov 2026 | Brisa Aguayo | El tutor ve Mis materias, Mi disponibilidad, Solicitudes y Mis asesorías, sin opciones "próximamente". | Se muestran las 4 opciones activas. | Ninguno | Media | No aplica | No aplica |
| P-06 | Disponibilidad: bloque empalmado (HU-03) | 25 nov 2026 | Brisa Aguayo | Un bloque de lunes 13:30 a 14:30 se rechaza porque choca con el de 13:00 a 14:00; el formulario conserva los datos. | Mensaje "Se empalma con tu bloque de 13:00 a 14:00." y el lugar escrito se conserva. | Ninguno | Alta | No aplica | No aplica |
| P-07 | Disponibilidad: horas invertidas (HU-03) | 25 nov 2026 | Brisa Aguayo | Un bloque de 15:00 a 14:00 se rechaza. | Mensaje "La hora de inicio debe ser antes de la hora de fin." | Ninguno | Media | No aplica | No aplica |
| P-08 | Disponibilidad: agregar, editar y borrar (HU-03) | 25 nov 2026 | Brisa Aguayo | Se agrega viernes 9:00 a 10:00, se edita a 10:30 y se borra. | Las 3 operaciones se reflejan en la lista. | Ninguno | Alta | No aplica | No aplica |
| P-09 | Disponibilidad en celular (HU-03, RNF-03) | 25 nov 2026 | Brisa Aguayo | A 360 px el formulario se lee completo. | Las horas de inicio y fin se cortaban ("13:0"). | **D-02:** tres columnas no caben en 360 px. | Baja | En celular el día ocupa toda la fila y las horas van en dos columnas (commit `638c03c`). | Corregido |
| P-10 | Agendar en 3 pasos (HU-05, RNF-01) | 25 nov 2026 | Brisa Aguayo | Paso 1: elegir horario; paso 2: elegir fecha libre y escribir el tema; paso 3: confirmación en pantalla. La asesoría queda pendiente. | Se ofrecieron las fechas 7, 14 y 21 dic (30 nov ya estaba ocupada) y apareció "Solicitud enviada". | Ninguno | Alta | No aplica | No aplica |
| P-11 | Sin empalmes (HU-05, RF-06) | 25 nov 2026 | Brisa Aguayo | La fecha recién agendada ya no se ofrece; si dos pestañas intentan la misma fecha, la segunda se rechaza. | La fecha ocupada ya no aparece; la segunda reserva mostró "Ese horario ya está ocupado. Elige otra fecha." | Ninguno | Alta | No aplica | No aplica |
| P-12 | Agendar sin tema (HU-05) | 25 nov 2026 | Brisa Aguayo | Sin tema no se agenda y se muestra un mensaje. | Mensaje "Escribe el tema que quieres revisar." | Ninguno | Media | No aplica | No aplica |
| P-13 | Confirmar y rechazar solicitudes (HU-06) | 25 nov 2026 | Brisa Aguayo | Al confirmar o rechazar, la solicitud cambia de estado y sale de la lista de pendientes. | La página se recargaba pero la solicitud seguía pendiente en la base de datos. | **D-01:** el valor del botón (`decision`) no llegaba a la acción del servidor. | Alta | Cada botón envía la decisión en su propio formulario con un campo oculto (commit `fb7e225`). Se repitió la prueba: de 3 pendientes quedó 1. | Corregido |
| P-14 | El estudiante ve el nuevo estado (HU-06, HU-09) | 25 nov 2026 | Brisa Aguayo | En Mis asesorías aparecen Próximas e Historial con los estados Confirmada, Cancelada y Completada. | Se muestran ambas secciones con los 4 estados. | Ninguno | Alta | No aplica | No aplica |
| P-15 | Cancelar asesoría (HU-07) | 25 nov 2026 | Brisa Aguayo | Al cancelar, queda registrada como cancelada y el horario vuelve a estar disponible. | Mensaje "Asesoría cancelada. El horario quedó libre." y la fecha vuelve a ofrecerse al agendar. | Ninguno | Alta | No aplica | No aplica |
| P-16 | Cancelar solo hasta 2 horas antes (HU-07, RF-07) | 25 nov 2026 | Brisa Aguayo | Las asesorías pasadas o a menos de 2 horas no muestran "Cancelar". | El historial no muestra el botón; la regla también pasa la prueba automatizada CP-12. | Ninguno | Alta | No aplica | No aplica |
| P-17 | Marcar como completada (HU-09) | 25 nov 2026 | Brisa Aguayo | El tutor marca como completada una asesoría confirmada que ya ocurrió. | Mensaje "Asesoría marcada como completada." | Ninguno | Media | No aplica | No aplica |
| P-18 | Reporte de horas por periodo (HU-11) | 25 nov 2026 | Brisa Aguayo | Del 1 al 30 nov se ven las asesorías completadas y horas por tutor con el total; en octubre no hay datos. | Andrea López 3 y 3 h, Diego Ramírez 1 y 1 h, Mariana Soto 1 y 1 h, total 5 y 5 h. Octubre: "No hay asesorías completadas en este periodo." | Ninguno | Alta | No aplica | No aplica |
| P-19 | Exportar a CSV (HU-11) | 25 nov 2026 | Brisa Aguayo | Se descarga un archivo CSV con el periodo, una fila por tutor y el total. | Archivo `reporte-horas-2026-11-01-a-2026-11-30.csv` con los mismos datos de la pantalla. | Ninguno | Media | No aplica | No aplica |
| P-20 | Acceso por rol y privacidad (RNF-04, RNF-07) | 25 nov 2026 | Brisa Aguayo | El estudiante no entra a solicitudes ni al reporte; el tutor no entra al reporte ni descarga el CSV; ningún usuario ve números de control de otros. | Todas las rutas protegidas mandan al inicio de sesión; ningún número de control aparece en las páginas revisadas. | Ninguno | Alta | No aplica | No aplica |
| P-21 | Diseño en celular (RNF-03) | 25 nov 2026 | Brisa Aguayo | A 360 px las pantallas de los 3 roles no tienen desplazamiento horizontal. | Panel, búsqueda, agendar, mis asesorías, disponibilidad, solicitudes y reporte miden 360 px o menos. | Ninguno | Media | No aplica | No aplica |

## Pruebas automatizadas (`npm test`)

| Caso | Regla probada | Resultado |
|---|---|---|
| CP-01 a CP-04 | Correo institucional, número de control y contraseña segura (HU-01) | Aprobado |
| CP-05 a CP-07 | Registro válido, semestre mínimo del tutor y rol de coordinación no permitido (HU-01) | Aprobado |
| CP-08 a CP-10 | Formato de hora, bloques empalmados e inválidos (HU-03) | Aprobado |
| CP-11 | Hora de inicio con la zona horaria de Tijuana, en horario normal y de verano | Aprobado |
| CP-12 | Cancelar solo hasta 2 horas antes (HU-07, RF-07) | Aprobado |
| CP-13 | Próximas fechas de un bloque semanal (HU-05) | Aprobado |
| CP-14 | Lectura de fechas y duración en horas | Aprobado |
| CP-15 | Suma de asesorías y horas por tutor (HU-11) | Aprobado |
| CP-16 | Exportación a CSV (HU-11) | Aprobado |

Resultado: **16 de 16 aprobadas**.

## Resumen

| Concepto | Resultado |
|---|---|
| Pruebas ejecutadas | 37 (16 automatizadas y 21 de punta a punta) |
| Aprobadas en la primera ejecución | 35 de 37 |
| Defectos encontrados | 2 (D-01 prioridad alta, D-02 prioridad baja) |
| Defectos corregidos y verificados | 2 de 2, el mismo día |
| Aprobadas en la ejecución final | **37 de 37 (100 %)** |
| Defectos abiertos al entregar | 0 |
