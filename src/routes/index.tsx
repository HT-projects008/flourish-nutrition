import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Sparkles,
  Leaf,
  Citrus,
  Flame,
  Cookie,
  Wheat,
  Sprout,
  Candy,
  Check,
  Star,
  Wind,
  Flame as FlameIcon,
  Heart,
  ShieldCheck,
  FlaskConical,
  MapPin,
} from "lucide-react";
import heroDrink from "../assets/hero-drink.jpg";
import { Reveal } from "../components/Reveal";
import { WaitlistForm } from "../components/WaitlistForm";

export const Route = createFileRoute("/")({
  component: Index,
});

const ingredients = [
  { icon: Sparkles, name: "Apple cider vinegar", benefit: "Supports digestion and appetite control" },
  { icon: Citrus, name: "Lemon", benefit: "Stimulates digestive enzymes naturally" },
  { icon: Flame, name: "Turmeric + black pepper", benefit: "Anti-inflammatory, highly bioavailable curcumin" },
  { icon: Cookie, name: "Ceylon cinnamon", benefit: "Helps maintain steady blood sugar after meals" },
  { icon: Wheat, name: "Inulin", benefit: "Prebiotic fibre that feeds your good gut bacteria" },
  { icon: Sprout, name: "Ginger extract", benefit: "Clinically shown to reduce bloating and discomfort" },
  { icon: Candy, name: "Monk fruit", benefit: "Naturally sweet, zero sugar, zero compromise" },
];

