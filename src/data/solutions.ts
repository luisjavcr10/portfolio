export type SolutionId = "casabruma" | "fitmoche" | "clinica";

export type Solution = {
  id: SolutionId;
  company: string;
  accent: string;
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
    demoUrl: "/demos/salon",
    screens: { laptop: "/demos/salon/panel-desktop.webp", phone: "/demos/salon/site-mobile.webp" },
  },
  {
    id: "fitmoche",
    company: "FitMoche",
    accent: "#9A6B43",
    demoUrl: "/demos/gimnasio",
    screens: { laptop: "/demos/gimnasio/panel-desktop.webp", phone: "/demos/gimnasio/site-mobile.webp" },
  },
  {
    id: "clinica",
    company: "Clínica Huanchaco",
    accent: "#B8AC92",
  },
];
