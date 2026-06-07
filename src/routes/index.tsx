import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Star, Check, X, Leaf, FlaskConical, Heart } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Reveal } from "../components/Reveal";
import { WaitlistForm } from "../components/WaitlistForm";
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

const ingredientCards = [
  { name: "Apple Cider Vinegar",  benefit: "Digestion and appetite control" },
  { name: "Lemon",                benefit: "Vitamin C and enzyme stimulation" },
  { name: "Turmeric",             benefit: "Powerful anti-inflammatory" },
  { name: "Black Pepper",         benefit: "Increases absorption of all actives" },
  { name: "Ceylon Cinnamon",      benefit: "Blood sugar stability" },
  { name: "Prebiotic Blend",      benefit: "Inulin and acacia fibre for gentle gut support" },
  { name: "Ginger Extract",       benefit: "Clinically reduces bloating" },
  { name: "Monk Fruit",           benefit: "Natural sweetness, zero sugar" },
];

const problemCards = [
  {
    title: "One-trick formulas",
    body: "Most ACV drinks just give you ACV. No prebiotic fibre, no anti-inflammatory support, no blood sugar regulation.",
    solution: "8 ingredients working as one complete system.",
  },
  {
    title: "Artificial sweeteners",
    body: "Most gut health drinks use stevia with a bitter aftertaste, or just load up on sugar, which feeds harmful gut bacteria.",
    solution: "Monk fruit, naturally sweet, zero sugar, zero compromise.",
  },
  {
    title: "No bioavailability",
    body: "Turmeric alone is almost useless. Your body can barely absorb curcumin without the right co-factor.",
    solution: "Black pepper increases curcumin absorption by up to 2,000%.",
  },
  {
    title: "Wrong cinnamon",
    body: "Most brands use Cassia cinnamon, cheaper, but contains coumarin which can be harmful at daily doses.",
    solution: "Ceylon cinnamon only, the safe, therapeutic variety chosen specifically for daily use.",
  },
  {
    title: "No prebiotic fibre",
    body: "Probiotic drinks add good bacteria but don't feed them. Without prebiotic fibre, new bacteria die quickly.",
    solution: "Prebiotic blend feeds your existing beneficial bacteria, building lasting gut health.",
  },
  {
    title: "Wrong timing",
    body: "Most supplements are taken randomly. Gut health actives work significantly better when taken before eating.",
    solution: "Designed as a before-first-meal ritual for maximum effect.",
  },
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

// ── Botanical background ─────────────────────────────────────────────────────

type FlowerSize = 'lg' | 'md' | 'sm';
const FLOWER_DATA: Array<{ l: number; s: FlowerSize; hide: boolean }> = [
  { l: 5,  s: 'lg', hide: false },
  { l: 18, s: 'md', hide: true  },
  { l: 32, s: 'sm', hide: false },
  { l: 48, s: 'lg', hide: true  },
  { l: 62, s: 'md', hide: false },
  { l: 75, s: 'sm', hide: true  },
  { l: 87, s: 'lg', hide: false },
  { l: 94, s: 'md', hide: true  },
];
const FLOWER_DIM: Record<FlowerSize, { w: number; h: number; cx: number; sw: number; bcy: number; pr: number; px: number; cr: number }> = {
  lg: { w: 80, h: 220, cx: 40, sw: 2.5, bcy: 20, pr: 8,  px: 5,  cr: 4   },
  md: { w: 70, h: 160, cx: 35, sw: 2.0, bcy: 16, pr: 6,  px: 4,  cr: 3   },
  sm: { w: 60, h: 110, cx: 30, sw: 1.5, bcy: 12, pr: 4,  px: 3,  cr: 2.5 },
};

function BotanicalBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const targetOpacity = isMobile ? 0.3 : 0.45;
    const flowers = Array.from(el.querySelectorAll<HTMLElement>('.bf'));

    const showFinal = () => {
      flowers.forEach((fl, i) => {
        const stem = fl.querySelector<SVGPathElement>('.bs');
        if (stem) gsap.set(stem, { strokeDasharray: stem.getTotalLength(), strokeDashoffset: 0 });
        gsap.set(fl.querySelectorAll('.bl'), { opacity: 1 });
        const bloom = fl.querySelector<SVGGElement>('.bb');
        const d = FLOWER_DIM[FLOWER_DATA[i].s];
        if (bloom) gsap.set(bloom, { scale: 1, opacity: 1, svgOrigin: `${d.cx} ${d.bcy}` });
      });
      gsap.set(el, { opacity: targetOpacity });
    };

    if (prefersReduced) { showFinal(); return; }

    let swayTweens: gsap.core.Tween[] = [];
    let delayedCall: ReturnType<typeof gsap.delayedCall> | null = null;

    const cycle = () => {
      swayTweens.forEach(t => t.kill()); swayTweens = [];
      if (delayedCall) { delayedCall.kill(); delayedCall = null; }

      flowers.forEach((fl, i) => {
        const stem = fl.querySelector<SVGPathElement>('.bs');
        if (stem) { const len = stem.getTotalLength(); gsap.set(stem, { strokeDasharray: len, strokeDashoffset: len }); }
        gsap.set(fl.querySelectorAll('.bl'), { opacity: 0 });
        const bloom = fl.querySelector<SVGGElement>('.bb');
        const d = FLOWER_DIM[FLOWER_DATA[i].s];
        if (bloom) gsap.set(bloom, { scale: 0.2, opacity: 0, svgOrigin: `${d.cx} ${d.bcy}` });
        gsap.set(fl, { rotation: 0 });
      });
      gsap.set(el, { opacity: targetOpacity });

      const master = gsap.timeline();

      flowers.forEach((fl, i) => {
        const stem = fl.querySelector<SVGPathElement>('.bs');
        if (!stem) return;
        const len = stem.getTotalLength();
        const d = FLOWER_DIM[FLOWER_DATA[i].s];
        const bloom = fl.querySelector<SVGGElement>('.bb');

        const tl = gsap.timeline();
        tl.fromTo(stem, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' });
        tl.to(fl.querySelectorAll('.bl'), { opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.07 }, '-=0.72');
        if (bloom) {
          tl.fromTo(bloom,
            { scale: 0.2, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)', svgOrigin: `${d.cx} ${d.bcy}` },
            '-=0.15'
          );
        }
        master.add(tl, i * 0.15);
      });

      const allGrownAt = (flowers.length - 1) * 0.15 + 1.2 + 0.8;
      master.call(() => {
        flowers.forEach((fl, i) => {
          swayTweens.push(gsap.to(fl, {
            rotation: i % 2 === 0 ? 1.5 : -1.5,
            duration: 2.5 + i * 0.12,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            transformOrigin: 'center bottom',
          }));
        });
        delayedCall = gsap.delayedCall(8, () => {
          gsap.to(el, {
            opacity: 0,
            duration: 1.5,
            ease: 'power2.inOut',
            onComplete: () => gsap.delayedCall(0.1, cycle),
          });
        });
      }, [], allGrownAt);
    };

    cycle();
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 0, opacity: 0 }}
    >
      {FLOWER_DATA.map((f, i) => {
        const d = FLOWER_DIM[f.s];
        const { w, h, cx, sw, bcy, pr, px, cr } = d;
        const ls = w * 0.5;
        const lyLow  = h * 0.70;
        const lyHigh = h * 0.40;
        const stemD  = `M ${cx},${h} C ${cx - 2},${h * 0.75} ${cx + 2},${h * 0.45} ${cx},0`;

        return (
          <div
            key={i}
            className={`bf absolute bottom-0${f.hide ? ' hidden md:block' : ''}`}
            style={{ left: `${f.l}%`, transform: 'translateX(-50%)', width: w, height: h }}
          >
            <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
              <path className="bs" d={stemD} stroke="#D4744A" strokeWidth={sw} strokeLinecap="round" fill="none" />
              <g className="bl" transform={`translate(${cx},${lyLow})`} style={{ opacity: 0 }}>
                <path d={`M 0,0 C ${-ls},-14 ${-ls - 5},10 0,5`} fill="rgba(212,116,74,0.15)" stroke="#D4744A" strokeWidth="1" strokeLinecap="round" />
              </g>
              <g className="bl" transform={`translate(${cx},${lyLow})`} style={{ opacity: 0 }}>
                <path d={`M 0,0 C ${ls},-14 ${ls + 5},10 0,5`} fill="rgba(212,116,74,0.15)" stroke="#D4744A" strokeWidth="1" strokeLinecap="round" />
              </g>
              <g className="bl" transform={`translate(${cx},${lyHigh})`} style={{ opacity: 0 }}>
                <path d={`M 0,0 C ${-ls},-12 ${-ls - 4},9 0,4`} fill="rgba(212,116,74,0.15)" stroke="#D4744A" strokeWidth="1" strokeLinecap="round" />
              </g>
              <g className="bl" transform={`translate(${cx},${lyHigh})`} style={{ opacity: 0 }}>
                <path d={`M 0,0 C ${ls},-12 ${ls + 4},9 0,4`} fill="rgba(212,116,74,0.15)" stroke="#D4744A" strokeWidth="1" strokeLinecap="round" />
              </g>
              <g className="bb" style={{ opacity: 0 }}>
                {[0, 60, 120, 180, 240, 300].map(angle => (
                  <ellipse key={angle} cx={cx} cy={bcy - pr} rx={px} ry={pr}
                    fill="rgba(212,116,74,0.2)" stroke="#D4744A" strokeWidth="1.2"
                    transform={`rotate(${angle}, ${cx}, ${bcy})`}
                  />
                ))}
                <circle cx={cx} cy={bcy} r={cr} fill="#D4744A" opacity="0.6" />
              </g>
            </svg>
          </div>
        );
      })}
    </div>
  );
}

