import experience from "../../content/experience.json";
import { pick, type Locale } from "@/config/site";
import type { ExperienceHighlight } from "@/types/content";
import { realOrUndefined } from "./content";

/** The lead's experience for one locale. Client names appear only when showClientNames is true. */
export function getExperience(locale: Locale) {
  const highlights: ExperienceHighlight[] = experience.highlights.map((item) => ({
    title: pick(locale, item.title, item.titleAr),
    text: pick(locale, item.text, item.textAr),
    tags: item.tags,
    clientName: experience.showClientNames ? realOrUndefined(item.clientName) : undefined,
  }));

  return {
    note: pick(locale, experience.note, experience.noteAr),
    earlier: pick(locale, experience.earlier, experience.earlierAr),
    skills: experience.skills,
    highlights,
  };
}
