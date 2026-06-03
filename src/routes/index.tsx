import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { Star } from "lucide-react";
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
  "Premium organic ingredients",
  "Made in the UK",
  "8 organic ingredients",
  "Before every meal",
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
  return (
    <section className="py-24 bg-white">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <Reveal>
          <p className="text-sm font-medium text-primary mb-6">● PRICING</p>
          <h2 className="font-serif text-4xl font-bold text-zinc-900 leading-[1.1] mb-10">
            Simple pricing.<br />Early access discount.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-6">
            <div>
              <p className="text-5xl font-bold text-zinc-900">£34.99</p>
              <p className="mt-2 text-sm text-zinc-600">one-off purchase</p>
            </div>
            <div className="w-px h-14 bg-zinc-300 hidden sm:block" aria-hidden="true" />
            <div>
              <p className="text-5xl font-bold text-orange-500">
                £27.99<span className="text-2xl font-semibold">/mo</span>
              </p>
              <p className="mt-2 text-sm text-zinc-600">monthly subscription</p>
            </div>
          </div>
          <p className="text-zinc-500 text-sm mb-8">
            Save 20% with a subscription. Cancel anytime. Free UK delivery.
          </p>
          <a
            href="#waitlist"
            className="inline-flex rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-sm transition-[filter,transform] duration-150 hover:brightness-95 active:scale-[0.97]"
          >
            Join waitlist for early access pricing
          </a>
        </Reveal>
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

      // ── 6. Benefit numbers: count up from 00 to their value ─────────────────
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
        <Flavours />
        <PricingTeaser />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
