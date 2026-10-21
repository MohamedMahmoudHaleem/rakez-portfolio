import { FeatureGrid, Section } from "@/components/ui";
import type { FeatureItem } from "@/types/content";

type ServicesSectionProps = {
  dictionary: { title: string; items: FeatureItem[] };
};

/**
 * Example of the section pattern every homepage section follows:
 * data comes in through props, layout comes from shared ui components,
 * and the section itself stays short and readable.
 */
export function ServicesSection({ dictionary }: ServicesSectionProps) {
  return (
    <Section id="services" title={dictionary.title} tone="deep">
      <FeatureGrid items={dictionary.items} columns={4} />
    </Section>
  );
}
