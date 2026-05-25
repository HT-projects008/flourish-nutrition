import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Star, Menu, X } from "lucide-react";
import heroDrink from "../assets/hero-flourish.jpg";
import stepMix from "../assets/step-mix.jpg";
import stepDrink from "../assets/step-drink.jpg";
import stepFeel from "../assets/step-feel.jpg";
import { Reveal } from "../components/Reveal";
import { WaitlistForm } from "../components/WaitlistForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flourish — Feel lighter. Every day." },
      {
        name: "description",
        content:
          "Flourish is a premium gut health drink mix with 7 clinically-studied ingredients designed to reduce bloating, support digestion and help you feel your best.",
      },
      { property: "og:title", content: "Flourish — Feel lighter. Every day." },
      {
        property: "og:description",
        content:
          "Premium gut health and debloat drink. Simple ingredients. Real science. Join the waitlist for early access.",
      },
    ],
  }),
  component: Index,
});

const ingredients = [
  { name: "Apple cider vinegar", benefit: "Supports digestion and appetite control before meals" },
  { name: "Lemon juice", benefit: "Stimulates digestive enzymes and brightens the formula naturally" },
  { name: "Turmeric", benefit: "Powerful anti-inflammatory, paired with black pepper for bioavailability" },
  { name: "Black pepper", benefit: "Increases curcumin absorption from turmeric by up to 2,000%" },
  { name: "Ceylon cinnamon", benefit: "Helps maintain steady blood sugar levels after eating" },
  { name: "Inulin", benefit: "Prebiotic fibre that feeds your beneficial gut bacteria daily" },
  { name: "Ginger extract", benefit: "Clinically shown to reduce bloating and digestive discomfort" },
  { name: "Monk fruit", benefit: "Naturally sweet with zero sugar and zero artificial additives" },
];

const reviews = [
  {
    quote:
      "I've tried every gut health product going and nothing has worked like this formula promises to. I'm on the waitlist and cannot wait.",
    name: "Sarah M.",
    city: "London",
  },
  {
    quote:
      "The ingredient list is exactly what I've been looking for. ACV, ginger, inulin — all in one drink before meals. Finally.",
    name: "James T.",
    city: "Manchester",
  },
  {
    quote:
      "Finally a supplement with ingredients I actually recognise. No weird chemicals, just things that actually work.",
    name: "Emma R.",
    city: "Bristol",
  },
];

const marqueeItems = [
  "Natural ingredients",
  "Made in the UK",
  "Scientifically formulated",
  "500+ on the waitlist",
  "No artificial sweeteners",
  "Before every meal",
  "8g per serve",
  "Gut health",
  "Debloat",
  "Fat loss support",
];

