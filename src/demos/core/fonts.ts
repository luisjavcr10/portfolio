import { Anton, Archivo, Fraunces, JetBrains_Mono, Manrope } from "next/font/google";

/*
 * Fonts available to tenants. next/font needs static calls, so every font a
 * client might use is registered here and referenced by key from the config.
 */

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const fontRegistry = {
  fraunces: { variable: fraunces.variable, stack: "var(--font-fraunces), Georgia, serif" },
  manrope: { variable: manrope.variable, stack: "var(--font-manrope), system-ui, sans-serif" },
  anton: { variable: anton.variable, stack: "var(--font-anton), Impact, 'Arial Narrow', sans-serif" },
  archivo: { variable: archivo.variable, stack: "var(--font-archivo), system-ui, sans-serif" },
  jetbrainsMono: { variable: jetbrainsMono.variable, stack: "var(--font-jetbrains-mono), ui-monospace, monospace" },
} as const;

export type FontKey = keyof typeof fontRegistry;
