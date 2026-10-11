export type ProjectId = "coplacont" | "smarttalent" | "digenio" | "auditai";

export type Project = {
  id: ProjectId;
  name: string;
  role: string;
  image: string;
  /** Wide cards take 4 of 6 bento columns, narrow ones take 2. */
  size: "wide" | "narrow";
  link?: { kind: "github" | "demo"; href: string };
};

export const projects: Project[] = [
  {
    id: "coplacont",
    name: "Coplacont",
    role: "Full stack",
    image: "/images/projects/coplacont/kardex.png",
    size: "wide",
  },
  {
    id: "smarttalent",
    name: "SmartTalent",
    role: "Full stack",
    image: "/images/projects/smarttalent/dashboard.png",
    size: "narrow",
  },
  {
    id: "digenio",
    name: "Digenio",
    role: "Full stack",
    image: "/images/projects/digenio/okrs.png",
    size: "narrow",
    link: { kind: "github", href: "https://github.com/luisjavcr10/app-crm-digenio" },
  },
  {
    id: "auditai",
    name: "Audit AI",
    role: "Frontend",
    image: "/images/projects/AuditAi/dashboard.png",
    size: "wide",
    link: { kind: "demo", href: "https://front-audit-ai.vercel.app/" },
  },
];
