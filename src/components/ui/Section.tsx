import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";
import { SectionHeader, type SectionHeaderProps } from "./SectionHeader";

const TONES = {
  default: "bg-midnight",
  deep: "bg-deep",
  surface: "bg-surface",
} as const;

type SectionProps = Omit<SectionHeaderProps, "id" | "title" | "className"> & {
  /** Used for in-page navigation (#services) and to label the section for screen readers. */
  id: string;
  title?: string;
  tone?: keyof typeof TONES;
  className?: string;
  children: ReactNode;
};

/**
 * Every page section uses this wrapper, so spacing, width, background
 * and accessibility labelling stay identical across the site.
 */
export function Section({ id, title, headingAs, eyebrow, description, align, tone = "default", className, children }: SectionProps) {
  const headingId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={cn("scroll-mt-20 py-16 md:py-24", TONES[tone], className)}
    >
      <Container>
        {title && <SectionHeader id={headingId} headingAs={headingAs} eyebrow={eyebrow} title={title} description={description} align={align} />}
        {children}
      </Container>
    </section>
  );
}