const navLinks = [
  { label: "Our Formula", href: "#formula" },
  { label: "Science", href: "#science" },
  { label: "How It Works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-18 py-4 flex items-center justify-between">
        <a href="#top" className="font-serif text-2xl font-semibold text-primary tracking-tight">
          Flourish
        </a>
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground/75 hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#waitlist"
            className="hidden sm:inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-95 transition"
          >
            Join Waitlist
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 -mr-2 text-foreground"
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden bg-white border-t border-border px-6 py-6 flex flex-col gap-5">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#waitlist"
            onClick={() => setOpen(false)}
            className="sm:hidden inline-flex justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            Join Waitlist
          </a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen pt-28 lg:pt-32 pb-16 lg:pb-24 overflow-hidden bg-[var(--color-cream)]"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[oklch(0.985_0.025_75)] via-[var(--color-cream)] to-white" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center min-h-[calc(100vh-7rem)]">
        <div className="lg:col-span-7 order-2 lg:order-1">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-primary/20 px-3 py-1.5 text-xs font-medium text-primary mb-8">
              <span className="size-1.5 rounded-full bg-primary" />
              Premium gut health, daily
            </span>
            <h1 className="font-serif text-[clamp(3rem,8vw,7.5rem)] font-semibold text-foreground leading-[0.95] tracking-[-0.03em]">
              Feel lighter.
              <br />
              <span className="text-primary">Every day.</span>
            </h1>
            <p className="mt-8 text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">
              The daily gut health ritual that reduces bloating, supports digestion, and helps you feel your best.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="#waitlist"
                className="inline-flex justify-center rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-sm hover:brightness-95 transition"
              >
                Join the Waitlist
              </a>
              <a
                href="#science"
                className="inline-flex justify-center rounded-full border border-foreground/20 px-7 py-4 text-base font-semibold text-foreground hover:bg-foreground/5 transition"
              >
                See the Science
              </a>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <span>500+ people already waiting · Early access gets 20% off</span>
            </div>
          </Reveal>
        </div>
        <Reveal delay={150} className="lg:col-span-5 order-1 lg:order-2">
          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-to-tr from-primary/20 via-primary/5 to-transparent rounded-[3rem] blur-3xl" />
            <img
              src={heroDrink}
              alt="A glass of Flourish gut health drink with lemon and fresh ginger"
              width={1024}
              height={1280}
              className="relative w-full max-w-lg mx-auto rounded-3xl object-cover shadow-2xl ring-1 ring-black/5"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Marquee() {
  const track = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];
  return (
    <section className="bg-foreground text-background overflow-hidden py-5 border-y border-foreground">
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

function ProductFeatures() {
  const features = [
    {
      n: "01",
      title: "Beat the bloat",
      copy: "Feel noticeably lighter after every meal. ACV and ginger work together to support digestion and reduce uncomfortable fullness.",
    },
    {
      n: "02",
      title: "Support fat loss",
      copy: "Clinically-studied ingredients that help regulate blood sugar, manage cravings, and support your metabolism before you eat.",
    },
    {
      n: "03",
      title: "Gut health, every day",
      copy: "Inulin prebiotic fibre feeds the beneficial bacteria your gut needs to function at its best — every day, not just when you remember.",
    },
  ];
  return (
    <section id="formula" className="py-28 lg:py-40 bg-[var(--color-cream)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6">
            The Formula
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-[1.05]">
            Whole body health starts in the gut.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Flourish is formulated with 7 clinically-studied ingredients to support your gut, reduce bloating, and help your body feel its best — every single day.
          </p>
        </Reveal>
        <div className="mt-20 grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((f, i) => (
            <Reveal key={f.n} delay={i * 120}>
              <div className="rounded-3xl bg-white border border-border/80 p-10 h-full hover:border-primary/30 transition-colors">
                <p className="font-serif text-5xl text-primary tabular-nums">{f.n}</p>
                <h3 className="mt-8 font-serif text-2xl font-semibold text-foreground">{f.title}</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">{f.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      kicker: "Mix",
      title: "Add one scoop to 250ml of cold water.",
      body: "Each 8g serve contains your full daily dose of ACV, ginger, turmeric, inulin and more — all in one clean, citrus-forward drink.",
      img: stepMix,
      alt: "Turmeric powder being scooped into a glass of water",
    },
    {
      n: "02",
      kicker: "Drink before your meal",
      title: "Take it before breakfast, lunch, or dinner.",
      body: "Timing matters. Taking Flourish before eating primes your digestive system, helps regulate blood sugar, and sets you up to feel lighter after every meal.",
      img: stepDrink,
      alt: "A hand holding a glass of Flourish at a breakfast table",
    },
    {
      n: "03",
      kicker: "Feel the difference",
      title: "Less bloating. Better digestion. Every day.",
      body: "Most people notice a difference within the first week. Over 30 days, the prebiotic inulin builds a measurably healthier gut microbiome.",
      img: stepFeel,
      alt: "Lifestyle wellness moment in a sunlit room",
    },
  ];
  return (
    <section id="how" className="py-28 lg:py-40 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6">
            The Ritual
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-[1.05]">
            One ritual. Real results.
          </h2>
        </Reveal>
        <div className="mt-20 space-y-24 lg:space-y-32">
          {steps.map((s, i) => (
            <Reveal key={s.n}>
              <div
                className={`grid lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="lg:col-span-6">
                  <div className="relative">
                    <div className="absolute -inset-6 bg-gradient-to-tr from-primary/10 to-transparent rounded-[2.5rem] blur-2xl" />
                    <img
                      src={s.img}
                      alt={s.alt}
                      loading="lazy"
                      width={1024}
                      height={1024}
                      className="relative w-full aspect-[4/5] object-cover rounded-3xl shadow-xl ring-1 ring-black/5"
                    />
                  </div>
                </div>
                <div className="lg:col-span-6">
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="font-serif text-3xl text-primary tabular-nums">{s.n}</span>
                    <span className="text-xs font-semibold tracking-[0.25em] uppercase text-foreground/60">
                      {s.kicker}
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-[1.1]">
                    {s.title}
                  </h3>
                  <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
                    {s.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ingredients() {
  return (
    <section id="science" className="bg-[var(--color-cream)]">
      <div className="py-28 lg:py-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6">
              The Science
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-[1.05]">
              Simple ingredients. Real science.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Every ingredient in Flourish is chosen for a specific, evidence-based reason. Nothing unnecessary. Nothing you can't pronounce.
            </p>
          </Reveal>
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {ingredients.map((ing, i) => (
              <Reveal key={ing.name} delay={i * 60}>
                <div className="rounded-2xl bg-white border border-border/60 p-7 h-full hover:border-primary/30 transition-colors">
                  <p className="font-serif text-sm text-primary/70 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-serif text-xl font-semibold text-foreground leading-tight">
                    {ing.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {ing.benefit}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-background/80">
          <span>Every ingredient backed by published research</span>
          <span className="text-primary">●</span>
          <span>No proprietary blends</span>
          <span className="text-primary">●</span>
          <span>Full transparency on every label</span>
          <span className="text-primary">●</span>
          <span>Made in GMP-certified facilities</span>
        </div>
      </div>
    </section>
  );
}

function BrandStory() {
  return (
    <section className="py-28 lg:py-40 bg-[var(--color-cream)]">
      <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-8">
            Our Story
          </p>
          <blockquote className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-[1.1] tracking-[-0.02em]">
            "We built Flourish because feeling bloated and uncomfortable after meals shouldn't be the norm."
          </blockquote>
          <p className="mt-10 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Most gut health products are complicated, expensive, or full of ingredients you don't recognise. Flourish is different. Seven simple, science-backed ingredients. One daily ritual. Real results.
          </p>
          <a
            href="#waitlist"
            className="mt-10 inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            Read our story <span aria-hidden>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Reviews() {
  const ugcGradients = [
    "from-orange-200 to-amber-300",
    "from-amber-100 to-orange-200",
    "from-stone-200 to-amber-200",
    "from-orange-300 to-amber-200",
    "from-amber-200 to-stone-200",
    "from-orange-200 to-stone-300",
  ];
  return (
    <section className="py-28 lg:py-40 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6">
            Early Reviews
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-[1.05]">
            Over 500 people can't wait to try it.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Here's what early supporters are saying.
          </p>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 120}>
              <div className="rounded-3xl bg-[var(--color-cream)] border border-border/60 p-10 h-full flex flex-col">
                <div className="flex text-primary mb-6">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="size-5 fill-current" />
                  ))}
                </div>
                <p className="font-serif text-xl text-foreground leading-snug flex-1">
                  "{r.quote}"
                </p>
                <div className="mt-8 pt-6 border-t border-border/60">
                  <p className="font-semibold text-foreground">{r.name}</p>
                  <p className="text-sm text-muted-foreground">{r.city}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <div className="mt-20 overflow-hidden">
        <div className="flex gap-5 animate-marquee-slow whitespace-nowrap">
          {[...ugcGradients, ...ugcGradients, ...ugcGradients].map((g, i) => (
            <div
              key={i}
              className={`shrink-0 size-56 lg:size-64 rounded-3xl bg-gradient-to-br ${g} ring-1 ring-black/5`}
              aria-hidden
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-28 lg:py-40 bg-[var(--color-cream)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6">
            Pricing
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-[1.05]">
            Start your ritual.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Try it once, or save 20% every month. Cancel anytime.
          </p>
        </Reveal>
        <div className="mt-20 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Reveal>
            <div className="rounded-3xl bg-white border border-border p-10 h-full flex flex-col">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                One-off purchase
              </p>
              <h3 className="mt-3 font-serif text-2xl font-semibold">30-day supply</h3>
              <div className="mt-8 flex items-baseline gap-2">
                <span className="font-serif text-6xl font-semibold text-foreground">£34.99</span>
              </div>
              <p className="mt-2 text-muted-foreground">£1.17 per serve</p>
              <ul className="mt-8 space-y-3 text-sm text-foreground/80 flex-1">
                <li className="flex gap-3"><Check className="size-4 text-primary mt-0.5 shrink-0" /> 30 sachets · 8g per serve</li>
                <li className="flex gap-3"><Check className="size-4 text-primary mt-0.5 shrink-0" /> Free UK delivery</li>
                <li className="flex gap-3"><Check className="size-4 text-primary mt-0.5 shrink-0" /> One-time delivery, no commitment</li>
              </ul>
              <a
                href="#waitlist"
                className="mt-10 inline-flex justify-center rounded-full border border-foreground/20 px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-foreground/5 transition"
              >
                Join Waitlist
              </a>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative rounded-3xl bg-white border-2 border-primary p-10 h-full flex flex-col shadow-xl shadow-primary/10">
              <div className="absolute -top-3 left-10 rounded-full bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 tracking-wide uppercase">
                Most Popular
              </div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
                Subscribe & save
              </p>
              <h3 className="mt-3 font-serif text-2xl font-semibold">Monthly subscription</h3>
              <div className="mt-8 flex items-baseline gap-1">
                <span className="font-serif text-6xl font-semibold text-foreground">£27.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="mt-2 text-muted-foreground">£0.93 per serve · Save 20%</p>
              <ul className="mt-8 space-y-3 text-sm text-foreground/80 flex-1">
                <li className="flex gap-3"><Check className="size-4 text-primary mt-0.5 shrink-0" /> 30 sachets · 8g per serve</li>
                <li className="flex gap-3"><Check className="size-4 text-primary mt-0.5 shrink-0" /> Free UK delivery, every month</li>
                <li className="flex gap-3"><Check className="size-4 text-primary mt-0.5 shrink-0" /> Cancel or pause anytime</li>
                <li className="flex gap-3"><Check className="size-4 text-primary mt-0.5 shrink-0" /> Early access to new products</li>
              </ul>
              <a
                href="#waitlist"
                className="mt-10 inline-flex justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:brightness-95 transition"
              >
                Join Waitlist
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            No commitment. No hidden fees. Cancel or pause anytime.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="waitlist" className="py-28 lg:py-40 bg-foreground text-background">
      <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
        <Reveal>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-semibold leading-[1.05] tracking-[-0.02em]">
            Feel lighter.
            <br />
            <span className="text-primary">Starting now.</span>
          </h2>
          <p className="mt-8 text-lg text-background/75 leading-relaxed">
            Join the Flourish waitlist for early access, exclusive launch pricing, and updates from the founder.
          </p>
          <div className="mt-12 flex justify-center">
            <WaitlistForm id="cta-email" variant="dark" />
          </div>
          <div className="mt-8 flex items-center justify-center gap-3 text-sm text-background/65">
            <div className="flex text-primary">
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

function Footer() {
  return (
    <footer className="bg-[oklch(0.18_0.015_60)] text-background/85">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <p className="font-serif text-3xl font-semibold text-primary">Flourish</p>
            <p className="mt-2 text-background/60 italic">Feel lighter. Every day.</p>
          </div>
          <nav className="lg:col-span-4 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-primary transition">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="lg:col-span-4">
            <p className="text-sm font-medium text-background mb-3">
              Science with Flourish — wellness insights for your inbox.
            </p>
            <WaitlistForm id="footer-email" variant="dark" />
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-background/15 flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-xs text-background/55">
          <p>© 2025 Flourish. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#" className="hover:text-primary transition">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition">Terms</a>
            <a href="#" className="hover:text-primary transition">Contact</a>
            <a href="#" className="hover:text-primary transition">Instagram</a>
            <a href="#" className="hover:text-primary transition">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <ProductFeatures />
        <HowItWorks />
        <Ingredients />
        <BrandStory />
        <Reviews />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
