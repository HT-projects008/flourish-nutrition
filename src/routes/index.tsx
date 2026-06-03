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
  const problemCards = [
    {
      heading: "Ultra-processed food",
      body: "Modern diets strip away the fibre and diversity your gut bacteria need to thrive.",
    },
    {
      heading: "Chronic stress",
      body: "Cortisol disrupts the gut-brain axis, slowing digestion and triggering inflammation throughout the body.",
    },
    {
      heading: "Missing daily ritual",
      body: "Your gut needs consistent daily support, not occasional supplements taken when you remember.",
    },
  ];

  const timelineEntries = [
    {
      time: "FIRST DRINK",
      heading: "Feel it working immediately.",
      body: "ACV and ginger begin supporting your digestive system within 30 minutes of your meal. Most people notice reduced post-meal heaviness from the very first serve.",
    },
    {
      time: "DAY 3",
      heading: "Bloating starts to ease.",
      body: "The combination of ginger, ACV, and lemon begins reducing digestive inflammation. Post-meal bloating becomes noticeably less frequent for most people.",
    },
    {
      time: "WEEK 1",
      heading: "Energy starts to stabilise.",
      body: "Ceylon cinnamon and ACV work together to steady blood sugar after meals, reducing the energy crashes that follow eating. You start feeling more consistent throughout the day.",
    },
    {
      time: "WEEK 2",
      heading: "Your gut microbiome responds.",
      body: "Prebiotic inulin begins feeding your beneficial gut bacteria. Digestion becomes more regular. The foundation of long-term gut health starts here.",
    },
    {
      time: "MONTH 1",
      heading: "Measurable change.",
      body: "A full month of daily Flourish ritual. Most people report consistently less bloating, clearer skin, more stable energy, and a noticeably lighter feeling after every meal.",
    },
    {
      time: "MONTH 3",
      heading: "Your gut, transformed.",
      body: "The cumulative effect of 90 days of prebiotic support and daily gut health ritual. This is what it means to truly Flourish.",
    },
  ];

  return (
    <section id="benefits" className="py-24 lg:py-40 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* ── PART 1: The Problem ───────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="text-sm font-medium text-primary mb-6">● WHY GUT HEALTH MATTERS</p>
            <h2 className="font-serif text-4xl lg:text-6xl font-bold text-zinc-900 leading-tight">
              Most people don't realise their gut is affecting everything.
            </h2>
          </Reveal>

          {/* Stat blocks */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6">
            <Reveal>
              <div>
                <p
                  data-stat-count="70"
                  data-stat-suffix="%"
                  className="text-5xl font-bold text-primary"
                >
                  70%
                </p>
                <p className="mt-3 text-sm text-zinc-500 leading-relaxed">
                  of people experience uncomfortable bloating regularly
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div>
                <p
                  data-stat-count="30"
                  data-stat-suffix="%"
                  className="text-5xl font-bold text-primary"
                >
                  30%
                </p>
                <p className="mt-3 text-sm text-zinc-500 leading-relaxed">
                  of adults report low energy directly linked to poor digestion
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div>
                <p className="text-5xl font-bold text-primary">1 in 3</p>
                <p className="mt-3 text-sm text-zinc-500 leading-relaxed">
                  people have an imbalanced gut microbiome without knowing it
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Problem cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {problemCards.map((card) => (
            <div
              key={card.heading}
              data-problem-card
              className="bg-zinc-50 rounded-2xl p-6"
            >
              <div className="w-8 h-8 rounded-full bg-orange-100 mb-4" aria-hidden="true" />
              <h3 className="font-bold text-zinc-900 mb-2">{card.heading}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>

        {/* ── PART 2: The Timeline ──────────────────────────────────────────── */}
        <div className="mt-24">
          <Reveal className="text-center">
            <p className="text-sm font-medium text-primary mb-6">● YOUR FLOURISH JOURNEY</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight">
              Feel the difference.<br />From day one.
            </h2>
            <p className="mt-4 text-zinc-500 max-w-xl mx-auto leading-relaxed">
              Flourish is designed to work immediately and build over time. Here's what to expect.
            </p>
          </Reveal>

          {/* Timeline */}
          <div className="mt-16 relative" data-timeline-container>

            {/* Desktop center line — drawn by GSAP scrub */}
            <div
              className="hidden lg:block absolute left-1/2 -translate-x-px top-6 bottom-6 w-0.5 overflow-hidden"
              aria-hidden="true"
            >
              <div
                data-timeline-line
                className="w-full h-full bg-orange-200"
                style={{ transformOrigin: "top center", transform: "scaleY(0)" }}
              />
            </div>

            {/* Mobile left border */}
            <div
              className="lg:hidden absolute left-[7px] top-4 bottom-4 w-0.5 bg-orange-100"
              aria-hidden="true"
            />

            {timelineEntries.map((entry, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={entry.time}
                  data-timeline-entry={isLeft ? "left" : "right"}
                  className="relative"
                >
                  {/* Mobile layout */}
                  <div className="lg:hidden flex gap-5 pb-10">
                    <div className="shrink-0 mt-1">
                      <div className="w-3.5 h-3.5 rounded-full bg-orange-500 ring-4 ring-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
                        {entry.time}
                      </p>
                      <h3 className="font-serif text-lg font-bold text-zinc-900 mb-2">
                        {entry.heading}
                      </h3>
                      <p className="text-zinc-500 text-sm leading-relaxed">{entry.body}</p>
                    </div>
                  </div>

                  {/* Desktop layout */}
                  <div className="hidden lg:grid grid-cols-2 py-10">
                    {/* Left column */}
                    <div className="pr-16 text-right">
                      {isLeft && (
                        <>
                          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">
                            {entry.time}
                          </p>
                          <h3 className="font-serif text-xl font-bold text-zinc-900 mb-2">
                            {entry.heading}
                          </h3>
                          <p className="text-zinc-500 text-sm leading-relaxed">{entry.body}</p>
                        </>
                      )}
                    </div>
                    {/* Right column */}
                    <div className="pl-16">
                      {!isLeft && (
                        <>
                          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">
                            {entry.time}
                          </p>
                          <h3 className="font-serif text-xl font-bold text-zinc-900 mb-2">
                            {entry.heading}
                          </h3>
                          <p className="text-zinc-500 text-sm leading-relaxed">{entry.body}</p>
                        </>
                      )}
                    </div>
                    {/* Center dot — positioned relative to the outer entry wrapper */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
                      <div className="w-3.5 h-3.5 rounded-full bg-orange-500 ring-4 ring-orange-50" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
      comingSoon: false,
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
      comingSoon: false,
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
      comingSoon: true,
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
              {/* Watermark: "?" for coming soon card, number for others */}
              {f.comingSoon ? (
                <span
                  className="absolute -bottom-6 -right-4 font-serif text-[12rem] font-bold leading-none select-none pointer-events-none text-white opacity-20"
                  aria-hidden="true"
                >
                  ?
                </span>
              ) : (
                <span
                  className="absolute -bottom-6 -right-4 font-serif text-[12rem] font-bold leading-none select-none pointer-events-none text-primary opacity-20"
                  aria-hidden="true"
                >
                  {f.id}
                </span>
              )}

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

      // ── 4. Stat numbers: count up from 0 when entering viewport ─────────────
      (q("[data-stat-count]") as HTMLElement[]).forEach((el) => {
        const target = parseInt(el.dataset.statCount ?? "0");
        const suffix = el.dataset.statSuffix ?? "";
        const obj = { val: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: target,
              duration: 1.2,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = `${Math.round(obj.val)}${suffix}`;
              },
            });
          },
        });
      });

      // ── 5. Problem cards: stagger in from below ──────────────────────────────
      gsap.set(q("[data-problem-card]"), { y: 40, opacity: 0 });
      ScrollTrigger.batch(q("[data-problem-card]"), {
        onEnter: (els) => {
          gsap.to(els, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.12,
            ease: EASE,
            overwrite: true,
          });
        },
        start: "top 85%",
        once: true,
      });

      // ── 6. Timeline entries: slide in from their respective sides ────────────
      (q("[data-timeline-entry]") as HTMLElement[]).forEach((el) => {
        const dir = el.dataset.timelineEntry;
        gsap.fromTo(
          el,
          { x: dir === "right" ? 30 : -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: EASE,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          },
        );
      });

      // ── 7. Timeline line: draw downward tied to scroll position ──────────────
      const timelineContainer = (q("[data-timeline-container]") as HTMLElement[])[0];
      const timelineLine = (q("[data-timeline-line]") as HTMLElement[])[0];
      if (timelineContainer && timelineLine) {
        gsap.fromTo(
          timelineLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineContainer,
              start: "top center",
              end: "bottom center",
              scrub: 1,
            },
          },
        );
      }
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
