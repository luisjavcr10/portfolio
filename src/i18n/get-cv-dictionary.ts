import type { Locale } from "./config";
import es from "./dictionaries/cv/es";
import en from "./dictionaries/cv/en";

const dictionaries = { es, en };

/** Copy of the professional portfolio (/[lang]/cv), kept apart from the business site's dictionary. */
export function getCvDictionary(locale: Locale) {
  return dictionaries[locale];
}
