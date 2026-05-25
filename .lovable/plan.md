# Flourish — Seed-inspired Premium Redesign

Full rebuild of the one-page site to match a seed.com-grade editorial feel: massive serif headlines, generous whitespace, cinematic product hero, science credibility, warm turmeric-amber palette.

## Design system updates (`src/styles.css`)

- Primary: warm turmeric/amber `oklch(0.68 0.16 55)` (not neon)
- Cream `oklch(0.97 0.015 75)`, off-white `oklch(0.985 0.008 80)`
- Charcoal text `oklch(0.22 0.01 60)`, muted `oklch(0.5 0.01 60)`
- Fonts: keep Playfair Display (serif headlines) + Inter (body)
- Add `--ease-out-soft`, generous section padding tokens
- Marquee keyframe + `.animate-marquee` utility (seamless infinite)
- Reuse existing `Reveal` for fade-up on scroll

## New hero product image

Generate a cinematic hero image via imagegen (premium): tall portrait, amber drink in clear glass, lemon slices, fresh ginger root, a matte tub of Flourish powder beside it, warm natural window light, off-white backdrop. Save to `src/assets/hero-flourish.jpg`. Plus 3 lifestyle/step placeholders for How It Works (mix / drink / lifestyle moment).

## Sections (rebuild `src/routes/index.tsx`)

1. **Nav** — Flourish wordmark left · center links (Our Formula, Science, How It Works, Pricing) · "Join Waitlist" orange button right. Transparent → white + 1px border on scroll.
2. **Hero** — min-h-screen, 2-col. Left: huge serif "Feel lighter. / Every day.", subhead, primary + secondary CTAs, star trust line. Right: cinematic product image with warm glow.
3. **Marquee** — charcoal bar, white text, seamless infinite scroll of the provided phrases (duplicated track, CSS `translateX(-50%)` loop).
4. **Product feature** — centered serif "Whole body health starts in the gut." + 3 large bordered cards (Beat the bloat / Support fat loss / Gut health, every day) with numerals.
5. **How It Works** — 3 alternating full-width editorial rows (Mix / Drink / Feel the difference) with image left/right swap.
6. **Ingredients + science bar** — centered intro + 4×2 ingredient grid (warm cream tiles) + charcoal credibility bar below.
7. **Brand story** — cream background, oversized centered serif pullquote + supporting paragraph + orange "Read our story →" link.
8. **Social proof** — 3 review cards (★★★★★, quote, name/city) + below a horizontally scrolling UGC strip of square placeholder tiles.
9. **Pricing** — 2 cards: one-off £34.99 (outlined CTA) and Subscribe £27.99/mo (orange border, "Most Popular" badge, filled CTA). Reassurance line below.
10. **Final CTA** — charcoal full-bleed section, big serif "Feel lighter. Starting now.", email form (reuse `WaitlistForm`, dark variant), star trust line.
11. **Footer** — near-black: wordmark + nav + social row; newsletter signup; legal row.

## Behavior

- Smooth scroll for nav anchors (`scroll-behavior: smooth` on html)
- `WaitlistForm` already shows success state — add a `variant="dark"` prop for the final CTA
- All sections wrapped in `<Reveal>` for fade-up
- Mobile: hero stacks (image above headline), full-width CTAs, marquee unchanged, How It Works rows stack image-then-text, ingredients grid → 2 cols → 1 col

## Files

- edit `src/styles.css` (tokens + marquee keyframe)
- edit `src/components/WaitlistForm.tsx` (dark variant)
- rewrite `src/routes/index.tsx` (all 11 sections)
- generate `src/assets/hero-flourish.jpg` (premium) + 3 step images (fast)

## Out of scope

- No backend wiring for waitlist (client-only success state, as today)
- No separate routes — single page with anchor scrolling for nav links
