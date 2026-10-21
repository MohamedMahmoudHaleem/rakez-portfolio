"use client";

import type { FormEvent } from "react";
import { Button, Card } from "@/components/ui";

type ContactFormProps = {
  email: string;
  labels: { title: string; name: string; company: string; message: string; send: string };
};

const FIELD =
  "mt-2 w-full rounded-xl border border-steel bg-midnight px-4 py-3 text-soft-white placeholder:text-silver/60 transition focus:border-champagne focus:outline-none";

/** No backend yet: submitting opens the visitor's email app with the message filled in. */
export function ContactForm({ email, labels }: ContactFormProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const company = String(data.get("company") ?? "");
    const subject = encodeURIComponent([name, company].filter(Boolean).join(" — "));
    const body = encodeURIComponent(String(data.get("message") ?? ""));
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const fields = [
    { name: "name", label: labels.name, autoComplete: "name", required: true },
    { name: "company", label: labels.company, autoComplete: "organization", required: false },
  ];

  return (
    <Card padding="lg">
      <h2 className="font-display text-xl font-semibold text-soft-white">{labels.title}</h2>
      <form onSubmit={onSubmit} className="mt-6 grid gap-5">
        {fields.map((field) => (
          <label key={field.name} className="block text-sm text-silver">
            {field.label}
            <input name={field.name} autoComplete={field.autoComplete} required={field.required} className={FIELD} />
          </label>
        ))}
        <label className="block text-sm text-silver">
          {labels.message}
          <textarea name="message" rows={5} required className={`${FIELD} resize-y`} />
        </label>
        <Button type="submit" size="lg" className="justify-self-start">
          {labels.send}
        </Button>
      </form>
    </Card>
  );
}
