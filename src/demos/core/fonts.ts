/*
 * Font stacks available to tenants, referenced by key from the config. The fonts
 * themselves are loaded by each demo from ./fontLoaders, so a page only downloads
 * (and preloads) the fonts it uses.
 */
export const fontStacks = {
  fraunces: "var(--font-fraunces), Georgia, serif",
  manrope: "var(--font-manrope), system-ui, sans-serif",
  anton: "var(--font-anton), Impact, 'Arial Narrow', sans-serif",
  archivo: "var(--font-archivo), system-ui, sans-serif",
  jetbrainsMono: "var(--font-jetbrains-mono), ui-monospace, monospace",
  nunito: "var(--font-nunito), system-ui, sans-serif",
  nunitoSans: "var(--font-nunito-sans), system-ui, sans-serif",
} as const;

export type FontKey = keyof typeof fontStacks;
