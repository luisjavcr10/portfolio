import type { Metadata } from "next";
import { GymDemo } from "@/demos/gimnasio/GymDemo";
import { gymConfig } from "@/demos/gimnasio/config";

const description = "El gimnasio de Trujillo que no te deja rendirte. Tu primera clase va por nosotros. Negocio ficticio.";

export const metadata: Metadata = {
  title: `${gymConfig.name} · ${gymConfig.tagline}`,
  description,
  openGraph: {
    title: `${gymConfig.name} · ${gymConfig.tagline}`,
    description,
  },
  twitter: { card: "summary_large_image" },
};

export default async function GymDemoPage({ searchParams }: PageProps<"/demos/gimnasio">) {
  const { vista } = await searchParams;
  return <GymDemo initialView={vista === "dueno" ? "owner" : "client"} />;
}
