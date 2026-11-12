/**
 * Structure of the professional portfolio (/[lang]/cv). Copy lives in src/i18n/dictionaries/cv.
 */

export const techs = [
  "React",
  "Next.js",
  "Thymeleaf",
  "TypeScript",
  "Java",
  ".NET",
  "NestJS",
  "Node.js",
  "REST",
  "SOAP",
  "SQL Server",
  "PostgreSQL",
  "AS/400",
  "Anthos",
  "Vercel",
] as const;

export type Tech = (typeof techs)[number];

export type LayerId = "interface" | "services" | "data" | "platform";

/** The stack grouped by layer; it doubles as the filter of the career timeline. */
export const layers: { id: LayerId; techs: Tech[] }[] = [
  { id: "interface", techs: ["React", "Next.js", "Thymeleaf", "TypeScript"] },
  { id: "services", techs: ["Java", ".NET", "NestJS", "Node.js", "REST", "SOAP"] },
  { id: "data", techs: ["SQL Server", "PostgreSQL", "AS/400"] },
  { id: "platform", techs: ["Anthos", "Vercel"] },
];

export type EntryId =
  | "graduation"
  | "own"
  | "scotiabank"
  | "numeral"
  | "coplacont"
  | "smarttalent"
  | "digenio"
  | "damaris"
  | "university";

export type TimelineEntry = {
  id: EntryId;
  /** "main": employment and education. "side": client and personal projects, running in parallel. */
  lane: "main" | "side";
  /** Milestones (start and end of university) are not filtered and carry no stack. */
  kind: "job" | "milestone";
  techs: Tech[];
  current?: boolean;
};

/** Newest first. The side lane spans from "own" down to "damaris", where it branches off. */
export const timeline: TimelineEntry[] = [
  { id: "graduation", lane: "main", kind: "milestone", techs: [] },
  { id: "own", lane: "side", kind: "job", techs: ["Next.js", "React", "TypeScript", "PostgreSQL", "Vercel"] },
  {
    id: "scotiabank",
    lane: "main",
    kind: "job",
    current: true,
    techs: ["Java", ".NET", "React", "Thymeleaf", "SOAP", "REST", "Anthos", "SQL Server", "AS/400"],
  },
  { id: "numeral", lane: "main", kind: "job", techs: ["React", "TypeScript", "REST"] },
  { id: "coplacont", lane: "side", kind: "job", techs: ["React", "NestJS", "TypeScript", "REST"] },
  { id: "smarttalent", lane: "side", kind: "job", techs: ["React", "NestJS", "TypeScript", "REST"] },
  { id: "digenio", lane: "side", kind: "job", techs: ["React", "NestJS", "TypeScript"] },
  { id: "damaris", lane: "side", kind: "job", techs: ["React", "Node.js", "REST"] },
  { id: "university", lane: "main", kind: "milestone", techs: [] },
];

export const jobCount = timeline.filter((entry) => entry.kind === "job").length;

/** Scrolling strip between sections. */
export const marquee = [
  "Java",
  ".NET",
  "React",
  "Next.js",
  "NestJS",
  "TypeScript",
  "Thymeleaf",
  "SOAP",
  "REST",
  "Hexagonal architecture",
  "SQL Server",
  "PostgreSQL",
  "Anthos",
  "Docker",
  "Scrum",
];

/** A brand color ramp, as the `base` template generates it from a single color. */
export const paletteRamp = [
  "#e3f1f0",
  "#bfdedc",
  "#92c6c3",
  "#63aaa7",
  "#2f8583",
  "#1f5c5b",
  "#184846",
  "#113332",
  "#0a2020",
];
