import { getLocale } from "next-intl/server";
import { Button, Container, Heading } from "@/components/ui";
import { isLocale, routes } from "@/config/site";
import { getDictionary } from "@/lib/dictionary";

export default async function NotFound() {
  const current = await getLocale();
  const locale = isLocale(current) ? current : "en";
  const { ui } = getDictionary(locale);

  return (
    <Container width="narrow" className="flex min-h-[60svh] flex-col items-start justify-center py-24">
      <p className="font-display text-sm font-semibold text-gold">404</p>
      <Heading as="h1" size="xl" className="mt-3">
        {ui.notFoundTitle}
      </Heading>
      <p className="mt-4 text-silver">{ui.notFoundText}</p>
      <Button href={routes.home(locale)} className="mt-8">
        {ui.backHome}
      </Button>
    </Container>
  );
}
