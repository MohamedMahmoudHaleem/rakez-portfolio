import { Quote } from "lucide-react";
import { isTodo } from "@/lib/content";
import type { ProjectFrontmatter } from "@/types/content";

/**
 * Renders only a real client quote. Empty or [TODO] testimonials render nothing —
 * not even a placeholder — so an invented quote can never reach the page.
 */
export function Testimonial({ testimonial }: { testimonial: ProjectFrontmatter["testimonial"] }) {
  if (!testimonial || isTodo(testimonial.quote) || isTodo(testimonial.author)) return null;

  return (
    <figure className="mt-16 border-s-2 border-gold ps-6">
      <Quote aria-hidden="true" className="size-6 text-gold rtl:-scale-x-100" />
      <blockquote className="mt-4 font-display text-xl leading-relaxed text-soft-white md:text-2xl">
        <p>{testimonial.quote}</p>
      </blockquote>
      <figcaption className="mt-4 text-sm text-silver">
        <span className="font-semibold text-soft-white">{testimonial.author}</span>
        {!isTodo(testimonial.position) && <>, {testimonial.position}</>}
      </figcaption>
    </figure>
  );
}
