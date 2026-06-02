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

// Shared benefit tags — identical across all three flavours since the formula is the same
const FLAVOUR_TAGS = ["Gut health", "Debloat", "Fat loss", "Anti-inflammatory", "Blood sugar"];

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

// Same mask pattern for GutStory headline — inner span translates up via GSAP on scroll
function GutWord({ children, spaceAfter }: { children: string; spaceAfter?: boolean }) {
  return (
    <span
      className="inline-block overflow-hidden pb-[0.1em] mb-[-0.1em]"
      style={{ marginRight: spaceAfter ? "0.25em" : undefined }}
    >
      <span className="gut-word inline-block">{children}</span>
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

function ProductFeatures() {
  const features = [
    {
      title: "Beat the bloat",
      copy: "ACV and ginger work together to support digestion and reduce uncomfortable fullness after every meal.",
      ingredients: ["Apple cider vinegar", "Ginger extract"],
    },
    {
      title: "Support fat loss",
      copy: "Ceylon cinnamon and ACV help regulate blood sugar, curb cravings, and support your metabolism before you eat.",
      ingredients: ["Ceylon cinnamon", "ACV"],
    },
    {
      title: "Gut health, daily",
      copy: "Inulin prebiotic fibre feeds the beneficial bacteria your gut needs — every day, not just when you remember.",
      ingredients: ["Inulin prebiotic", "Turmeric", "Black pepper"],
    },
  ];
  return (
    <section id="formula" className="py-28 lg:py-40 bg-[var(--color-cream)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6">
            The Formula
          </p>
          <h2 className="section-heading font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05]">
            Whole body health starts in the gut.
          </h2>
          <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
            Eight clinically-studied ingredients. One precise ratio. Taken before every meal.
          </p>
        </Reveal>
        <div className="mt-20 grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 120}>
              <div className="rounded-3xl bg-white border border-border/80 p-10 h-full hover:border-primary/30 transition-colors duration-200 flex flex-col">
                <h3 className="font-serif text-2xl font-semibold text-foreground">{f.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed flex-1">{f.copy}</p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {f.ingredients.map((ing) => (
                    <span key={ing} className="text-[11px] text-primary/70 bg-primary/8 rounded-full px-2.5 py-1">
                      {ing}
                    </span>
                  ))}
                </div>
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

function Flavours() {
  const flavours = [
    {
      id: "01",
      name: "Apple Cinnamon",
      bg: "#D4744A",
      dark: false,
      description: "Warm apple cider vinegar with Ceylon cinnamon and ginger. The original Flourish ritual.",
    },
    {
      id: "02",
      name: "Lemon Ginger",
      bg: "#E8B84B",
      dark: true,
      description: "Bright lemon with warming ginger and turmeric. Citrus-forward and refreshing before every meal.",
    },
    {
      id: "03",
      name: "Lemon Raspberry",
      bg: "#C4445A",
      dark: false,
      description: "Lemon and raspberry with prebiotic inulin. The lightest, most refreshing way to Flourish.",
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
            The same powerful formula. Three delicious flavours. Every ingredient chosen for a specific role — crafted to be taken before every meal.
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
              {/* Watermark number — decorative background element */}
              <span
                className="absolute -bottom-6 -right-4 font-serif text-[12rem] font-bold leading-none select-none pointer-events-none text-primary opacity-20"
                aria-hidden="true"
              >
                {f.id}
              </span>

              <p className={`text-xs font-semibold uppercase tracking-widest mb-4 ${f.dark ? "text-[#1a1a1a]/60" : "text-white/70"}`}>
                Flavour {f.id}
              </p>
              <h3 className={`font-serif text-3xl font-bold mb-4 ${f.dark ? "text-[#1a1a1a]" : "text-white"}`}>
                {f.name}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {FLAVOUR_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${f.dark ? "bg-[#1a1a1a]/15 text-[#1a1a1a]" : "bg-white/20 text-white"}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className={`text-sm leading-relaxed mt-auto ${f.dark ? "text-[#1a1a1a]/75" : "text-white/80"}`}>
                {f.description}
              </p>
              <a
                href="#waitlist"
                className={`mt-4 text-sm font-medium underline underline-offset-2 transition-opacity ${f.dark ? "text-[#1a1a1a]/60 hover:text-[#1a1a1a]/90" : "text-white/70 hover:text-white"}`}
              >
                Notify me →
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

function SachetShowcase() {
  return (
    <section id="sachet" className="py-28 lg:py-40 bg-[#1a1a1a]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <Reveal>
          <div className="min-h-[500px] rounded-2xl overflow-hidden">
            <img
              src="/assets/sachet-rip.gif"
              alt="Flourish sachet opening"
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>
        </Reveal>
        <div className="flex flex-col gap-8">
          <Reveal>
            <h2 className="section-heading font-serif text-4xl lg:text-5xl font-bold text-white leading-[1.1]">
              Every serve.<br />Perfectly measured.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-zinc-400 text-lg leading-relaxed">
              The Flourish Formula is a precision blend — not a collection of ingredients you could recreate at home. The sourcing, the ratios, the order they work in your body — that's what took time to get right.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="flex gap-12">
              <div>
                <p data-count="8" data-count-suffix="g" className="text-5xl font-bold text-orange-500">8g</p>
                <p className="mt-1 text-sm text-zinc-400">Precise dose, every time</p>
              </div>
              <div>
                <p data-count="1" className="text-5xl font-bold text-orange-500">1</p>
                <p className="mt-1 text-sm text-zinc-400">Daily ritual, before every meal</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={360}>
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
      num: "1",
      title: "In your gut",
      body: "Inulin prebiotics feed your beneficial bacteria. ACV and ginger calm inflammation and support healthy digestion after every meal.",
    },
    {
      num: "2",
      title: "In your bloodstream",
      body: "Ceylon cinnamon and ACV work together to steady blood sugar levels, reducing energy crashes and cravings throughout the day.",
    },
    {
      num: "3",
      title: "In your whole body",
      body: "Turmeric and black pepper deliver bioavailable anti-inflammatory support. Feel lighter, and better, everywhere.",
    },
  ];

  return (
    <section id="gut" className="py-32 lg:py-48 bg-[#0f0f0f] text-white">
      <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">

        {/* Pill label */}
        <Reveal>
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 rounded-full px-4 py-1.5 text-xs uppercase tracking-widest">
              <span className="size-1.5 rounded-full bg-orange-400" aria-hidden="true" />
              Your gut. Your health.
            </span>
          </div>
        </Reveal>

        {/* Headline — GSAP gut-word reveal on scroll */}
        <h2 className="font-serif text-5xl lg:text-7xl font-bold leading-[0.95] text-white">
          <GutWord spaceAfter>Your</GutWord>
          <GutWord spaceAfter>body</GutWord>
          <GutWord>is</GutWord>
          <br />
          <GutWord spaceAfter>waiting</GutWord>
          <GutWord>to</GutWord>
          <br />
          <GutWord>Flourish.</GutWord>
        </h2>

        <Reveal delay={200}>
          <p className="mt-6 text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Inside every serve, eight ingredients work together to transform how your gut feels and how your whole body thrives.
          </p>
        </Reveal>

        {/* GIF placeholder with ambient orange glow */}
        <Reveal delay={300}>
          <div className="relative max-w-sm mx-auto my-16">
            <div
              data-gut-glow
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-orange-500/15 blur-3xl -z-10"
              aria-hidden="true"
            />
            <div className="rounded-3xl bg-zinc-900/60 border border-white/5 aspect-video flex items-center justify-center">
              <span className="text-zinc-700 text-xs tracking-[0.2em] uppercase font-medium">Gut illustration</span>
            </div>
          </div>
        </Reveal>

        {/* Three benefit columns — GSAP fade-up stagger + number count-up */}
        <div className="mt-4 grid lg:grid-cols-3 gap-8 text-left">
          {columns.map((col) => (
            <div key={col.num} data-gut-col>
              <div className="w-8 h-px bg-orange-500 mb-6 hidden lg:block" aria-hidden="true" />
              <p
                data-gut-num={col.num}
                className="font-serif text-6xl font-bold text-orange-500 leading-none"
              >
                0{col.num}
              </p>
              <h3 className="font-bold text-white text-xl mt-4">{col.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mt-3">{col.body}</p>
            </div>
          ))}
        </div>

        {/* Closing line + CTA */}
        <Reveal delay={400}>
          <div className="mt-20">
            <p className="font-serif text-2xl italic text-white/60">
              This is what it means to Flourish.
            </p>
            <a
              href="#waitlist"
              className="mt-8 inline-flex rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-sm transition-[filter,transform] duration-150 hover:brightness-95 active:scale-[0.97]"
            >
              Join the Waitlist
            </a>
          </div>
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

      // ── 3. Sachet stats: count up from 0 when they enter the viewport ───────
      (q("[data-count]") as HTMLElement[]).forEach((el) => {
        const target = parseInt(el.dataset.count ?? "0");
        const suffix = el.dataset.countSuffix ?? "";
        const obj = { val: 0 };

        ScrollTrigger.create({
          trigger: el,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: target,
              duration: target > 5 ? 1.2 : 0.8,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = `${Math.round(obj.val)}${suffix}`;
              },
            });
          },
        });
      });

      // ── 4. Section headings: slide in from the left on scroll ───────────────
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

      // ── 5. GutStory headline: word-by-word reveal on scroll ─────────────────
      const gutWordEls = q(".gut-word") as HTMLElement[];
      if (gutWordEls.length) {
        gsap.set(gutWordEls, { yPercent: 110 });
        const gutH2 = gutWordEls[0].closest("h2") as Element | null;
        ScrollTrigger.create({
          trigger: (gutH2 ?? gutWordEls[0]) as Element,
          start: "top 82%",
          once: true,
          onEnter: () => {
            gsap.to(gutWordEls, {
              yPercent: 0,
              duration: 0.5,
              stagger: 0.06,
              ease: EASE,
              clearProps: "transform",
            });
          },
        });
      }

      // ── 6. GutStory columns: fade up + in with 150ms stagger ────────────────
      gsap.set(q("[data-gut-col]"), { y: 40, opacity: 0 });
      ScrollTrigger.batch(q("[data-gut-col]"), {
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
        start: "top 85%",
        once: true,
      });

      // ── 7. GutStory numbers: count up 0→n staggered 200ms apart ─────────────
      (q("[data-gut-num]") as HTMLElement[]).forEach((el, i) => {
        const target = parseInt(el.dataset.gutNum ?? "1");
        const obj = { val: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: target,
              duration: 0.8,
              delay: i * 0.2,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = String(Math.round(obj.val)).padStart(2, "0");
              },
            });
          },
        });
      });

      // ── 8. GutStory glow: ambient pulse — scale + opacity, repeat forever ───
      const glowEl = (q("[data-gut-glow]") as HTMLElement[])[0];
      if (glowEl) {
        gsap.fromTo(
          glowEl,
          { scale: 0.8, opacity: 0.1 },
          { scale: 1.2, opacity: 0.25, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 },
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
        <ProductFeatures />
        <Flavours />
        <SachetShowcase />
        <GutStory />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
