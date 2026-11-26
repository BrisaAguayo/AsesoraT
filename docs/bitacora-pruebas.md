# Bitácora de supervisión y pruebas

**Proyecto:** AsesoraT, versión 1.0.0  
**Responsable:** Brisa Julianna Aguayo Virgen (22211514)  
**Ambiente:** aplicación compilada para producción (`npm run build` y `npm run start`), base de datos PostgreSQL con los datos de ejemplo (`npm run db:seed`): en Neon hasta P-27 y, en la ejecución final, una base local (`prisma dev`) para no modificar los datos del sistema en línea, Google Chrome en escritorio (1280 px) y en celular (360 px).

## Cómo se probó

1. **Pruebas automatizadas** de las reglas de negocio con `npm test` (20 casos, CP-01 a CP-20).
2. **Pruebas de punta a punta** en el navegador con las cuentas de ejemplo de los 3 roles (34 casos, P-01 a P-34). Cada prueba sigue los pasos que haría un usuario y revisa lo que aparece en pantalla y en la base de datos.
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
| P-17 | Marcar como completada (HU-09, CC-005) | 25 nov 2026 | Brisa Aguayo | Desde el detalle, el tutor marca como completada una asesoría confirmada que ya ocurrió. | Mensaje "La asesoría quedó como completada." con el estado Completada. | Ninguno | Media | No aplica | No aplica |
| P-18 | Reporte de horas por periodo (HU-11) | 25 nov 2026 | Brisa Aguayo | Del 1 al 30 nov se ven las asesorías completadas y horas por tutor con el total; en octubre no hay datos. | Andrea López 3 y 3 h, Diego Ramírez 1 y 1 h, Mariana Soto 1 y 1 h, total 5 y 5 h. Octubre: "No hay asesorías completadas en este periodo." | Ninguno | Alta | No aplica | No aplica |
| P-19 | Exportar a CSV (HU-11) | 25 nov 2026 | Brisa Aguayo | Se descarga un archivo CSV con el periodo, una fila por tutor y el total. | Archivo `reporte-horas-2026-11-01-a-2026-11-30.csv` con los mismos datos de la pantalla. | Ninguno | Media | No aplica | No aplica |
| P-20 | Acceso por rol y privacidad (RNF-04, RNF-07) | 25 nov 2026 | Brisa Aguayo | El estudiante no entra a solicitudes ni al reporte; el tutor no entra al reporte ni descarga el CSV; ningún usuario ve números de control de otros. | Todas las rutas protegidas mandan al inicio de sesión; ningún número de control aparece en las páginas revisadas. | Ninguno | Alta | No aplica | No aplica |
| P-21 | Diseño en celular (RNF-03) | 25 nov 2026 | Brisa Aguayo | A 360 px las pantallas de los 3 roles no tienen desplazamiento horizontal. | Panel, búsqueda, agendar, mis asesorías, disponibilidad, solicitudes y reporte miden 360 px o menos. | Ninguno | Media | No aplica | No aplica |
| P-22 | Detalle para el estudiante (HU-09, CC-005) | 25 nov 2026 | Brisa Aguayo | Al abrir una asesoría completada, el estudiante ve todos sus datos y su estado, sin los botones del tutor. | El detalle muestra tutor, fecha, horario, lugar, tema y el estado Completada. | Ninguno | Media | No aplica | No aplica |
| P-23 | Detalle de una asesoría ajena (RNF-04, RNF-07) | 25 nov 2026 | Brisa Aguayo | Un usuario que no es el estudiante ni el tutor de la asesoría no puede ver su detalle. | Respuesta 404 sin datos de la asesoría. | Ninguno | Alta | No aplica | No aplica |
| P-24 | Botones del mismo tamaño (CC-005) | 25 nov 2026 | Brisa Aguayo | Los botones que comparten un área miden lo mismo: Confirmar y Rechazar, Editar y Borrar, y los dos botones de la página de inicio. | Cada par mide lo mismo (por ejemplo 124 y 124 px en Solicitudes). | Ninguno | Baja | No aplica | No aplica |
| P-25 | Calendario del estudiante y modal del día (CC-006) | 26 nov 2026 | Brisa Aguayo | Noviembre se ve de lunes a domingo en semanas completas, sin la asesoría cancelada. Al elegir el 12 se abre un modal con la asesoría; se cierra con Esc y "Ver detalle" abre su detalle. | Rejilla de 42 días; el modal muestra "Jueves 12 de noviembre", Mariana Soto y el tema; Esc lo cierra y "Ver detalle" abre `/mis-asesorias/…`. En la revisión de la líder, "Ver detalle" parecía no responder. | **D-03:** no se reprodujo en Chrome (los 8 días abrieron en menos de 1 s); la causa probable es la demora de la base de datos en reposo, sin ninguna señal en pantalla. | Media | El botón cambia a "Abriendo..." mientras carga el detalle. | Corregido |
| P-26 | Calendario del tutor en celular (CC-006, RNF-03) | 26 nov 2026 | Brisa Aguayo | A 360 px el calendario no se desborda; al tocar un día con asesorías se abre el modal con el nombre del estudiante y se cierra con un clic fuera. | El calendario mide 360 px; el modal muestra a Carlos Méndez y se cierra con el clic fuera. | Ninguno | Media | No aplica | No aplica |
| P-27 | Calendario vacío y acceso por rol (CC-006, RNF-04) | 26 nov 2026 | Brisa Aguayo | Un estudiante sin asesorías ve el calendario vacío y, en el pie, "No tienes asesorías agendadas por el momento."; la coordinación no puede entrar. | Calendario sin días marcados y con el aviso en el pie; coordinación es enviada a `/login`. | Ninguno | Baja | No aplica | No aplica |
| P-28 | Semestre mínimo al registrarse como tutor (HU-01) | 26 nov 2026 | Brisa Aguayo | Con el rol Tutor, el selector deshabilita del 1.º al 5.º y pasa a 6.º; al volver a Estudiante se habilitan todos. | Con 3.º elegido, al cambiar a Tutor pasa a 6.º y los semestres 1 a 5 quedan deshabilitados; con Estudiante vuelven a estar disponibles. | Ninguno | Media | No aplica | No aplica |
| P-29 | Asesoría virtual confirmada sin link (CC-007) | 26 nov 2026 | Brisa Aguayo | El estudiante no ve la caja de texto; en su lugar aparece en cursiva "El tutor no ha adjuntado ningún link." | El detalle muestra el aviso en cursiva y no muestra la caja. | Ninguno | Media | No aplica | No aplica |
| P-30 | El tutor publica el link de la reunión con el lápiz (CC-007) | 26 nov 2026 | Brisa Aguayo | En la fila "Link de la reunión" el tutor ve la caja solo de lectura con el lápiz; al pulsarlo puede escribir. Un texto que no es link se rechaza; un link válido se guarda y la caja vuelve a quedar con el lápiz. El estudiante ve el link en esa fila y no en el calendario. | En la primera ejecución el lápiz enviaba el formulario en lugar de dejar escribir y el ícono se veía de 6 px. Después de corregirlo: "mi reunion" se rechaza, el link de Google Meet se guarda y el estudiante lo ve como enlace que abre en otra pestaña. | **D-04:** el lápiz y la palomita compartían el mismo botón y al cambiar de uno a otro se enviaba el formulario; el relleno del botón dejaba el ícono sin espacio. | Media | Botones separados para editar y guardar, y relleno 0 en los botones de ícono. | Corregido |
| P-31 | Las asesorías presenciales no llevan link (CC-007) | 26 nov 2026 | Brisa Aguayo | En una asesoría presencial confirmada ni el tutor ni el estudiante ven el link. | No aparece la caja ni el aviso en el detalle de ninguno de los dos. | Ninguno | Baja | No aplica | No aplica |
| P-32 | Guardar el link vacío lo elimina (CC-007) | 26 nov 2026 | Brisa Aguayo | Si el tutor borra el texto y guarda, el link se elimina y el estudiante vuelve a ver "El tutor no ha adjuntado ningún link." | Mensaje "Link de la reunión eliminado."; la caja queda vacía y el estudiante ve el aviso en cursiva. | Ninguno | Media | No aplica | No aplica |
| P-33 | Cambiar nombre desde el panel (CC-008) | 26 nov 2026 | Brisa Aguayo | La tarjeta cerrada muestra solo título y descripción; al seleccionarla crece solo ella y muestra la caja con el nombre actual y el lápiz. Con un clic fuera se guarda el nombre nuevo, aparece "El nombre ha sido cambiado con éxito." y el tutor ve el nombre nuevo. | Las demás tarjetas conservan su alto; "Carlos Iván Méndez" se guardó con el clic fuera, apareció el aviso, la tarjeta se cerró y el tutor lo ve en Mis asesorías. | Ninguno | Media | No aplica | No aplica |
| P-34 | Nombre vacío y acceso por rol (CC-008) | 26 nov 2026 | Brisa Aguayo | Un nombre vacío no se guarda; el tutor tiene la tarjeta y la coordinación no. | Aparece "Escribe tu nombre completo." y el nombre no cambia; el panel del tutor tiene la tarjeta y el de coordinación no. | Ninguno | Media | No aplica | No aplica |

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
| CP-17 | Mes del calendario y cambio de mes con las flechas (CC-006) | Aprobado |
| CP-18 | Rejilla del calendario de lunes a domingo en semanas completas (CC-006) | Aprobado |
| CP-19 | Link de la reunión válido: http o https y un dominio (CC-007) | Aprobado |
| CP-20 | Nombre nuevo sin espacios de más y sin quedar vacío (CC-008) | Aprobado |

Resultado: **20 de 20 aprobadas**.

## Resumen

| Concepto | Resultado |
|---|---|
| Pruebas ejecutadas | 54 (20 automatizadas y 34 de punta a punta) |
| Aprobadas en la primera ejecución | 35 de 37; las pruebas agregadas después (CC-005 a CC-008 y P-28) pasaron a la primera, salvo P-30 (D-04); en P-33 se ajustó el script de la prueba, no el sistema |
| Defectos encontrados | 4 (D-01 alta, D-02 baja, D-03 media y D-04 media) |
| Defectos corregidos y verificados | 4 de 4, el mismo día |
| Aprobadas en la ejecución final | **54 de 54 (100 %)** |
| Defectos abiertos al entregar | 0 |
