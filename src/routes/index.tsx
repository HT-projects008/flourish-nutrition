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
    <section id="flavours" className="py-28 lg:py-40 bg-white">
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
    <section className="py-24 bg-[var(--color-cream)]">
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
    },
    { scope: mainRef },
  );

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main id="main-content" ref={mainRef}>
        <Hero />
        <Flavours />
        <PricingTeaser />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
