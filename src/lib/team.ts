import team from "../../content/team.json";
import { pick, type Locale } from "@/config/site";
import type { LocalizedTeamMember, TeamMember } from "@/types/content";
import { isTodo, SHOW_TODO_PLACEHOLDERS } from "./content";

/** Team members for one locale. Unnamed members are hidden when placeholders are off. */
export function getTeam(locale: Locale): LocalizedTeamMember[] {
  return (team as TeamMember[])
    .filter((member) => SHOW_TODO_PLACEHOLDERS || !isTodo(member.name))
    .map((member) => ({
      id: member.id,
      photo: member.photo,
      linkedin: member.linkedin,
      name: pick(locale, member.name, member.nameAr),
      role: pick(locale, member.role, member.roleAr),
      bio: pick(locale, member.bio, member.bioAr),
    }));
}
