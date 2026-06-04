import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Star, Check } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Reveal } from "../components/Reveal";
import { WaitlistForm } from "../components/WaitlistForm";
import { MicrobiomeCanvas } from "../components/MicrobiomeCanvas";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const marqueeItems = [
  "Made in the UK",
  "8 organic ingredients",
  "Taken before your first meal",
  "Gut health · Debloat · Fat loss",
  "No artificial additives",
  "Vegan friendly",
  "Launching soon",
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flourish — Feel lighter. Every day." },
      {
        name: "description",
        content:
          "Flourish is a premium gut health drink mix with 8 clinically-studied ingredients designed to reduce bloating, support digestion and help you feel your best.",
      },
      { property: "og:title", content: "Flourish — Feel lighter. Every day." },
      {
        property: "og:description",
        content:
          "Premium gut health and debloat drink. Precisely chosen ingredients. Real science. Join the waitlist for early access.",
      },
    ],
    links: [{ rel: "canonical", href: "https://flourish-nutrition.henrytaylor-projects.workers.dev/" }],
  }),
  component: Index,
});

// Overflow-hidden word mask for hero headline — inner span translates up via GSAP on load
function HeroWord({ children, spaceAfter }: { children: string; spaceAfter?: boolean }) {
  return (
    <span
      className="inline-block overflow-hidden pb-[0.12em] mb-[-0.12em]"
      style={{ marginRight: spaceAfter ? "0.28em" : undefined }}
    >
      <span className="hero-word inline-block">{children}</span>
    </span>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[85vh] pt-32 lg:pt-44 pb-20 lg:pb-32 overflow-hidden bg-[var(--color-cream)]"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[oklch(0.985_0.025_75)] via-[var(--color-cream)] to-white" />
      <MicrobiomeCanvas />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 min-h-[85vh]">
        <div className="lg:col-span-7 pt-16 lg:pt-24 pl-0 lg:pl-10">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-primary/20 px-3 py-1.5 text-xs font-medium text-primary mb-6">
              <span className="size-1.5 rounded-full bg-primary" />
              Premium gut health, daily
            </span>

            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold text-foreground leading-tight tracking-[-0.03em] text-left">
              <HeroWord spaceAfter>Feel</HeroWord>
              <HeroWord>lighter.</HeroWord>
              <br />
              <span className="text-primary">
                <HeroWord spaceAfter>Every</HeroWord>
                <HeroWord>day.</HeroWord>
              </span>
            </h1>

            <p className="mt-4 text-lg lg:text-xl text-muted-foreground leading-relaxed text-left">
              The daily gut health ritual that reduces bloating, supports digestion, helping you feel and look your best.
            </p>
            <div className="mt-6 max-w-md">
              <WaitlistForm source="homepage" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Join 500+ people already waiting · Early access gets 20% off
            </p>
            <p className="mt-3 text-xs text-zinc-500 italic">
              Animation represents Lactobacillus, Bifidobacterium, and Bacteroidetes, gut bacteria supported by the Flourish formula.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const track = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];
  return (
    <section aria-hidden="true" className="bg-[#1a1a1a] text-white overflow-hidden py-5">
      <div className="flex animate-marquee whitespace-nowrap">
        {track.map((item, i) => (
          <span key={i} className="flex items-center gap-8 px-8 text-sm tracking-wide uppercase font-medium">
            {item}
            <span className="text-primary">●</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function Benefits() {
  const cards = [
    {
      num: "01",
      colClass: "col-span-12 lg:col-span-5",
      bg: "#1a1a1a",
      accent: "bg-orange-500",
      headline: "Feel lighter after every meal.",
      body: "ACV and ginger work together to reduce post-meal bloating from the very first serve.",
      tags: ["ACV", "Ginger"],
      headlineSize: "text-2xl lg:text-3xl",
      bodyWidth: "max-w-xs",
      glow: false,
    },
    {
      num: "02",
      colClass: "col-span-12 lg:col-span-7",
      bg: "linear-gradient(135deg, #1a1a1a 0%, #1f1510 100%)",
      accent: "bg-amber-500",
      headline: "No more afternoon energy crashes.",
      body: "Ceylon cinnamon and ACV steady your blood sugar after meals, so your energy stays consistent all day.",
      tags: ["Cinnamon", "ACV"],
      headlineSize: "text-3xl lg:text-4xl",
      bodyWidth: "max-w-sm",
      glow: false,
    },
    {
      num: "03",
      colClass: "col-span-12 lg:col-span-4",
      bg: "#161616",
      accent: "bg-orange-600",
      headline: "Support your fat loss goals.",
      body: "ACV, ginger, and cinnamon support metabolism and appetite control before every meal.",
      tags: ["ACV", "Ginger", "Cinnamon"],
      headlineSize: "text-2xl",
      bodyWidth: "",
      glow: false,
    },
    {
      num: "04",
      colClass: "col-span-12 lg:col-span-4",
      bg: "#1a1a1a",
      accent: "bg-orange-400",
      headline: "A thriving gut microbiome.",
      body: "Prebiotic inulin feeds Bifidobacterium and Lactobacillus, the beneficial bacteria your gut needs most.",
      tags: ["Inulin", "Black Pepper"],
      headlineSize: "text-2xl",
      bodyWidth: "",
      glow: false,
    },
    {
      num: "05",
      colClass: "col-span-12 lg:col-span-4",
      bg: "#161616",
      accent: "bg-amber-400",
      headline: "Skin that reflects your gut health.",
      body: "Lemon's vitamin C supports collagen synthesis. A healthier gut microbiome means clearer, brighter skin.",
      tags: ["Lemon", "Inulin"],
      headlineSize: "text-2xl",
      bodyWidth: "",
      glow: false,
    },
    {
      num: "06",
      colClass: "col-span-12 lg:col-span-6",
      bg: "linear-gradient(135deg, #1a1a1a 0%, #0f1a0f 100%)",
      accent: "bg-orange-500",
      headline: "70% of your immune system lives in your gut.",
      body: "Inulin, turmeric, and black pepper work together to support your body's natural defences from the inside out.",
      tags: ["Inulin", "Turmeric", "Black Pepper"],
      headlineSize: "text-2xl lg:text-3xl",
      bodyWidth: "max-w-xs",
      glow: false,
    },
    {
      num: "07",
      colClass: "col-span-12 lg:col-span-6",
      bg: "#1a1a1a",
      accent: "bg-orange-500",
      headline: "Your gut makes 90% of your serotonin.",
      body: "The gut-brain axis is real. A healthier microbiome supports mood, mental clarity, and focus every single day.",
      tags: ["Inulin", "Turmeric", "Ginger"],
      headlineSize: "text-2xl lg:text-3xl",
      bodyWidth: "max-w-sm",
      glow: true,
    },
  ];

  return (
    <section id="benefits" className="py-32 lg:py-48 bg-[#0f0f0f] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Top copy */}
        <div data-benefits-copy className="max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 rounded-full px-4 py-1.5 text-xs uppercase tracking-widest">
            <span className="size-1.5 rounded-full bg-orange-400" aria-hidden="true" />
            What Flourish does for you
          </span>
          <h2 className="font-serif text-5xl lg:text-6xl text-white leading-[0.95] mt-6 font-bold">
            Seven reasons to make this your daily ritual.
          </h2>
          <p className="text-zinc-400 mt-6 text-base max-w-lg mx-auto leading-relaxed">
            Every benefit backed by the science of your 8 ingredients, felt from the first serve, built over time.
          </p>
        </div>

        {/* Benefit card grid */}
        <div className="mt-20 grid grid-cols-12 gap-4">
          {cards.map((card) => (
            <div
              key={card.num}
              data-benefit-card
              className={`group ${card.colClass} rounded-2xl p-8 lg:p-10 relative overflow-hidden min-h-[200px] lg:min-h-[220px] cursor-default transition-[filter] duration-300 hover:brightness-110`}
              style={{ background: card.bg }}
            >
              {/* Card 7 ambient glow */}
              {card.glow && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 30% 50%, rgba(232,98,42,0.06) 0%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />
              )}

              {/* Accent line — scaleX animated by GSAP, width extends on hover */}
              <div
                data-accent-line
                className={`h-0.5 ${card.accent} mb-6 transition-[width] duration-300 ease-out`}
                style={{ width: "3rem", transformOrigin: "left center" }}
              />

              {/* Benefit number watermark */}
              <span
                data-benefit-num={parseInt(card.num)}
                className="absolute bottom-4 right-6 font-serif text-8xl font-bold leading-none text-orange-500/20 select-none pointer-events-none"
                aria-hidden="true"
              >
                {card.num}
              </span>

              {/* Headline */}
              <h3 className={`font-serif font-bold ${card.headlineSize} text-white leading-tight`}>
                {card.headline}
              </h3>

              {/* Body */}
              <p className={`text-zinc-400 text-sm leading-relaxed mt-3 ${card.bodyWidth}`}>
                {card.body}
              </p>

              {/* Ingredient tags */}
              <div className="flex flex-wrap gap-3 mt-5">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-orange-400/60 group-hover:text-orange-400 uppercase tracking-wider transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-zinc-400 text-sm">
            Every benefit traces back to the same source, a healthier gut.
          </p>
          <a
            href="#waitlist"
            className="mt-6 inline-flex rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-sm transition-[filter,transform] duration-150 hover:brightness-95 active:scale-[0.97]"
          >
            Start your daily ritual
          </a>
        </div>
      </div>
    </section>
  );
}

function Comparison() {
  type CompCell = false | string;

  const rows: { feature: string; probiotic: CompCell; greens: CompCell; acv: CompCell }[] = [
    { feature: "Organic ingredients",                           probiotic: false,           greens: "Sometimes",     acv: false },
    { feature: "Anti-inflammatory support",                     probiotic: false,           greens: "Sometimes",     acv: false },
    { feature: "Blood sugar support",                           probiotic: false,           greens: false,           acv: "Partially" },
    { feature: "No emulsifiers or preservatives",               probiotic: "Often added",   greens: "Varies",        acv: "Varies" },
    { feature: "Multi-benefit formula (gut, skin, energy, mood)", probiotic: false,         greens: "Partially",     acv: false },
    { feature: "8 simple recognisable ingredients",             probiotic: false,           greens: "Often 50-75+",  acv: "3-5 ingredients" },
    { feature: "Natural sweetener only (zero sugar)",           probiotic: "Often sugar",   greens: "Varies",        acv: "Often sharp" },
    { feature: "Made in the UK",                                probiotic: false,           greens: false,           acv: false },
  ];

  const compCell = (v: CompCell) =>
    v === false
      ? <span className="text-zinc-300 text-lg select-none" aria-label="No">—</span>
      : <span className="text-zinc-400 text-xs italic">{v}</span>;

  return (
    <section id="comparison" className="py-24 lg:py-40 bg-[var(--color-cream)]">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">

        {/* Top copy */}
        <div data-comparison-copy className="text-center">
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight">
            One drink. Eight ingredients.<br />Everything your gut needs.
          </h2>
          <p className="text-zinc-500 mt-4 max-w-xl mx-auto leading-relaxed">
            Most gut health drinks do one thing well. Flourish was built to do everything, simply, organically, and affordably.
          </p>
        </div>

        {/* Table */}
        <div className="mt-16 rounded-2xl overflow-hidden border border-zinc-200 relative">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="bg-zinc-900">
                  {/* Feature column */}
                  <th className="pl-6 pr-4 py-4 text-left w-[30%]" scope="col" />

                  {/* Flourish column */}
                  <th className="bg-orange-500 py-4 text-center w-[17.5%]" scope="col">
                    <div className="flex flex-col items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-white mb-1" aria-hidden="true" />
                      <span className="font-serif font-bold text-white text-base">Flourish</span>
                    </div>
                  </th>

                  {/* Competitor columns */}
                  {[
                    { label: "Probiotic Drinks", sub: "e.g. Yakult, Actimel" },
                    { label: "Greens Powders",   sub: "e.g. AG1, Bloom, Huel" },
                    { label: "ACV Shots",         sub: "e.g. Bragg, H&B" },
                  ].map((col) => (
                    <th key={col.label} className="py-4 px-2 text-center w-[17.5%]" scope="col">
                      <p className="text-zinc-400 text-sm font-medium">{col.label}</p>
                      <p className="text-zinc-500 text-xs mt-0.5 font-normal">{col.sub}</p>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.feature}
                    data-comparison-row
                    className={`border-b border-zinc-100 last:border-b-0 ${i % 2 === 0 ? "bg-white" : "bg-zinc-50"}`}
                  >
                    {/* Feature label */}
                    <td className="pl-6 pr-4 py-4 text-zinc-700 text-sm font-medium align-middle">
                      {row.feature}
                    </td>

                    {/* Flourish check — always ✓, orange, prominent */}
                    <td className="bg-orange-50/50 py-4 text-center align-middle">
                      <div className="flex items-center justify-center">
                        <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" strokeWidth={2.5} aria-label="Yes" />
                        </div>
                      </div>
                    </td>

                    {/* Competitors */}
                    <td className="py-4 text-center align-middle">{compCell(row.probiotic)}</td>
                    <td className="py-4 text-center align-middle">{compCell(row.greens)}</td>
                    <td className="py-4 text-center align-middle">{compCell(row.acv)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile horizontal scroll hint */}
          <div
            className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[var(--color-cream)] to-transparent pointer-events-none lg:hidden"
            aria-hidden="true"
          />
        </div>

        {/* Legal disclaimer */}
        <p className="text-zinc-400 text-xs mt-4 text-center italic">
          Comparison based on commonly available products in each category. Category characteristics are generalised, individual products may vary. Brand names referenced are category examples only.
        </p>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-zinc-500 text-sm">Ready to experience the difference?</p>
          <a
            href="#waitlist"
            className="mt-6 inline-flex rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-sm transition-[filter,transform] duration-150 hover:brightness-95 active:scale-[0.97]"
          >
            Join the Waitlist
          </a>
        </div>

      </div>
    </section>
  );
}

function Flavours() {
  const flavours = [
    {
      id: "01",
      name: "Lemon Ginger",
      bg: "#E8B84B",
      dark: true,
      label: "FLAVOUR 01 · THE ORIGINAL",
      description: "Bright lemon with warming ginger and ACV. The flavour that started it all.",
      cta: "Notify me →",
      ctaHref: "#waitlist",
    },
    {
      id: "02",
      name: "Apple Cinnamon",
      bg: "#D4744A",
      dark: false,
      label: "FLAVOUR 02",
      description: "Warm apple cider vinegar with Ceylon cinnamon. Smooth, spiced, and grounding.",
      cta: "Notify me →",
      ctaHref: "#waitlist",
    },
    {
      id: "03",
      name: "You decide.",
      bg: "#2D2D2D",
      dark: false,
      label: "FLAVOUR 03 · COMING SOON",
      description: "A third flavour is coming. We're still perfecting it, and we want your input.",
      cta: "Vote for your flavour →",
      ctaHref: "#waitlist",
    },
  ];

  return (
    <section id="flavours" className="py-28 lg:py-40 bg-[var(--color-cream)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="section-heading font-serif text-4xl lg:text-5xl font-bold text-foreground leading-[1.1]">
            One precise daily blend. 3 flavours.
          </h2>
          <p className="mt-6 text-lg text-zinc-600 leading-relaxed">
            The same powerful formula. Three delicious flavours. Every ingredient chosen for a specific role, crafted to be taken before every meal.
          </p>
        </Reveal>

        {/* Cards driven by GSAP ScrollTrigger.batch — 150ms stagger */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {flavours.map((f) => (
            <div
              key={f.id}
              data-flavour-card
              className="min-h-[520px] rounded-2xl p-8 flex flex-col relative overflow-hidden"
              style={{ backgroundColor: f.bg }}
            >
              {/* Consistent number watermark across all three cards */}
              <span
                className="absolute -bottom-6 -right-4 font-serif text-[12rem] font-bold leading-none select-none pointer-events-none text-primary opacity-20"
                aria-hidden="true"
              >
                {f.id}
              </span>

              <p className={`text-xs font-semibold uppercase tracking-widest mb-4 ${f.dark ? "text-[#1a1a1a]/60" : "text-white/70"}`}>
                {f.label}
              </p>
              <h3 className={`font-serif text-3xl font-bold mb-6 ${f.dark ? "text-[#1a1a1a]" : "text-white"}`}>
                {f.name}
              </h3>
              <p className={`text-sm leading-relaxed mt-auto ${f.dark ? "text-[#1a1a1a]/75" : "text-white/80"}`}>
                {f.description}
              </p>
              <a
                href={f.ctaHref}
                className={`mt-4 text-sm font-medium underline underline-offset-2 transition-opacity ${f.dark ? "text-[#1a1a1a]/60 hover:text-[#1a1a1a]/90" : "text-white/70 hover:text-white"}`}
              >
                {f.cta}
              </a>
            </div>
          ))}
        </div>

        <Reveal delay={400}>
          <div className="mt-16 text-center">
            <p className="text-zinc-600 text-sm mb-6">
              Launching soon. Join the waitlist for first access to all three flavours.
            </p>
            <a
              href="#waitlist"
              className="inline-flex rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-sm transition-[filter,transform] duration-150 hover:brightness-95 active:scale-[0.97]"
            >
              Join the Waitlist
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PricingTeaser() {
  const [plan, setPlan] = useState<"trial" | "monthly">("monthly");

  return (
    // Flavours() is bg-[var(--color-cream)] — same bg here, so border-t separates them
    <section id="pricing" className="py-24 lg:py-40 bg-[var(--color-cream)] border-t border-zinc-100">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">

        {/* Top copy */}
        <Reveal>
          <p className="text-sm font-medium text-primary">● PRICING</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-zinc-900 mt-4 leading-tight">
            Start your ritual.<br />No commitment needed.
          </h2>
          <p className="text-zinc-500 mt-4 max-w-xl mx-auto leading-relaxed">
            Try Flourish for 7 days or commit to a full month. Early access members get an exclusive founding rate.
          </p>

          {/* Plan toggle */}
          <div className="mt-10 flex justify-center">
            <div className="inline-flex bg-zinc-100 rounded-full p-1">
              <button
                onClick={() => setPlan("trial")}
                className={`px-6 py-2 text-sm rounded-full transition-all duration-200 cursor-pointer ${
                  plan === "trial"
                    ? "bg-white shadow-sm text-zinc-900 font-medium"
                    : "text-zinc-500"
                }`}
              >
                7-Day Trial
              </button>
              <button
                onClick={() => setPlan("monthly")}
                className={`px-6 py-2 text-sm rounded-full transition-all duration-200 cursor-pointer ${
                  plan === "monthly"
                    ? "bg-white shadow-sm text-zinc-900 font-medium"
                    : "text-zinc-500"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>
        </Reveal>

        {/* ── Monthly view ──────────────────────────────────────────────────── */}
        {plan === "monthly" && (
          <div data-pricing-cards className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 text-left">

            {/* One-off card */}
            <div className="bg-white rounded-2xl p-8 border border-zinc-200">
              <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest">
                One-off
              </p>
              <div className="flex items-baseline gap-2 mt-4">
                <p className="text-5xl font-bold text-zinc-900">£27.99</p>
                <p className="text-zinc-400 text-sm line-through">£34.99</p>
              </div>
              <p className="text-zinc-400 text-sm mt-1">per month</p>
              <span className="mt-3 inline-block bg-orange-50 text-orange-600 text-xs rounded-full px-3 py-1">
                Early access rate — first 500 only
              </span>
              <ul className="mt-6 text-sm text-zinc-500 space-y-2">
                {[
                  "30 sachets — 30-day supply",
                  "8g per sachet",
                  "Free UK delivery",
                  "No subscription required",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-zinc-300 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#waitlist"
                className="mt-8 block w-full text-center border border-zinc-300 text-zinc-700 rounded-xl py-3 font-medium text-sm hover:border-zinc-400 transition-colors"
              >
                Join Waitlist — One-off
              </a>
            </div>

            {/* Subscribe card — featured */}
            <div className="bg-zinc-900 rounded-2xl p-8 border-2 border-orange-500 relative overflow-hidden">
              <span className="absolute top-4 right-4 bg-orange-500 text-white text-xs rounded-full px-3 py-1">
                Most popular
              </span>
              <p className="text-zinc-400 text-sm font-medium uppercase tracking-widest">
                Monthly subscription
              </p>
              <div className="flex items-baseline gap-2 mt-4">
                <p className="text-5xl font-bold text-white">£23.99</p>
                <p className="text-zinc-500 text-sm line-through">£29.99</p>
              </div>
              <p className="text-zinc-400 text-sm mt-1">/month</p>
              <span className="mt-3 inline-block bg-orange-500/20 text-orange-400 text-xs rounded-full px-3 py-1">
                Save 20% — founding member rate
              </span>
              <ul className="mt-6 text-sm text-zinc-400 space-y-2">
                {[
                  "30 sachets — 30-day supply",
                  "8g per sachet",
                  "Free UK delivery",
                  "Cancel anytime",
                  "First pick of all 3 flavours",
                  "Locked-in founding rate",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-orange-500/40 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#waitlist"
                className="mt-8 block w-full text-center bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3 font-medium text-sm transition-colors"
              >
                Join Waitlist — Subscribe
              </a>
            </div>
          </div>
        )}

        {/* ── Trial view ────────────────────────────────────────────────────── */}
        {plan === "trial" && (
          <div data-pricing-cards className="max-w-sm mx-auto mt-10">
            <div className="bg-white rounded-2xl p-10 border-2 border-orange-500 text-center">
              <p className="text-orange-500 text-sm font-medium uppercase tracking-widest">
                7-Day Trial
              </p>
              <p className="text-6xl font-bold text-zinc-900 mt-4">£10</p>
              <p className="text-zinc-500 text-sm mt-2">7 sachets delivered to your door.</p>
              <ul className="mt-8 text-sm text-zinc-500 space-y-3 text-left max-w-xs mx-auto">
                {[
                  "7-day supply — one sachet daily",
                  "Before your first meal, every day",
                  "8g per sachet, full formula",
                  "Free UK delivery",
                  "No subscription — try it first",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-zinc-300 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-zinc-400 text-xs italic">
                Shipping costs will be confirmed at launch. Early access members will be notified first.
              </p>
              <a
                href="#waitlist"
                className="mt-8 block w-full text-center bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3 font-medium text-sm transition-colors"
              >
                Join Waitlist — Trial
              </a>
            </div>
          </div>
        )}

        {/* ── Below both states ─────────────────────────────────────────────── */}
        <div className="mt-10">
          <p className="text-zinc-500 text-sm">
            Early access pricing available to the first 500 members only.
          </p>
          <div className="mt-3">
            <div className="w-64 h-1.5 bg-zinc-200 rounded-full mx-auto overflow-hidden">
              <div className="w-2/5 h-full bg-orange-500 rounded-full" />
            </div>
            <p className="text-zinc-400 text-xs mt-2">Spots filling fast</p>
          </div>
        </div>

      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="waitlist" className="py-28 lg:py-40 bg-[#1a1a1a] text-white">
      <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
        <Reveal>
          <div className="flex justify-center mb-6">
            <span className="bg-orange-50 text-orange-600 text-xs rounded-full px-4 py-1.5">
              🌿 Early access — limited spots
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-semibold leading-[1.05] tracking-[-0.02em]">
            Join the founding 500.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-8 text-lg text-white/75 leading-relaxed">
            Be part of the first wave of people to try Flourish. Early access members get 20% off their first order and first pick of all three flavours.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-12 flex justify-center">
            <WaitlistForm id="cta-email" variant="dark" />
          </div>
        </Reveal>
        <Reveal delay={360}>
          <div className="mt-8 flex items-center justify-center gap-3 text-sm text-white/65">
            <div className="flex text-primary" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <span>Join 500+ people already waiting · Unsubscribe anytime</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Index() {
  const mainRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const container = mainRef.current;
      if (!container) return;
      const q = gsap.utils.selector(container);

      // ── 1. Hero headline: word-by-word reveal on load ───────────────────────
      gsap.from(q(".hero-word"), {
        yPercent: 110,
        duration: 0.45,
        stagger: 0.07,
        ease: EASE,
        delay: 0.15,
        clearProps: "transform",
      });

      // ── 2. Flavour cards: stagger in from below on scroll ───────────────────
      gsap.set(q("[data-flavour-card]"), { y: 64, opacity: 0 });
      ScrollTrigger.batch(q("[data-flavour-card]"), {
        onEnter: (els) => {
          gsap.to(els, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.15,
            ease: EASE,
            overwrite: true,
          });
        },
        start: "top 88%",
        once: true,
      });

      // ── 3. Section headings: slide in from the left on scroll ───────────────
      (q(".section-heading") as HTMLElement[]).forEach((el) => {
        gsap.from(el, {
          x: -50,
          duration: 0.5,
          ease: EASE,
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        });
      });

      // ── 4. Benefits copy: fade up on scroll ──────────────────────────────────
      const benefitsCopyEl = (q("[data-benefits-copy]") as HTMLElement[])[0];
      if (benefitsCopyEl) {
        gsap.fromTo(
          benefitsCopyEl,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: EASE,
            scrollTrigger: { trigger: benefitsCopyEl, start: "top 80%", once: true },
          },
        );
      }

      // ── 5. Benefit cards + accent lines stagger in ───────────────────────────
      const benefitCardEls = q("[data-benefit-card]") as HTMLElement[];
      const accentLineEls = q("[data-accent-line]") as HTMLElement[];
      if (benefitCardEls.length) {
        gsap.set(benefitCardEls, { y: 50, opacity: 0 });
        gsap.set(accentLineEls, { scaleX: 0, transformOrigin: "left center" });
        ScrollTrigger.batch(benefitCardEls, {
          onEnter: (els) => {
            gsap.to(els, {
              y: 0,
              opacity: 1,
              duration: 0.55,
              stagger: 0.08,
              ease: EASE,
              overwrite: true,
            });
            gsap.to(accentLineEls, {
              scaleX: 1,
              duration: 0.4,
              stagger: 0.08,
              ease: EASE,
              delay: 0.1,
            });
          },
          start: "top 85%",
          once: true,
        });
      }

      // ── 6. Pricing section: fade up on scroll ───────────────────────────────
      const pricingSection = (q("[data-pricing-cards]") as HTMLElement[])[0];
      if (pricingSection) {
        gsap.fromTo(
          pricingSection,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: EASE,
            scrollTrigger: { trigger: pricingSection, start: "top 85%", once: true },
          },
        );
      }

      // ── 7. Comparison copy: fade up on scroll ────────────────────────────────
      const comparisonCopyEl = (q("[data-comparison-copy]") as HTMLElement[])[0];
      if (comparisonCopyEl) {
        gsap.fromTo(
          comparisonCopyEl,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: EASE,
            scrollTrigger: { trigger: comparisonCopyEl, start: "top 80%", once: true },
          },
        );
      }

      // ── 8. Comparison rows: stagger in on scroll ──────────────────────────────
      const comparisonRows = q("[data-comparison-row]") as HTMLElement[];
      if (comparisonRows.length) {
        gsap.set(comparisonRows, { y: 20, opacity: 0 });
        ScrollTrigger.batch(comparisonRows, {
          onEnter: (els) => {
            gsap.to(els, {
              y: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.04,
              ease: EASE,
              overwrite: true,
            });
          },
          start: "top 85%",
          once: true,
        });
      }

      // ── 9. Benefit numbers: count up from 00 to their value ─────────────────
      (q("[data-benefit-num]") as HTMLElement[]).forEach((el) => {
        const target = parseInt(el.dataset.benefitNum ?? "1");
        const obj = { val: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: target,
              duration: 0.4,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = String(Math.round(obj.val)).padStart(2, "0");
              },
            });
          },
        });
      });
    },
    { scope: mainRef },
  );

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main id="main-content" ref={mainRef}>
        <Hero />
        <Marquee />
        <Benefits />
        <Comparison />
        <Flavours />
        <PricingTeaser />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
