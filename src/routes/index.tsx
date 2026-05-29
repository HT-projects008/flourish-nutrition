import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Star, Menu, X } from "lucide-react";
import heroDrink from "../assets/hero-flourish.jpg";
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
  { label: "Shop", href: "#" },
  { label: "Science", href: "#science" },
  { label: "About", href: "#" },
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
        <Ingredients />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
