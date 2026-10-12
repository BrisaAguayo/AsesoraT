# AsesoraT

Aplicación web para consultar y agendar asesorías académicas entre estudiantes del Instituto Tecnológico de Tijuana. Los alumnos con dificultades en una materia encuentran a un tutor de semestres avanzados, ven su disponibilidad y reservan un horario sin depender de grupos de WhatsApp o carteles.

> Proyecto integrador: Gestión de Proyectos de Software, semestre Ago-Dic 2026.
> Integrante: Brisa Julianna Aguayo Virgen (22211514).

## Estado actual

**Etapa I - Gestión de calidad.** Se tiene la estructura base del proyecto, el modelo de datos inicial (Prisma), las pantallas iniciales de la interfaz y la documentación de planeación en `docs/`.

| Módulo | Estado |
|---|---|
| Estructura del proyecto (Next.js + TS + Tailwind) | ✅ Listo |
| Modelo de datos (Prisma / PostgreSQL) | ✅ Versión inicial |
| Pantallas iniciales (inicio, login, buscar asesorías, mis asesorías) | 🟡 Interfaz con datos de ejemplo |
| Autenticación con correo institucional | ⏳ Sprint 2 |
| Agendar / confirmar / cancelar asesorías | ⏳ Sprints 3 a 4 |
| Notificaciones por correo | ⏳ Sprint 5 |
| Reportes para coordinación | ⏳ Sprint 6 |

## Tecnologías

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS** para estilos
- **PostgreSQL** (Neon) + **Prisma ORM**
- **NextAuth.js** para autenticación y **Resend** para avisos por correo (planeados)
- **Vercel** para despliegue
- **GitHub Projects** (tablero Kanban) e **Issues** para backlog y control de cambios

## Estructura de carpetas

```
asesorat/
├── docs/                    # Documentación del proyecto
│   ├── plan-de-calidad.md   # Resumen del Plan de Calidad
│   ├── requerimientos.md    # RF y RNF con su identificador
│   ├── historias-de-usuario.md
│   ├── backlog.md
│   ├── diagramas/           # Casos de uso, flujo, modelo de BD (Mermaid)
│   └── bitacora-cambios.md  # Registro de solicitudes de cambio
├── prisma/
│   ├── schema.prisma        # Modelo de datos
│   └── seed.ts              # Datos de ejemplo
├── src/
│   ├── app/                 # Rutas (App Router)
│   ├── components/          # Componentes reutilizables
│   └── lib/                 # Cliente de Prisma, utilidades, validaciones
├── .github/                 # Plantillas de issues y pull requests
├── CHANGELOG.md
└── CONTRIBUTING.md          # Flujo de trabajo y control de cambios
```

## Cómo correrlo

```bash
npm install
cp .env.example .env        # agrega tu DATABASE_URL de Neon
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

Abrir http://localhost:3000

## Flujo de trabajo

Ver [CONTRIBUTING.md](CONTRIBUTING.md): ramas `feature/*`, commits con formato *Conventional Commits*, pull request hacia `main` y registro de cambios en [docs/bitacora-cambios.md](docs/bitacora-cambios.md).
