import type { Photo, TenantConfig } from "@/demos/core/types";

/** Copy for the public site of a beauty-salon tenant. Text inside *asterisks* renders in italics. */
export type SalonSiteCopy = {
  nav: { label: string; href: string }[];
  bookCta: string;
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    mainPhoto: Photo;
    detailPhoto: Photo;
  };
  trust: { value: string; star?: boolean; label: string }[];
  services: { eyebrow: string; title: string; note: string; bookLabel: string };
  team: { eyebrow: string; title: string; ctaPrefix: string };
  work: {
    eyebrow: string;
    title: string;
    before: Photo;
    after: Photo;
    gallery: Photo[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    items: { quote: string; author: string; service: string; photo?: Photo }[];
  };
  steps: { eyebrow: string; title: string; items: { title: string; text: string }[]; cta: string };
  location: {
    eyebrow: string;
    whatsappCta: string;
    mapsCta: string;
    map: Photo;
  };
  footer: { note: string };
  panel: {
    subtitle: string;
    tabs: { hoy: string; agenda: string; clientes: string; ventas: string };
    navLabel: string;
    /** {appointments} {staff} {close} */
    todaySummary: string;
    loading: string;
    newBooking: {
      badge: string;
      confirm: string;
      confirmed: string;
      whatsapp: string;
      labels: { day: string; time: string; staff: string; phone: string };
      /** {name} {service} {day} {time} */
      message: string;
      confirmedToast: string;
    };
    empty: { title: string; text: string; cta: string };
    kpis: {
      appointments: string;
      /** {count} */
      gaps: string;
      revenue: string;
      /** {pct} */
      revenueUp: string;
      revenueDown: string;
      noShows: string;
      /** {before} */
      noShowsNote: string;
      lapsed: string;
      lapsedNote: string;
    };
    agenda: { today: string; other: string; closed: string; prev: string; next: string; legend: string };
    sales: { title: string; unit: string; top: string; appointments: string };
    lapsed: {
      title: string;
      text: string;
      send: string;
      sent: string;
      /** {count} */
      more: string;
      doneTitle: string;
      doneText: string;
      /** {name} {owner} {business} {days} {service} {staff} */
      message: string;
      /** {name} */
      toast: string;
    };
    reminders: {
      title: string;
      /** {total} {ok} {cancelled} {noReply} */
      summary: string;
      tomorrow: string;
      newSuffix: string;
      status: { confirmed: string; "no-reply": string; cancelled: string; scheduled: string };
    };
  };
  demo: {
    switchLabel: string;
    /** Always-visible label that says the business is made up. */
    notice: string;
    clientView: string;
    ownerView: string;
  };
};