// Word-mask for hero headline — inner span reveals upward via GSAP on load
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

// ── Section label shared style ───────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center mb-6">
      <span className="inline-flex items-center gap-1.5 bg-orange-500/10 text-orange-500 rounded-full px-4 py-1.5 text-xs uppercase tracking-widest font-medium">
        {children}
      </span>
    </div>
  );
}

// ── 1. Hero ──────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="top"
      className="relative pt-32 lg:pt-44 pb-16 lg:pb-24 overflow-hidden bg-[var(--color-cream)]"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[oklch(0.985_0.025_75)] via-[var(--color-cream)] to-white" />
      <BotanicalBackground />
      {/* Warm orange fade connecting cream hero to dark marquee */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "35%",
          background: "linear-gradient(to bottom, transparent 0%, rgba(212,116,74,0.08) 50%, rgba(212,116,74,0.18) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:items-center">
        {/* Left: text content */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-1.5 bg-orange-500/10 text-orange-500 rounded-full px-4 py-1.5 text-xs uppercase tracking-widest font-medium mb-6">
              ● Premium gut health, daily
            </span>

            <h1 className="font-serif text-5xl lg:text-6xl font-bold text-orange-500 leading-tight tracking-[-0.02em] text-left mt-4">
              <HeroWord spaceAfter>Flourish,</HeroWord>
              <HeroWord spaceAfter>from</HeroWord>
              <HeroWord>within.</HeroWord>
            </h1>

            <div className="mt-5 space-y-1 text-left">
              <p className="text-lg text-zinc-500">8 organic ingredients, backed by science.</p>
              <p className="text-lg text-zinc-500">Helping you feel and look your best.</p>
              <p className="text-lg font-medium text-zinc-700">No big brand nasties.</p>
            </div>

            <div className="mt-6 max-w-md">
              <WaitlistForm source="homepage" />
            </div>

            <div className="mt-5 flex flex-wrap gap-4 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                8 organic ingredients
              </span>
              <span className="flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                Science-backed formula
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                No nasties, ever
              </span>
            </div>
          </Reveal>
        </div>

        {/* Right: ingredient typographic collage */}
        <Reveal delay={200}>
          <div className="bg-orange-50/60 rounded-3xl p-8 text-center border border-orange-100">
            <div className="flex flex-col items-center gap-2 py-4">
              <p className="font-serif text-3xl text-orange-500" style={{ opacity: 0.4 }}>Lemon</p>
              <p className="font-serif text-sm text-orange-500" style={{ opacity: 0.3 }}>· Ginger ·</p>
              <p className="font-serif text-2xl text-orange-500" style={{ opacity: 0.5 }}>Turmeric</p>
              <p className="font-serif text-xl text-orange-500" style={{ opacity: 0.35 }}>ACV</p>
              <p className="font-serif text-sm text-orange-500" style={{ opacity: 0.3 }}>· Cinnamon ·</p>
              <p className="font-serif text-2xl text-orange-500" style={{ opacity: 0.45 }}>Inulin</p>
              <p className="font-serif text-base text-orange-500" style={{ opacity: 0.3 }}>Black Pepper</p>
              <p className="font-serif text-sm text-orange-500" style={{ opacity: 0.25 }}>· Monk Fruit ·</p>
            </div>
            <p className="text-xs text-zinc-400 text-center mt-4">Packaging image coming soon</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── 2. Marquee ───────────────────────────────────────────────────────────────

function Marquee() {
  const track = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];
  return (
    <section aria-hidden="true" className="bg-[#2D2D2D] text-white overflow-hidden py-5">
      <div className="flex animate-marquee whitespace-nowrap">
        {track.map((item, i) => (
          <span key={i} className="flex items-center gap-8 px-8 text-xs tracking-widest uppercase font-medium">
            {item}
            <span className="text-primary">●</span>
          </span>
        ))}
      </div>
    </section>
  );
}

// ── 3. Benefits ──────────────────────────────────────────────────────────────

function Benefits() {
  const items = [
    { name: "Reduced bloating",           desc: "Feel lighter after every meal" },
    { name: "Consistent energy",          desc: "Steadier blood sugar after meals" },
    { name: "Fat loss support",           desc: "Appetite and metabolism control" },
    { name: "Clearer and brighter skin",  desc: "Regulates inflammation and supports detoxification" },
    { name: "Stronger immunity",          desc: "Supports cellular health and immune function" },
    { name: "Thriving gut microbiome",    desc: "Feeds the beneficial bacteria your gut needs most" },
    { name: "Improved mood and clarity",  desc: "Increased nutrient absorption fed to your brain" },
  ];

  return (
    <section id="benefits" className="py-20 lg:py-28 bg-[var(--color-cream)]">
      {/* Top centred header */}
      <div
        data-benefits-heading
        className="max-w-3xl mx-auto px-6 text-center"
      >
        <SectionLabel>● WHAT FLOURISH DOES</SectionLabel>
        <h2 className="font-serif text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight mt-4">
          Your gut controls more than you think.
        </h2>
        <p className="text-zinc-500 text-center max-w-2xl mx-auto mt-4 text-base leading-relaxed">
          Your energy, your skin, your immunity, your mood, all of it traces back to what's happening in your gut. Flourish feeds the bacteria that make everything else work.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto px-6 lg:px-10 mt-14">
        {/* Left: sticky section heading only */}
        <div className="lg:sticky lg:top-28 lg:self-start" />

        {/* Right: numbered benefits list + closing text */}
        <div>
          <ul>
            {items.map((item, i) => (
              <li
                key={item.name}
                data-benefit-item
                className={`flex items-start py-4 ${i < items.length - 1 ? "border-b border-zinc-100" : ""}`}
              >
                <span
                  className="font-mono text-xs text-orange-400 w-7 flex-shrink-0 mt-0.5 select-none"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-serif font-semibold text-base text-zinc-900">{item.name}</p>
                  <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 pt-6 border-t border-zinc-100 space-y-2">
            <p className="font-serif italic text-xl text-zinc-400">
              This is what it means to Flourish.
            </p>
            <p className="text-zinc-500 text-sm">
              Just some of the improvements a sachet a day does for you.
            </p>
            <div data-benefits-footer className="mt-4">
              <Link
                to="/journal"
                className="inline-flex border border-zinc-300 text-zinc-600 rounded-full px-6 py-2.5 text-sm font-medium hover:border-orange-500 hover:text-orange-500 transition-colors"
              >
                See the other benefits →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Botanical ingredient illustrations ───────────────────────────────────────

const SVG_PROPS = {
  width: 48,
  height: 48,
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "#D4744A",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function IllustrationACV() {
  return (
    <svg {...SVG_PROPS}>
      {/* Outer apple */}
      <circle cx="24" cy="28" r="14" stroke="#D4744A" strokeWidth="1.5" fill="rgba(212,116,74,0.08)" />
      {/* Indent at top */}
      <path d="M18,16 Q24,12 30,16" strokeWidth="1.5" fill="none" />
      {/* Stem */}
      <path d="M24,14 Q26,9 24,7" strokeWidth="1.5" />
      {/* Leaf */}
      <path d="M24,10 Q30,7 28,12" strokeWidth="1.5" fill="rgba(212,116,74,0.08)" />
      {/* Core line */}
      <line x1="24" y1="18" x2="24" y2="40" strokeWidth="1" strokeDasharray="2 2" />
      {/* Seeds */}
      <ellipse cx="21" cy="28" rx="2" ry="3" strokeWidth="1" fill="rgba(212,116,74,0.08)" />
      <ellipse cx="27" cy="28" rx="2" ry="3" strokeWidth="1" fill="rgba(212,116,74,0.08)" />
    </svg>
  );
}

function IllustrationLemon() {
  return (
    <svg {...SVG_PROPS}>
      {/* Wedge outline */}
      <path d="M24,40 L8,14 A18,18 0 0,1 40,14 Z" strokeWidth="1.5" fill="rgba(212,116,74,0.08)" />
      {/* Segment lines */}
      <line x1="24" y1="40" x2="24" y2="14" strokeWidth="1" />
      <line x1="24" y1="40" x2="11" y2="19" strokeWidth="1" />
      <line x1="24" y1="40" x2="37" y2="19" strokeWidth="1" />
      {/* Juice cells */}
      <circle cx="20" cy="30" r="1.2" fill="rgba(212,116,74,0.3)" stroke="none" />
      <circle cx="28" cy="28" r="1" fill="rgba(212,116,74,0.3)" stroke="none" />
      <circle cx="24" cy="24" r="1.2" fill="rgba(212,116,74,0.3)" stroke="none" />
      <circle cx="17" cy="24" r="0.9" fill="rgba(212,116,74,0.3)" stroke="none" />
      <circle cx="31" cy="24" r="0.9" fill="rgba(212,116,74,0.3)" stroke="none" />
    </svg>
  );
}

function IllustrationTurmeric() {
  return (
    <svg {...SVG_PROPS}>
      {/* Main root body */}
      <path d="M14,34 Q12,26 16,20 Q20,14 26,16 Q34,18 32,28 Q30,36 24,38 Q18,40 14,34 Z"
        strokeWidth="1.5" fill="rgba(212,116,74,0.08)" />
      {/* Finger extensions */}
      <path d="M30,20 Q38,16 36,10" strokeWidth="1.5" />
      <path d="M32,28 Q40,28 40,22" strokeWidth="1.5" />
      <path d="M16,28 Q8,30 8,24" strokeWidth="1.5" />
      {/* Surface texture */}
      <path d="M18,24 Q22,22 26,24" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M20,30 Q24,28 28,30" strokeWidth="1" strokeDasharray="2 2" />
      {/* Leaf sprout */}
      <path d="M22,16 Q20,10 24,8" strokeWidth="1.5" />
      <path d="M23,11 Q28,8 26,14" strokeWidth="1" fill="rgba(212,116,74,0.08)" />
    </svg>
  );
}

function IllustrationBlackPepper() {
  return (
    <svg {...SVG_PROPS}>
      {/* S-curve stem */}
      <path d="M16,40 C14,32 28,28 26,20 C24,12 16,10 18,6" strokeWidth="1.5" />
      {/* Berries */}
      <circle cx="28" cy="14" r="4" strokeWidth="1.5" fill="rgba(212,116,74,0.12)" />
      <circle cx="34" cy="22" r="3.5" strokeWidth="1.5" fill="rgba(212,116,74,0.12)" />
      <circle cx="30" cy="30" r="3" strokeWidth="1.5" fill="rgba(212,116,74,0.12)" />
      <circle cx="22" cy="26" r="3" strokeWidth="1.5" fill="rgba(212,116,74,0.12)" />
      {/* Leaves */}
      <path d="M20,14 Q14,10 14,16" strokeWidth="1" fill="rgba(212,116,74,0.08)" />
      <path d="M22,22 Q16,20 17,26" strokeWidth="1" fill="rgba(212,116,74,0.08)" />
    </svg>
  );
}

function IllustrationCinnamon() {
  return (
    <svg {...SVG_PROPS}>
      {/* Outer oval */}
      <ellipse cx="24" cy="26" rx="13" ry="16" strokeWidth="1.5" fill="rgba(212,116,74,0.06)" />
      {/* Concentric spiral lines */}
      <ellipse cx="24" cy="26" rx="9" ry="12" strokeWidth="1" strokeDasharray="3 2" />
      <ellipse cx="24" cy="26" rx="5" ry="7" strokeWidth="1" strokeDasharray="2 2" />
      <ellipse cx="24" cy="26" rx="2" ry="3" strokeWidth="1" />
      {/* Edge texture */}
      <path d="M11,18 Q9,22 11,28" strokeWidth="1.5" strokeDasharray="2 2" />
      <path d="M37,18 Q39,22 37,28" strokeWidth="1.5" strokeDasharray="2 2" />
      {/* Broken piece */}
      <ellipse cx="38" cy="36" rx="5" ry="7" strokeWidth="1" fill="rgba(212,116,74,0.06)" transform="rotate(20,38,36)" />
    </svg>
  );
}

function IllustrationPrebiotic() {
  return (
    <svg {...SVG_PROPS}>
      {/* Central point */}
      <circle cx="24" cy="24" r="3" strokeWidth="1.5" fill="rgba(212,116,74,0.15)" />
      {/* Main branches */}
      <line x1="24" y1="21" x2="24" y2="8" strokeWidth="1.5" />
      <line x1="21" y1="26" x2="10" y2="34" strokeWidth="1.5" />
      <line x1="27" y1="26" x2="38" y2="34" strokeWidth="1.5" />
      <line x1="22" y1="22" x2="12" y2="12" strokeWidth="1.5" />
      <line x1="26" y1="22" x2="36" y2="12" strokeWidth="1.5" />
      {/* Tips */}
      <circle cx="24" cy="8" r="2.5" strokeWidth="1.2" fill="rgba(212,116,74,0.12)" />
      <circle cx="10" cy="34" r="2.5" strokeWidth="1.2" fill="rgba(212,116,74,0.12)" />
      <circle cx="38" cy="34" r="2.5" strokeWidth="1.2" fill="rgba(212,116,74,0.12)" />
      <circle cx="12" cy="12" r="2" strokeWidth="1.2" fill="rgba(212,116,74,0.12)" />
      <circle cx="36" cy="12" r="2" strokeWidth="1.2" fill="rgba(212,116,74,0.12)" />
      {/* Secondary mini branches */}
      <line x1="24" y1="14" x2="20" y2="10" strokeWidth="1" />
      <line x1="24" y1="14" x2="28" y2="10" strokeWidth="1" />
      <circle cx="20" cy="10" r="1.5" strokeWidth="1" fill="rgba(212,116,74,0.1)" />
      <circle cx="28" cy="10" r="1.5" strokeWidth="1" fill="rgba(212,116,74,0.1)" />
    </svg>
  );
}

function IllustrationGinger() {
  return (
    <svg {...SVG_PROPS}>
      {/* Main knobby root */}
      <path d="M12,30 Q10,22 14,18 Q18,12 24,14 Q32,16 34,24 Q36,32 30,36 Q24,40 18,36 Q12,32 12,30 Z"
        strokeWidth="1.5" fill="rgba(212,116,74,0.08)" />
      {/* Knobby protrusions */}
      <path d="M14,22 Q8,18 10,12" strokeWidth="1.5" />
      <path d="M24,14 Q26,8 32,8" strokeWidth="1.5" />
      <path d="M32,28 Q38,24 38,18" strokeWidth="1.5" />
      <path d="M20,36 Q16,42 12,40" strokeWidth="1.5" />
      {/* Surface texture */}
      <path d="M18,22 Q22,20 26,22" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M16,28 Q20,26 24,28" strokeWidth="1" strokeDasharray="2 2" />
      {/* Sprout */}
      <path d="M24,14 Q22,8 24,6" strokeWidth="1.5" />
      <path d="M23,9 Q28,7 27,12" strokeWidth="1" fill="rgba(212,116,74,0.08)" />
    </svg>
  );
}

function IllustrationMonkFruit() {
  return (
    <svg {...SVG_PROPS}>
      {/* Fruit body */}
      <circle cx="24" cy="27" r="15" strokeWidth="1.5" fill="rgba(212,116,74,0.08)" />
      {/* Vertical ribs */}
      {[0, 1, 2, 3, 4, 5, 6].map((n) => {
        const angle = (n * 180) / 7 - 90;
        const rad = (angle * Math.PI) / 180;
        const sx = 24 + 15 * Math.cos(rad);
        const sy = 27 + 15 * Math.sin(rad);
        const ex = 24 + 15 * Math.cos((rad + Math.PI));
        const ey = 27 + 15 * Math.sin((rad + Math.PI));
        return (
          <path
            key={n}
            d={`M${sx.toFixed(1)},${sy.toFixed(1)} Q24,${27 - 6} ${ex.toFixed(1)},${ey.toFixed(1)}`}
            strokeWidth="0.8"
            stroke="#D4744A"
            fill="none"
          />
        );
      })}
      {/* Stem */}
      <path d="M24,12 Q26,8 24,6" strokeWidth="1.5" />
      {/* Leaf */}
      <path d="M24,9 Q30,6 28,11" strokeWidth="1" fill="rgba(212,116,74,0.08)" />
      {/* Flower details at base */}
      <path d="M19,40 Q24,44 29,40" strokeWidth="1" />
    </svg>
  );
}

const INGREDIENT_ILLUSTRATIONS = [
  IllustrationACV,
  IllustrationLemon,
  IllustrationTurmeric,
  IllustrationBlackPepper,
  IllustrationCinnamon,
  IllustrationPrebiotic,
  IllustrationGinger,
  IllustrationMonkFruit,
];

// ── 4. Ingredients ───────────────────────────────────────────────────────────

function Ingredients() {
  return (
    <section id="ingredients" className="py-20 lg:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="text-center">
          <SectionLabel>● THE FORMULA</SectionLabel>
          <h2 className="section-heading font-serif font-bold text-3xl lg:text-4xl text-zinc-900 text-center mt-4">
            Eight ingredients. Every one chosen.
          </h2>
          <p className="text-zinc-500 text-center max-w-lg mx-auto mt-3 text-sm leading-relaxed">
            No fillers. No unnecessary additives. Every ingredient in the Flourish formula has a specific, evidence-based role, and works harder alongside the others.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {ingredientCards.map((card, idx) => {
            const Illustration = INGREDIENT_ILLUSTRATIONS[idx];
            return (
              <div
                key={card.name}
                data-ingredient-card
                className="bg-orange-50 rounded-2xl p-6 text-center border border-orange-100/80 hover:bg-orange-100/60 transition-colors duration-200 cursor-default"
              >
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Illustration />
                </div>
                <p className="text-xs font-semibold text-zinc-900 uppercase tracking-wider">
                  {card.name}
                </p>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  {card.benefit}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── 5. Comparison ────────────────────────────────────────────────────────────

function Comparison() {
  type CompCell = false | string;

  const rows: { feature: string; conventional: CompCell }[] = [
    { feature: "Organic ingredients",                                        conventional: false },
    { feature: "No emulsifiers or preservatives",                            conventional: false },
    { feature: "Multi-benefit formula (gut, skin, fat loss, energy, mood)",  conventional: false },
    { feature: "Natural sweetener only (zero sugar)",                        conventional: "Often sugar" },
    { feature: "8 simple recognisable ingredients",                          conventional: "Often 20+" },
    { feature: "From £1/day",                                                conventional: "Often more" },
  ];

  const renderConvCell = (v: CompCell) => {
    if (v === false) {
      return (
        <div className="flex justify-center">
          <X className="w-4 h-4 text-zinc-300" strokeWidth={1.5} aria-label="No" />
        </div>
      );
    }
    return (
      <span className="block text-zinc-400 text-xs text-center italic">{v}</span>
    );
  };

  return (
    <section id="comparison" className="py-20 lg:py-28" style={{ backgroundColor: '#FFF3E0' }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div data-comparison-copy className="text-center">
          <SectionLabel>● WHY FLOURISH IS BETTER</SectionLabel>
          <h2 className="section-heading font-serif text-3xl lg:text-4xl font-bold text-zinc-900 text-center mt-4">
            Simple ingredients, backed by science.
          </h2>
          <p className="text-zinc-500 text-center max-w-lg mx-auto mt-3 text-sm leading-relaxed">
            Most gut health drinks do one thing well. Flourish was built to do everything, simply, organically, and affordably.
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto rounded-2xl overflow-hidden border border-orange-200">
          <div className="overflow-x-auto relative">
            <table className="w-full min-w-[480px] border-collapse">
              <thead>
                <tr className="bg-[#2D2D2D] h-14">
                  <th className="pl-6 pr-4 py-4 text-left w-2/5" scope="col" />
                  <th className="bg-orange-500 py-4 text-center w-[30%]" scope="col">
                    <div className="flex flex-col items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-white mb-1" aria-hidden="true" />
                      <span className="font-serif font-bold text-white text-sm">Flourish</span>
                    </div>
                  </th>
                  <th className="py-4 px-2 text-center w-[30%]" scope="col">
                    <span className="text-zinc-400 text-xs">Most Gut Health Drinks</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.feature}
                    data-comparison-row
                    className={`border-b border-orange-100 last:border-b-0 ${i % 2 === 0 ? "bg-white" : "bg-orange-50/40"}`}
                  >
                    <td className="pl-5 pr-4 py-4 text-zinc-700 text-sm font-medium align-middle">
                      {row.feature}
                    </td>
                    <td className="bg-orange-50/50 py-4 text-center align-middle border-l border-orange-200">
                      <div className="flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center mx-auto">
                          <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} aria-label="Yes" />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center align-middle">
                      {renderConvCell(row.conventional)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile right-fade hint */}
            <div
              className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-orange-50 to-transparent pointer-events-none lg:hidden"
              aria-hidden="true"
            />
          </div>
        </div>

        <p className="text-zinc-400 text-xs mt-4 text-center italic max-w-xl mx-auto">
          Comparison based on commonly available gut health products. Category characteristics are generalised, individual products may vary.
        </p>
      </div>
    </section>
  );
}

// ── 6. Problems ──────────────────────────────────────────────────────────────

function Problems() {
  const track = [...problemCards, ...problemCards];

  return (
    <section id="problems" className="py-20 lg:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <SectionLabel>● THE PROBLEM WITH MOST GUT HEALTH DRINKS</SectionLabel>
        <h2 className="section-heading font-serif font-bold text-3xl lg:text-4xl text-zinc-900 text-center max-w-2xl mx-auto mt-4 leading-tight">
          Most gut health drinks do one thing. Flourish does everything.
        </h2>
      </div>

      <div className="mt-12 overflow-hidden">
        <div className="problems-track flex w-fit">
          {track.map((card, i) => (
            <div
              key={i}
              className="mx-3 bg-orange-50 rounded-2xl p-6 border border-orange-100 flex-shrink-0"
              style={{ width: 280 }}
            >
              <p className="font-serif font-bold text-base text-zinc-900 mb-2">{card.title}</p>
              <p className="text-sm text-zinc-500 leading-relaxed mb-4">{card.body}</p>
              <div className="border-t border-orange-200 pt-3">
                <p className="text-xs text-orange-500 font-medium uppercase tracking-wider mb-1">
                  Flourish fixes this:
                </p>
                <p className="text-sm text-zinc-800">{card.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Flavour card botanical decorations ───────────────────────────────────────

function LemonBlossomDecoration() {
  const flowerProps = {
    stroke: "white",
    strokeWidth: 1.2,
    strokeDasharray: "5 3",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "rgba(255,255,255,0.08)",
  };

  return (
    <svg
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.5,
        pointerEvents: "none",
        zIndex: 0,
      }}
      viewBox="0 0 300 400"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Top-right cluster: large bloom */}
      {[0, 72, 144, 216, 288].map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <ellipse
            key={`tr-${a}`}
            cx={250 + 8 * Math.cos(rad)}
            cy={50 + 8 * Math.sin(rad)}
            rx={3}
            ry={7}
            transform={`rotate(${a}, 250, 50)`}
            {...flowerProps}
          />
        );
      })}
      <circle cx="250" cy="50" r="2" fill="rgba(255,255,255,0.3)" stroke="none" />
      {/* Top-right: smaller bud */}
      {[0, 72, 144, 216, 288].map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <ellipse
            key={`trb-${a}`}
            cx={275 + 5 * Math.cos(rad)}
            cy={80 + 5 * Math.sin(rad)}
            rx={2}
            ry={5}
            transform={`rotate(${a}, 275, 80)`}
            {...flowerProps}
          />
        );
      })}
      <circle cx="275" cy="80" r="1.5" fill="rgba(255,255,255,0.3)" stroke="none" />

      {/* Bottom-left: bloom + leaf */}
      {[0, 72, 144, 216, 288].map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <ellipse
            key={`bl-${a}`}
            cx={30 + 8 * Math.cos(rad)}
            cy={350 + 8 * Math.sin(rad)}
            rx={3}
            ry={7}
            transform={`rotate(${a}, 30, 350)`}
            {...flowerProps}
          />
        );
      })}
      <circle cx="30" cy="350" r="2" fill="rgba(255,255,255,0.3)" stroke="none" />
      <path d="M30,358 Q20,368 28,372" {...flowerProps} />

      {/* Top-left: scattered petals */}
      {[0, 72, 144, 216, 288].map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <ellipse
            key={`tl-${a}`}
            cx={25 + 5 * Math.cos(rad)}
            cy={60 + 5 * Math.sin(rad)}
            rx={2}
            ry={5}
            transform={`rotate(${a}, 25, 60)`}
            {...flowerProps}
          />
        );
      })}
      <circle cx="25" cy="60" r="1.5" fill="rgba(255,255,255,0.3)" stroke="none" />
    </svg>
  );
}

function CarnationDecoration() {
  const carnationProps = {
    stroke: "white",
    strokeWidth: 1.2,
    strokeDasharray: "5 3",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "rgba(255,255,255,0.08)",
  };

  return (
    <svg
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.5,
        pointerEvents: "none",
        zIndex: 0,
      }}
      viewBox="0 0 300 400"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Right side: full carnation with stem and leaves */}
      {/* Stem */}
      <path d="M260,400 C258,360 262,320 260,280" strokeWidth={1.5} stroke="white" strokeLinecap="round" fill="none" strokeDasharray="5 3" />
      {/* Leaves */}
      <path d="M260,340 Q270,330 265,320" {...carnationProps} />
      <path d="M260,310 Q248,300 252,290" {...carnationProps} />
      {/* Outer petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <path
            key={`ro-${a}`}
            d={`M260,280 Q${260 + 14 * Math.cos(rad)},${280 + 14 * Math.sin(rad)} ${260 + 10 * Math.cos(rad + 0.3)},${280 + 10 * Math.sin(rad + 0.3)}`}
            {...carnationProps}
          />
        );
      })}
      {/* Inner petals */}
      {[22, 67, 112, 157, 202, 247].map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <path
            key={`ri-${a}`}
            d={`M260,280 Q${260 + 8 * Math.cos(rad)},${280 + 8 * Math.sin(rad)} ${260 + 6 * Math.cos(rad + 0.4)},${280 + 6 * Math.sin(rad + 0.4)}`}
            {...carnationProps}
          />
        );
      })}

      {/* Bottom-left: carnation head without stem */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <path
            key={`blo-${a}`}
            d={`M40,360 Q${40 + 12 * Math.cos(rad)},${360 + 12 * Math.sin(rad)} ${40 + 9 * Math.cos(rad + 0.3)},${360 + 9 * Math.sin(rad + 0.3)}`}
            {...carnationProps}
          />
        );
      })}
      {[22, 67, 112, 157, 202, 247].map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <path
            key={`bli-${a}`}
            d={`M40,360 Q${40 + 7 * Math.cos(rad)},${360 + 7 * Math.sin(rad)} ${40 + 5 * Math.cos(rad + 0.4)},${360 + 5 * Math.sin(rad + 0.4)}`}
            {...carnationProps}
          />
        );
      })}
    </svg>
  );
}

