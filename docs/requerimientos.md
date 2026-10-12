# Requerimientos de AsesoraT

## Requerimientos funcionales

| ID | Requerimiento | Prioridad | Historia |
|---|---|---|---|
| RF-01 | El sistema permite registrarse e iniciar sesión con correo institucional (@tectijuana.edu.mx). | Alta | HU-01 |
| RF-02 | El sistema maneja tres roles: estudiante, tutor y coordinación, con permisos distintos. | Alta | HU-01 |
| RF-03 | El tutor registra las materias que puede asesorar y sus bloques de disponibilidad semanal (día, hora, modalidad y lugar). | Alta | HU-02, HU-03 |
| RF-04 | El estudiante busca asesorías filtrando por materia, tutor, día y modalidad. | Alta | HU-04 |
| RF-05 | El estudiante agenda una asesoría en un horario disponible indicando el tema a revisar. | Alta | HU-05 |
| RF-06 | El sistema impide reservar un horario ya ocupado (sin empalmes). | Alta | HU-05 |
| RF-07 | El tutor confirma o rechaza la solicitud; estudiante y tutor pueden cancelar hasta 2 horas antes. | Alta | HU-06, HU-07 |
| RF-08 | El sistema envía un correo de aviso al agendar, confirmar o cancelar una asesoría. | Media | HU-08 |
| RF-09 | Cada usuario consulta su historial de asesorías y su estado. | Media | HU-09 |
| RF-10 | El estudiante califica la asesoría (1 a 5) y deja un comentario al terminar. | Baja | HU-10 |
| RF-11 | La coordinación consulta un reporte de asesorías y horas impartidas por tutor. | Media | HU-11 |

## Requerimientos no funcionales

| ID | Tipo | Requerimiento |
|---|---|---|
| RNF-01 | Usabilidad | Un estudiante debe poder agendar una asesoría en máximo 3 pasos y en menos de 2 minutos. |
| RNF-02 | Rendimiento | Las páginas principales cargan en menos de 2 segundos con conexión 4G. |
| RNF-03 | Compatibilidad | Diseño adaptable que funciona desde 360 px (celular) hasta escritorio, en Chrome, Edge, Firefox y Safari actuales. |
| RNF-04 | Seguridad | Contraseñas cifradas con bcrypt, conexión HTTPS y acceso a cada pantalla según el rol. |
| RNF-05 | Disponibilidad | El sistema está disponible al menos el 99 % del tiempo en horario escolar (7:00 a 22:00). |
| RNF-06 | Mantenibilidad | Código en TypeScript con tipado estricto, linter sin errores y estructura de carpetas documentada. |
| RNF-07 | Privacidad | Solo se muestran nombre, semestre y materias del tutor; el número de control no es visible para otros usuarios. |
