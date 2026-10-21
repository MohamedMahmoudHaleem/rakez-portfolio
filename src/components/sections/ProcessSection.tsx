import { Section, StepList } from "@/components/ui";
import type { Dictionary } from "@/lib/dictionary";

/** The five delivery steps, so clients know what working together looks like. */
export function ProcessSection({ dictionary }: { dictionary: Dictionary["process"] }) {
  return (
    <Section id="process" title={dictionary.title} description={dictionary.subtitle} tone="deep">
      <StepList steps={dictionary.steps} />
    </Section>
  );
}
