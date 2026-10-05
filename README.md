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
    solutions.ts       slides de "Soluciones por rubro" (acento, stack, demo, capturas)
    projects.ts        proyectos reales (imagen, stack, enlaces)
    stack.ts           grupos de tecnologías
  components/
    layout/            Header, Footer, ThemeToggle
    sections/          Hero, Solutions (carrusel), Projects, Experience, Stack, About, Contact
    ui/                Button, Chip, SectionHeading, DeviceMockup
  styles/globals.css   tokens de color, tipografía y utilidades
```

## Tareas comunes

- **Cambiar un texto:** edita `src/i18n/dictionaries/es.ts` y `en.ts`.
- **Activar WhatsApp:** pon tu número en `whatsapp` dentro de `src/data/site.ts` (formato `51987654321`).
- **Publicar la demo de un rubro:** en `src/data/solutions.ts` agrega `demoUrl`, `caseStudyUrl` y
  `screens: { laptop: "/images/solutions/x-desktop.png", phone: "/images/solutions/x-mobile.png" }`.
  Sin `demoUrl` el slide muestra "Demo en construcción".
- **Agregar un proyecto:** añade una entrada en `src/data/projects.ts` y su descripción en ambos diccionarios.
