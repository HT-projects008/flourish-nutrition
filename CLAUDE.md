# Flourish Nutrition — Claude Code Context

## Project

Flourish is a premium gut health and debloat powdered drink. DTC wellness brand targeting a broad wellness audience.

- **3 flavours:** Apple Cinnamon, Lemon Ginger, Lemon Raspberry
- **8 organic ingredients:** ACV, lemon, turmeric, black pepper, Ceylon cinnamon, inulin, ginger extract (5% gingerols), monk fruit
- **Format:** 8g per serve, 30 serves per tub or sachet box
- **Pricing:** £34.99 one-off / £27.99 subscription
- **Tagline:** "Feel lighter. Every day."

## Stack

- **Framework:** TanStack Start (SSR), React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **Deployment:** Cloudflare Workers via Wrangler
- **Database:** Supabase — waitlist email storage
- **Animations:** GSAP + ScrollTrigger
- **Email:** Resend

## File structure

| Path | Purpose |
|------|---------|
| `src/routes/index.tsx` | Entire home page (Hero, Marquee, ProductFeatures, Flavours, SachetShowcase, GutStory, FinalCTA) |
| `src/routes/journal.tsx` | Journal listing page with category filters |
| `src/routes/journal.$slug.tsx` | Individual article pages (stub, noindexed) |
| `src/routes/waitlist.tsx` | Dedicated waitlist page |
| `src/routes/contact.tsx` | Contact form page |
| `src/routes/__root.tsx` | Root layout, head tags, Organization JSON-LD, skip link |
| `src/components/Nav.tsx` | Shared navigation with Journal dropdown |
| `src/components/Footer.tsx` | Shared footer |
| `src/components/Reveal.tsx` | Scroll fade-up IntersectionObserver component |
| `src/components/WaitlistForm.tsx` | Email capture form (light/dark variants) |
| `src/components/BotanicalCanvas.tsx` | Animated canvas particle system for hero |
| `src/data/articles.ts` | Journal article data |
| `src/lib/supabase.ts` | Supabase client |
| `src/lib/submit-waitlist.ts` | Waitlist form server function |
| `src/lib/send-contact.ts` | Contact form server function |
| `src/styles.css` | Global styles, CSS custom properties, animation keyframes |
| `public/assets/` | GIF and static image assets |
| `wrangler.jsonc` | Cloudflare Workers deployment config |

## Design system

| Token | Value |
|-------|-------|
| Primary (amber-orange) | `#D4744A` / `oklch(0.68 0.16 48)` |
| Background (off-white) | `oklch(0.985 0.012 80)` (`--color-cream`) |
| Dark sections | `#1a1a1a` |
| Serif font | Playfair Display (all headings) |
| Sans font | Inter (body) |
| Easing | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Card radius | `rounded-2xl` / `rounded-3xl` |

Section backgrounds alternate: cream → white → dark (`#1a1a1a`) → cream → dark → cream → dark. Preserve this rhythm.

## Key decisions made

- **Ingredients are "The Flourish Formula"** — not listed individually on the homepage to avoid commoditisation and positioning against single-ingredient competitors.
- **Sachet format is primary at launch** — tubs are secondary. SachetShowcase section leads with the sachet GIF.
- **Journal lives in a nav dropdown** — "All Articles" navigates to `/journal`; topic buttons filter the listing. Journal articles are stub pages (`noindex`) until content is written.
- **Waitlist stores to Supabase** `waitlist` table with `email` and `source` columns.
- **Hero animation** — botanical particle canvas (`BotanicalCanvas.tsx`) replaces the original microbiome animation. Respects `prefers-reduced-motion`.
- **GSAP animations in `index.tsx`** — hero word reveal (load), flavour card stagger (scroll), sachet stat count-up (scroll), section headings slide from left (scroll). All scoped to `mainRef` via `useGSAP`.
- **`Reveal` component** — IntersectionObserver fade-up, SSR-safe (content visible before JS), used for most sections. Cards in Flavours section use GSAP batch instead.
- **Canonical tags** on all routes. Organization JSON-LD in root `<head>`.

## Assets

| File | Usage |
|------|-------|
| `public/assets/sachet-rip.gif` | SachetShowcase section — sachet tear animation |
| `public/favicon.ico` | Site favicon |
| `public/robots.txt` | Search crawler rules |
| `public/sitemap.xml` | 4 indexable URLs (home, waitlist, journal, contact) |

## Commands

```bash
npm run dev          # Local development server
npm run build        # Production build → dist/
npm run deploy       # Build + deploy to Cloudflare Workers
wrangler login       # Authenticate with Cloudflare
```

Live URL: https://flourish-nutrition.henrytaylor-projects.workers.dev

## Rules

- **Always commit after each change** with a descriptive message.
- **Never use lorem ipsum** — all copy must be on-brand.
- **Animations follow Emil Kowalski principles** — nothing over 500ms, no bounce, custom easing `cubic-bezier(0.16, 1, 0.3, 1)`, `prefers-reduced-motion` always respected.
- **No medical claims** — all copy uses "supports", "helps", "designed to". Never "treats", "cures", "proven to".
- **Preserve section background rhythm** — alternating cream/white/dark throughout the page.
- **No `href="#"`** — all links go somewhere or are rendered as non-interactive spans.
- **Contrast minimum WCAG AA** — use `text-zinc-600` or darker on light backgrounds, never `text-zinc-400`.
- **TypeScript strict** — `npx tsc --noEmit` must pass before committing.
