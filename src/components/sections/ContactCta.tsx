import { Mail } from "lucide-react";
// import { MessageCircle } from "lucide-react"; // WhatsApp hidden for now
import { Button, Container, Heading, TodoText } from "@/components/ui";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/lib/dictionary";

/** Closing band on the home and work pages with the email contact option. */
export function ContactCta({ dictionary }: { dictionary: Dictionary["cta"] }) {
  const { contact } = siteConfig;

  return (
    <section aria-labelledby="cta-title" className="bg-midnight py-16 md:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-card border border-steel/60 bg-surface px-6 py-14 text-center md:px-12">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-gold" />
          <Heading id="cta-title" className="mx-auto max-w-2xl">
            {dictionary.title}
          </Heading>
          <TodoText as="p" value={dictionary.text} className="mx-auto mt-4 block max-w-xl text-silver" />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {/* WhatsApp hidden for now: the wa.me link exposes the phone number.
            <Button href={contact.whatsapp} external size="lg" icon={<MessageCircle className="size-4" />}>
              {dictionary.whatsapp}
            </Button>
            */}
            <Button href={`mailto:${contact.email}`} size="lg" icon={<Mail className="size-4" />}>
              {dictionary.email}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
