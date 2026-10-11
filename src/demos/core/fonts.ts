import { Fraunces, Manrope } from "next/font/google";

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

export const fontRegistry = {
  fraunces: { variable: fraunces.variable, stack: "var(--font-fraunces), Georgia, serif" },
  manrope: { variable: manrope.variable, stack: "var(--font-manrope), system-ui, sans-serif" },
} as const;

export type FontKey = keyof typeof fontRegistry;
