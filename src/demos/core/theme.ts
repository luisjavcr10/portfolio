import type { CSSProperties } from "react";
import { fontRegistry } from "./fonts";
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
    "--t-font-display": fontRegistry[fonts.display].stack,
    "--t-font-body": fontRegistry[fonts.body].stack,
    ...(fonts.mono && { "--t-font-mono": fontRegistry[fonts.mono].stack }),
  } as CSSProperties;
}

/** next/font class names that expose the font variables used by the theme. */
export function themeFontClasses(theme: ThemeConfig): string {
  const { display, body, mono } = theme.fonts;
  const keys = new Set([display, body, ...(mono ? [mono] : [])]);
  return [...keys].map((key) => fontRegistry[key].variable).join(" ");
}
