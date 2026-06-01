import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Star, Menu, X } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { WaitlistForm } from "../components/WaitlistForm";
import { MicrobiomeCanvas } from "../components/MicrobiomeCanvas";

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
          "Premium gut health and debloat drink. Precisely chosen ingredients. Real science. Join the waitlist for early access.",
      },
    ],
  }),
  component: Index,
});

const ingredients = [
  {
    name: "Apple cider vinegar",
    benefit: "Supports digestion and appetite control before meals",
    synergy: "Primes your digestive system before the other actives go to work",
  },
  {
    name: "Lemon juice",
    benefit: "Stimulates digestive enzymes and brightens the formula naturally",
    synergy: "Stimulates digestive enzymes that help every other ingredient absorb more effectively",
  },
  {
    name: "Turmeric",
    benefit: "Powerful anti-inflammatory, paired with black pepper for bioavailability",
    synergy: "Paired specifically with black pepper — inactive without it",
  },
  {
    name: "Black pepper",
    benefit: "Increases curcumin absorption from turmeric by up to 2,000%",
    synergy: "Unlocks turmeric's bioavailability — this pairing is the reason both are in the formula",
  },
  {
    name: "Ceylon cinnamon",
    benefit: "Helps maintain steady blood sugar levels after eating",
    synergy: "Specifically Ceylon — not Cassia — for daily use at therapeutic doses",
  },
  {
    name: "Inulin",
    benefit: "Prebiotic fibre that feeds your beneficial gut bacteria daily",
    synergy: "The prebiotic foundation that makes the whole formula work over time",
  },
  {
    name: "Ginger extract",
    benefit: "Clinically shown to reduce bloating and digestive discomfort",
    synergy: "Standardised to 5% gingerols — the minimum dose shown to reduce bloating in clinical studies",
  },
  {
    name: "Monk fruit",
    benefit: "Naturally sweet with zero sugar and zero artificial additives",
    synergy: "Zero sugar, zero compromise — chosen so nothing in this formula works against you",
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
              key={l.label}
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
              key={l.label}
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
      className="relative min-h-screen pt-32 lg:pt-44 pb-20 lg:pb-32 overflow-hidden bg-[var(--color-cream)]"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[oklch(0.985_0.025_75)] via-[var(--color-cream)] to-white" />
      <MicrobiomeCanvas />
      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-10 text-center flex flex-col items-center justify-center min-h-[calc(100vh-9rem)]">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-white border border-primary/20 px-3 py-1.5 text-xs font-medium text-primary mb-8">
            <span className="size-1.5 rounded-full bg-primary" />
            Premium gut health, daily
          </span>
          <h1 className="font-serif text-[clamp(3.5rem,10vw,9rem)] font-bold text-foreground leading-[1.1] tracking-[-0.03em]">
            Feel lighter.
            <br />
            <span className="text-primary">Every day.</span>
          </h1>
          <p className="mt-8 text-lg lg:text-xl text-muted-foreground leading-relaxed">
            The daily gut health ritual that reduces bloating, supports digestion, helping you feel and look your best.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
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
          <div className="mt-8 flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <div className="flex text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <span>500+ people already waiting · Early access gets 20% off</span>
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
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05]">
            Whole body health starts in the gut.
          </h2>
          <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
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
        <Reveal delay={360}>
          <div className="mt-6 rounded-3xl bg-white border border-primary/20 p-10">
            <p className="font-serif text-lg text-muted-foreground leading-relaxed italic">
              The Flourish Formula works as a system. Remove one ingredient and the others are less effective. That's not marketing — that's the science behind why each one is here.
            </p>
          </div>
        </Reveal>
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
            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05]">
              The Flourish Formula
            </h2>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
              Seven clinically-studied actives. One precise daily blend. Every ingredient chosen for a specific role — and for how it works with every other.
            </p>
          </Reveal>
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {ingredients.map((ing, i) => (
              <Reveal key={ing.name} delay={i * 120}>
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
                  <p className="mt-3 pt-3 border-t border-border/40 text-xs text-muted-foreground/70 leading-relaxed italic">
                    {ing.synergy}
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

function SachetShowcase() {
  return (
    <section id="sachet" className="py-28 lg:py-40 bg-[#1a1a1a]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <Reveal>
          <div className="min-h-[500px] rounded-2xl border border-orange-500/30 bg-orange-500/5 flex items-center justify-center">
            <span className="text-orange-500/50 text-sm font-medium tracking-widest uppercase">SACHET GIF</span>
          </div>
        </Reveal>
        <div className="flex flex-col gap-8">
          <Reveal>
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest">● FLOURISH SACHET FORMAT</p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-[1.1]">
              Every serve.<br />Perfectly measured.
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="text-zinc-400 text-lg leading-relaxed">
              The Flourish Formula is a precision blend — not a collection of ingredients you could recreate at home. The sourcing, the ratios, the order they work in your body — that's what took time to get right.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="flex gap-12">
              <div>
                <p className="text-5xl font-bold text-orange-500">8g</p>
                <p className="mt-1 text-sm text-zinc-400">Precise dose, every time</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-orange-500">1</p>
                <p className="mt-1 text-sm text-zinc-400">Daily ritual, before every meal</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={480}>
            <p className="text-zinc-500 text-sm italic">Available in single-serve sachets and 30-serve tubs</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function GutStory() {
  const columns = [
    {
      title: "In your gut",
      body: "Inulin prebiotics feed your beneficial bacteria. ACV and ginger calm inflammation and support healthy digestion after every meal.",
    },
    {
      title: "In your bloodstream",
      body: "Ceylon cinnamon and ACV work together to steady blood sugar levels, reducing energy crashes and cravings throughout the day.",
    },
    {
      title: "In your whole body",
      body: "Turmeric and black pepper deliver bioavailable anti-inflammatory support — so you don't just feel lighter, you feel better everywhere.",
    },
  ];
  return (
    <section id="gut" className="py-28 lg:py-40 bg-[var(--color-cream)]">
      <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
        <Reveal>
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-6">● YOUR GUT. YOUR HEALTH.</p>
          <h2 className="font-serif text-4xl lg:text-6xl font-bold text-foreground leading-[1.1]">
            Your body is waiting to Flourish.
          </h2>
          <p className="mt-6 text-xl text-zinc-500 leading-relaxed max-w-2xl mx-auto">
            Inside every serve of Flourish, seven ingredients work together to transform how your gut feels — and how your whole body thrives.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-16 min-h-[500px] max-w-2xl mx-auto rounded-3xl border border-orange-200 bg-orange-50 flex items-center justify-center">
            <span className="text-orange-300 text-sm font-medium tracking-widest uppercase">GUT ILLUSTRATION GIF</span>
          </div>
        </Reveal>
        <div className="mt-20 grid lg:grid-cols-3 gap-10 text-left">
          {columns.map((col, i) => (
            <Reveal key={col.title} delay={i * 120}>
              <div className="w-10 h-10 rounded-full bg-orange-100 mb-4" />
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{col.title}</h3>
              <p className="text-zinc-500 leading-relaxed">{col.body}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={360}>
          <p className="mt-16 font-serif text-2xl italic text-foreground">This is what it means to Flourish.</p>
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
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-8 text-lg text-background/75 leading-relaxed">
            Join the Flourish waitlist for early access, exclusive launch pricing, and updates from the founder.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-12 flex justify-center">
            <WaitlistForm id="cta-email" variant="dark" />
          </div>
        </Reveal>
        <Reveal delay={360}>
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
        <Reveal>
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4">
              <p className="font-serif text-3xl font-semibold text-primary">Flourish</p>
              <p className="mt-2 text-background/60 italic">Feel lighter. Every day.</p>
            </div>
            <nav className="lg:col-span-4 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {navLinks.map((l) => (
                <a key={l.label} href={l.href} className="hover:text-primary transition">
                  {l.label}
                </a>
              ))}
              <a href="/contact" className="hover:text-primary transition">Contact</a>
            </nav>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-16 pt-8 border-t border-background/15 flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-xs text-background/55">
            <p>© 2025 Flourish. All rights reserved.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a href="#" className="hover:text-primary transition">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition">Terms</a>
              <a href="/contact" className="hover:text-primary transition">Contact</a>
              <a href="#" className="hover:text-primary transition">Instagram</a>
              <a href="#" className="hover:text-primary transition">TikTok</a>
            </div>
          </div>
        </Reveal>
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
        <SachetShowcase />
        <GutStory />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
