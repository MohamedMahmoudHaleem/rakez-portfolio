import { Mail, MapPin } from "lucide-react";
// import { MessageCircle, Phone } from "lucide-react"; // phone + WhatsApp hidden for now
import { GithubIcon, LinkedinIcon } from "@/components/brand/SocialIcons";
import { Button } from "@/components/ui";
import { pick, siteConfig, type Locale } from "@/config/site";
import type { Dictionary } from "@/lib/dictionary";

type ContactOptionsProps = {
  locale: Locale;
  cta: Dictionary["cta"];
  ui: Dictionary["ui"];
};

const ROW = "flex items-center gap-3 text-silver";

/** Direct contact methods: email, location and profiles (phone and WhatsApp hidden for now). */
export function ContactOptions({ locale, cta, ui }: ContactOptionsProps) {
  const { contact } = siteConfig;
  const profiles = [
    { href: contact.linkedin, label: ui.linkedin, Icon: LinkedinIcon },
    { href: contact.github, label: ui.github, Icon: GithubIcon },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {/* WhatsApp hidden for now: the wa.me link exposes the phone number.
        <Button href={contact.whatsapp} external size="lg" icon={<MessageCircle className="size-4" />}>
          {cta.whatsapp}
        </Button>
        */}
        <Button href={`mailto:${contact.email}`} size="lg" icon={<Mail className="size-4" />}>
          {cta.email}
        </Button>
      </div>

      <ul className="mt-10 grid gap-4 text-sm">
        <li className={ROW}>
          <Mail aria-hidden="true" className="size-4 text-gold" />
          <span className="sr-only">{ui.email}: </span>
          <a href={`mailto:${contact.email}`} className="hover:text-soft-white">{contact.email}</a>
        </li>
        {/* Phone hidden for now — email only.
        <li className={ROW}>
          <Phone aria-hidden="true" className="size-4 text-gold" />
          <span className="sr-only">{ui.phone}: </span>
          <a href={`tel:${contact.phone}`} dir="ltr" className="hover:text-soft-white">{contact.phone}</a>
        </li>
        */}
        <li className={ROW}>
          <MapPin aria-hidden="true" className="size-4 text-gold" />
          <span className="sr-only">{ui.location}: </span>
          {pick(locale, siteConfig.location, siteConfig.locationAr)}
        </li>
        {profiles.map(({ href, label, Icon }) => (
          <li key={label} className={ROW}>
            <Icon className="size-4 text-gold" />
            <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-soft-white">{label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
