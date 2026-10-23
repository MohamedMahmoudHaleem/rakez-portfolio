"use client";

import { CircleCheck, LoaderCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button, Card } from "@/components/ui";

type ContactFormProps = {
  email: string;
  labels: {
    title: string;
    name: string;
    email: string;
    company: string;
    message: string;
    send: string;
    sending: string;
    successTitle: string;
    successText: string;
    sendAnother: string;
    error: string;
  };
};

type Status = "idle" | "sending" | "sent" | "error";

const FIELD =
  "mt-2 w-full rounded-xl border border-steel bg-midnight px-4 py-3 text-soft-white placeholder:text-silver/60 transition focus:border-champagne focus:outline-none";

/** Sends the message to the studio inbox through /api/contact. Falls back to a mailto link if sending fails. */
export function ContactForm({ email, labels }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <Card padding="lg" className="flex flex-col items-start gap-4" role="status">
        <CircleCheck aria-hidden="true" className="size-10 text-success" strokeWidth={1.5} />
        <h2 className="font-display text-xl font-semibold text-soft-white">{labels.successTitle}</h2>
        <p className="text-silver">{labels.successText}</p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          {labels.sendAnother}
        </Button>
      </Card>
    );
  }

  const fields = [
    { name: "name", type: "text", label: labels.name, autoComplete: "name", required: true },
    { name: "email", type: "email", label: labels.email, autoComplete: "email", required: true },
    { name: "company", type: "text", label: labels.company, autoComplete: "organization", required: false },
  ];

  return (
    <Card padding="lg">
      <h2 className="font-display text-xl font-semibold text-soft-white">{labels.title}</h2>
      <form onSubmit={onSubmit} className="mt-6 grid gap-5">
        {fields.map((field) => (
          <label key={field.name} className="block text-sm text-silver">
            {field.label}
            <input
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              required={field.required}
              dir={field.type === "email" ? "ltr" : undefined}
              className={FIELD}
            />
          </label>
        ))}
        <label className="block text-sm text-silver">
          {labels.message}
          <textarea name="message" rows={5} required maxLength={5000} className={`${FIELD} resize-y`} />
        </label>
        {/* Honeypot for bots: hidden from people and screen readers. */}
        <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

        {status === "error" && (
          <p role="alert" className="text-sm text-danger">
            {labels.error}{" "}
            <a href={`mailto:${email}`} dir="ltr" className="underline underline-offset-4">
              {email}
            </a>
          </p>
        )}

        <Button type="submit" size="lg" className="justify-self-start" disabled={status === "sending"}>
          {status === "sending" && <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />}
          {status === "sending" ? labels.sending : labels.send}
        </Button>
      </form>
    </Card>
  );
}
