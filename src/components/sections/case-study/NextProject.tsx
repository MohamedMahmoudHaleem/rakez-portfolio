import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { TodoText } from "@/components/ui";

type NextProjectProps = { href: string; title: string; label: string };

/** Large link to the following case study, wrapping around at the end. */
export function NextProject({ href, title, label }: NextProjectProps) {
  return (
    <Link href={href} className="group mt-20 flex items-center justify-between gap-6 border-y border-steel/60 py-8 transition hover:border-gold/60">
      <span>
        <span className="block text-sm text-silver">{label}</span>
        <TodoText value={title} className="mt-1 block font-display text-2xl font-semibold text-soft-white md:text-3xl" />
      </span>
      <ArrowRight aria-hidden="true" className="size-7 shrink-0 text-gold transition group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
    </Link>
  );
}