// ── 7. Flavours ──────────────────────────────────────────────────────────────

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
    <section id="flavours" className="py-20 lg:py-28 bg-[var(--color-cream)]">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <Reveal className="max-w-2xl mx-auto text-center mb-16">
          <SectionLabel>● THE FLAVOURS</SectionLabel>
          <h2 className="section-heading font-serif text-3xl lg:text-4xl font-bold text-foreground leading-tight mt-4">
            One precise blend. Three flavours.
          </h2>
          <p className="mt-3 text-sm text-zinc-500 leading-relaxed max-w-lg mx-auto">
            The same 8 organic ingredients in every sachet. Choose your favourite flavour, or try all three.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {flavours.map((f, idx) => (
            <div
              key={f.id}
              data-flavour-card
              className="min-h-[400px] rounded-2xl p-8 flex flex-col relative overflow-hidden"
              style={{ backgroundColor: f.bg }}
            >
              {/* Botanical decorations — behind text */}
              {idx === 0 && <LemonBlossomDecoration />}
              {idx === 1 && <CarnationDecoration />}

              <span
                className="absolute bottom-4 right-6 font-serif text-7xl font-bold leading-none select-none pointer-events-none text-white opacity-20"
                aria-hidden="true"
                style={{ zIndex: 1 }}
              >
                {f.id}
              </span>

              <p className={`relative z-[1] text-xs font-semibold uppercase tracking-widest mb-4 ${f.dark ? "text-[#2D2D2D]/60" : "text-white/70"}`}>
                {f.label}
              </p>
              <h3 className={`relative z-[1] font-serif text-2xl font-bold mb-4 ${f.dark ? "text-[#2D2D2D]" : "text-white"}`}>
                {f.name}
              </h3>
              <p className={`relative z-[1] text-sm leading-relaxed mt-auto ${f.dark ? "text-[#2D2D2D]/75" : "text-white/80"}`}>
                {f.description}
              </p>
              <a
                href={f.ctaHref}
                className={`relative z-[1] mt-4 text-sm font-medium underline underline-offset-2 transition-opacity ${f.dark ? "text-[#2D2D2D]/60 hover:text-[#2D2D2D]/90" : "text-white/70 hover:text-white"}`}
              >
                {f.cta}
              </a>
            </div>
          ))}
        </div>

        <Reveal delay={400}>
          <div className="mt-16 text-center">
            <p className="text-zinc-500 text-sm mb-6">
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

