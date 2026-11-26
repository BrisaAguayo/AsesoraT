# AsesoraT

Aplicación web para consultar y agendar asesorías académicas entre estudiantes del Instituto Tecnológico de Tijuana. Los alumnos con dificultades en una materia encuentran a un tutor de semestres avanzados, ven su disponibilidad y reservan un horario sin depender de grupos de WhatsApp o carteles.

> Proyecto integrador: Gestión de Proyectos de Software, semestre Ago-Dic 2026.
> Integrante: Brisa Julianna Aguayo Virgen (22211514).

**Sistema en línea:** https://asesora-t.vercel.app
**Repositorio:** https://github.com/BrisaAguayo/AsesoraT

## Estado actual

**Versión 1.0.0 (26 nov 2026). Entrega final del proyecto.** Todas las historias de la versión 1.0.0 están terminadas y probadas (40 de 40 pruebas aprobadas).

| Módulo | Estado |
|---|---|
| Registro e inicio de sesión con correo institucional (HU-01) | ✅ Listo |
| Panel por rol y protección de rutas (HU-01, RNF-04) | ✅ Listo |
| Materias del tutor (HU-02) | ✅ Listo |
| Disponibilidad del tutor (HU-03) | ✅ Listo |
| Búsqueda por materia, tutor, día y modalidad (HU-04) | ✅ Listo |
| Agendar en 3 pasos sin empalmes (HU-05) | ✅ Listo |
| Confirmar o rechazar solicitudes (HU-06) | ✅ Listo |
| Cancelar hasta 2 horas antes (HU-07) | ✅ Listo |
| Historial de asesorías con detalle de cada una (HU-09) | ✅ Listo |
| Reporte de horas para coordinación con exportación a CSV (HU-11) | ✅ Listo |
| Avisos por correo (HU-08) y calificación (HU-10) | Mejoras futuras (versión 1.1) |

## Tecnologías

- **Next.js 15** (App Router, Server Actions) + **React 19**
- **Tailwind CSS** para estilos
- **PostgreSQL 16** + **Prisma ORM** con adaptador `pg` (**Neon** en la nube)
- **NextAuth.js** (sesión JWT) y **bcrypt** para contraseñas
- **Vercel** para el despliegue
- **GitHub Projects** (tablero Kanban), ramas y pull requests para el seguimiento

## Lenguajes de programación

- **TypeScript** (lógica del servidor, componentes y pruebas)
- **SQL** (migraciones de la base de datos en PostgreSQL)
- **CSS** con clases de Tailwind y **JSX/TSX** para las interfaces

## Instalación

Requisitos: Node.js 20 o superior y una base de datos PostgreSQL (local o en [Neon](https://neon.tech)).

```bash
git clone https://github.com/BrisaAguayo/AsesoraT.git
cd AsesoraT
npm install
cp .env.example .env        # pon tu DATABASE_URL y un NEXTAUTH_SECRET
npm run db:deploy           # crea las tablas con las migraciones
npm run db:seed             # carga materias, cuentas y asesorías de ejemplo
```

Variables del archivo `.env`:

| Variable | Ejemplo |
|---|---|
| `DATABASE_URL` | `postgresql://usuario:password@host/asesorat?sslmode=require` |
| `NEXTAUTH_SECRET` | Resultado de `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `http://localhost:3000` |

## Cómo ejecutarlo

```bash
npm run dev                 # modo desarrollo en http://localhost:3000
```

Versión de producción:

```bash
npm run build
npm run start               # http://localhost:3000
```

## Credenciales de prueba

Todas usan la contraseña `Asesorat2026`.

| Rol | Correo |
|---|---|
| Estudiante | estudiante.demo@tectijuana.edu.mx |
| Tutor | tutora.demo@tectijuana.edu.mx |
| Coordinación | coordinacion.demo@tectijuana.edu.mx |

Otros tutores de ejemplo: `diego.demo@`, `mariana.demo@` y `luis.demo@tectijuana.edu.mx`.

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` / `npm run start` | Compilación y servidor de producción |
| `npm test` | 16 pruebas automatizadas de las reglas de negocio |
| `npm run lint` / `npm run typecheck` | Revisión de código y de tipos |
| `npm run db:deploy` | Aplica las migraciones a la base de datos |
| `npm run db:seed` | Carga datos de ejemplo |

## Documentación

| Documento | Archivo |
|---|---|
| Manual de usuario | [docs/manual-de-usuario.md](docs/manual-de-usuario.md) |
| Bitácora de supervisión y pruebas | [docs/bitacora-pruebas.md](docs/bitacora-pruebas.md) |
| Seguimiento y control | [docs/seguimiento.md](docs/seguimiento.md) |
| Bitácora individual de participación | [docs/bitacora-individual.md](docs/bitacora-individual.md) |
| Backlog y cronograma | [docs/backlog.md](docs/backlog.md) |
| Bitácora de cambios (CC-001 a CC-004) | [docs/bitacora-cambios.md](docs/bitacora-cambios.md) |
| Requerimientos e historias de usuario | [docs/requerimientos.md](docs/requerimientos.md), [docs/historias-de-usuario.md](docs/historias-de-usuario.md) |
| Plan de calidad y diagramas | [docs/plan-de-calidad.md](docs/plan-de-calidad.md), [docs/diagramas.md](docs/diagramas.md) |
| Historial de versiones | [CHANGELOG.md](CHANGELOG.md) |

## Estructura de carpetas

```
AsesoraT/
├── docs/                      # Documentación, bitácoras, manual y capturas
├── prisma/
│   ├── migrations/            # Migraciones de la base de datos
│   ├── schema.prisma          # Modelo de datos
│   └── seed.ts                # Datos de ejemplo
├── src/
│   ├── app/                   # Rutas: inicio, registro, login, panel, asesorias (buscar y agendar),
│   │                          # mis-asesorias, tutor (materias, disponibilidad, solicitudes),
│   │                          # coordinacion/reporte, api/auth
│   ├── components/            # Encabezado, TarjetaAsesoria, Campo, BotonSalir
│   ├── lib/                   # prisma, auth, sesion, validaciones, horarios, reporte (+ pruebas)
│   ├── types/                 # Tipos de la sesión de NextAuth
│   └── middleware.ts          # Protección de rutas por sesión y rol
├── .github/                   # Plantillas de issues y pull requests
├── CHANGELOG.md
└── CONTRIBUTING.md            # Flujo de trabajo y control de cambios
```

## Flujo de trabajo

Ver [CONTRIBUTING.md](CONTRIBUTING.md): ramas `feature/*`, `fix/*` y `docs/*`, commits con formato *Conventional Commits*, pull request hacia `main` y registro de cambios en [docs/bitacora-cambios.md](docs/bitacora-cambios.md).
