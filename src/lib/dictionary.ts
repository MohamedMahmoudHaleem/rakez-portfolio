import ar from "../../content/ar.json";
import en from "../../content/en.json";
import type { Locale } from "@/config/site";

export type Dictionary = typeof en;

// Typing ar as Dictionary makes the build fail if the two files drift apart.
const DICTIONARIES: Record<Locale, Dictionary> = { en, ar };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}
