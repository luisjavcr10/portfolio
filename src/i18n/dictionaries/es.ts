const es = {
  meta: {
    title: "Luis Castillo · Software a medida para tu negocio",
    description:
      "Ingeniero de software full stack en Trujillo, Perú. Diseño y desarrollo sistemas web para empresas, desde el primer requerimiento hasta producción.",
  },
  nav: {
    solutions: "Soluciones",
    projects: "Proyectos",
    experience: "Experiencia",
    stack: "Stack",
    about: "Sobre mí",
    cta: "Trabajemos juntos",
    theme: "Cambiar tema",
    language: "Idioma",
  },
  hero: {
    eyebrow: "Full stack software engineer",
    title: "Software a medida que hace crecer tu negocio.",
    lead: "Soy Luis Castillo. Diseño y desarrollo sistemas web para empresas en Perú y el extranjero, desde el primer requerimiento hasta producción.",
    role: "Software Engineer en Scotiabank",
    location: "Trujillo, Perú",
    available: "Disponible para proyectos",
    primaryCta: "Trabajemos juntos",
    cvCta: "Descargar CV",
    photoAlt: "Retrato de Luis Castillo",
  },
  solutions: {
    eyebrow: "Soluciones por rubro",
    title: "Sistemas listos para tu industria.",
    lead: "Cuatro ejemplos con empresas ficticias. Cada uno se adapta a tus procesos, tu marca y tu equipo.",
    prev: "Anterior",
    next: "Siguiente",
    hint: "← → para navegar",
    demo: "Ver demo en vivo",
    caseStudy: "Ver caso de estudio",
    comingSoon: "Demo en construcción",
    sampleFigures: "Cifras de ejemplo",
    items: {
      agronorte: {
        industry: "Agroexportación",
        title: "Trazabilidad de cada lote, del campo al contenedor.",
        benefits: [
          { title: "Lotes y cosechas por parcela", text: "Arándano, espárrago y palta en un solo registro." },
          { title: "Control de calidad", text: "Alertas cuando un lote sale de especificación." },
          { title: "Reportes para exportación", text: "Documentos listos para certificadoras y clientes." },
        ],
        metrics: [
          { value: "−40%", label: "tiempo en reportes" },
          { value: "100%", label: "lotes trazables" },
          { value: "3", label: "cultivos en un panel" },
        ],
      },
      fitmoche: {
        industry: "Gimnasios",
        title: "Membresías, asistencia y clases en un solo panel.",
        benefits: [
          { title: "Check-in con QR", text: "Asistencia registrada en segundos." },
          { title: "Reservas desde el celular", text: "Cupos por clase y lista de espera." },
          { title: "Planes y renovaciones", text: "Cobros recurrentes y avisos de vencimiento." },
        ],
        metrics: [
          { value: "−30%", label: "morosidad" },
          { value: "+25%", label: "ocupación de clases" },
        ],
      },
      clinica: {
        industry: "Salud",
        title: "Agenda sin cruces y pacientes que llegan a su cita.",
        benefits: [
          { title: "Agenda por especialista", text: "Horarios, consultorios y bloqueos en un calendario." },
          { title: "Recordatorios automáticos", text: "Avisos por WhatsApp y correo antes de cada cita." },
          { title: "Historial del paciente", text: "Consultas, recetas y archivos ordenados." },
        ],
        metrics: [
          { value: "−35%", label: "inasistencias" },
          { value: "2 min", label: "para agendar una cita" },
        ],
      },
      credipyme: {
        industry: "Fintech para pymes",
        title: "Simula, evalúa y controla créditos para pymes.",
        benefits: [
          { title: "Simulador de créditos", text: "Cuotas, tasas y cronograma en tiempo real." },
          { title: "Panel de finanzas", text: "Flujo de caja e indicadores del negocio." },
          { title: "Reportes de cartera", text: "Seguimiento de pagos y mora por cliente." },
        ],
        metrics: [
          { value: "3×", label: "más rápido evaluar" },
          { value: "−50%", label: "errores manuales" },
        ],
      },
    },
  },
  projects: {
    eyebrow: "Proyectos reales",
    title: "Sistemas en producción para clientes reales.",
    links: { github: "GitHub", demo: "Ver demo" },
    items: {
      coplacont:
        "Sistema contable para estudios: compras, ventas, planillas y activos fijos, con asientos, libros y reportes financieros automáticos.",
      smarttalent: "Plataforma de RRHH para solicitudes de verificación y procesos de reclutamiento.",
      digenio: "Gestión de OKRs, startups y equipos, con seguimiento de sprints y tareas.",
      auditai:
        "Auditoría automatizada con IA (DeepSeek): evalúa datos frente a normativas como SOX y GDPR y genera dashboards con hallazgos.",
    },
  },
  experience: {
    eyebrow: "Experiencia",
    title: "Banca, freelance y universidad.",
    current: "Actualidad",
    location: "Trujillo · Perú",
    bank: {
      role: "Software Engineer",
      text: "Desarrollo de software dentro del área de tecnología del banco, en un entorno con altos estándares de calidad, seguridad y trabajo en equipo.",
    },
    freelance: {
      label: "Freelance",
      role: "Full Stack Developer",
      text: "Sistemas a medida para empresas, del levantamiento de requerimientos al despliegue: Coplacont, SmartTalent, Digenio y Damaris Salón.",
    },
    education: {
      label: "Formación",
      school: "Universidad Nacional de Trujillo",
      degree: "Ingeniería de Sistemas",
    },
  },
  stack: {
    eyebrow: "Stack",
    title: "TypeScript de punta a punta.",
    groups: {
      frontend: "Frontend",
      backend: "Backend",
      databases: "Bases de datos",
      tools: "Herramientas",
    },
  },
  about: {
    eyebrow: "Sobre mí",
    title: "Comunicación clara, trabajo ordenado y mejora continua.",
    text: "Soy Luis Javier, desarrollador de software en Trujillo. Me adapto rápido a nuevos equipos y me gusta entender el negocio antes de escribir código. Fuera del trabajo entreno en el gimnasio y juego fútbol.",
    madeIn: "Hecho en Trujillo, La Libertad",
    photoAlt: "Luis Castillo",
  },
  contact: {
    eyebrow: "Contacto",
    title: "¿Tienes un proyecto en mente?",
    lead: "Respondo en menos de 24 horas.",
    whatsapp: "Escríbeme por WhatsApp",
    emailCta: "Escríbeme un correo",
    form: {
      name: "Nombre",
      email: "Email",
      message: "¿Qué necesitas?",
      submit: "Enviar mensaje",
      sent: "Abriendo tu app de correo ✓",
      subject: "Nuevo proyecto desde el portafolio",
    },
  },
  footer: {
    madeIn: "Hecho en Trujillo, La Libertad",
  },
};

export default es;

export type Dictionary = typeof es;
