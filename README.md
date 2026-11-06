# AsesoraT

Aplicación web para consultar y agendar asesorías académicas entre estudiantes del Instituto Tecnológico de Tijuana. Los alumnos con dificultades en una materia encuentran a un tutor de semestres avanzados, ven su disponibilidad y reservan un horario sin depender de grupos de WhatsApp o carteles.

> Proyecto integrador: Gestión de Proyectos de Software, semestre Ago-Dic 2026.
> Integrante: Brisa Julianna Aguayo Virgen (22211514).

## Estado actual

**Versión 0.2.0. Etapa II: planificación del proyecto (Sprint 2 terminado).** La aplicación ya está conectada a PostgreSQL: los usuarios se registran con su correo institucional, inician sesión, ven un panel según su rol, los tutores eligen sus materias y la búsqueda de asesorías lee de la base de datos.

| Módulo | Estado |
|---|---|
| Estructura del proyecto (Next.js + TS + Tailwind) | ✅ Listo |
| Base de datos (Prisma + PostgreSQL) con migración inicial | ✅ Listo (Sprint 2) |
| Registro e inicio de sesión con correo institucional (HU-01) | ✅ Listo (Sprint 2) |
| Panel por rol y protección de rutas (HU-01, RNF-04) | ✅ Listo (Sprint 2) |
| Materias del tutor (HU-02) | ✅ Listo (Sprint 2) |
| Búsqueda de asesorías desde la base de datos (HU-04) | 🟡 Filtros listos; falta disponibilidad editable (Sprint 3) |
| Disponibilidad del tutor (HU-03) | ⏳ Sprint 3 |
| Agendar / confirmar / cancelar asesorías | ⏳ Sprints 4 y 5 |
| Notificaciones por correo | ⏳ Sprint 5 |
| Calificación y reportes para coordinación | ⏳ Sprint 6 |
| Pruebas con usuarios y despliegue | ⏳ Sprint 7 |

## Tecnologías

- **Next.js 15** (App Router, Server Actions) + **React 19** + **TypeScript**
- **Tailwind CSS** para estilos
- **PostgreSQL 16** + **Prisma ORM** con adaptador `pg` (local en desarrollo, **Neon** en despliegue)
- **NextAuth.js** (sesión JWT) y **bcrypt** para contraseñas
- **Resend** para avisos por correo (Sprint 5)
- **Vercel** para despliegue
- **GitHub Projects** (tablero Kanban) e **Issues** para backlog y control de cambios

## Cómo correrlo

Requisitos: Node.js 20 o superior y una base de datos PostgreSQL (local o en Neon).

```bash
npm install
cp .env.example .env        # pon tu DATABASE_URL y un NEXTAUTH_SECRET
npm run db:deploy           # crea las tablas con la migración
npm run db:seed             # carga materias y cuentas de ejemplo
npm run dev                 # http://localhost:3000
```

### Cuentas de ejemplo

Todas usan la contraseña `Asesorat2026` (solo para desarrollo).

| Rol | Correo |
|---|---|
| Estudiante | estudiante.demo@tectijuana.edu.mx |
| Tutor | tutora.demo@tectijuana.edu.mx |
| Coordinación | coordinacion.demo@tectijuana.edu.mx |

### Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilación de producción |
| `npm test` | Pruebas automatizadas de las reglas de registro |
| `npm run lint` / `npm run typecheck` | Revisión de código y de tipos |
| `npm run db:migrate` | Crea una migración nueva al cambiar el modelo |
| `npm run db:deploy` | Aplica las migraciones a la base de datos |
| `npm run db:seed` | Carga datos de ejemplo |

## Estructura de carpetas

```
asesorat/
├── docs/                      # Documentación del proyecto
│   ├── plan-de-calidad.md     # Resumen del Plan de Calidad (Etapa I)
│   ├── requerimientos.md      # RF y RNF con su identificador
│   ├── historias-de-usuario.md
│   ├── backlog.md             # Backlog y cronograma reprogramado
│   ├── seguimiento.md         # Seguimiento y control por sprint
│   ├── bitacora-cambios.md    # Solicitudes de cambio (CC-###)
│   ├── capturas/              # Pantallas por sprint
│   └── diagramas/             # Casos de uso, flujos, modelo de BD, arquitectura
├── prisma/
│   ├── migrations/            # Migraciones de la base de datos
│   ├── schema.prisma          # Modelo de datos
│   └── seed.ts                # Datos de ejemplo
├── src/
│   ├── app/                   # Rutas: inicio, registro, login, panel, asesorias,
│   │                          # mis-asesorias, tutor/materias, api/auth
│   ├── components/            # Encabezado, TarjetaAsesoria, Campo, BotonSalir
│   ├── lib/                   # prisma, auth, sesion, validaciones (+ pruebas), formato
│   ├── types/                 # Tipos de la sesión de NextAuth
│   └── middleware.ts          # Protección de rutas por sesión y rol
├── .github/                   # Plantillas de issues y pull requests
├── CHANGELOG.md
└── CONTRIBUTING.md            # Flujo de trabajo y control de cambios
```

## Flujo de trabajo

Ver [CONTRIBUTING.md](CONTRIBUTING.md): ramas `feature/*`, commits con formato *Conventional Commits*, pull request hacia `main` y registro de cambios en [docs/bitacora-cambios.md](docs/bitacora-cambios.md).
