# Rakeez (ركيز) — Portfolio

Bilingual (EN/AR) studio portfolio · Next.js 15 · TypeScript strict · Tailwind v4 · next-intl · MDX.

```bash
npm run dev        # http://localhost:3000 → redirects to /en or /ar
npm run lint && npx tsc --noEmit && npm run build
```

Set `NEXT_PUBLIC_SHOW_TODO_PLACEHOLDERS=false` in production (see `.env.example`): it hides every
`[TODO]`, unfinished case study and unnamed team member.

## Where things live
| Change | Edit |
|---|---|
| Studio name, contacts, SEO | `content/site.json` |
| Page text (EN / AR) | `content/en.json`, `content/ar.json` |
| Case studies | `content/projects/<slug>.<locale>.mdx` |
| Team / lead experience | `content/team.json`, `content/experience.json` |
| Images | `public/images/…` — see `IMAGES.md` (missing files show branded placeholders) |
| Colors, fonts | `src/app/globals.css` (`@theme`) |

Docs: `docs/BUILD_BRIEF.md`, `docs/CODE_STANDARDS.md`, `docs/BRAND_REVIEW.md`.

## Tasks

### Done
- [x] Next.js 15 + Tailwind v4 scaffold, starter kit integrated (extended, no parallel versions)
- [x] `/en` + `/ar` routing, Accept-Language redirect, `lang`/`dir`, path-keeping language switch
- [x] Header (focus-trapped mobile menu), footer, skip link
- [x] Home: hero, services, selected work, process, experience strip, team, contact CTA
- [x] Work list, case studies (MDX, framed gallery + keyboard lightbox, English fallback note)
- [x] About, Contact (mailto form — no backend), 404
- [x] Metadata, hreflang, OG images (`next/og`), sitemap, robots
- [x] Testimonials render **only** when a real quote + author exist — never a placeholder
- [x] Lint, typecheck, build pass; verified at 320px, RTL, keyboard

- [x] Light mode (toggle in header; saved per visitor, follows system on first visit)
- [x] Hidden for now (commented, easy to restore): team section + nav link, phone, WhatsApp, case study links

### Needs you (content — see `TODO.md`)
- [ ] Freelance project 1 & 2: text, screenshots, links, real client quote (if any)
- [ ] `about.intro` (EN + AR) and your photo `public/images/team/mohamed-haleem.jpg`
- [ ] Team partners: names, bios, photos, LinkedIn, permission
- [x] Response time confirmed ("same day")
- [ ] Domain → `seo.siteUrl` in `content/site.json`
- [ ] Designer logo SVGs + favicon (current mark and `src/app/icon.svg` are placeholders)
- [ ] Final `hero.webp` / `hero-mobile.webp` (an SVG stand-in is drawn until then)

### Open decisions
- [ ] Build the optional `/concepts/real-estate` demo? (its "visit" link is hidden until it exists)
- [ ] Arabic OG images need a bundled Arabic font; they currently reuse the English preview
