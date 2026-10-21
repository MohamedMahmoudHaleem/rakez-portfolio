# BUILD BRIEF — Rakeez portfolio website

Read together with `docs/BRAND_BRIEF.md` (brand), `docs/BRAND_REVIEW.md` (locked decisions) and `docs/CODE_STANDARDS.md` (how to write the code).

## 1. Goal
A premium, bilingual (English + Arabic) portfolio for **Rakeez (ركيز) — Software Team**, led by **Mohamed Haleem**.
A visiting client must understand within 30 seconds: who we are, what we build, proof we can do it, how to contact us.

## 2. Hard rules
- Never invent testimonials, numbers, client names, logos, certifications or awards.
- Content containing `[TODO]` renders through `<TodoText>`; missing images through `<SmartImage>`.
  `NEXT_PUBLIC_SHOW_TODO_PLACEHOLDERS=false` hides unfinished content for production.
- The studio name comes only from `content/site.json`.
- Previous-employer work is shown as **the lead's experience**, without screenshots. Respect `showClientNames`.
- Do not crop moodboards (`references/`) for logos or backgrounds.

## 3. Tech stack
Next.js 15 (App Router) · TypeScript strict · Tailwind CSS v4 · next-intl (`/en`, `/ar`) · MDX case studies + gray-matter · next/font (Inter, Manrope, IBM Plex Sans Arabic) · lucide-react · clsx + tailwind-merge · Vercel.

## 4. Starter code to integrate first (`starter/src`)
| File | Purpose |
|---|---|
| `app/globals.css` | Brand tokens (`@theme`), base styles, focus, reduced motion |
| `app/fonts.ts` | next/font setup — apply `fontVariables` on `<html>` |
| `app/hero-background.css` | Hero overlay incl. RTL and mobile |
| `lib/cn.ts`, `lib/content.ts`, `lib/icons.ts` | Class merging, [TODO] helpers, icon map |
| `config/site.ts` | Site config, brand names per locale, route builders |
| `types/content.ts` | Content types |
| `components/ui/*` | Container, Section, SectionHeader, Heading, Eyebrow, Button, Card, Badge/StatusBadge, TechTags, TodoText, SmartImage, FeatureGrid, StepList |
| `components/brand/*` | RakeezMark (placeholder paths), Brand lockup |
| `components/sections/ServicesSection.tsx` | Example of the section pattern |

Build every new section and page on top of these. Extend them instead of writing parallel versions.

## 5. Routes
| Route | Content |
|---|---|
| `/[locale]` | Home |
| `/[locale]/work` | All case studies |
| `/[locale]/work/[slug]` | Case study |
| `/[locale]/about` | Lead's story, experience, skills |
| `/[locale]/contact` | Contact options |
| `/[locale]/concepts/real-estate` | Optional live concept demo (§8) |
| `/` | Redirect by `Accept-Language`, default from `site.json` |

## 6. Home page sections (each one a component in `components/sections/`)
1. **Header:** `Brand` (horizontal), nav (About, Services, Work, Team, Contact), language switch keeping the same path, "Let's talk" button. Mobile menu with focus trap.
2. **Hero** (`hero-background`): Eyebrow "SOFTWARE TEAM", headline, subtitle, primary + secondary `Button`.
3. **Services:** `ServicesSection` with `FeatureGrid` (4 items from content).
4. **Selected work:** `ProjectCard` grid (featured projects by `order`): cover via `SmartImage`, title, summary, `StatusBadge`, `TechTags limit={3}`.
5. **Process:** `StepList` (5 steps).
6. **Experience strip:** 3 highlights from `experience.json` + link to About.
7. **Team:** `TeamCard` grid (photo via `SmartImage`, name, role, bio, LinkedIn).
8. **Contact CTA:** surface band with WhatsApp + email buttons.
9. **Footer:** `Brand` (stacked on mobile), links, contacts, language switch, © year.

## 7. Case study page
Breadcrumb → title, client type, year, `StatusBadge`, role, live link → cover → "At a glance" `Card` (industry, platform, duration, team, `TechTags`) → MDX body (Challenge, What we built, Key features, Result) → gallery (desktop in browser frame, mobile in phone frame, keyboard-accessible lightbox) → testimonial only if real → next project + contact CTA.

## 8. Optional concept demo (`/concepts/real-estate`)
Clearly labelled "Concept — not a real client". Fictional brand "Aurelia Developments": developer homepage hero, project cards, construction-progress widget, phone-frame residents app screen (maintenance request with status timeline), dashboard mockup (requests table with role badge). Built from the same ui components.

## 9. Bilingual & RTL
`<html lang dir>` per locale. Logical properties only. Arabic case study files `<slug>.ar.mdx`; fall back to English with a note. Western digits in both languages. No letter-spacing on Arabic.

## 10. Quality targets
Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO 100. Metadata + OG image (`next/og`) per page, `sitemap.xml`, `robots.txt`, hreflang. Works from 320px width. Keyboard navigation and reduced motion verified.

## 11. Acceptance checklist
- [ ] `npm run lint`, `tsc --noEmit` and `npm run build` pass
- [ ] No raw hex colors or default Tailwind palette colors in components (grep for `#` and `amber-`/`slate-`)
- [ ] No text literals in components; all text from content files
- [ ] EN and AR on every page; RTL correct; switch keeps path
- [ ] Studio name changes everywhere from `site.json` only
- [ ] Placeholders for every `[TODO]` and missing image; production flag hides them
- [ ] No invented claims anywhere
- [ ] Mobile 320–390px polished, no horizontal scroll
- [ ] Lighthouse targets met
- [ ] Report: files changed, decisions, commands run, results, content still needed
