import { BadgeCheck } from "lucide-react";
import { Card, Eyebrow, SmartImage } from "@/components/ui";
import type { Dictionary } from "@/lib/dictionary";
import type { TrackRecordItem } from "@/lib/track-record";

type TrackRecordProps = {
  dictionary: Dictionary["work"]["trackRecord"];
  items: TrackRecordItem[];
};

/**
 * Team experience: products our engineers helped build before Rakeez Tech.
 * Labelled clearly so it never reads as client work of the studio.
 */
export function TrackRecord({ dictionary, items }: TrackRecordProps) {
  return (
    <div className="relative mt-16 overflow-hidden rounded-card border border-gold/30 bg-deep/70 p-6 md:mt-20 md:p-10">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-gold" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 end-0 size-72 rounded-full bg-gold/10 blur-3xl" />

      <header className="relative mb-10 grid gap-6 md:mb-12 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-12">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-gradient-gold" />
            <Eyebrow>{dictionary.eyebrow}</Eyebrow>
          </div>
          <h3 className="font-display text-3xl font-semibold leading-tight tracking-tight text-soft-white md:text-4xl lg:text-[2.75rem]">
            {dictionary.title}{" "}
            <span className="text-gradient-gold">{dictionary.titleHighlight}</span>
          </h3>
        </div>
        <p className="border-s-2 border-gold/40 ps-5 text-base leading-relaxed text-silver md:text-lg">{dictionary.text}</p>
      </header>

      <ul className="relative grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <li key={item.id}>
            <Card padding="none" className="group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-gold/60">
              <div className="relative aspect-video overflow-hidden border-b border-steel/60">
                <SmartImage
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  fallbackLabel={item.name}
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 start-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-champagne backdrop-blur">
                  {item.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h4 className="font-display text-xl font-semibold text-soft-white">{item.name}</h4>
                <p className="flex-1 text-sm leading-relaxed text-silver">{item.text}</p>
                <p className="inline-flex items-center gap-1.5 text-xs font-medium text-gold">
                  <BadgeCheck aria-hidden="true" className="size-4" />
                  {dictionary.label}
                </p>
              </div>
            </Card>
          </li>
        ))}
      </ul>

      <p className="relative mt-6 text-xs text-silver/80">{dictionary.disclaimer}</p>
    </div>
  );
}
