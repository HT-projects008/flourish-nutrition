import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Sparkles,
  GlassWater,
  HeartPulse,
  Leaf,
  Citrus,
  Flame,
  Cookie,
  Wheat,
  Sprout,
  Candy,
  Check,
} from "lucide-react";
import heroDrink from "../assets/hero-drink.jpg";
import { Reveal } from "../components/Reveal";
import { WaitlistForm } from "../components/WaitlistForm";

export const Route = createFileRoute("/")({
  component: Index,
});

const ingredients = [
  { icon: Sparkles, name: "Apple cider vinegar", benefit: "Supports digestion and appetite control" },
  { icon: Citrus, name: "Lemon", benefit: "Stimulates digestive enzymes" },
  { icon: Flame, name: "Turmeric + black pepper", benefit: "Anti-inflammatory, highly bioavailable" },
  { icon: Cookie, name: "Ceylon cinnamon", benefit: "Helps maintain steady blood sugar" },
  { icon: Wheat, name: "Inulin", benefit: "Feeds your good gut bacteria" },
  { icon: Sprout, name: "Ginger extract", benefit: "Reduces bloating and digestive discomfort" },
  { icon: Candy, name: "Monk fruit", benefit: "Naturally sweet, zero sugar" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled ? "bg-white/85 backdrop-blur-md border-b border-border/60" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-serif text-2xl font-semibold text-primary tracking-tight">
          Flourish
        </a>
        <a
          href="#waitlist"
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:brightness-105 transition"
        >
          Get Early Access
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[oklch(0.985_0.025_75)] via-white to-white" />
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-medium text-primary mb-6">
              <span className="size-1.5 rounded-full bg-primary" />
              Premium gut health, daily
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-foreground leading-[1.05]">
              Feel lighter.<br />Every day.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Flourish is a premium gut health drink designed to reduce bloating, support digestion, and help you feel your best — one simple ritual before every meal.
            </p>
            <div className="mt-8">
              <WaitlistForm id="hero-email" />
              <p className="mt-3 text-sm text-muted-foreground">
                Join 500+ people waiting for Flourish. Early access gets 20% off.
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={150}>
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-tr from-primary/15 via-primary/5 to-transparent rounded-[2.5rem] blur-2xl" />
            <img
              src={heroDrink}
              alt="A glass of Flourish gut health drink with lemon and fresh ginger"
              width={1024}
              height={1280}
              className="relative w-full max-w-md mx-auto rounded-3xl object-cover shadow-xl ring-1 ring-black/5"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: GlassWater, title: "Mix", copy: "Add one 8g sachet or scoop to 250ml of cold water" },
    { icon: Sparkles, title: "Drink", copy: "Take it before your meal, every day" },
    { icon: HeartPulse, title: "Feel the difference", copy: "Less bloating, better digestion, lighter every day" },
  ];
  return (
    <section id="how" className="py-24 lg:py-32 bg-[var(--color-cream)]">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground">
            One ritual. Real results.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            A simple daily practice that fits into the life you already live.
          </p>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 120}>
              <div className="relative bg-white rounded-2xl p-8 border border-border/60 h-full">
                <div className="absolute -top-4 left-8 text-xs font-semibold tracking-widest text-primary bg-white px-2">
                  STEP 0{i + 1}
                </div>
                <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                  <s.icon className="size-6" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-foreground">{s.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{s.copy}</p>
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
    <section id="ingredients" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground">
            Simple ingredients. Real science.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Seven thoughtfully chosen ingredients. Nothing you can't pronounce.
          </p>
        </Reveal>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ingredients.map((ing, i) => (
            <Reveal key={ing.name} delay={i * 60}>
              <div className="group rounded-2xl bg-white border border-border p-6 h-full hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="flex items-start gap-4">
                  <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <ing.icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-foreground">{ing.name}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{ing.benefit}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={ingredients.length * 60}>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6 h-full flex items-center gap-3">
              <Leaf className="size-5 text-primary" />
              <p className="text-sm text-foreground/80">
                No added sugar. No fillers. No nonsense.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32 bg-[var(--color-cream)]">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground">
            Simple, flexible pricing.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Try it once, or make it your daily ritual and save.
          </p>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Reveal>
            <div className="rounded-3xl bg-white border border-border p-8 h-full flex flex-col">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">One-off purchase</p>
              <h3 className="mt-2 font-serif text-2xl font-semibold">30-day supply</h3>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-serif text-5xl font-semibold text-foreground">£34.99</span>
              </div>
              <p className="mt-2 text-muted-foreground">30 sachets / 30 scoops</p>
              <ul className="mt-6 space-y-3 text-sm text-foreground/80 flex-1">
                <li className="flex gap-2"><Check className="size-4 text-primary mt-0.5 shrink-0" /> One-time delivery</li>
                <li className="flex gap-2"><Check className="size-4 text-primary mt-0.5 shrink-0" /> Try Flourish risk-free</li>
                <li className="flex gap-2"><Check className="size-4 text-primary mt-0.5 shrink-0" /> No commitment</li>
              </ul>
              <a href="#waitlist" className="mt-8 inline-flex justify-center rounded-full border border-foreground/15 px-6 py-3 text-sm font-semibold text-foreground hover:bg-foreground/5 transition">
                Join Waitlist
              </a>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative rounded-3xl bg-white border-2 border-primary p-8 h-full flex flex-col shadow-lg shadow-primary/10">
              <div className="absolute -top-3 left-8 rounded-full bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 tracking-wide">
                MOST POPULAR
              </div>
              <p className="text-sm font-medium text-primary uppercase tracking-wider">Subscribe & save</p>
              <h3 className="mt-2 font-serif text-2xl font-semibold">30-day subscription</h3>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-serif text-5xl font-semibold text-foreground">£27.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="mt-2 text-muted-foreground">Save 20% vs one-off</p>
              <ul className="mt-6 space-y-3 text-sm text-foreground/80 flex-1">
                <li className="flex gap-2"><Check className="size-4 text-primary mt-0.5 shrink-0" /> Free monthly delivery</li>
                <li className="flex gap-2"><Check className="size-4 text-primary mt-0.5 shrink-0" /> Always in stock</li>
                <li className="flex gap-2"><Check className="size-4 text-primary mt-0.5 shrink-0" /> Cancel anytime</li>
              </ul>
              <a href="#waitlist" className="mt-8 inline-flex justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:brightness-105 transition">
                Join Waitlist
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Waitlist() {
  return (
    <section id="waitlist" className="py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground">
            Be the first to try Flourish.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            We're putting the finishing touches on our formula. Join the waitlist for early access, exclusive launch pricing, and updates from the founder.
          </p>
          <div className="mt-10 flex justify-center">
            <WaitlistForm id="waitlist-email" />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">No spam. Just Flourish updates.</p>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-[var(--color-cream)]">
      <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row gap-6 md:items-end md:justify-between">
        <div>
          <p className="font-serif text-2xl font-semibold text-primary">Flourish</p>
          <p className="mt-1 text-muted-foreground italic">Feel lighter. Every day.</p>
        </div>
        <div className="flex flex-col md:items-end gap-3">
          <div className="flex gap-6 text-sm text-foreground/70">
            <a href="#" className="hover:text-primary transition">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition">Contact</a>
          </div>
          <p className="text-xs text-muted-foreground">© 2025 Flourish. All rights reserved.</p>
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
        <HowItWorks />
        <Ingredients />
        <Pricing />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}
