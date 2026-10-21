# RAKEEZ (ركيز) — Brand Brief & Portfolio Specification

## 1. Project overview
**Brand:** Rakeez  
**Arabic name:** ركيز  
**Descriptor:** Software Team  
**Business:** A professional software team that turns ideas and business needs into reliable digital products.

**Primary brand idea:** stability, clarity, thoughtful engineering, collaboration, and lasting business value.

**Recommended positioning line:** “Building smart solutions together.”  
Alternative hero headline: “Ideas into real impact.”  
Supporting copy: “We’re a software team focused on building reliable, high-quality digital products that solve real problems and create lasting value.”

Use “Rakeez” as the main brand name and “Software Team” as a descriptor. The Arabic identity can be shown as a secondary wordmark; ensure Arabic shaping and RTL layout render correctly.

## 2. Naming assessment
“Rakeez / ركيز” is approachable and credible for a client-facing software team. Its Arabic character can convey a foundation or dependable support. It is less aggressive than “Scorpion Team” and fits a professional services portfolio.

Do not claim the name is legally available. Check relevant domain names, social handles, and trademark databases before commercial launch.

## 3. Brand personality
- Professional, calm, dependable
- Modern and technically capable
- Premium, but not flashy
- Collaborative and clear
- Business-outcome focused rather than technology-jargon focused

Avoid an esports/gaming feel, excessive metallic 3D effects, overuse of gold, generic AI-looking visual clutter, and exaggerated claims.

## 4. Color system
The palette below is the chosen starting system from the design discussion. Treat these as brand design tokens; validate contrast in the finished UI.

| Token | HEX | Usage |
|---|---|---|
| Midnight Navy | `#0B1220` | Main dark background, hero, footer |
| Slate | `#1E293B` | Cards, navigation, surfaces |
| Gold | `#D4AF37` | Main accent, CTAs, links, active states |
| Champagne | `#F1D9AA` | Restrained gradient highlight |
| Silver Gray | `#A7B0BD` | Secondary text, borders, subdued icon details |
| Soft White | `#F8FAFC` | Primary text on dark surfaces and clean light sections |
| Optional Deep Blue | `#0F172A` | Gradient depth and alternate dark surface |
| Optional Steel Gray | `#334155` | Borders and muted surfaces |

### Usage ratio
A useful starting ratio is approximately 70% dark navy/slate, 20% white/silver text and surfaces, and 10% gold/champagne accents. This is a visual guideline, not a strict rule. Gold should not be used for long paragraphs.

### Gradients
- Gold accent: `linear-gradient(135deg, #F1D9AA 0%, #D4AF37 100%)`
- Dark hero: deep navy fading to slate/near-black.
- Optional atmospheric highlight: a very subtle warm glow, never behind body copy at full strength.

### Accessibility
- Check all text/background combinations against WCAG contrast targets.
- Do not use gold for small text on white backgrounds unless contrast is confirmed.
- Buttons and links must have visible hover, focus, and disabled states.
- Do not communicate status by color alone.

## 5. Logo direction
### Concept
A geometric, memorable “R” monogram inspired by the English R and a stable, interlocking foundation. Use a restrained silver/champagne-gold treatment for premium marketing artwork.

### Production logo variants to create
1. Primary horizontal lockup: mark + RAKEEZ + optional Arabic `ركيز` + SOFTWARE TEAM.
2. Stacked lockup for covers and social profiles.
3. Mark-only SVG for navbar at small sizes and favicon/app icon.
4. Monochrome white SVG for dark backgrounds.
5. Monochrome dark SVG for light backgrounds.
6. Transparent PNG exports at high resolution if needed.
7. Favicon SVG and square app/social icon.

### Rules
- Prefer flat vector fills for production UI; reserve 3D/metallic treatment for marketing artwork.
- Keep clear space around the mark.
- Never stretch, skew, or place the logo on a busy background without contrast protection.
- Test legibility at 16×16, 32×32, 48×48, and navbar sizes.
- Arabic text should be set in a real Arabic-capable font; do not outline or distort Arabic letters by hand without review.
- Do not use a moodboard screenshot as the logo source.
- The supplied TSX component is only a starter interpretation, not an exact trace of the concept artwork.

## 6. Typography
Recommended:
- English headings / wordmark support: **Montserrat** or **Manrope**, with carefully controlled tracking.
- Body text and UI: **Inter** or **Manrope**.
- Arabic: **IBM Plex Sans Arabic**, **Noto Sans Arabic**, or another properly tested Arabic family.

Use next/font where practical. Keep headings crisp, body copy readable, and letter spacing moderate. Very wide tracking is for short labels, not paragraphs. Ensure mixed Arabic/English text direction is intentional.

## 7. Visual direction and imagery
### Homepage hero background
Preferred direction: a cinematic midnight-navy landscape or abstract dark architectural scene with a restrained warm-gold light trail. It should suggest direction, craft, progress, and depth—not literal luxury goods.

