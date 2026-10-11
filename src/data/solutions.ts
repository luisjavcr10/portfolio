export type SolutionId = "casabruma" | "agronorte" | "fitmoche" | "clinica" | "credipyme";

export type Solution = {
  id: SolutionId;
  company: string;
  accent: string;
  stack: string[];
  /** Live demo URL; when missing the slide shows a "coming soon" label. */
  demoUrl?: string;
  caseStudyUrl?: string;
  /** Screenshots for the device mockups, relative to /public. */
  screens?: { laptop?: string; phone?: string };
};

export const solutions: Solution[] = [
  {
    id: "casabruma",
    company: "Casa Bruma",
    accent: "#B86B4B",
    stack: ["Next.js", "React", "TypeScript", "CSS Modules"],
    demoUrl: "/demos/salon",
    screens: { laptop: "/demos/salon/panel-desktop.webp", phone: "/demos/salon/site-mobile.webp" },
  },
  {
    id: "agronorte",
    company: "AgroNorte",
    accent: "#2F8583",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Docker"],
  },
  {
    id: "fitmoche",
    company: "FitMoche",
    accent: "#9A6B43",
    stack: ["Next.js", "React", "TypeScript", "CSS Modules"],
    demoUrl: "/demos/gimnasio",
    screens: { laptop: "/demos/gimnasio/panel-desktop.webp", phone: "/demos/gimnasio/site-mobile.webp" },
  },
  {
    id: "clinica",
    company: "Clínica Huanchaco",
    accent: "#B8AC92",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Docker"],
  },
  {
    id: "credipyme",
    company: "CrediPyme",
    accent: "#1F5C5B",
    stack: ["React", "NestJS", "PostgreSQL", "GraphQL"],
  },
];
