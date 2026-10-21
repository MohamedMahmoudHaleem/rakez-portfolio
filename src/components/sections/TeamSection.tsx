import { Section } from "@/components/ui";
import type { Dictionary } from "@/lib/dictionary";
import type { LocalizedTeamMember } from "@/types/content";
import { TeamCard } from "./TeamCard";

type TeamSectionProps = {
  dictionary: Dictionary["team"];
  members: LocalizedTeamMember[];
  /** Photo paths that exist, keyed by member id. */
  photos: Record<string, string | undefined>;
  linkedinLabel: string;
};

/** Real team members only — unnamed members are hidden when placeholders are off. */
export function TeamSection({ dictionary, members, photos, linkedinLabel }: TeamSectionProps) {
  return (
    <Section id="team" title={dictionary.title} description={dictionary.subtitle} tone="deep">
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {members.map((member) => (
          <li key={member.id}>
            <TeamCard member={member} photoSrc={photos[member.id]} linkedinLabel={linkedinLabel} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
