import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

/**
 * Contact form backend: sends each message to the studio inbox through Resend (https://resend.com).
 * Env: RESEND_API_KEY (required), CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL (optional).
 */

const LIMITS = { name: 100, email: 200, company: 150, message: 5000 } as const;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Light protection against floods: max 5 messages per IP every 10 minutes (per server instance).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
}

function field(body: Record<string, unknown>, key: keyof typeof LIMITS): string {
  const value = typeof body[key] === "string" ? (body[key] as string).trim() : "";
  return value.slice(0, LIMITS[key]);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field; bots usually do.
  if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ ok: true });

  const name = field(body, "name");
  const email = field(body, "email");
  const company = field(body, "company");
  const message = field(body, "message");
  if (!name || !message || !EMAIL_PATTERN.test(email)) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const to = process.env.CONTACT_TO_EMAIL || siteConfig.contact.email;
  const from = process.env.CONTACT_FROM_EMAIL || `${siteConfig.studioName} <onboarding@resend.dev>`;
  const subject = `New project inquiry from ${name}${company ? ` (${company})` : ""}`;

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Company", company || "—"],
  ]
    .map(([label, value]) => `<tr><td style="padding:4px 16px 4px 0;color:#64748b">${label}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`)
    .join("");

  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;color:#0f172a">
<h2 style="margin:0 0 16px">New message from the ${escapeHtml(siteConfig.studioName)} website</h2>
<table style="border-collapse:collapse;margin-bottom:16px">${rows}</table>
<p style="white-space:pre-wrap;line-height:1.6;border-left:3px solid #d4af37;padding-left:12px">${escapeHtml(message)}</p>
<p style="color:#64748b;font-size:13px">Reply to this email to answer ${escapeHtml(name)} directly.</p></div>`;

  const text = `Name: ${name}\nEmail: ${email}\nCompany: ${company || "-"}\n\n${message}`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], reply_to: email, subject, html, text }),
  });

  if (!response.ok) {
    console.error("[contact] Resend error", response.status, await response.text());
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
