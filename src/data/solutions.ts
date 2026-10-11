export type SolutionId = "casabruma" | "fitmoche" | "clinica";

export type Solution = {
  id: SolutionId;
  company: string;
  accent: string;
  /** Business type preselected in the contact panel by "I want this". */
  inquiry: string;
  /** Live demo URL; when missing the slide shows a "coming soon" label. */
  demoUrl?: string;
  /** Screenshots for the device mockups, relative to /public. */
  screens?: { laptop?: string; phone?: string };
};

export const solutions: Solution[] = [
  {
    id: "casabruma",
    company: "Casa Bruma",
    // Terracotta of the Casa Bruma demo.
    accent: "#B86B4B",
    inquiry: "salon",
    demoUrl: "/demos/salon",
    screens: { laptop: "/demos/salon/panel-desktop.webp", phone: "/demos/salon/site-mobile.webp" },
  },
  {
    id: "fitmoche",
    company: "FitMoche",
    // Yellow of the FitMoche demo (its darker shade, readable on cream too).
    accent: "#E6B800",
    inquiry: "gym",
    demoUrl: "/demos/gimnasio",
    screens: { laptop: "/demos/gimnasio/panel-desktop.webp", phone: "/demos/gimnasio/site-mobile.webp" },
  },
  {
    id: "clinica",
    company: "KusiVet",
    // Leaf green of the KusiVet demo.
    accent: "#2E7D5B",
    inquiry: "veterinaria",
    demoUrl: "/demos/veterinaria",
    screens: { laptop: "/demos/veterinaria/panel-desktop.webp", phone: "/demos/veterinaria/site-mobile.webp" },
  },
];
