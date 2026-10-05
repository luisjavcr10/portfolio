export type StackGroupId = "frontend" | "backend" | "databases" | "tools";

export const stack: { id: StackGroupId; items: string[] }[] = [
  { id: "frontend", items: ["TypeScript", "React", "Next.js", "TailwindCSS", "Sass"] },
  { id: "backend", items: ["Node.js", "NestJS", "Express", "GraphQL", "REST"] },
  { id: "databases", items: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB"] },
  { id: "tools", items: ["Git", "GitHub", "Docker", "Postman", "Vercel"] },
];