// ── 8. PricingTeaser ─────────────────────────────────────────────────────────

function PricingTeaser() {
  const [plan, setPlan] = useState<"trial" | "monthly">("monthly");

  return (
    <section id="pricing" className="pricing-section py-20 lg:py-28" style={{ backgroundColor: '#FFF3E0', backgroundImage: 'none' }}>
      <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">

        <Reveal>
          <SectionLabel>● PRICING</SectionLabel>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-zinc-900 mt-4 leading-tight">
            Start your ritual.<br />No commitment needed.
          </h2>
          <p className="text-zinc-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            Try Flourish for 7 days or commit to a full month. Early access members get an exclusive founding rate.
          </p>

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

        {plan === "monthly" && (
          <div data-pricing-cards className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 text-left">
            <div className="bg-white rounded-2xl p-8 border border-zinc-200">
              <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest">One-off</p>
              <div className="flex items-baseline gap-2 mt-4">
                <p className="text-4xl font-bold text-zinc-900">£27.99</p>
                <p className="text-zinc-400 text-sm line-through">£34.99</p>
              </div>
              <p className="text-zinc-400 text-sm mt-1">per month</p>
              <span className="mt-3 inline-block bg-orange-100 text-orange-600 text-xs rounded-full px-3 py-1">
                Early access rate, first 500 only
              </span>
              <ul className="mt-6 text-sm text-zinc-500 space-y-2">
                {[
                  "30 sachets, 30-day supply",
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
                className="mt-8 block w-full text-center border border-zinc-300 text-zinc-700 rounded-full py-3 font-medium text-sm hover:border-orange-500 hover:text-orange-500 transition-colors"
              >
                Join Waitlist, One-off
              </a>
            </div>

            <div className="bg-[#2D2D2D] rounded-2xl p-8 border-2 border-orange-500 relative overflow-hidden">
              <span className="absolute top-4 right-4 bg-orange-500 text-white text-xs rounded-full px-3 py-1">
                Most popular
              </span>
              <p className="text-zinc-400 text-sm font-medium uppercase tracking-widest">Monthly subscription</p>
              <div className="flex items-baseline gap-2 mt-4">
                <p className="text-4xl font-bold text-white">£23.99</p>
                <p className="text-zinc-500 text-sm line-through">£29.99</p>
              </div>
              <p className="text-zinc-400 text-sm mt-1">/month</p>
              <span className="mt-3 inline-block bg-orange-500/20 text-orange-400 text-xs rounded-full px-3 py-1">
                Save 20%, founding member rate
              </span>
              <ul className="mt-6 text-sm text-zinc-400 space-y-2">
                {[
                  "30 sachets, 30-day supply",
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
                className="mt-8 block w-full text-center bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3 font-medium text-sm transition-colors"
              >
                Join Waitlist, Subscribe
              </a>
            </div>
          </div>
        )}

        {plan === "trial" && (
          <div data-pricing-cards className="max-w-sm mx-auto mt-10">
            <div className="bg-white rounded-2xl p-10 border-2 border-orange-500 text-center">
              <p className="text-orange-500 text-sm font-medium uppercase tracking-widest">7-Day Trial</p>
              <p className="text-4xl font-bold text-zinc-900 mt-4">£9.99</p>
              <p className="text-zinc-500 text-sm mt-2">7 sachets delivered to your door.</p>
              <ul className="mt-8 text-sm text-zinc-500 space-y-3 text-left max-w-xs mx-auto">
                {[
                  "7-day supply, one sachet daily",
                  "Before your first meal, every day",
                  "8g per sachet, full formula",
                  "Free UK delivery",
                  "No subscription, try it first",
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
                className="mt-8 block w-full text-center bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3 font-medium text-sm transition-colors"
              >
                Join Waitlist, Trial
              </a>
            </div>
          </div>
        )}

        <div className="mt-10">
          <p className="text-zinc-500 text-sm">Early access pricing available to the first 500 members only.</p>
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

// ── 9. FinalCTA ──────────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section id="waitlist" className="py-28 lg:py-40 bg-[#2D2D2D] text-white">
      <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
        <Reveal>
          <SectionLabel>● EARLY ACCESS</SectionLabel>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-semibold leading-[1.05] tracking-[-0.02em] mt-4">
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

// ── Root page ────────────────────────────────────────────────────────────────

function Index() {
  const mainRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const container = mainRef.current;
      if (!container) return;
      const q = gsap.utils.selector(container);

      // 1. Hero headline: word-by-word reveal on load
      gsap.from(q(".hero-word"), {
        yPercent: 110,
        duration: 0.45,
        stagger: 0.07,
        ease: EASE,
        delay: 0.15,
        clearProps: "transform",
      });

      // 2. Flavour cards: stagger in from below on scroll
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

      // 3. Section headings: slide in from the left on scroll
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

      // 4. Benefits top header: fade up on scroll
      const benefitsHeadingEl = (q("[data-benefits-heading]") as HTMLElement[])[0];
      if (benefitsHeadingEl) {
        gsap.fromTo(
          benefitsHeadingEl,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: EASE,
            scrollTrigger: { trigger: benefitsHeadingEl, start: "top 75%", once: true },
          },
        );
      }

      // 5. Benefit list items: stagger in as user scrolls
      const benefitItemEls = q("[data-benefit-item]") as HTMLElement[];
      if (benefitItemEls.length) {
        gsap.set(benefitItemEls, { y: 20, opacity: 0 });
        ScrollTrigger.batch(benefitItemEls, {
          onEnter: (els) => {
            gsap.to(els, {
              y: 0,
              opacity: 1,
              duration: 0.45,
              stagger: 0.08,
              ease: EASE,
              overwrite: true,
            });
          },
          start: "top 85%",
          once: true,
        });
      }

      // 6. Benefits footer: fade in last
      const benefitsFooterEl = (q("[data-benefits-footer]") as HTMLElement[])[0];
      if (benefitsFooterEl) {
        gsap.fromTo(
          benefitsFooterEl,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: EASE,
            delay: 0.1,
            scrollTrigger: { trigger: benefitsFooterEl, start: "top 85%", once: true },
          },
        );
      }

      // 7. Ingredient cards: stagger in from below on scroll
      gsap.set(q("[data-ingredient-card]"), { y: 30, opacity: 0 });
      ScrollTrigger.batch(q("[data-ingredient-card]"), {
        onEnter: (els) => {
          gsap.to(els, {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.06,
            ease: EASE,
            overwrite: true,
          });
        },
        start: "top 85%",
        once: true,
      });

      // 8. Pricing cards: fade up on scroll
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

      // 9. Comparison header copy: fade up on scroll
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

      // 10. Comparison rows: stagger in on scroll
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
        <Ingredients />
        <Comparison />
        <Problems />
        <Flavours />
        <PricingTeaser />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
