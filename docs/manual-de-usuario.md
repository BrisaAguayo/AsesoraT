# Manual de Usuario: AsesoraT

**Sistema para consultar y agendar asesorías académicas entre estudiantes**

Instituto Tecnológico de Tijuana · Tecnológico Nacional de México  
Proyecto integrador: Gestión de Proyectos de Software  
Mtra. Maria Guadalupe Rodríguez López

**Elaboró:** Brisa Julianna Aguayo Virgen (22211514)  
**Versión del sistema:** 1.0.0 · **Fecha:** 26 de noviembre de 2026

---

## Índice

1. Portada
2. Índice
3. Introducción
4. Objetivo del sistema
5. Descripción general
6. Requisitos para utilizar el sistema
7. Procedimiento de instalación o acceso
8. Inicio de sesión
9. Descripción de cada módulo
10. Instrucciones paso a paso
11. Capturas de pantalla del sistema
12. Ejemplos de uso
13. Solución de problemas frecuentes
14. Conclusiones
15. Datos del equipo desarrollador

---

## 3. Introducción

En el Instituto Tecnológico de Tijuana muchos estudiantes buscan ayuda con materias como Cálculo o Programación, y los tutores de semestres avanzados quieren ofrecerla. Hasta ahora esto se coordinaba por grupos de WhatsApp y carteles, sin saber qué horarios estaban libres.

**AsesoraT** es una aplicación web que reúne en un solo lugar las materias y horarios de los tutores para que el estudiante encuentre ayuda y reserve un horario en pocos pasos. Este manual explica cómo usar cada pantalla según el tipo de usuario.

## 4. Objetivo del sistema

Permitir que los estudiantes del Tecnológico de Tijuana encuentren un tutor por materia, vean su disponibilidad y agenden una asesoría **en máximo 3 pasos**, sin empalmes de horario, y que la coordinación conozca las horas de servicio de cada tutor.

## 5. Descripción general

AsesoraT tiene tres tipos de usuario:

| Rol | Qué puede hacer |
|---|---|
| **Estudiante** | Buscar asesorías por materia, tutor, día y modalidad; agendar; cancelar; ver su historial. |
| **Tutor** (6.º semestre o más) | Elegir sus materias, registrar sus horarios, confirmar o rechazar solicitudes, cancelar y marcar asesorías como completadas. |
| **Coordinación** | Consultar el reporte de asesorías completadas y horas por tutor, y exportarlo a CSV. |

Una asesoría pasa por estos estados:

| Estado | Significado |
|---|---|
| Pendiente | El estudiante la solicitó y espera respuesta del tutor. |
| Confirmada | El tutor la aceptó. |
| Cancelada | El estudiante o el tutor la canceló, o el tutor la rechazó. El horario vuelve a estar libre. |
| Completada | La asesoría ya ocurrió y el tutor la marcó como completada. |

## 6. Requisitos para utilizar el sistema

- Un celular, tableta o computadora con conexión a internet.
- Un navegador actualizado: Google Chrome, Microsoft Edge, Mozilla Firefox o Safari.
- Un **correo institucional** `@tectijuana.edu.mx`.
- Para registrarse como tutor: cursar 6.º semestre o más.

## 7. Procedimiento de instalación o acceso

AsesoraT es una aplicación web: **no necesita instalarse**. Para usarla:

1. Abre el navegador.
2. Entra a la dirección del sistema: **https://asesora-t.vercel.app**
3. Desde la página de inicio puedes buscar asesorías sin cuenta o pulsar **Crear cuenta**.

Para instalar el sistema en una computadora (equipo técnico), consulta el archivo `README.md` del repositorio.

### Cuentas de prueba

Todas usan la contraseña `Asesorat2026`.

| Rol | Correo |
|---|---|
| Estudiante | estudiante.demo@tectijuana.edu.mx |
| Tutor | tutora.demo@tectijuana.edu.mx |
| Coordinación | coordinacion.demo@tectijuana.edu.mx |

## 8. Inicio de sesión

### Crear una cuenta

1. En la página de inicio pulsa **Crear cuenta**.
2. Elige si te registras como **Estudiante** o **Tutor**.
3. Escribe tu nombre completo, correo institucional, número de control (8 dígitos), semestre y carrera. Si eliges **Tutor**, el selector solo permite del 6.º semestre en adelante.
4. Escribe una contraseña de al menos 8 caracteres con letras y números.
5. Pulsa **Crear cuenta**. El sistema inicia tu sesión y te lleva a tu panel.

