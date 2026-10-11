import type { Metadata } from "next";
import { SalonDemo } from "@/demos/salon/SalonDemo";
import { salonConfig } from "@/demos/salon/config";

export const metadata: Metadata = {
  title: `${salonConfig.name} · Reservas para salones`,
  description:
    "Demo de un sistema de reservas para salones de belleza: web para clientas y panel para la dueña. Negocio ficticio.",
};

export default async function SalonDemoPage({ searchParams }: PageProps<"/demos/salon">) {
  const { vista } = await searchParams;
  return <SalonDemo initialView={vista === "dueno" ? "owner" : "client"} />;
}
