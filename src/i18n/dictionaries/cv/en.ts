import type { CvDictionary } from "./es";

const en: CvDictionary = {
  meta: {
    title: "Luis Castillo · Software Developer",
    description:
      "Full stack software developer. Currently on Scotiabank's Telebanking applications with Java, .NET and React; previously led teams that shipped systems with React and NestJS.",
  },
  nav: {
    career: "Career",
    projects: "Projects",
    approach: "How I work",
    contact: "Contact",
    cv: "Download CV",
  },
  hero: {
    prompt: "software developer",
    titleStart: "I build software to banking standards and take it to ",
    titleAccent: "production",
    titleEnd: ".",
    lead: "Today I build and maintain Scotiabank's Telebanking applications. Before that I led teams that shipped accounting, HR and sales systems.",
    primaryCta: "Download CV",
    secondaryCta: "Explore my career",
    photoAlt: "Portrait of Luis Castillo",
    now: {
      label: "Now",
      title: "Software Engineer · Scotiabank",
      text: "Telebanking, as an external consultant through IBM Technology. Since January 2026.",
      stack: "Java · .NET · React · SQL Server",
    },
    status: {
      open: "Open to opportunities",
      items: ["Full stack", "Remote · Peru and abroad", "ES / EN"],
      place: "Trujillo, Peru",
    },
  },
  figures: [
    { value: "5", text: "systems delivered to clients, end to end" },
    { value: "2", text: "teams of 4 people led" },
    { value: "90%", text: "of sales and inventory digitized at Damaris Salón" },
    { value: "~80%", text: "of recruitment processes centralized at Smart Talent" },
  ],
  career: {
    eyebrow: "Career",
    title: "Pick a technology and see where I used it.",
    lead: "Two branches moving in parallel: employment and education on one side, projects for companies on the other.",
    layers: {
      interface: "Interface",
      services: "Services",
      data: "Data",
    },
    hint: "Tap a technology to filter",
    result: "{tech}: {count} of {total} roles",
    clear: "Show all",
    entries: {
      graduation: {
        lane: "Education",
        period: "Dec 2026",
        role: "Graduation, Systems Engineering",
        company: "Universidad Nacional de Trujillo",
      },
      scotiabank: {
        lane: "Employment",
        period: "Jan 2026 – Present",
        role: "Software Engineer",
        company: "Scotiabank · through IBM Technology",
        summary:
          "Development and maintenance of the Telebanking applications: web layer in Java with Thymeleaf and React, SOAP services and new REST APIs on Anthos with hexagonal architecture. Data in SQL Server and integration with the AS/400 core.",
      },
      numeral: {
        lane: "Employment",
        period: "Oct – Dec 2025",
        role: "Frontend Developer",
        company: "Numeral Education",
        summary:
          "React interfaces with scalable components, API integration and backend support. I took part in defining the product's flows.",
      },
      coplacont: {
        lane: "Clients",
        period: "Apr – Aug 2025",
        role: "Tech lead · Full stack",
        company: "Coplacont · R Asesoría Contable",
        summary:
          "Led a team of 4 on an expert accounting system. Designed services and modules, and refactored legacy code to make financial calculations more accurate.",
      },
      smarttalent: {
        lane: "Clients",
        period: "Jan – May 2025",
        role: "Tech lead · Full stack",
        company: "Smart Talent Group",
        summary:
          "Request and recruitment system that centralized close to 80% of the processes. Managed the client and trained the end users.",
      },
      digenio: {
        lane: "Clients",
        period: "Oct 2024 – Jan 2025",
        role: "Full stack Developer",
        company: "Digenio Lab",
        summary: "OKR platform for startups: goal tracking, progress visualization and reports.",
      },
      damaris: {
        lane: "Clients",
        period: "Jun – Aug 2024",
        role: "Full stack Developer",
        company: "Damaris Salón",
        summary:
          "Sales and inventory system, end to end. It digitized 90% of the processes and cut manual work.",
      },
      university: {
        lane: "Education",
        period: "2021",
        role: "Started Systems Engineering",
        company: "Universidad Nacional de Trujillo",
      },
    },
  },
  projects: {
    eyebrow: "Projects",
    title: "Systems in production, not exercises.",
    roles: {
      coplacont: "Tech lead · Full stack",
      smarttalent: "Tech lead · Full stack",
      digenio: "Full stack",
      auditai: "Frontend",
    },
  },
  approach: {
    eyebrow: "How I work",
    title: "What I bring to a team.",
    items: [
      {
        title: "I move across the whole stack",
        text: "From a view in React or Thymeleaf to a service in Java or NestJS and its SQL query. New systems and legacy ones.",
      },
      {
        title: "Banking standards",
        text: "I work on financial applications every day: careful changes, input validation, roles and tests before anything reaches production.",
      },
      {
        title: "I lead and see adoption through",
        text: "I plan with the team, talk to the client and train the users until the system is really in use.",
      },
    ],
    facts: [
      { label: "Education · 2021 – 2026", title: "Systems Engineering", text: "Universidad Nacional de Trujillo" },
      { label: "Languages", title: "Native Spanish · Intermediate English", text: "UNT Language Center" },
      { label: "Certifications", title: "Full stack web development", text: "Platzi" },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Does your team need a developer? Let's talk.",
    copy: "Copy",
    copied: "Copied",
    copyLabel: "Copy email",
    cv: "Download CV (PDF)",
    note: "I reply within 24 hours. Available for interviews in Spanish or English.",
  },
};

export default en;