export const salonConfig: TenantConfig<SalonSiteCopy> = {
  id: "casa-bruma",
  name: "Casa Bruma",
  tagline: "Salón & Spa · Trujillo",
  theme: {
    colors: {
      base: "#F5EFE6",
      muted: "#E7D9C4",
      accent: "#B86B4B",
      accentInk: "#9A5236",
      primary: "#3E4A3D",
      ink: "#1E1A17",
      inkSoft: "#5B524A",
    },
    fonts: { display: "fraunces", body: "manrope" },
    grain: true,
  },
  owner: {
    name: "Lucía Paredes",
    role: "Dueña",
    greeting: "Buenos días, Lucía",
    photo: {
      src: "/demos/salon/duena-lucia.webp",
      alt: "Lucía Paredes, dueña de Casa Bruma",
      hint: "retrato · Lucía",
      position: "50% 22%",
    },
  },
  contact: {
    address: "Av. Larco",
    area: "San Andrés",
    city: "Trujillo",
    mapsUrl: "https://maps.google.com/?q=Av.+Larco+Trujillo",
    // Fictional business: no real number, so WhatsApp opens without a recipient.
    whatsapp: { display: "9XX XXX XXX", message: "Hola Casa Bruma, quisiera información" },
    instagram: { handle: "@casabruma.trujillo", url: "https://instagram.com/casabruma.trujillo" },
  },
  hours: [
    { label: "Lunes a sábado", weekdays: [1, 2, 3, 4, 5, 6], open: "09:00", close: "20:00" },
    { label: "Domingo", weekdays: [0], open: "10:00", close: "15:00" },
  ],
  currency: { symbol: "S/", locale: "es-PE" },
  vocabulary: { staff: "estilista", client: "clienta", clients: "clientas" },
  categories: [
    {
      id: "cabello",
      name: "Cabello",
      kicker: "01",
      blurb: "Cortes y brushing para el día a día o para una ocasión especial.",
      tone: "muted",
      photo: {
        src: "/demos/salon/servicio-cabello.webp",
        alt: "Estilista cortando el cabello mojado de una clienta con tijera y peine",
        hint: "foto · corte y brushing",
        position: "55% 35%",
      },
    },
    {
      id: "color",
      name: "Color",
      kicker: "02",
      blurb: "Tintes y balayage a mano alzada, con diagnóstico previo de tu cabello.",
      tone: "accent",
      photo: {
        src: "/demos/salon/servicio-color.webp",
        alt: "Colorista aplicando balayage con papel aluminio",
        hint: "foto · balayage miel",
        position: "50% 40%",
      },
    },
    {
      id: "unas",
      name: "Uñas",
      kicker: "03",
      blurb: "Manicure, pedicure, acrílicas y lifting de pestañas.",
      tone: "primarySoft",
      photo: {
        src: "/demos/salon/servicio-unas.webp",
        alt: "Manicurista pintando uñas en tono terracota",
        hint: "foto · manos, uñas nude",
        position: "50% 60%",
      },
    },
    {
      id: "spa",
      name: "Spa",
      kicker: "04",
      blurb: "Keratina e hidratación para devolverle brillo y suavidad a tu cabello.",
      tone: "primary",
      photo: {
        src: "/demos/salon/servicio-spa.webp",
        alt: "Clienta relajada durante un lavado con tratamiento capilar",
        hint: "foto · tratamiento capilar",
        position: "45% 55%",
      },
    },
  ],
  services: [
    { id: "corte-dama", categoryId: "cabello", name: "Corte de dama", price: 45, duration: 45 },
    { id: "corte-caballero", categoryId: "cabello", name: "Corte de caballero", price: 30, duration: 30 },
    { id: "brushing", categoryId: "cabello", name: "Brushing", price: 35, duration: 40 },
    { id: "tinte", categoryId: "color", name: "Tinte completo", price: 120, from: true, duration: 120 },
    { id: "balayage", categoryId: "color", name: "Mechas / balayage", price: 220, from: true, duration: 180 },
    { id: "manicure", categoryId: "unas", name: "Manicure", price: 25, duration: 40 },
    { id: "pedicure", categoryId: "unas", name: "Pedicure", price: 35, duration: 50 },
    { id: "acrilicas", categoryId: "unas", name: "Uñas acrílicas", price: 80, duration: 90 },
    { id: "lifting", categoryId: "unas", name: "Lifting de pestañas", price: 70, duration: 60 },
    { id: "keratina", categoryId: "spa", name: "Keratina", price: 180, from: true, duration: 150 },
    { id: "hidratante", categoryId: "spa", name: "Tratamiento hidratante", price: 60, duration: 45 },
  ],
  staff: [
    {
      id: "valeria",
      name: "Valeria",
      role: "Colorista",
      bio: "Balayage, rubios y correcciones de color.",
      categoryIds: ["color", "cabello"],
      photo: {
        src: "/demos/salon/estilista-valeria.webp",
        alt: "Valeria, colorista, sonriendo con una brocha de tinte en el salón",
        hint: "retrato · Valeria",
        position: "50% 25%",
      },
    },
    {
      id: "diego",
      name: "Diego",
      role: "Cortes y barbería",
      bio: "Fades, cortes clásicos y cortes de dama.",
      categoryIds: ["cabello"],
      photo: {
        src: "/demos/salon/estilista-diego.webp",
        alt: "Diego, barbero, con mandil negro y tijeras en la mano",
        hint: "retrato · Diego",
        position: "50% 25%",
      },
    },
    {
      id: "camila",
      name: "Camila",
      role: "Uñas y pestañas",
      bio: "Acrílicas, diseños y lifting de pestañas.",
      categoryIds: ["unas"],
      photo: {
        src: "/demos/salon/estilista-camila.webp",
        alt: "Camila, especialista en uñas y pestañas, sonriendo",
        hint: "retrato · Camila",
        position: "50% 30%",
      },
    },
    {
      id: "rosa",
      name: "Rosa",
      role: "Tratamientos y spa",
      bio: "Keratina e hidratación profunda.",
      categoryIds: ["spa", "cabello"],
      photo: {
        src: "/demos/salon/estilista-rosa.webp",
        alt: "Rosa, especialista en tratamientos, con uniforme verde en el salón",
        hint: "retrato · Rosa",
        position: "50% 25%",
      },
    },
  ],
  modules: { reservas: true, recordatorios: true, ventas: true, clientes: true },
  booking: {
    slotMinutes: 30,
    leadMinutes: 60,
    daysAhead: 7,
    codePrefix: "CB",
    phone: { countryCode: "51", pattern: "^9\\d{8}$" },
    copy: {
      title: "Reserva tu cita",
      confirmedTitle: "Reserva confirmada",
      steps: ["Servicio", "Estilista", "Día y hora", "Tus datos"],
      staffIntro: "Te mostramos quién hace {service}.",
      anyStaff: { name: "Cualquiera", role: "La primera persona disponible", note: "Más horarios" },
      anyStaffSummary: "quien esté disponible",
      noSlots: { title: "Ya no quedan horarios este día", text: "Prueba con otro día de la semana." },
      nameLabel: "Tu nombre",
      namePlaceholder: "Ej. Andrea Ruiz",
      phoneLabel: "Tu WhatsApp",
      phonePlaceholder: "9XX XXX XXX",
      privacyNote: "Solo usamos tu número para confirmar y recordarte la cita.",
      errors: {
        name: "Escribe tu nombre para saber a quién esperamos.",
        phone: "Revisa tu número: deben ser 9 dígitos y empezar con 9.",
        slotTaken: "Ese horario se acaba de ocupar. Elige otro, por favor.",
      },
      next: "Continuar",
      back: "Atrás",
      confirm: "Confirmar reserva",
      doneTitle: "¡Listo, {name}!",
      doneText: "Tu cita quedó reservada.",
      reminderNote: "Te enviaremos un recordatorio por WhatsApp un día antes al {phone}.",
      goToPanel: "Mira tu reserva en el sistema del salón →",
      backToSite: "Volver a la web",
      close: "Cerrar",
    },
  },
  site: {
    nav: [
      { label: "Servicios", href: "#servicios" },
      { label: "Equipo", href: "#equipo" },
      { label: "Trabajos", href: "#trabajos" },
      { label: "Ubicación", href: "#ubicacion" },
    ],
    bookCta: "Reservar",
    hero: {
      eyebrow: "Av. Larco · San Andrés",
      title: "Tu mejor versión, *sin esperar* en WhatsApp",
      lead: "Cortes, color, uñas y spa en Trujillo. Elige tu servicio, tu estilista y tu hora desde el celular, y recibe tu recordatorio un día antes.",
      primaryCta: "Reservar cita",
      secondaryCta: "Ver servicios",
      mainPhoto: {
        src: "/demos/salon/hero-desktop.webp",
        srcMobile: "/demos/salon/hero-mobile.webp",
        alt: "Clienta sonriendo frente al espejo mientras su estilista le arregla las ondas",
        hint: "foto grande · cabello en movimiento, luz cálida",
        position: "74% 50%",
      },
      detailPhoto: {
        src: "/demos/salon/hero-detalle.webp",
        alt: "Tijeras, cepillo y peine sobre lino con hojas de olivo",
        hint: "foto · manos",
        position: "28% 50%",
      },
    },
    trust: [
      { value: "4.8", star: true, label: "de nuestras clientas" },
      { value: "+230", label: "reseñas" },
      { value: "11 años", label: "de experiencia en Trujillo" },
      { value: "30 s", label: "para reservar tu cita" },
    ],
    services: {
      eyebrow: "Servicios",
      title: "Precios claros, *sin sorpresas*",
      note: "Los precios “desde” dependen del largo y el estado de tu cabello. Te confirmamos antes de empezar.",
      bookLabel: "Reservar",
    },
    team: { eyebrow: "Equipo", title: "Manos que ya *conocen* tu cabello", ctaPrefix: "Reservar con" },
    work: {
      eyebrow: "Trabajos recientes",
      title: "Antes y *después*",
      before: {
        src: "/demos/salon/antes.webp",
        alt: "Antes: cabello negro, lacio y sin color",
        hint: "antes · cabello sin color",
      },
      after: {
        src: "/demos/salon/despues.webp",
        alt: "Después: balayage miel con ondas, por Valeria",
        hint: "después · balayage miel, por Valeria",
      },
      gallery: [
        {
          src: "/demos/salon/galeria-bob.webp",
          alt: "Corte bob liso y brillante, de perfil",
          hint: "corte bob · Diego",
        },
        {
          src: "/demos/salon/galeria-unas.webp",
          alt: "Uñas nude con diseño de hojas terracota",
          hint: "uñas acrílicas · nude",
        },
        {
          src: "/demos/salon/galeria-fade.webp",
          alt: "Corte fade de barbería visto de perfil",
          hint: "fade · barbería",
          position: "55% 40%",
        },
        {
          src: "/demos/salon/galeria-pestanas.webp",
          alt: "Primer plano de pestañas con lifting",
          hint: "lifting de pestañas",
          position: "40% 50%",
        },
        { alt: "Keratina antes de un evento", hint: "keratina · antes de evento" },
        { alt: "Brushing con ondas", hint: "brushing con ondas" },
      ],
    },
    testimonials: {
      eyebrow: "4.8 ★ · 230 reseñas",
      title: "Lo que dicen *nuestras clientas*",
      items: [
        {
          quote:
            "Llegué con el cabello maltratado por las planchas y Rosa me lo dejó como nuevo. Reservé por la web en un minuto, sin estar escribiendo a cada rato.",
          author: "Mariela P.",
          photo: { src: "/demos/salon/cliente-mariela.webp", alt: "Mariela P., sonriendo", hint: "retrato · Mariela P." },
          service: "Keratina",
        },
        {
          quote: "Valeria entendió el tono que quería a la primera. Mi balayage sigue lindo después de cuatro meses.",
          author: "Fiorella C.",
          photo: { src: "/demos/salon/cliente-fiorella.webp", alt: "Fiorella C., sonriendo", hint: "retrato · Fiorella C." },
          service: "Mechas / balayage",
        },
        {
          quote:
            "Diego es un crack con el fade. Me llega el recordatorio al WhatsApp un día antes y ya no se me pasa la cita.",
          author: "Renzo T.",
          photo: { src: "/demos/salon/cliente-renzo.webp", alt: "Renzo T., sonriendo", hint: "retrato · Renzo T." },
          service: "Corte de caballero",
        },
      ],
    },
    steps: {
      eyebrow: "Cómo funciona",
      title: "Tres pasos y *listo*",
      items: [
        { title: "Elige tu servicio", text: "Con precio y duración a la vista, y con la estilista que prefieras." },
        { title: "Elige tu hora", text: "Ves solo los horarios libres. Sin esperar a que te respondan." },
        { title: "Recibe tu recordatorio", text: "Te escribimos por WhatsApp un día antes para confirmar." },
      ],
      cta: "Reservar ahora",
    },
    location: {
      eyebrow: "Ubicación y horario",
      whatsappCta: "Escribir por WhatsApp",
      mapsCta: "Cómo llegar",
      map: {
        src: "/demos/salon/interior.webp",
        alt: "Interior de Casa Bruma: sillones color camel frente a espejos de arco dorados",
        hint: "interior · Av. Larco, Trujillo",
      },
    },
    footer: { note: "Demo de portafolio · negocio ficticio · fotos generadas con IA" },
    panel: {
      subtitle: "Panel del salón",
      tabs: { hoy: "Hoy", agenda: "Agenda", clientes: "Clientes", ventas: "Ventas" },
      navLabel: "Secciones del panel",
      todaySummary: "{appointments} citas · {staff} estilistas · cierra a las {close}",
      loading: "Sincronizando reservas online…",
      newBooking: {
        badge: "Nueva · reservada online hace un momento",
        confirm: "Confirmar cita",
        confirmed: "✓ Confirmada · recordatorio programado",
        whatsapp: "Escribir por WhatsApp",
        labels: { day: "Día", time: "Hora", staff: "Estilista", phone: "WhatsApp" },
        message: "Hola {name}, te escribimos de Casa Bruma para confirmar tu cita de {service} el {day} a las {time}.",
        confirmedToast: "Cita confirmada. El recordatorio sale un día antes.",
      },
      empty: {
        title: "Aún no llegan reservas online nuevas",
        text: "Cuando una clienta reserve desde la web, aparecerá aquí al instante, antes que en tu WhatsApp.",
        cta: "Hacer una reserva de prueba",
      },
      kpis: {
        appointments: "Citas de hoy",
        gaps: "{count} huecos libres en la tarde",
        revenue: "Ingresos de la semana",
        revenueUp: "▲ {pct}% vs. semana pasada",
        revenueDown: "▼ {pct}% vs. semana pasada",
        noShows: "Inasistencias del mes",
        noShowsNote: "▼ bajó desde {before}% gracias a los recordatorios",
        lapsed: "Clientes por recuperar",
        lapsedNote: "No vienen hace +45 días",
      },
      agenda: {
        today: "Agenda de hoy",
        other: "Agenda · {day}",
        closed: "El salón no atiende este día.",
        prev: "Día anterior",
        next: "Día siguiente",
        legend: "Leyenda",
      },
      sales: {
        title: "Ingresos · últimas 8 semanas",
        unit: "en soles",
        top: "Servicios más vendidos · este mes",
        appointments: "citas",
      },
      lapsed: {
        title: "Te extrañamos",
        text: "Clientas que no vienen hace más de 45 días. Un mensaje a tiempo las trae de vuelta.",
        send: "Enviar WhatsApp",
        sent: "✓ Enviado hoy",
        more: "y {count} clientas más en la lista completa",
        doneTitle: "Listo por hoy",
        doneText: "Les escribiste a todas. Te avisaremos cuando otra clienta pase los 45 días sin venir.",
        message:
          "Hola {name}, te saluda {owner} de {business}. Ya pasaron {days} días desde tu {service} con {staff} y te extrañamos. Esta semana tenemos horarios libres el jueves y el viernes. ¿Te separo una hora? Si prefieres, reserva directo aquí: casabruma.pe/reservar",
        toast: "Mensaje para {name} abierto en WhatsApp",
      },
      reminders: {
        title: "Recordatorios enviados hoy",
        summary: "{total} enviados · {ok} confirmaron · {cancelled} canceló · {noReply} sin respuesta",
        tomorrow: "mañana",
        newSuffix: "(nueva)",
        status: {
          confirmed: "Confirmó",
          "no-reply": "Sin respuesta",
          cancelled: "Canceló",
          scheduled: "Programado",
        },
      },
    },
    demo: {
      switchLabel: "Vista de la demo",
      notice: "Demo · negocio ficticio",
      clientView: "Para tus clientes",
      ownerView: "Para ti",
    },
  },
};