![Registro](capturas/v1.0.0/28-registro.png)

### Iniciar sesión

1. Pulsa **Entrar** en la barra superior.
2. Escribe tu correo institucional y tu contraseña.
3. Pulsa **Entrar**. Verás tu panel según tu rol.

![Inicio de sesión](capturas/v1.0.0/27-login.png)

Para cerrar sesión pulsa **Salir** en la barra superior.

## 9. Descripción de cada módulo

| Módulo | Rol | Descripción |
|---|---|---|
| Inicio | Todos | Presenta el sistema y lleva a buscar asesorías o crear cuenta. |
| Registro e inicio de sesión | Todos | Acceso con correo institucional y contraseña cifrada. |
| Panel | Todos | Muestra las opciones disponibles según el rol. |
| Buscar asesorías | Todos | Lista los horarios disponibles con filtros por materia, tutor, día y modalidad. |
| Agendar | Estudiante | Elegir fecha libre, escribir el tema y enviar la solicitud. |
| Mis asesorías | Estudiante y tutor | Próximas asesorías e historial con su estado; permite cancelar. |
| Detalle de una asesoría | Estudiante y tutor | Todos los datos de la asesoría y su estado; en las virtuales confirmadas, el link de la reunión. El tutor publica el link y marca la asesoría como completada. |
| Calendario | Estudiante y tutor | Calendario mensual con sus asesorías; al elegir un día se abre un modal con su información. |
| Mis materias | Tutor | Elegir las materias del catálogo que puede asesorar. |
| Mi disponibilidad | Tutor | Registrar, editar y borrar sus horarios semanales. |
| Solicitudes | Tutor | Confirmar o rechazar las asesorías pendientes. |
| Reporte de horas | Coordinación | Asesorías completadas y horas por tutor en un periodo, exportable a CSV. |

## 10. Instrucciones paso a paso

### 10.1 Estudiante: buscar una asesoría

1. Pulsa **Buscar** en la barra superior o **Buscar asesorías** en tu panel.
2. Elige los filtros que necesites: materia, tutor, día o modalidad.
3. Pulsa **Buscar**. Cada tarjeta muestra la materia, el tutor y su semestre, el horario y el lugar.
4. Si no hay resultados, el sistema lo indica; prueba con otros filtros.

### 10.2 Estudiante: agendar una asesoría (3 pasos)

1. **Paso 1.** En la búsqueda, pulsa **Agendar** en la tarjeta del horario que quieres.
2. **Paso 2.** Elige una de las fechas disponibles de las próximas 4 semanas (las fechas ocupadas no aparecen) y escribe el tema a revisar.
3. **Paso 3.** Pulsa **Confirmar solicitud**. Verás el mensaje **Solicitud enviada** con los datos de la asesoría.

Tu asesoría queda **Pendiente** hasta que el tutor la confirme.

### 10.3 Estudiante o tutor: cancelar una asesoría

1. Entra a **Mis asesorías**.
2. En la sección **Próximas**, pulsa **Cancelar** en la asesoría.
3. Verás el mensaje **Asesoría cancelada. El horario quedó libre.**

Solo se puede cancelar **hasta 2 horas antes** del inicio. Después de ese límite el botón ya no aparece.

### 10.4 Estudiante o tutor: consultar el historial

1. Entra a **Mis asesorías**.
2. En **Próximas** están las asesorías por venir, de la más cercana a la más lejana.
3. En **Historial** están las pasadas y canceladas, de la más reciente a la más antigua, con su estado.
4. Haz clic en una asesoría o en **Ver detalle ›** para abrir su detalle: tutor o estudiante, fecha, horario, lugar, tema y estado.

### 10.5 Tutor: elegir materias

1. En tu panel pulsa **Mis materias**.
2. Marca las materias que puedes asesorar y desmarca las que ya no.
3. Pulsa **Guardar materias**. Aparecerás en las búsquedas de esas materias.

### 10.6 Tutor: registrar disponibilidad

