import type { EntryId, LayerId } from "@/data/cv";
import type { ProjectId } from "@/data/projects";

type Entry = { lane: string; period: string; role: string; company: string; summary?: string };

const es = {
  meta: {
    title: "Luis Castillo · Desarrollador de software",
    description:
      "Desarrollador de software full stack. Hoy en las aplicaciones de Telebanking de Scotiabank con Java, .NET y React; antes lideré equipos que entregaron sistemas con React y NestJS.",
  },
  nav: {
    career: "Trayectoria",
    projects: "Proyectos",
    approach: "Cómo trabajo",
    contact: "Contacto",
    cv: "Descargar CV",
  },
  hero: {
    prompt: "desarrollador de software",
    titleStart: "Desarrollo software con estándar de banca y lo llevo a ",
    titleAccent: "producción",
    titleEnd: ".",
    lead: "Hoy construyo y mantengo las aplicaciones de Telebanking de Scotiabank. Antes lideré equipos que entregaron sistemas contables, de recursos humanos y de ventas.",
    primaryCta: "Descargar CV",
    secondaryCta: "Explorar trayectoria",
    photoAlt: "Retrato de Luis Castillo",
    now: {
      label: "Ahora",
      title: "Software Engineer · Scotiabank",
      text: "Telebanking, como consultor externo vía IBM Technology. Desde enero de 2026.",
      stack: "Java · .NET · React · SQL Server",
    },
    status: {
      open: "Abierto a oportunidades",
      items: ["Full stack", "Remoto · Perú y el exterior", "ES / EN"],
      place: "Trujillo, Perú",
    },
  },
  figures: [
    { value: "5", text: "sistemas entregados a clientes, de punta a punta" },
    { value: "2", text: "equipos de 4 personas liderados" },
    { value: "90 %", text: "de ventas e inventario digitalizado en Damaris Salón" },
    { value: "~80 %", text: "de procesos de reclutamiento centralizados en Smart Talent" },
  ],
  career: {
    eyebrow: "Trayectoria",
    title: "Elige una tecnología y mira dónde la usé.",
    lead: "Dos ramas que avanzan en paralelo: empleo y formación por un lado, proyectos para empresas por el otro.",
    layers: {
      interface: "Interfaz",
      services: "Servicios",
      data: "Datos",
    } satisfies Record<LayerId, string>,
    hint: "Toca una tecnología para filtrar",
    /** {tech}, {count} and {total} are replaced at runtime. */
    result: "{tech}: {count} de {total} experiencias",
    clear: "Ver todo",
    entries: {
      graduation: {
        lane: "Formación",
        period: "Dic 2026",
        role: "Egreso de Ingeniería de Sistemas",
        company: "Universidad Nacional de Trujillo",
      },
      scotiabank: {
        lane: "Empleo",
        period: "Ene 2026 – Actual",
        role: "Software Engineer",
        company: "Scotiabank · vía IBM Technology",
        summary:
          "Desarrollo y mantenimiento de las aplicaciones de Telebanking: capa web en Java con Thymeleaf y React, servicios SOAP y nuevas API REST sobre Anthos con arquitectura hexagonal. Datos en SQL Server e integración con el core AS/400.",
      },
      numeral: {
        lane: "Empleo",
        period: "Oct – Dic 2025",
        role: "Desarrollador Frontend",
        company: "Numeral Education",
        summary:
          "Interfaces en React con componentes escalables, integración de APIs y apoyo en backend. Participé en la definición de flujos del producto.",
      },
      coplacont: {
        lane: "Clientes",
        period: "Abr – Ago 2025",
        role: "Líder técnico · Full stack",
        company: "Coplacont · R Asesoría Contable",
        summary:
          "Lideré un equipo de 4 en un sistema contable experto. Diseñé servicios y módulos, y refactoricé código heredado para mejorar la precisión de los cálculos financieros.",
      },
      smarttalent: {
        lane: "Clientes",
        period: "Ene – May 2025",
        role: "Líder técnico · Full stack",
        company: "Smart Talent Group",
        summary:
          "Sistema de solicitudes y reclutamiento que centralizó cerca del 80 % de los procesos. Gestioné al cliente y capacité a los usuarios finales.",
      },
      digenio: {
        lane: "Clientes",
        period: "Oct 2024 – Ene 2025",
        role: "Desarrollador Full stack",
        company: "Digenio Lab",
        summary:
          "Plataforma de OKRs para startups: seguimiento de objetivos, visualización del progreso y reportes.",
      },
      damaris: {
        lane: "Clientes",
        period: "Jun – Ago 2024",
        role: "Desarrollador Full stack",
        company: "Damaris Salón",
        summary:
          "Sistema de ventas e inventario de punta a punta. Digitalizó el 90 % de los procesos y redujo el trabajo manual.",
      },
      university: {
        lane: "Formación",
        period: "2021",
        role: "Inicio de Ingeniería de Sistemas",
        company: "Universidad Nacional de Trujillo",
      },
    } as Record<EntryId, Entry>,
  },
  projects: {
    eyebrow: "Proyectos",
    title: "Sistemas en producción, no ejercicios.",
    roles: {
      coplacont: "Líder técnico · Full stack",
      smarttalent: "Líder técnico · Full stack",
      digenio: "Full stack",
      auditai: "Frontend",
    } satisfies Record<ProjectId, string>,
  },
  approach: {
    eyebrow: "Cómo trabajo",
    title: "Lo que aporto a un equipo.",
    items: [
      {
        title: "Me muevo por todo el stack",
        text: "De una vista en React o Thymeleaf a un servicio en Java o NestJS y su consulta SQL. Sistemas nuevos y sistemas heredados.",
      },
      {
        title: "Estándar de banca",
        text: "Trabajo a diario en aplicaciones financieras: cambios cuidados, validación de entradas, roles y pruebas antes de pasar a producción.",
      },
      {
        title: "Lidero y acompaño la adopción",
        text: "Planifico con el equipo, hablo con el cliente y capacito a los usuarios hasta que el sistema se usa de verdad.",
      },
    ],
    facts: [
      { label: "Formación · 2021 – 2026", title: "Ingeniería de Sistemas", text: "Universidad Nacional de Trujillo" },
      { label: "Idiomas", title: "Español nativo · Inglés intermedio", text: "Centro de Idiomas UNT" },
      { label: "Certificaciones", title: "Desarrollo web full stack", text: "Platzi" },
    ],
  },
  contact: {
    eyebrow: "Contacto",
    title: "¿Tu equipo necesita un desarrollador? Hablemos.",
    copy: "Copiar",
    copied: "Copiado",
    copyLabel: "Copiar correo",
    cv: "Descargar CV (PDF)",
    note: "Respondo en menos de 24 horas. Disponible para entrevistas en español o en inglés.",
  },
};

export type CvDictionary = typeof es;
export default es;
