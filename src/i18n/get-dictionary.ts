import type { Locale } from "./config";
import es from "./dictionaries/es";
import en from "./dictionaries/en";

const dictionaries = { es, en };

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