1. En tu panel pulsa **Mi disponibilidad**.
2. Elige el día, la hora de inicio y de fin, la modalidad (presencial o virtual) y escribe el aula o el enlace de la videollamada.
3. Pulsa **Agregar bloque**.
4. Para cambiar un bloque pulsa **Editar**, modifica los datos y pulsa **Guardar cambios**. Para quitarlo pulsa **Borrar**.

El sistema no acepta bloques que se empalmen con otro del mismo día ni con hora de inicio después de la de fin.

### 10.7 Tutor: confirmar o rechazar solicitudes

1. En tu panel pulsa **Solicitudes**.
2. Revisa el estudiante, la materia, la fecha, el horario y el tema.
3. Pulsa **Confirmar** para aceptar o **Rechazar** para declinar. El estudiante verá el nuevo estado en Mis asesorías.

### 10.8 Tutor: marcar una asesoría como completada

1. Después de impartir una asesoría confirmada, entra a **Mis asesorías**.
2. En el **Historial**, abre la asesoría con **Ver detalle ›**.
3. Pulsa **Marcar como completada**.
4. Verás el mensaje **La asesoría quedó como completada.** El estudiante la verá como Completada en su historial.

Las asesorías completadas son las que cuenta el reporte de horas.

### 10.9 Coordinación: consultar y exportar el reporte

1. En tu panel pulsa **Reporte de horas**.
2. Elige las fechas **Desde** y **Hasta** y pulsa **Consultar**. Por omisión se muestra el mes actual.
3. La tabla muestra cada tutor con sus asesorías completadas, sus horas y el total.
4. Pulsa **Exportar CSV** para descargar el reporte y abrirlo en Excel.

### 10.10 Estudiante o tutor: consultar el calendario

1. Pulsa **Calendario** en la barra superior o en tu panel.
2. Verás el mes actual de lunes a domingo, con el día de hoy marcado en azul. Cada asesoría pendiente, confirmada o completada aparece en su día con un punto del color de su estado (amarillo, verde o azul). Las canceladas no aparecen.
3. Usa las flechas **‹** y **›** para cambiar de mes y **Hoy** para regresar al mes actual.
4. Haz clic en un día con asesorías para abrir un modal con la materia, el estado, el horario, el tutor o estudiante, el lugar y el tema. Pulsa **Ver detalle** para abrir la asesoría; mientras carga, el botón dice **Abriendo...**.
5. Cierra el modal con la **×**, con un clic fuera de él o con la tecla Esc.

Si no tienes asesorías agendadas, el calendario se ve vacío y abajo aparece "No tienes asesorías agendadas por el momento."

### 10.11 Tutor y estudiante: link de la reunión en asesorías virtuales

**Tutor**

1. Cuando confirmes una asesoría virtual, entra a **Mis asesorías** y abre su detalle con **Ver detalle ›**.
2. En la fila **Link de la reunión** pulsa el **lápiz** para escribir en la caja.
3. Pega el link de la videollamada (por ejemplo, de Google Meet o Microsoft Teams). Debe empezar con `https://`.
4. Pulsa la **palomita** para guardarlo. Verás el mensaje **Link de la reunión guardado.**
5. Para cambiarlo, pulsa otra vez el lápiz. Para quitarlo, borra el texto y guarda: verás **Link de la reunión eliminado.**

**Estudiante**

1. Abre el detalle de tu asesoría virtual confirmada.
2. En la fila **Link de la reunión** aparece el link que publicó el tutor; al pulsarlo se abre en otra pestaña.
3. Si el tutor todavía no lo publica, verás en cursiva *El tutor no ha adjuntado ningún link.*

El link solo aparece en el detalle de la asesoría, no en el calendario.

## 11. Capturas de pantalla del sistema

Capturas de la versión 1.0.0 con los datos de ejemplo.

**Página de inicio**
![Inicio](capturas/v1.0.0/01-inicio.png)

**Panel del estudiante**
![Panel del estudiante](capturas/v1.0.0/10-panel-estudiante.png)

**Buscar asesorías**
![Buscar asesorías](capturas/v1.0.0/02-buscar-todas.png)

**Filtro por tutor**
![Filtro por tutor](capturas/v1.0.0/03-buscar-filtro-tutor.png)

**Búsqueda sin resultados**
![Sin resultados](capturas/v1.0.0/04-buscar-sin-resultados.png)

**Agendar, paso 2: fecha y tema**
![Agendar paso 2](capturas/v1.0.0/11-agendar-paso2.png)

