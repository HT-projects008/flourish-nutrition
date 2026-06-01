import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../components/Reveal";
import { WaitlistForm } from "../components/WaitlistForm";
import { BotanicalCanvas } from "../components/BotanicalCanvas";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

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
  "Premium organic ingredients",
  "Responsibly sourced",
  "No artificial additives",
  "Vegan friendly",
  "Made in the UK",
];

function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[85vh] pt-32 lg:pt-44 pb-20 lg:pb-32 overflow-hidden bg-[var(--color-cream)]"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[oklch(0.985_0.025_75)] via-[var(--color-cream)] to-white" />
      <BotanicalCanvas />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 min-h-[85vh]">
        <div className="lg:col-span-7 pt-16 lg:pt-24 pl-0 lg:pl-10">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-primary/20 px-3 py-1.5 text-xs font-medium text-primary mb-6">
              <span className="size-1.5 rounded-full bg-primary" />
              Premium gut health, daily
            </span>
            <h1 className="font-serif text-7xl lg:text-8xl font-bold text-foreground leading-tight tracking-[-0.03em] text-left">
              Feel lighter.
              <br />
              <span className="text-primary">Every day.</span>
            </h1>
            <p className="mt-4 text-lg lg:text-xl text-muted-foreground leading-relaxed text-left">
              The daily gut health ritual that reduces bloating, supports digestion, helping you feel and look your best.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-start gap-3">
              <a
                href="#waitlist"
                className="inline-flex justify-center rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-sm hover:brightness-95 active:scale-[0.97] transition-[filter,transform] duration-150"
              >
                Join the Waitlist
              </a>
              <a
                href="#flavours"
                className="inline-flex justify-center rounded-full border border-foreground/20 px-7 py-4 text-base font-semibold text-foreground hover:bg-foreground/5 active:scale-[0.97] transition-[background-color,transform] duration-150"
              >
                See the Flavours
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              {["7 clinically-studied ingredients", "Made in the UK", "500+ on the waitlist"].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="size-1 rounded-full bg-primary/60 flex-shrink-0" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
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
      n: "01",
      title: "Beat the bloat",
      copy: "ACV and ginger work together to support digestion and reduce uncomfortable fullness after every meal.",
      ingredients: ["Apple cider vinegar", "Ginger extract"],
    },
    {
      n: "02",
      title: "Support fat loss",
      copy: "Ceylon cinnamon and ACV help regulate blood sugar, curb cravings, and support your metabolism before you eat.",
      ingredients: ["Ceylon cinnamon", "ACV"],
    },
    {
      n: "03",
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
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05]">
            Whole body health starts in the gut.
          </h2>
          <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
            Seven clinically-studied ingredients. One precise ratio. Taken before every meal.
          </p>
        </Reveal>
        <div className="mt-20 grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((f, i) => (
            <Reveal key={f.n} delay={i * 120}>
              <div className="rounded-3xl bg-white border border-border/80 p-10 h-full hover:border-primary/30 transition-colors duration-200 flex flex-col">
                <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-primary/60 tabular-nums">{f.n}</span>
                <h3 className="mt-5 font-serif text-2xl font-semibold text-foreground">{f.title}</h3>
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
      tags: ["Gut health", "Debloat", "Blood sugar"],
      description: "Warm apple cider vinegar with Ceylon cinnamon and ginger. The original Flourish ritual.",
    },
    {
      id: "02",
      name: "Lemon Ginger",
      bg: "#E8B84B",
      dark: true,
      tags: ["Digestion", "Debloat", "Anti-inflammatory"],
      description: "Bright lemon with warming ginger and turmeric. Citrus-forward and refreshing before every meal.",
    },
    {
      id: "03",
      name: "Lemon Raspberry",
      bg: "#C4445A",
      dark: false,
      tags: ["Gut health", "Antioxidant", "Refreshing"],
      description: "Lemon and raspberry with prebiotic inulin. The lightest, most refreshing way to Flourish.",
    },
  ];

  return (
    <section id="flavours" className="py-28 lg:py-40 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-6">
            ● THE FLOURISH FORMULA
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground leading-[1.1]">
            One precise daily blend. 3 Flavours.
          </h2>
          <p className="mt-6 text-lg text-zinc-500 leading-relaxed">
            Every ingredient chosen for a specific role — and for how it works with every other. Premium, organic, and crafted to be taken before every meal.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {flavours.map((f, i) => (
            <Reveal key={f.id} delay={i * 150}>
              <div
                className="min-h-[520px] rounded-2xl p-8 flex flex-col"
                style={{ backgroundColor: f.bg }}
              >
                <p className={`text-xs font-semibold uppercase tracking-widest mb-4 ${f.dark ? "text-[#1a1a1a]/60" : "text-white/70"}`}>
                  FLAVOUR {f.id}
                </p>
                <h3 className={`font-serif text-3xl font-bold mb-4 ${f.dark ? "text-[#1a1a1a]" : "text-white"}`}>
                  {f.name}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {f.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full px-3 py-1 text-xs font-medium ${f.dark ? "bg-[#1a1a1a]/15 text-[#1a1a1a]" : "bg-white/20 text-white"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex-1 flex items-center justify-center my-4">
                  <div className={`rounded-2xl w-full aspect-[3/4] max-w-[180px] flex flex-col items-center justify-center gap-2 border ${f.dark ? "bg-[#1a1a1a]/8 border-[#1a1a1a]/10" : "bg-white/8 border-white/10"}`}>
                    <span className={`font-serif text-4xl font-bold leading-none ${f.dark ? "text-[#1a1a1a]/20" : "text-white/20"}`}>{f.id}</span>
                    <span className={`text-[9px] font-medium tracking-[0.2em] uppercase ${f.dark ? "text-[#1a1a1a]/30" : "text-white/30"}`}>Coming soon</span>
                  </div>
                </div>
                <p className={`text-sm leading-relaxed mt-2 ${f.dark ? "text-[#1a1a1a]/75" : "text-white/80"}`}>
                  {f.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={400}>
          <div className="mt-16 text-center">
            <p className="text-zinc-400 text-sm mb-6">
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
    <section id="waitlist" className="py-28 lg:py-40 bg-[#1a1a1a] text-white">
      <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
        <Reveal>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-semibold leading-[1.05] tracking-[-0.02em]">
            Feel lighter.
            <br />
            <span className="text-primary">Starting now.</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-8 text-lg text-white/75 leading-relaxed">
            Join the Flourish waitlist for early access, exclusive launch pricing, and updates from the founder.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-12 flex justify-center">
            <WaitlistForm id="cta-email" variant="dark" />
          </div>
        </Reveal>
        <Reveal delay={360}>
          <div className="mt-8 flex items-center justify-center gap-3 text-sm text-white/65">
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

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
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
