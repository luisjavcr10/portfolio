import type { CSSProperties } from "react";
import { fontStacks } from "./fonts";
import type { ThemeConfig } from "./types";

/** CSS custom properties for a tenant; derived tokens live in theme.module.css. */
export function themeStyle(theme: ThemeConfig): CSSProperties {
  const { colors, fonts } = theme;
  return {
    "--t-base": colors.base,
    "--t-muted": colors.muted,
    "--t-accent": colors.accent,
    "--t-accent-ink": colors.accentInk,
    "--t-primary": colors.primary,
    "--t-ink": colors.ink,
    "--t-ink-soft": colors.inkSoft,
    "--t-font-display": fontStacks[fonts.display],
    "--t-font-body": fontStacks[fonts.body],
    ...(fonts.mono && { "--t-font-mono": fontStacks[fonts.mono] }),
  } as CSSProperties;
}

/** Class names that expose the font variables (pass the next/font objects the tenant uses). */
export function fontVariables(...fonts: { variable: string }[]): string {
  return fonts.map((font) => font.variable).join(" ");
}