**Agendar, paso 3: confirmación**
![Confirmación](capturas/v1.0.0/12-agendar-confirmacion.png)

**Horario ocupado: el sistema impide el empalme**
![Empalme](capturas/v1.0.0/13-agendar-empalme.png)

**Mis asesorías del estudiante**
![Mis asesorías](capturas/v1.0.0/15-mis-asesorias-estudiante.png)

**Asesoría cancelada**
![Cancelada](capturas/v1.0.0/16-cancelada.png)

**Panel del tutor**
![Panel del tutor](capturas/v1.0.0/05-panel-tutor.png)

**Mis materias**
![Mis materias](capturas/v1.0.0/29-materias.png)

**Mi disponibilidad**
![Disponibilidad](capturas/v1.0.0/06-disponibilidad.png)

**Bloque empalmado rechazado**
![Empalme en disponibilidad](capturas/v1.0.0/07-disponibilidad-empalme.png)

**Editar un bloque**
![Editar bloque](capturas/v1.0.0/09-disponibilidad-editar.png)

**Solicitudes del tutor**
![Solicitudes](capturas/v1.0.0/14-solicitudes.png)

**Mis asesorías del tutor**
![Mis asesorías del tutor](capturas/v1.0.0/17-mis-asesorias-tutor.png)

**Detalle: el tutor marca la asesoría como completada**
![Marcar como completada](capturas/v1.0.0/30-detalle-tutor-completar.png)

**Detalle de una asesoría completada**
![Asesoría completada](capturas/v1.0.0/31-detalle-completada.png)

**Detalle que ve el estudiante**
![Detalle del estudiante](capturas/v1.0.0/32-detalle-estudiante.png)

**El tutor ingresa el link de la reunión**
![Ingresar link](capturas/v1.0.0/39-tutor-ingresa-link.png)

**El tutor guardó el link**
![Link guardado](capturas/v1.0.0/41-tutor-link-guardado.png)

**El estudiante sin link publicado**
![Sin link](capturas/v1.0.0/38-detalle-sin-link.png)

**El estudiante con el link publicado**
![Con link](capturas/v1.0.0/40-detalle-con-link.png)

**Calendario del estudiante**
![Calendario](capturas/v1.0.0/33-calendario-estudiante.png)

**Modal con las asesorías del día**
![Modal del calendario](capturas/v1.0.0/34-calendario-modal.png)

**Calendario sin asesorías agendadas**
![Calendario vacío](capturas/v1.0.0/37-calendario-vacio.png)

**Panel de coordinación**
![Panel de coordinación](capturas/v1.0.0/18-panel-coordinacion.png)

**Reporte de horas**
![Reporte](capturas/v1.0.0/19-reporte.png)

**Vista en celular (360 px)**

| Búsqueda | Agendar | Mis asesorías |
|---|---|---|
| ![](capturas/v1.0.0/21-movil-buscar.png) | ![](capturas/v1.0.0/23-movil-agendar.png) | ![](capturas/v1.0.0/22-movil-mis-asesorias.png) |

| Disponibilidad | Solicitudes | Reporte |
|---|---|---|
| ![](capturas/v1.0.0/24-movil-disponibilidad.png) | ![](capturas/v1.0.0/25-movil-solicitudes.png) | ![](capturas/v1.0.0/26-movil-reporte.png) |

| Calendario del tutor | Modal del día |
|---|---|
| ![](capturas/v1.0.0/35-movil-calendario-tutor.png) | ![](capturas/v1.0.0/36-movil-calendario-modal.png) |

## 12. Ejemplos de uso

**Ejemplo 1: Carlos necesita ayuda con Cálculo Integral.**  
Carlos entra con `estudiante.demo@tectijuana.edu.mx`, pulsa **Buscar**, elige la materia *Cálculo Integral* y ve el horario de Andrea López los lunes de 13:00 a 14:00 en el Edificio J, aula 5. Pulsa **Agendar**, elige el siguiente lunes libre, escribe "Integrales impropias" y pulsa **Confirmar solicitud**. Su asesoría queda Pendiente.

**Ejemplo 2: Andrea confirma la solicitud.**  
Andrea entra con `tutora.demo@tectijuana.edu.mx`, abre **Solicitudes**, ve la petición de Carlos y pulsa **Confirmar**. Carlos ve la asesoría como Confirmada en Mis asesorías. Después de impartirla, Andrea abre su detalle y pulsa **Marcar como completada**; Carlos la ve como Completada en su historial.

