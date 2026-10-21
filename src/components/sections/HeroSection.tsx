import { ArrowRight } from "lucide-react";
import { HeroCurves } from "@/components/brand/HeroCurves";
import { Button, Container, Eyebrow, Heading } from "@/components/ui";
import { routes, type Locale } from "@/config/site";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/dictionary";

type HeroSectionProps = {
  locale: Locale;
  dictionary: Dictionary["hero"];
  /** False until public/images/brand/hero.webp exists; the SVG curves are drawn instead. */
  hasImage: boolean;
};

/** First screen: who we are and the two main actions. */
export function HeroSection({ locale, dictionary, hasImage }: HeroSectionProps) {
  return (
    <section aria-labelledby="hero-title" className={cn("hero-background", !hasImage && "hero-background--placeholder")}>
      {!hasImage && <HeroCurves />}
      <Container width="wide" className="hero-reveal flex min-h-[calc(100svh-4rem)] flex-col justify-center py-20">
        <Eyebrow>{dictionary.eyebrow}</Eyebrow>
        <Heading as="h1" size="display" id="hero-title" className="mt-5 max-w-3xl text-balance md:text-7xl">
          {dictionary.title}
        </Heading>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-silver">{dictionary.subtitle}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={routes.work(locale)} size="lg" icon={<ArrowRight className="size-4" />}>
            {dictionary.primary}
          </Button>
          <Button href={routes.contact(locale)} variant="secondary" size="lg">
            {dictionary.secondary}
          </Button>
        </div>
      </Container>
    </section>
  );
}
