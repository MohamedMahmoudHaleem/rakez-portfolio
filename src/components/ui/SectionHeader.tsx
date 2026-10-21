import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";
import { Heading } from "./Heading";

export type SectionHeaderProps = {
  id: string;
  eyebrow?: string;
  title: string;
  /** Use "h1" when the section header is the page title. */
  headingAs?: "h1" | "h2";
  description?: string;
  align?: "start" | "center";
  className?: string;
};

export function SectionHeader({ id, eyebrow, title, headingAs = "h2", description, align = "start", className }: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <header className={cn("mb-10 max-w-2xl md:mb-14", centered && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
      <Heading as={headingAs} size={headingAs === "h1" ? "xl" : "lg"} id={id}>
        {title}
      </Heading>
      {description && <p className="mt-4 text-base text-silver md:text-lg">{description}</p>}
    </header>
  );
}