**Ejemplo 3: Carlos ya no puede asistir.**  
Un día antes, Carlos entra a **Mis asesorías** y pulsa **Cancelar**. La asesoría queda como Cancelada en su historial y ese lunes vuelve a estar disponible para otro estudiante.

**Ejemplo 4: La coordinación revisa las horas de noviembre.**  
La coordinación entra con `coordinacion.demo@tectijuana.edu.mx`, abre **Reporte de horas**, elige del 1 al 30 de noviembre y ve que Andrea López impartió 3 asesorías (3 horas). Pulsa **Exportar CSV** para guardar el reporte.

## 13. Solución de problemas frecuentes

| Problema | Causa | Solución |
|---|---|---|
| "Usa tu correo institucional @tectijuana.edu.mx." | El correo no es institucional. | Regístrate con tu correo del Tecnológico. |
| "Ese correo ya está registrado." | Ya tienes una cuenta. | Pulsa **Inicia sesión** y entra con tu contraseña. |
| "Correo o contraseña incorrectos." | Algún dato está mal escrito. | Revisa mayúsculas y que el correo esté completo. |
| "Para ser tutor debes cursar 6.º semestre o más." | El semestre es menor a 6. | Regístrate como estudiante. |
| Al pulsar **Agendar** me pide iniciar sesión. | Solo los estudiantes con sesión pueden agendar. | Inicia sesión; el sistema te regresa al horario elegido. |
| "Solo los estudiantes pueden agendar." | Entraste como tutor o coordinación. | Usa una cuenta de estudiante. |
| "Ese horario ya está ocupado. Elige otra fecha." | Otra persona reservó esa fecha antes. | Elige otra de las fechas disponibles. |
| "Este horario está ocupado las próximas 4 semanas." | No quedan fechas libres en ese bloque. | Busca otro horario o tutor. |
| No aparece el botón **Cancelar**. | Faltan menos de 2 horas, ya pasó o ya está cancelada. | Avisa directamente al tutor o al estudiante. |
| "Se empalma con tu bloque de..." | El bloque choca con otro del mismo día. | Cambia las horas o edita el bloque existente. |
| No aparezco en las búsquedas como tutor. | Faltan materias o horarios. | Registra al menos una materia en **Mis materias** y un bloque en **Mi disponibilidad**. |
| El reporte dice "No hay asesorías completadas". | No hay asesorías completadas en esas fechas. | Amplía el periodo o pide a los tutores marcar como completadas sus asesorías. |
| Aparece "El tutor no ha adjuntado ningún link." | El tutor todavía no publica el link de la reunión. | Espera a que lo publique o avísale al tutor. |
| Aparece "Escribe un link válido que empiece con https://". | Lo que se escribió no es un link. | Copia el link completo desde Google Meet o Teams y pégalo. |
| No aparece el botón **Marcar como completada**. | La asesoría no está confirmada o todavía no ocurre. | Se puede marcar después de la hora de inicio de una asesoría confirmada. |
| "No se encontró la página" al abrir una asesoría. | La asesoría no es tuya. | Cada usuario solo ve el detalle de sus propias asesorías. |

## 14. Conclusiones

AsesoraT cumple su objetivo: el estudiante encuentra un tutor por materia y agenda una asesoría en 3 pasos desde el celular o la computadora, sin empalmes de horario. Los tutores organizan sus materias, horarios y solicitudes en un solo lugar, y la coordinación obtiene en segundos las horas de servicio de cada tutor.

Como mejoras futuras (versión 1.1) se contemplan los avisos por correo al agendar, confirmar o cancelar una asesoría, y la calificación de las asesorías completadas para que los estudiantes sepan qué tutores ayudan más.

## 15. Datos del equipo desarrollador

| Dato | Información |
|---|---|
| Integrante | Brisa Julianna Aguayo Virgen |
| Número de control | 22211514 |
| Roles | Líder de proyecto, desarrolladora y responsable de pruebas |
| Materia | Gestión de Proyectos de Software |
| Docente | Mtra. Maria Guadalupe Rodríguez López |
| Repositorio | https://github.com/BrisaAguayo/AsesoraT |
