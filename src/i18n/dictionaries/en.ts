import type { Dictionary } from "./es";

const en: Dictionary = {
  meta: {
    title: "Luis Castillo · Website, bookings and a system for your business",
    description:
      "Website, online bookings and a management system with your brand, for businesses in Trujillo: salons, gyms and clinics.",
  },
  nav: {
    solutions: "Solutions",
    includes: "What's included",
    how: "How we work",
    projects: "Projects",
    about: "About",
    cta: "Let's work together",
    theme: "Toggle theme",
    language: "Language",
  },
  hero: {
    eyebrow: "Digital solutions for businesses",
    title: "Your business, ready to attract and serve more customers.",
    lead: "Website, bookings and a management system with your brand, for businesses in Trujillo.",
    credentials: "Software Engineer at Scotiabank · Trujillo, Peru",
    available: "Available for projects",
    primaryCta: "Let's work together",
    secondaryCta: "See demos",
    photoAlt: "Portrait of Luis Castillo",
  },
  solutions: {
    eyebrow: "Demos by industry",
    title: "See how it would look in your business.",
    lead: "Three demos with fictional Trujillo businesses. Each one adapts to your brand and the way you work.",
    prev: "Previous",
    next: "Next",
    hint: "← → to navigate",
    demo: "View live demo",
    want: "I want this",
    comingSoon: "Demo in progress",
    includesLabel: "Includes",
    sampleFigures: "Sample figures",
    mockup: { laptop: "dashboard", phone: "booking" },
    items: {
      casabruma: {
        industry: "Salons",
        title: "Clients book on their own and show up on time.",
        benefits: [
          { title: "Booking by stylist", text: "They pick service, stylist and time from their phone." },
          { title: "WhatsApp reminders", text: "Fewer missed visits, no calling one by one." },
          { title: "Clients and daily sales", text: "Service history and cash in one place." },
        ],
        metrics: [
          { value: "24/7", label: "online bookings" },
          { value: "+30%", label: "returning clients" },
        ],
        parts: ["Website", "Bookings", "Reminders", "Dashboard"],
      },
      fitmoche: {
        industry: "Gyms",
        title: "Memberships, attendance and classes in one panel.",
        benefits: [
          { title: "QR check-in", text: "Attendance logged in seconds." },
          { title: "Booking from the phone", text: "Class capacity and waitlists." },
          { title: "Plans and renewals", text: "Payments and notices before expiry." },
        ],
        metrics: [
          { value: "−30%", label: "late payments" },
          { value: "+25%", label: "class occupancy" },
        ],
        parts: ["Website", "Bookings", "Memberships", "Dashboard"],
      },
      clinica: {
        industry: "Clinics",
        title: "A clash-free schedule and patients who show up.",
        benefits: [
          { title: "Schedule by specialist", text: "Hours and rooms in one calendar." },
          { title: "Automatic reminders", text: "WhatsApp and email notices before each visit." },
          { title: "Patient history", text: "Visits, prescriptions and files in order." },
        ],
        metrics: [
          { value: "−35%", label: "no-shows" },
          { value: "2 min", label: "to book a visit" },
        ],
        parts: ["Website", "Bookings", "Reminders", "Records"],
      },
    },
  },
  includes: {
    eyebrow: "What's included",
    title: "Everything your business needs, in one place.",
    items: [
      { title: "A website with your brand", text: "Your services, photos, hours and location, with your logo and colors." },
      { title: "Online bookings around the clock", text: "Clients pick a day and time from their phone, without calling you." },
      { title: "Clients, appointments and payments system", text: "Your calendar, your clients and what they owe, in one dashboard." },
      { title: "Automatic reminders", text: "WhatsApp notices before each appointment so nobody misses it." },
      { title: "Google Maps and reviews", text: "An optimized profile, a QR code for your place and more Google reviews." },
    ],
    summary: "Five connected pieces, ready for your business.",
    cta: "I want this for my business",
    note: "Only need one part? We can build that too.",
  },
  how: {
    eyebrow: "How we work",
    title: "From the first visit to launch, in four steps.",
    steps: [
      { title: "We visit your business", text: "We learn how you work today." },
      { title: "Photos and brand", text: "We photograph your place and use your logo and colors." },
      { title: "We set it up", text: "We show you your website and system before launch." },
      { title: "Launch and promote", text: "Google Maps, social media and reviews." },
    ],
  },
  projects: {
    eyebrow: "Real projects",
    title: "Production systems for real clients.",
    links: { github: "GitHub", demo: "Live demo" },
    items: {
      coplacont:
        "Accounting system for firms: purchases, sales, payroll and fixed assets, with automatic entries, ledgers and financial reports.",
      smarttalent: "HR platform for verification requests and recruitment processes.",
      digenio: "OKR, startup and team management, with sprint and task tracking.",
      auditai:
        "AI-powered audit automation (DeepSeek): checks data against standards like SOX and GDPR and builds dashboards of findings.",
    },
  },
  about: {
    eyebrow: "About me",
    title: "Hi, I'm Luis. I work with you, at your business.",
    text: "I'm a systems engineer from UNT and work as a Software Engineer at Scotiabank. With Trujillo businesses I do the same as at the bank: I learn how you work before building, and deliver something you and your team can use from day one.",
    photoAlt: "Luis Castillo",
    timeline: [
      { label: "Current", title: "Scotiabank", text: "Software Engineer" },
      { label: "Freelance", title: "Full Stack Developer", text: "Coplacont, SmartTalent, Digenio and Damaris Salón" },
      { label: "Education", title: "Universidad Nacional de Trujillo", text: "Systems Engineering" },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Shall we talk about your business?",
    lead: "I reply within 24 hours.",
    cta: "Let's work together",
  },
  contactPanel: {
    eyebrow: "Let's work together",
    title: "Tell me about your business",
    lead: "I'll reply within 24 hours.",
    close: "Close",
    businessQuestion: "What kind of business do you have?",
    optional: "Optional",
    messageLabel: "Your message",
    whatsapp: "Message me on WhatsApp",
    email: "Prefer email?",
    emailSubject: "Information for my business",
    /** {business} is replaced with the chosen option's phrase. */
    messageWithBusiness: "Hi Luis, I have {business} and would like information for my business",
    message: "Hi Luis, I would like information for my business",
    businesses: [
      { id: "salon", label: "Salon or barbershop", phrase: "a salon" },
      { id: "gym", label: "Gym", phrase: "a gym" },
      { id: "consultorio", label: "Clinic", phrase: "a clinic" },
      { id: "otro", label: "Other", phrase: "" },
    ],
  },
  footer: {
    madeIn: "Made in Trujillo, La Libertad",
    cv: "CV",
  },
};

export default en;
