# Portafolio · Luis Castillo

Portafolio personal en Next.js (App Router), bilingüe ES/EN, con modo oscuro/claro y diseño bento.

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000 → redirige a /es o /en según el navegador
npm run lint
npm run build
```

## Estructura

```
src/
  app/[lang]/          layout raíz y página por idioma (/es, /en)
  proxy.ts             redirige "/" al idioma del navegador
  i18n/
    config.ts          idiomas soportados
    dictionaries/      todos los textos (es.ts es la fuente de tipos, en.ts debe cumplirla)
  data/                datos que no dependen del idioma
    site.ts            correo, redes, WhatsApp, ruta del CV
    solutions.ts       slides de "Soluciones por rubro" (acento, demo, capturas)
    projects.ts        proyectos reales (imagen, enlaces)
  components/
    layout/            Header, Footer, ThemeToggle
    sections/          Hero, Solutions (carrusel), Includes, HowWeWork, Projects, About, Contact
    contact/           panel lateral de contacto (WhatsApp con mensaje armado)
    ui/                Button, SectionHeading, DeviceMockup
  styles/globals.css   tokens de color, tipografía y utilidades
```

## Tareas comunes

- **Cambiar un texto:** edita `src/i18n/dictionaries/es.ts` y `en.ts`.
- **Activar WhatsApp:** pon tu número en `whatsapp` dentro de `src/data/site.ts` (formato `51987654321`).
- **Publicar la demo de un rubro:** en `src/data/solutions.ts` agrega `demoUrl`, `caseStudyUrl` y
  `screens: { laptop: "/images/solutions/x-desktop.png", phone: "/images/solutions/x-mobile.png" }`.
  Sin `demoUrl` el slide muestra "Demo en construcción".
- **Agregar un proyecto:** añade una entrada en `src/data/projects.ts` y su descripción en ambos diccionarios.

## Demos para clientes

Demos de producto por rubro, en español y fuera del portafolio (sin su header, footer ni estilos).
Viven en `/demos/*`, tienen su propio layout raíz (`src/app/demos/layout.tsx`) y `src/proxy.ts` no las redirige.

| Demo | Ruta | Vista del dueño |
|---|---|---|
| Casa Bruma (salón de belleza) | `/demos/salon` | `/demos/salon?vista=dueno` |
| FitMoche (gimnasio) | `/demos/gimnasio` | `/demos/gimnasio?vista=dueno` |

```
src/demos/
  core/                  reutilizable entre rubros
    types.ts             TenantConfig (negocio, tema, servicios, staff, módulos, textos) y datos de la demo
    theme.ts             colores y fuentes de la config → variables CSS (--t-*)
    fonts.ts             fuentes disponibles (next/font), elegidas por clave en la config
    usePersistedReducer.ts  reducer con datos de ejemplo de hoy, guardado en localStorage y "Reiniciar demo"
    store.tsx            store de citas (salón) sobre usePersistedReducer
    schedule.ts          horarios libres reales a partir de las citas del store
    metrics.ts           KPIs: ingresos por semana, servicios top, clientes por recuperar…
    components/          ViewSwitch, BookingFlow, Agenda, Kpi, Toast, Photo
  salon/
    config.ts            toda la información de Casa Bruma (cambiar de cliente = cambiar este archivo)
    seed.ts              datos de ejemplo con fechas relativas a hoy
    SalonDemo.tsx        une store, vistas, URL (?vista=dueno), reserva y switch
    site/                web pública ("Para tus clientes")
    panel/               sistema del dueño ("Para ti")
  gimnasio/
    config.ts            FitMoche: planes, clases, horario semanal, coaches, textos y datos del panel
    data.tsx             cupos por clase, leads, seed relativo a hoy y store
    motion.tsx           animaciones (contadores, marquesinas, carrusel fijado, confeti…)
    GymDemo.tsx          une store, vistas, URL (?vista=dueno), flujo "clase gratis" y switch
    site/ booking/ panel/  web pública, flujo con pase QR y panel del dueño
```

- **Nuevo cliente del mismo rubro:** copia `salon/config.ts`, cambia nombre, colores, fuentes, servicios,
  staff, horario y textos. Los módulos (`reservas`, `recordatorios`, `ventas`, `clientes`) se activan en `modules`.
- **Fotos:** cada foto de la config acepta `src` (por ejemplo `/demos/salon/hero.jpg` en `public/`); sin `src`
  se muestra un placeholder con la descripción. Se sirven con `next/image`.
- **Gimnasio:** las fotos están en `public/demos/gimnasio/` (WebP). Todas las animaciones respetan
  "reducir movimiento" del sistema (pasan a fundidos simples).
- **WhatsApp:** los números de la demo son ficticios, así que los enlaces abren WhatsApp con el mensaje
  y sin destinatario. Para un cliente real, define `contact.whatsapp.number`.
