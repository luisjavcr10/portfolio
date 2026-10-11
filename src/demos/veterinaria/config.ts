import type { Photo, TenantConfig } from "@/demos/core/types";
import type { IconName } from "./icons";
import type { VetModule } from "./types";

/**
 * Copy and per-section data for a veterinary-clinic tenant.
 * Text inside *asterisks* is highlighted; {placeholders} are filled at runtime.
 */
export type VetSiteCopy = {
  brandSub: string;
  nav: { label: string; href: string }[];
  /** Emergency line. Without `tel` (fictional business) it links to the location section. */
  emergency: { display: string; tel?: string; label: string };
  bookCta: string;
  hero: {
    badge: string;
    title: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    rating: { value: string; text: string };
    hours: string;
    photo: Photo;
    tag: string;
    /** Floating card; {pet} {vaccine} {date} come from the featured patient's health card. */
    reminderTitle: string;
    reminderText: string;
  };
  services: {
    eyebrow: string;
    title: string;
    note: string;
    from: string;
    /** Hidden prefix read before each service card, e.g. "Reservar:". {service} {price} available. */
    bookLabel: string;
    items: Record<string, { sub: string; desc: string; icon: IconName; photo?: Photo }>;
  };
  carnet: {
    eyebrow: string;
    title: string;
    text: string;
    bullets: string[];
    cta: string;
    /** Patient shown on the sample card. */
    patientId: string;
    cardLabel: string;
    nextLabel: string;
    /** {days} */
    inDays: string;
    /** {owner} {date} */
    reminder: string;
  };
  team: { eyebrow: string; title: string };
  numbers: {
    label: string;
    items: { value: number; prefix?: string; decimals?: number; star?: boolean; label: string }[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    starsLabel: string;
    items: { quote: string; who: string; detail: string; photo: Photo }[];
  };
  faq: { title: string; items: { q: string; a: string }[] };
  location: {
    title: string;
    photo: Photo;
    hours: { label: string; value: string }[];
    emergency: string;
    instagram: string;
    mapsCta: string;
  };
  ctaBand: { title: string; text: string; button: string };
  footer: { tagline: string; note: string };
  panel: {
    subtitle: string;
    navLabel: string;
    tabs: Record<"hoy" | VetModule, string>;
    loading: string;
    /** {date} {count} */
    todaySub: string;
    newBooking: {
      badge: string;
      seePatient: string;
      confirm: string;
      confirmed: string;
      /** {owner} {pet} {service} {day} {time} */
      message: string;
      toast: string;
    };
    kpis: {
      today: string;
      /** {count} */
      todayNew: string;
      /** {count} */
      todayNote: string;
      due: string;
      dueCta: string;
      revenue: string;
      revenueNote: string;
      returned: string;
    };
    agenda: { today: string; title: string; sub: string; closed: string; dayLabel: string; newDot: string; legend: string };
    grooming: {
      title: string;
      columns: { recibido: string; bano: string; listo: string };
      actions: { toBath: string; ready: string; notify: string; notified: string };
      empty: string;
      /** {owner} {pet} {close} */
      message: string;
      /** {owner} */
      toast: string;
    };
    patients: {
      title: string;
      /** {count} */
      sub: string;
      search: string;
      empty: string;
      back: string;
      newBadge: string;
      /** {record} */
      record: string;
      call: string;
      /** {phone} */
      callToast: string;
      whatsapp: string;
      /** {owner} {pet} */
      whatsappMessage: string;
      owner: string;
      ownerNote: string;
      ownerNoteNew: string;
      weight: string;
      weightChart: string;
      /** {delta} */
      weightDelta: string;
      weightNew: string;
      events: string;
      eventsEmpty: string;
      applied: string;
      next: string;
      notes: string;
      pending: string;
      species: { perro: string; gato: string };
      /** {service} */
      firstVisit: string;
      newNote: string;
    };
    reminders: {
      title: string;
      sub: string;
      sentMonth: string;
      booked: string;
      pending: string;
      listTitle: string;
      sendAll: string;
      send: string;
      sent: string;
      /** {date} */
      due: string;
      /** {owner} {pet} {reason} {date} */
      message: string;
      /** {owner} */
      toast: string;
      /** {count} */
      toastAll: string;
      empty: string;
    };
    cash: {
      title: string;
      total: string;
      /** {count} {pending} */
      summary: string;
      methods: { yape: string; plin: string; tarjeta: string; efectivo: string };
      /** {count} {pct} */
      methodNote: string;
      pendingBadge: string;
      webMethod: string;
      empty: string;
    };
  };
  demo: {
    switchLabel: string;
    clientView: string;
    ownerView: string;
    reset: string;
    resetDone: string;
    hint: string;
    hintDismiss: string;
  };
};

export type VetConfig = TenantConfig<VetSiteCopy, VetModule>;

export const vetConfig: VetConfig = {
  id: "kusivet",
  name: "KusiVet",
  tagline: "Clínica veterinaria · Trujillo",
  theme: {
    colors: {
      base: "#FFF8EE",
      muted: "#EADFCF",
      accent: "#FF7A59",
      accentInk: "#1F5C42",
      primary: "#2E7D5B",
      ink: "#1E2A26",
      inkSoft: "#4A5853",
    },
    fonts: { display: "nunito", body: "nunitoSans" },
    grain: false,
  },
  owner: {
    name: "Dra. Fiorella Reyes",
    role: "Directora",
    greeting: "Buenos días, Dra. Fiorella",
    photo: {
      src: "/demos/veterinaria/avatar-fiorella.webp",
      alt: "Dra. Fiorella Reyes",
      hint: "retrato · Dra. Fiorella",
    },
  },
  contact: {
    address: "Av. Larco 1240",
    area: "Urb. San Andrés",
    city: "Trujillo, La Libertad",
    mapsUrl: "https://maps.google.com/?q=Av.+Larco+1240+Trujillo",
    // Fictional business: no number, so WhatsApp opens without a recipient.
    whatsapp: { display: "944 555 777", message: "Hola KusiVet, quiero reservar una cita para mi mascota." },
    instagram: { handle: "@kusivet.trujillo", url: "https://instagram.com/kusivet.trujillo" },
  },
  hours: [
    { label: "Lunes a sábado", weekdays: [1, 2, 3, 4, 5, 6], open: "09:00", close: "20:00" },
    { label: "Domingo", weekdays: [0], open: "09:00", close: "13:00" },
  ],
  currency: { symbol: "S/", locale: "es-PE" },
  vocabulary: { staff: "veterinario", client: "dueño", clients: "dueños" },
  categories: [
    {
      id: "consultas",
      name: "Consultas y diagnóstico",
      kicker: "Consulta",
      blurb: "Revisión, diagnóstico y ecografía.",
      tone: "primarySoft",
      photo: { alt: "", hint: "consulta" },
    },
    {
      id: "prevencion",
      name: "Vacunas y prevención",
      kicker: "Vacuna",
      blurb: "Vacunas, desparasitación y control de cachorros.",
      tone: "accent",
      photo: { alt: "", hint: "vacunas" },
    },
    {
      id: "cirugia",
      name: "Cirugía",
      kicker: "Cirugía",
      blurb: "Esterilización y limpieza dental.",
      tone: "primary",
      photo: { alt: "", hint: "cirugía" },
    },
    {
      id: "bano",
      name: "Baño y peluquería",
      kicker: "Baño",
      blurb: "Baño, corte y uñas.",
      tone: "muted",
      photo: { alt: "", hint: "baño" },
    },
  ],
  services: [
    { id: "consulta", categoryId: "consultas", name: "Consulta general", price: 50, duration: 30 },
    { id: "vacuna", categoryId: "prevencion", name: "Vacunación", price: 45, from: true, duration: 20 },
    { id: "desparasitacion", categoryId: "prevencion", name: "Desparasitación", price: 30, duration: 15 },
    { id: "bano", categoryId: "bano", name: "Baño y corte", price: 45, duration: 90 },
    { id: "esterilizacion", categoryId: "cirugia", name: "Esterilización", price: 280, from: true, duration: 240 },
    { id: "eco", categoryId: "consultas", name: "Ecografía", price: 90, duration: 40 },
    { id: "dental", categoryId: "cirugia", name: "Limpieza dental", price: 180, duration: 60 },
    { id: "cachorro", categoryId: "prevencion", name: "Control de cachorro", price: 120, duration: 30 },
  ],
  staff: [
    {
      id: "fiorella",
      name: "Dra. Fiorella Reyes",
      role: "Medicina general y cirugía",
      bio: "Fundó KusiVet hace 12 años. Opera con monitoreo completo y te explica cada paso.",
      categoryIds: ["consultas", "prevencion", "cirugia"],
      photo: {
        src: "/demos/veterinaria/equipo-fiorella.webp",
        alt: "Dra. Fiorella Reyes, con mandil verde, cargando a un gato naranja",
        hint: "retrato · Dra. Fiorella",
        position: "50% 20%",
      },
      avatar: "/demos/veterinaria/avatar-fiorella.webp",
    },
    {
      id: "mauricio",
      name: "Dr. Mauricio Paredes",
      role: "Dermatología y ecografía",
      bio: "Se ocupa de alergias y problemas de piel. Hace las ecografías con informe el mismo día.",
      categoryIds: ["consultas", "prevencion", "cirugia"],
      photo: {
        src: "/demos/veterinaria/equipo-mauricio.webp",
        alt: "Dr. Mauricio Paredes, con bata blanca, cargando a un schnauzer",
        hint: "retrato · Dr. Mauricio",
        position: "50% 20%",
      },
      avatar: "/demos/veterinaria/avatar-mauricio.webp",
    },
    {
      id: "rosa",
      name: "Rosa",
      role: "Baño y peluquería",
      bio: "Baña y peluquea con paciencia, sobre todo a los más nerviosos.",
      categoryIds: ["bano"],
      photo: {
        src: "/demos/veterinaria/equipo-rosa.webp",
        alt: "Rosa, con mandil coral, secando con una toalla a un perrito blanco",
        hint: "retrato · Rosa",
        position: "50% 20%",
      },
      avatar: "/demos/veterinaria/avatar-rosa.webp",
    },
  ],
  modules: { agenda: true, pacientes: true, recordatorios: true, peluqueria: true, caja: true },
  booking: {
    slotMinutes: 30,
    leadMinutes: 60,
    daysAhead: 14,
    codePrefix: "KV",
    phone: { countryCode: "51", pattern: "^9\\d{8}$" },
    copy: {
      title: "Reserva su cita",
      confirmedTitle: "Cita reservada",
      steps: ["Servicio", "Veterinario", "Día y hora", "Tus datos"],
      staffIntro: "¿Con quién prefieres para {service}?",
      anyStaff: { name: "El primero disponible", role: "Te damos el turno más cercano", note: "" },
      anyStaffSummary: "el primero disponible",
      noSlots: { title: "No quedan horarios este día", text: "Prueba con otro día o con otro profesional." },
      nameLabel: "Tu nombre",
      namePlaceholder: "Ej. Lucía Fernández",
      phoneLabel: "Celular (WhatsApp)",
      phonePlaceholder: "9XX XXX XXX",
      privacyNote: "Te enviaremos la confirmación por WhatsApp. No compartimos tu número.",
      errors: {
        name: "Escribe tu nombre para saber a quién esperamos.",
        phone: "Revisa tu celular: son 9 dígitos y empieza con 9.",
        slotTaken: "Alguien acaba de tomar ese horario. Elige otro, por favor.",
      },
      next: "Continuar",
      back: "Atrás",
      confirm: "Confirmar cita",
      doneTitle: "¡Listo, {name}!",
      doneText: "Tu cita quedó reservada en la agenda de KusiVet.",
      reminderNote: "Te escribimos por WhatsApp al {phone} para confirmar y te recordamos un día antes.",
      goToPanel: "Mira cómo llega la cita al sistema de la veterinaria →",
      backToSite: "Cerrar",
      close: "Cerrar",
    },
    pet: {
      stepLabel: "Tu mascota",
      title: "¿Quién viene a la consulta?",
      species: [
        { id: "perro", label: "Perro" },
        { id: "gato", label: "Gato" },
      ],
      nameLabel: "Nombre de tu mascota",
      namePlaceholder: "Ej. Canela",
      ageLabel: "Edad aproximada",
      ages: ["Menos de 1 año", "1 a 3 años", "4 a 7 años", "8 años o más"],
      serviceIntro: "¿Qué necesita {pet}?",
      petFallback: "tu mascota",
      summaryLabel: "Mascota",
      example: {
        label: "Usar ejemplo",
        pet: { species: "perro", name: "Canela", age: "1 a 3 años" },
        clientName: "Ana Torres",
        phone: "987214563",
      },
    },
  },
  site: {
    brandSub: "Clínica veterinaria",
    nav: [
      { label: "Servicios", href: "#servicios" },
      { label: "Carnet digital", href: "#carnet" },
      { label: "Equipo", href: "#equipo" },
      { label: "Preguntas", href: "#preguntas" },
      { label: "Ubicación", href: "#ubicacion" },
    ],
    // Fictional business: no `tel`, so the emergency buttons lead to the location section.
    emergency: { display: "944 555 777", label: "Emergencias: 944 555 777, ver cómo llegar" },
    bookCta: "Reserva su cita",
    hero: {
      badge: "Atendemos emergencias · 944 555 777",
      title: "Cuidamos a tu mascota como parte de tu *familia*",
      lead: "Consultas, vacunas, cirugía y baño en la Urb. San Andrés. Guardamos su carnet digital y te escribimos por WhatsApp cuando le toque su próxima vacuna.",
      primaryCta: "Reserva su cita",
      secondaryCta: "Ver servicios",
      rating: { value: "4.8", text: "en Google · 260 reseñas" },
      hours: "Lun a sáb 9:00–20:00",
      photo: {
        src: "/demos/veterinaria/hero-desktop.webp",
        srcMobile: "/demos/veterinaria/hero-mobile.webp",
        alt: "Veterinaria de KusiVet arrodillada junto a Otto, un pastor alemán que mira a cámara",
        hint: "hero · Otto con la veterinaria",
        position: "66% 50%",
      },
      tag: "Mascotas sanas, familias felices",
      reminderTitle: "{pet} · {vaccine}",
      reminderText: "Te avisamos por WhatsApp el {date}",
    },
    services: {
      eyebrow: "Servicios",
      title: "Precios claros, sin sorpresas",
      note: "Precios en soles. Si tu mascota necesita algo más, te lo explicamos antes de hacerlo.",
      from: "desde",
      bookLabel: "Reservar:",
      items: {
        consulta: {
          sub: "Perros y gatos",
          desc: "Revisión completa, diagnóstico y un plan de cuidado claro.",
          icon: "stethoscope",
          photo: {
            src: "/demos/veterinaria/servicio-consulta.webp",
            alt: "",
            hint: "consulta",
            position: "center 40%",
          },
        },
        vacuna: {
          sub: "Queda en su carnet digital",
          desc: "Séxtuple, antirrábica y triple felina, con recordatorio de la siguiente.",
          icon: "syringe",
          photo: { src: "/demos/veterinaria/servicio-vacuna.webp", alt: "", hint: "vacuna", position: "center 35%" },
        },
        desparasitacion: {
          sub: "Interna y externa",
          desc: "Según su peso, con aviso para la próxima dosis.",
          icon: "pill",
          photo: {
            src: "/demos/veterinaria/servicio-desparasitacion.webp",
            alt: "",
            hint: "desparasitación",
            position: "center 45%",
          },
        },
        bano: {
          sub: "Perro pequeño",
          desc: "Champú hipoalergénico, corte, uñas y limpieza de oídos.",
          icon: "shower",
          photo: { src: "/demos/veterinaria/servicio-bano.webp", alt: "", hint: "baño", position: "40% 40%" },
        },
        esterilizacion: {
          sub: "Perros y gatos",
          desc: "Evaluación previa, anestesia monitoreada y control posoperatorio.",
          icon: "bandage",
          photo: {
            src: "/demos/veterinaria/servicio-cirugia.webp",
            alt: "",
            hint: "cirugía",
            position: "center 60%",
          },
        },
        eco: {
          sub: "Abdominal y de control",
          desc: "Con informe el mismo día y explicación de los resultados.",
          icon: "heartPulse",
          photo: { src: "/demos/veterinaria/servicio-eco.webp", alt: "", hint: "ecografía", position: "center 55%" },
        },
        dental: {
          sub: "Con sedación",
          desc: "Destartraje y pulido con ultrasonido para encías sanas.",
          icon: "tooth",
          photo: { src: "/demos/veterinaria/servicio-dental.webp", alt: "", hint: "dental", position: "center 35%" },
        },
        cachorro: {
          sub: "3 visitas",
          desc: "Primeras vacunas, desparasitación y control de su crecimiento.",
          icon: "paw",
          photo: {
            src: "/demos/veterinaria/servicio-cachorro.webp",
            alt: "",
            hint: "cachorro",
            position: "center 45%",
          },
        },
      },
    },
    carnet: {
      eyebrow: "Carnet digital",
      title: "Su carnet, siempre a la mano",
      text: "Cada vacuna y desparasitación queda registrada. Unos días antes de la siguiente, te escribimos por WhatsApp para reservar. Tú no tienes que acordarte de nada.",
      bullets: ["Historial completo desde su primera vacuna", "Aviso por WhatsApp 3 días antes"],
      cta: "Empieza su carnet con una cita",
      patientId: "otto",
      cardLabel: "Carnet N.º",
      nextLabel: "Próxima vacuna",
      inDays: "en {days} días",
      reminder: "*Te recordamos por WhatsApp.* {owner} recibirá un mensaje el {date}.",
    },
    team: { eyebrow: "Equipo", title: "Quienes van a cuidar a tu engreído" },
    numbers: {
      label: "KusiVet en números",
      items: [
        { value: 3500, prefix: "+", label: "mascotas atendidas" },
        { value: 12, label: "años en Trujillo" },
        { value: 4.8, decimals: 1, star: true, label: "en Google · 260 reseñas" },
      ],
    },
    testimonials: {
      eyebrow: "Testimonios",
      title: "Lo que cuentan las familias",
      starsLabel: "5 de 5 estrellas",
      items: [
        {
          quote:
            "Me escribieron por WhatsApp justo antes de su vacuna. Yo ni me acordaba. A Otto lo tratan con un cariño que se nota.",
          who: "Lucía y Otto",
          detail: "Pastor alemán, 3 años",
          photo: {
            src: "/demos/veterinaria/testimonio-lucia.webp",
            alt: "Lucía abrazando a Otto en el sofá de su casa",
            hint: "Lucía y Otto",
          },
        },
        {
          quote:
            "Michi odia salir de casa, pero el Dr. Mauricio tuvo toda la paciencia del mundo. Salimos tranquilos y con todo bien explicado.",
          who: "Carlos y Michi",
          detail: "Gato persa, 5 años",
          photo: {
            src: "/demos/veterinaria/testimonio-carlos.webp",
            alt: "Carlos con Michi, su gato persa gris, en el patio de su casa",
            hint: "Carlos y Michi",
          },
        },
        {
          quote:
            "Rosa baña a Luna desde cachorrita y siempre vuelve feliz a casa. Mi hijo ya pregunta cuándo le toca. Reservo en un minuto desde el celular.",
          who: "Andrea y Luna",
          detail: "Beagle, 2 años",
          photo: {
            src: "/demos/veterinaria/testimonio-andrea.webp",
            alt: "Andrea y su hijo riendo mientras Luna, su beagle, le da un lengüetazo",
            hint: "Andrea y Luna",
          },
        },
      ],
    },
    faq: {
      title: "Preguntas frecuentes",
      items: [
        {
          q: "¿Atienden gatos?",
          a: "Sí. Tenemos horarios tranquilos en la mañana y una sala de espera aparte para gatos, lejos de los perros.",
        },
        {
          q: "¿Hacen visitas a domicilio?",
          a: "Sí, para consultas y vacunas dentro de Trujillo, de lunes a sábado. Escríbenos por WhatsApp y coordinamos la hora.",
        },
        {
          q: "¿Qué vacunas necesita un cachorro?",
          a: "Desde las 6 a 8 semanas: séxtuple con sus refuerzos, antirrábica a partir de los 3 meses y desparasitación mensual hasta los 6 meses. En el control de cachorro las vemos todas y quedan en su carnet.",
        },
      ],
    },
    location: {
      title: "Visítanos",
      photo: {
        src: "/demos/veterinaria/ubicacion.webp",
        alt: "Sala de espera y recepción de KusiVet, con sillones verdes y familias esperando con sus mascotas",
        hint: "interior · Av. Larco 1240",
      },
      hours: [
        { label: "Lunes a sábado", value: "9:00–20:00" },
        { label: "Domingo", value: "9:00–13:00" },
      ],
      emergency: "Emergencias:",
      instagram: "Instagram",
      mapsCta: "Cómo llegar",
    },
    ctaBand: {
      title: "Reserva su cita en 1 minuto",
      text: "Eliges servicio, día y hora. Te confirmamos por WhatsApp.",
      button: "Reserva su cita",
    },
    footer: { tagline: "Mascotas sanas, familias felices", note: "Negocio ficticio · demo de portafolio" },
    panel: {
      subtitle: "Panel de la clínica",
      navLabel: "Secciones del panel",
      tabs: {
        hoy: "Hoy",
        agenda: "Agenda",
        pacientes: "Pacientes",
        recordatorios: "Recordatorios",
        peluqueria: "Peluquería",
        caja: "Caja",
      },
      loading: "Cargando la agenda de la clínica…",
      todaySub: "{date} · {count} citas en agenda",
      newBooking: {
        badge: "Nueva · reservada desde la web",
        seePatient: "Ver ficha",
        confirm: "Confirmar por WhatsApp",
        confirmed: "Confirmación enviada",
        message:
          "Hola {owner}, te escribimos de KusiVet para confirmar la cita de {pet} ({service}) el {day} a las {time}. ¡Los esperamos en Av. Larco 1240!",
        toast: "Confirmación abierta en WhatsApp",
      },
      kpis: {
        today: "Citas de hoy",
        todayNew: "+{count} reservada desde la web",
        todayNote: "{count} profesionales en turno",
        due: "Vacunas por vencer esta semana",
        dueCta: "Ver recordatorios →",
        revenue: "Ingresos del mes",
        revenueNote: "vs. el mes pasado",
        returned: "Volvieron por su control",
      },
      agenda: {
        today: "Agenda de hoy",
        title: "Agenda",
        sub: "Citas por veterinario · próximas 2 semanas",
        closed: "La clínica no atiende este día.",
        dayLabel: "Día de la agenda",
        newDot: "cita nueva",
        legend: "Tipos de cita",
      },
      grooming: {
        title: "Baño y peluquería",
        columns: { recibido: "Recibido", bano: "En baño", listo: "Listo para recoger" },
        actions: {
          toBath: "Pasar a baño",
          ready: "Marcar como listo",
          notify: "Avisar que está listo",
          notified: "Avisado por WhatsApp",
        },
        empty: "Nada por aquí",
        message:
          "Hola {owner}, {pet} ya terminó su baño y te espera para volver a casa 🐾 Atendemos hasta las {close}. — KusiVet",
        toast: "Aviso para {owner} abierto en WhatsApp",
      },
      patients: {
        title: "Pacientes",
        sub: "{count} mascotas en seguimiento",
        search: "Buscar mascota o dueño",
        empty: "No encontramos esa mascota.",
        back: "Pacientes",
        newBadge: "Nuevo",
        record: "Historia N.º {record}",
        call: "Llamar",
        callToast: "En la demo no se hacen llamadas. Aquí marcarías al {phone}.",
        whatsapp: "WhatsApp",
        whatsappMessage: "Hola {owner}, te escribimos de KusiVet por {pet}.",
        owner: "Dueña o dueño",
        ownerNote: "Prefiere WhatsApp",
        ownerNoteNew: "Registrada desde la reserva web",
        weight: "Peso",
        weightChart: "Peso de los últimos 6 meses",
        weightDelta: "{delta} kg en 6 meses",
        weightNew: "Se registra en su primera visita.",
        events: "Vacunas y desparasitaciones",
        eventsEmpty: "Aún sin registros. Se completan en la consulta.",
        applied: "Aplicada",
        next: "Próxima",
        notes: "Notas de consultas",
        pending: "Por completar",
        species: { perro: "Perro", gato: "Gato" },
        firstVisit: "Primera cita · {service}",
        newNote: "Reservada desde la web. Datos médicos por completar en la consulta.",
      },
      reminders: {
        title: "Recordatorios",
        sub: "Mensajes de WhatsApp listos para enviar",
        sentMonth: "Enviados este mes",
        booked: "Agendaron su cita",
        pending: "Por enviar esta semana",
        listTitle: "Vencen en los próximos 7 días",
        sendAll: "Enviar todos",
        send: "Enviar",
        sent: "Enviado",
        due: "Vence {date}",
        message:
          "Hola {owner}, a {pet} le toca su {reason} el {date}. ¿Te separamos un turno? Responde a este mensaje y te confirmamos. — KusiVet",
        toast: "Recordatorio para {owner} abierto en WhatsApp",
        toastAll: "{count} recordatorios enviados por WhatsApp",
        empty: "Todos los recordatorios de la semana ya salieron.",
      },
      cash: {
        title: "Caja del día",
        total: "Total cobrado hoy",
        summary: "{count} cobros · {pending} por cobrar",
        methods: { yape: "Yape", plin: "Plin", tarjeta: "Tarjeta", efectivo: "Efectivo" },
        methodNote: "{count} cobros · {pct}",
        pendingBadge: "Por cobrar",
        webMethod: "Reserva web · se cobra en la clínica",
        empty: "Aún no hay cobros hoy.",
      },
    },
    demo: {
      switchLabel: "Vista de la demo",
      clientView: "Para tus clientes",
      ownerView: "Para ti",
      reset: "Reiniciar demo",
      resetDone: "Demo reiniciada con los datos de ejemplo",
      hint: "Esto es una demo. Cambia de vista para ver el sistema de la veterinaria",
      hintDismiss: "Cerrar aviso",
    },
  },
};
