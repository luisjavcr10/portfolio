import type { Metadata } from "next";
import { nunito } from "@/demos/core/fontLoaders/nunito";
import { nunitoSans } from "@/demos/core/fontLoaders/nunito-sans";
import { fontVariables } from "@/demos/core/theme";
import { VetDemo } from "@/demos/veterinaria/VetDemo";
import { vetConfig } from "@/demos/veterinaria/config";

const title = `${vetConfig.name} · Clínica veterinaria en Trujillo`;
const description = "Mascotas sanas, familias felices. Reserva su cita en 1 minuto. Negocio ficticio.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { card: "summary_large_image" },
};

export default async function VetDemoPage({ searchParams }: PageProps<"/demos/veterinaria">) {
  const { vista } = await searchParams;
  return <VetDemo initialView={vista === "dueno" ? "owner" : "client"} fontClassName={fontVariables(nunito, nunitoSans)} />;
}
