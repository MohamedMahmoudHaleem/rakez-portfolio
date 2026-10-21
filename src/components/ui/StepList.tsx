import { cn } from "@/lib/cn";

type Step = { title: string; text: string };

/** Numbered process steps. Numbers use Western digits in both languages. */
export function StepList({ steps, className }: { steps: Step[]; className?: string }) {
  return (
    <ol className={cn("grid gap-5 md:grid-cols-5", className)}>
      {steps.map((step, index) => (
        <li key={step.title} className="relative border-t border-steel pt-6">
          <span className="font-display text-sm font-semibold text-gold">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="mt-2 font-display text-lg font-semibold text-soft-white">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-silver">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
