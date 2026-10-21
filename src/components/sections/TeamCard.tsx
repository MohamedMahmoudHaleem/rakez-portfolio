import { LinkedinIcon } from "@/components/brand/SocialIcons";
import { Card, SmartImage, TodoText } from "@/components/ui";
import { realOrUndefined } from "@/lib/content";
import type { LocalizedTeamMember } from "@/types/content";

type TeamCardProps = {
  member: LocalizedTeamMember;
  /** Resolved photo path, or undefined while the photo is missing. */
  photoSrc?: string;
  linkedinLabel: string;
};

/** Photo, name, role and one-line bio. LinkedIn shows only when there is a real URL. */
export function TeamCard({ member, photoSrc, linkedinLabel }: TeamCardProps) {
  const name = realOrUndefined(member.name);
  const linkedin = realOrUndefined(member.linkedin);

  return (
    <Card padding="none" className="h-full overflow-hidden">
      <div className="relative aspect-square border-b border-steel/60">
        <SmartImage src={photoSrc} alt={name ?? member.role} fill sizes="(min-width: 1024px) 25vw, 50vw" fallbackLabel={name ?? member.role} className="object-cover" />
      </div>
      <div className="p-5">
        <TodoText as="h3" value={member.name} className="font-display text-lg font-semibold text-soft-white" />
        <p className="mt-1 text-sm text-champagne">{member.role}</p>
        <TodoText as="p" value={member.bio} className="mt-3 text-sm leading-relaxed text-silver" />
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm text-silver transition hover:text-gold">
            <LinkedinIcon className="size-4" />
            {linkedinLabel}
          </a>
        )}
      </div>
    </Card>
  );
}
