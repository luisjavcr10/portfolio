import type { Dictionary } from "./es";

const en: Dictionary = {
  meta: {
    title: "Luis Castillo · Custom software for your business",
    description:
      "Full stack software engineer in Trujillo, Peru. I design and build web systems for companies, from the first requirement to production.",
  },
  nav: {
    solutions: "Solutions",
    projects: "Projects",
    experience: "Experience",
    about: "About",
    cta: "Let's work together",
    theme: "Toggle theme",
    language: "Language",
  },
  hero: {
    eyebrow: "Full stack software engineer",
    title: "Custom software that helps your business grow.",
    lead: "I'm Luis Castillo. I design and build web systems for companies in Peru and abroad, from the first requirement to production.",
    role: "Software Engineer at Scotiabank",
    location: "Trujillo, Peru",
    available: "Available for projects",
    primaryCta: "Let's work together",
    cvCta: "Download CV",
    photoAlt: "Portrait of Luis Castillo",
  },
  solutions: {
    eyebrow: "Solutions by industry",
    title: "Systems ready for your industry.",
    lead: "Examples with fictional companies. Each one adapts to your processes, brand and team.",
    prev: "Previous",
    next: "Next",
    hint: "← → to navigate",
    demo: "View live demo",
    caseStudy: "View case study",
    comingSoon: "Demo in progress",
    sampleFigures: "Sample figures",
    items: {
      casabruma: {
        industry: "Beauty salons",
        title: "Online booking and a full schedule, without living on WhatsApp.",
        benefits: [
          { title: "Booking from the phone", text: "Service, stylist and a free slot in 30 seconds." },
          { title: "Automatic reminders", text: "A WhatsApp message one day before each visit." },
          { title: "Owner dashboard", text: "Schedule, revenue and clients to win back." },
        ],
        metrics: [
          { value: "3%", label: "no-shows (was 14%)" },
          { value: "30 s", label: "to book a visit" },
        ],
      },
      fitmoche: {
        industry: "Gyms",
        title: "Memberships, attendance and classes in one panel.",
        benefits: [
          { title: "QR check-in", text: "Attendance logged in seconds." },
          { title: "Booking from the phone", text: "Class capacity and waitlists." },
          { title: "Plans and renewals", text: "Recurring billing and expiry notices." },
        ],
        metrics: [
          { value: "−30%", label: "late payments" },
          { value: "+25%", label: "class occupancy" },
        ],
      },
      clinica: {
        industry: "Healthcare",
        title: "A clash-free schedule and patients who show up.",
        benefits: [
          { title: "Schedule by specialist", text: "Hours, rooms and blocks in one calendar." },
          { title: "Automatic reminders", text: "WhatsApp and email notices before each visit." },
          { title: "Patient history", text: "Visits, prescriptions and files in order." },
        ],
        metrics: [
          { value: "−35%", label: "no-shows" },
          { value: "2 min", label: "to book a visit" },
        ],
      },
    },
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
  experience: {
    eyebrow: "Experience",
    title: "Banking, freelance and university.",
    current: "Current",
    location: "Trujillo · Peru",
    bank: {
      role: "Software Engineer",
      text: "Software development in the bank's technology area, in an environment with high standards for quality, security and teamwork.",
    },
    freelance: {
      label: "Freelance",
      role: "Full Stack Developer",
      text: "Custom systems for companies, from requirements to deployment: Coplacont, SmartTalent, Digenio and Damaris Salón.",
    },
    education: {
      label: "Education",
      school: "Universidad Nacional de Trujillo",
      degree: "Systems Engineering",
    },
  },
  about: {
    eyebrow: "About me",
    title: "Clear communication, organized work and continuous improvement.",
    text: "I'm Luis Javier, a software developer in Trujillo. I adapt quickly to new teams and like to understand the business before writing code. Outside work I train at the gym and play football.",
    madeIn: "Made in Trujillo, La Libertad",
    photoAlt: "Luis Castillo",
  },
  contact: {
    eyebrow: "Contact",
    title: "Have a project in mind?",
    lead: "I reply within 24 hours.",
    whatsapp: "Message me on WhatsApp",
    emailCta: "Send me an email",
    form: {
      name: "Name",
      email: "Email",
      message: "What do you need?",
      submit: "Send message",
      sent: "Opening your email app ✓",
      subject: "New project from the portfolio",
    },
  },
  footer: {
    madeIn: "Made in Trujillo, La Libertad",
  },
};

export default en;