const reviews = [
  {
    quote: "I've tried so many gut health products and nothing has worked like this. I feel less bloated after every meal.",
    name: "Sarah M.",
    city: "London",
  },
  {
    quote: "The lemon and ginger flavour is actually really nice. I look forward to taking it before lunch every day.",
    name: "James T.",
    city: "Manchester",
  },
  {
    quote: "Finally a supplement with ingredients I actually recognise. No weird chemicals, just things that work.",
    name: "Emma R.",
    city: "Bristol",
  },
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
        scrolled ? "bg-white/85 backdrop-blur-md border-b border-border/60" : "bg-white/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-serif text-2xl font-semibold text-primary tracking-tight">
          Flourish
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
              <a
                href="#waitlist"
                className="inline-flex rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm hover:brightness-95 transition"
              >
                Get Early Access
              </a>
              <p className="mt-3 text-sm text-muted-foreground">
                Join 500+ people waiting for Flourish — early access gets 20% off your first order.
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

function SocialProof() {
  return (
    <section className="bg-[var(--color-cream)] border-y border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-5">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-foreground/75">
          <div className="flex items-center gap-2">
            <div className="flex text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <span className="font-medium">500+ people on the waitlist</span>
          </div>
          <span className="hidden sm:inline text-border">|</span>
          <div className="flex items-center gap-2"><FlaskConical className="size-4 text-primary" /> Scientifically formulated</div>
          <span className="hidden sm:inline text-border">|</span>
          <div className="flex items-center gap-2"><MapPin className="size-4 text-primary" /> Made in the UK</div>
          <span className="hidden sm:inline text-border">|</span>
          <div className="flex items-center gap-2"><Leaf className="size-4 text-primary" /> Natural ingredients only</div>
        </div>
      </div>
    </section>
  );
}



function Ingredients() {
  return (
    <section id="ingredients" className="py-24 lg:py-32 bg-[var(--color-cream)]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <Reveal className="lg:col-span-4 lg:sticky lg:top-28">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-5">
              The Formula
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground leading-[1.1]">
              Simple ingredients.<br />Real science.
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Seven plant-based actives, chosen for what they do — not how they sound on a label.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white border border-primary/20 px-4 py-2 text-sm text-foreground/80">
              <Leaf className="size-4 text-primary" />
              No sugar. No fillers. No nonsense.
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-8">
            <ol className="divide-y divide-border/70 border-y border-border/70">
              {ingredients.map((ing, i) => (
                <li
                  key={ing.name}
                  className="group grid grid-cols-[auto_auto_1fr] items-center gap-5 sm:gap-7 py-6 sm:py-7 transition-colors hover:bg-white/60 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-xl"
                >
                  <span className="font-serif text-2xl sm:text-3xl text-primary/70 tabular-nums w-10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="size-12 sm:size-14 rounded-full bg-primary/10 text-primary flex items-center justify-center ring-1 ring-primary/15 group-hover:bg-primary/15 transition">
                    <ing.icon className="size-5 sm:size-6" />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground leading-tight">
                      {ing.name}
                    </h3>
                    <p className="mt-1 text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {ing.benefit}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}


function Benefits() {
  const benefits = [
    { icon: Wind, title: "Beat the bloat", copy: "Feel noticeably lighter after meals. No more uncomfortable fullness or digestive discomfort." },
    { icon: FlameIcon, title: "Support fat loss", copy: "ACV and ginger support your metabolism and help manage cravings before you eat." },
    { icon: Heart, title: "Gut health, every day", copy: "Inulin feeds the beneficial bacteria your gut needs to function at its best." },
  ];
  return (
    <section className="py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold">
            How Flourish makes you feel
          </h2>
          <p className="mt-4 text-primary-foreground/80 text-lg">
            Small daily ritual. Big difference in how you feel.
          </p>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 120}>
              <div className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm p-8 h-full">
                <div className="size-12 rounded-xl bg-white/15 flex items-center justify-center mb-5">
                  <b.icon className="size-6" />
                </div>
                <h3 className="font-serif text-2xl font-semibold">{b.title}</h3>
                <p className="mt-3 text-primary-foreground/85 leading-relaxed">{b.copy}</p>
              </div>
            </Reveal>
          ))}
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
            Try it once, or save 20% with a monthly subscription. Cancel anytime.
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
              <p className="mt-2 text-muted-foreground">30 sachets · 8g per serve · free UK delivery</p>
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
              <h3 className="mt-2 font-serif text-2xl font-semibold">Monthly subscription</h3>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-serif text-5xl font-semibold text-foreground">£27.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="mt-2 text-muted-foreground">Save 20% · cancel anytime · free UK delivery</p>
              <ul className="mt-6 space-y-3 text-sm text-foreground/80 flex-1">
                <li className="flex gap-2"><Check className="size-4 text-primary mt-0.5 shrink-0" /> 20% off every month</li>
                <li className="flex gap-2"><Check className="size-4 text-primary mt-0.5 shrink-0" /> Free monthly delivery</li>
                <li className="flex gap-2"><Check className="size-4 text-primary mt-0.5 shrink-0" /> Exclusive subscriber content</li>
                <li className="flex gap-2"><Check className="size-4 text-primary mt-0.5 shrink-0" /> Cancel anytime</li>
              </ul>
              <a href="#waitlist" className="mt-8 inline-flex justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:brightness-95 transition">
                Join Waitlist
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <div className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="size-4 text-primary" />
            Free UK delivery on every order
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Waitlist() {
  return (
    <section id="waitlist" className="py-24 lg:py-32 bg-[var(--color-cream)]">
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
          <p className="mt-4 text-sm text-muted-foreground">No spam. Just Flourish updates. Unsubscribe anytime.</p>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row gap-6 md:items-end md:justify-between">
        <div>
          <p className="font-serif text-2xl font-semibold text-primary">Flourish</p>
          <p className="mt-1 text-muted-foreground italic">Feel lighter. Every day.</p>
        </div>
        <div className="flex flex-col md:items-end gap-3">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/70">
            <a href="#" className="hover:text-primary transition">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition">Contact</a>
            <a href="#" className="hover:text-primary transition">Instagram</a>
            <a href="#" className="hover:text-primary transition">TikTok</a>
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
        <SocialProof />
        <Ingredients />
        <Benefits />
        <Pricing />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}