Alternative backgrounds:
- Abstract curved bands with thin champagne-gold edges
- Dark, low-contrast geometric texture
- Desaturated rocky/landscape texture for a single hero section

### Image rules
- Keep the brightest light away from headline text.
- Add a navy overlay for readable text.
- Use a responsive crop and `background-position` tuned for mobile.
- Provide a fallback background color if the image fails to load.
- Compress to WebP/AVIF where appropriate and avoid shipping huge raw assets.
- Avoid using a background image behind every section; use plain surfaces to preserve focus.
- Do not imply that generated concept boards are clean, standalone hero images. Generate or export the final background separately.

## 8. Homepage structure
1. **Navbar:** logo, About, Services, Work, Team, Contact; one clear “Let’s Talk” CTA.
2. **Hero:** small eyebrow “SOFTWARE TEAM”; headline “Building smart solutions together” or “Ideas into real impact”; short outcome-focused description; primary CTA “Explore our work”; secondary CTA “Get in touch”.
3. **Trust/strengths:** only factual claims (e.g., technologies, industries, delivery approach). Do not invent client logos, certifications, numbers, or testimonials.
4. **Services:** examples may include Web Development, Digital Products, UI Engineering, API/Backend Integration, Cloud/DevOps—but show only services the team can actually deliver.
5. **Selected work:** case studies with problem, role, solution, stack, and outcomes. Mark personal/concept projects honestly.
6. **Process:** Discover → Plan → Build → Validate → Deliver / Support.
7. **Team:** real team members and roles only, with permission to publish photos.
8. **Contact:** simple form or direct contact method, expected response time only if true.
9. **Footer:** brand, navigation, contact, social links, copyright.

## 9. Content voice
Use clear, confident, client-friendly language. Explain outcomes before listing technologies. Be specific and honest.

Good examples:
- “We turn business needs into dependable digital products.”
- “Thoughtful design. Solid engineering. Measurable progress.” (Only say measurable if outcomes are actually measured.)
- “From the first product decision to a production-ready release.”

Avoid:
- “World-class”, “best in the industry”, “guaranteed results” without evidence.
- Fake testimonials, fabricated metrics, placeholder logos presented as real clients.
- Dense buzzword-heavy copy.

## 10. Technical implementation notes (Next.js 15 + TypeScript)
- Use App Router and strict TypeScript.
- Prefer small, reusable components; avoid giant page components.
- Use semantic HTML, keyboard navigation, reduced-motion support, and accessible focus indicators.
- Use `next/image` for content images when useful; CSS backgrounds are acceptable for decorative hero imagery.
- Use `next/font` for font loading.
- Keep brand assets in `public/brand/` or a consistent equivalent.
- Avoid adding dependencies unless the current project needs them.
- If Tailwind is already installed, use the existing setup rather than introducing another styling system.
- Use CSS custom properties as the source of truth for brand tokens.
- Do not overwrite existing app files without inspecting the repository and explaining intended changes.
- Ensure mobile layouts work at 320px width and larger, and test reduced-motion preferences.
- Add meaningful alt text for informative images; decorative backgrounds should not be announced to screen readers.
- For external links, use safe, clear behavior and real URLs only.

## 11. Starter code included
- `starter/src/components/brand/RakeezMark.tsx`: a basic editable vector monogram.
- `starter/src/components/brand/Brand.tsx`: bilingual brand lockup.
- `starter/src/app/brand-tokens.css`: reusable CSS tokens.
- `starter/src/app/hero-background.css`: dark overlay recipe.

The starter mark is not a final trademark-ready vector. Review and refine its silhouette, proportions, and small-size rendering before launch.

## 12. Delivery checklist
- [ ] Inspect the existing repository and current stack before editing.
- [ ] Confirm brand name spelling: RAKEEZ / ركيز.
- [ ] Implement palette tokens consistently.
- [ ] Produce primary, horizontal, stacked, monochrome, and mark-only logo assets.
- [ ] Export clean SVGs with transparent backgrounds and a favicon.
- [ ] Create a separate final hero background asset, not a cropped moodboard.
- [ ] Build responsive homepage and core sections.
- [ ] Add real case studies and truthful team/service information.
- [ ] Test mobile, keyboard navigation, contrast, reduced motion, and performance.
- [ ] Verify all links, CTA destinations, metadata, favicon, and social preview.
- [ ] Run lint, typecheck, and production build.
- [ ] Check Arabic rendering and RTL behavior.
- [ ] Confirm image optimization and no console errors.
- [ ] Review for placeholder claims before launch.

## 13. Concept references
Reference boards are included in `references/` for visual direction only. They are generated concept art and may contain imperfect lettering or inaccurate small text. Use them as inspiration, not as exact specifications or export-ready assets.
