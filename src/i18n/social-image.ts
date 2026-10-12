import type { Locale } from "./config";
import { getDictionary } from "./get-dictionary";

/** Link-preview image for WhatsApp, LinkedIn and the like; one per language, in public/og. */
export function socialImage(lang: Locale) {
  return { url: `/og/${lang}.jpg`, width: 1200, height: 630, alt: getDictionary(lang).meta.title };
}
