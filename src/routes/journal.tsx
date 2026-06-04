import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { articles } from "../data/articles";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — Flourish" },
      {
        name: "description",
        content: "Science-backed reading on gut health, nutrition, and the ingredients behind the Flourish formula.",
      },
    ],
    links: [{ rel: "canonical", href: "https://flourish.com/journal" }],
  }),
  component: JournalPage,
});

const CATEGORIES = [
  "All Articles",
  "Anti-Inflammatory",
  "Blood Sugar",
  "Digestion",
  "Energy",
  "Fat Loss",
  "Gut Health",
  "Immunity",
  "Mental Wellbeing",
  "Nutrient Absorption",
  "Skin",
];

const HERO_FALLBACK = "radial-gradient(ellipse at 50% 70%, #F5A623 0%, #E8622A 40%, #CC2200 80%, #E84B1A 100%)";

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

function JournalPage() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/journal/")) return <Outlet />;
  return <JournalListing />;
}

const FLOAT_PARTICLES = [
  { top: "12%", left: "8%",  opacity: 0.25, duration: "4.5s", delay: "0s"   },
  { top: "22%", left: "85%", opacity: 0.35, duration: "6s",   delay: "1.2s" },
  { top: "38%", left: "18%", opacity: 0.20, duration: "5.5s", delay: "0.5s" },
  { top: "48%", left: "72%", opacity: 0.30, duration: "3.5s", delay: "2s"   },
  { top: "58%", left: "33%", opacity: 0.25, duration: "7s",   delay: "0.8s" },
  { top: "18%", left: "53%", opacity: 0.40, duration: "4s",   delay: "3s"   },
  { top: "65%", left: "14%", opacity: 0.20, duration: "5s",   delay: "1.5s" },
  { top: "28%", left: "92%", opacity: 0.35, duration: "6.5s", delay: "2.5s" },
  { top: "72%", left: "62%", opacity: 0.25, duration: "4.5s", delay: "0.3s" },
  { top: "42%", left: "44%", opacity: 0.30, duration: "5s",   delay: "3.5s" },
  { top: "10%", left: "76%", opacity: 0.40, duration: "3s",   delay: "1s"   },
  { top: "82%", left: "27%", opacity: 0.20, duration: "6s",   delay: "4s"   },
];

function JournalListing() {
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const bgRef = useRef<HTMLDivElement>(null);

  const handleScrollDown = () => {
    document.getElementById("articles")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.25}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = useMemo(() => {
    const source =
      activeCategory === "All Articles"
        ? articles
        : articles.filter((a) => a.category === activeCategory);
    return [...source].sort((a, b) => a.title.localeCompare(b.title));
  }, [activeCategory]);

  const countFor = (cat: string) =>
    cat === "All Articles"
      ? articles.length
      : articles.filter((a) => a.category === cat).length;

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      <Nav />
      <main id="main-content">
        {/* Hero — full viewport height */}
        <div className="relative min-h-screen overflow-hidden">
          {/* Parallax bg layer — composited via transform, not backgroundPositionY */}
          <div
            ref={bgRef}
            className="absolute inset-[-30%] z-0 will-change-transform"
            style={{
              backgroundImage: `url('/assets/journal-hero.jpg'), ${HERO_FALLBACK}`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          />
          {/* Grain texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{ backgroundImage: GRAIN_SVG, opacity: 0.08 }}
          />
          {/* Floating ambient particles */}
          <div className="absolute inset-0 pointer-events-none z-[2]" aria-hidden="true">
            {FLOAT_PARTICLES.map((pt, i) => (
              <span
                key={i}
                className="float-particle absolute w-1.5 h-1.5 rounded-full bg-white"
                style={{
                  top: pt.top,
                  left: pt.left,
                  ["--start-opacity" as string]: pt.opacity,
                  animationDuration: pt.duration,
                  animationDelay: pt.delay,
                }}
              />
            ))}
          </div>
          {/* Bottom fade overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-[2]"
            style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.3) 100%)" }}
          />
          {/* Text */}
          <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center text-center px-6">
            <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white leading-tight">
              What it means to Flourish...
            </h1>
            <p className="mt-3 text-white/80 text-sm">
              Explore the science behind every ingredient.
            </p>
            <button
              onClick={handleScrollDown}
              className="mt-6 cursor-pointer focus-visible:outline-none"
              aria-label="Scroll to articles"
            >
              <ChevronDown className="size-6 text-white animate-bounce-slow" />
            </button>
          </div>
        </div>

        {/* Header copy + filters */}
        <section className="py-10 px-6 lg:px-10 text-center">
          <Reveal>
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-6">
              Flourish Science
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground leading-[1.1]">
              The science behind every ingredient.
            </h2>
            <p className="mt-6 text-lg text-zinc-600 leading-relaxed max-w-xl mx-auto">
              Science-backed reading on gut health, nutrition, and the ingredients behind the Flourish formula.
            </p>
          </Reveal>
          <div
            className="mt-10 flex gap-2 overflow-x-auto pb-2 justify-start lg:justify-center"
            style={{ scrollbarWidth: "none" }}
            role="group"
            aria-label="Filter articles by category"
          >
            {CATEGORIES.map((cat) => {
              const count = countFor(cat);
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={active}
                  className={`rounded-full px-5 py-2 text-sm cursor-pointer transition-colors whitespace-nowrap flex-shrink-0 ${
                    active
                      ? "bg-orange-500 text-white"
                      : "border border-zinc-300 text-zinc-600 bg-transparent hover:border-orange-400"
                  }`}
                >
                  {cat}
                  <span className={`ml-1.5 text-xs ${active ? "text-white/70" : "text-zinc-500"}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Article grid */}
        <section id="articles" className="pb-28 px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((article, i) => (
                <Reveal key={article.slug} delay={i * 80}>
                  <Link
                    to="/journal/$slug"
                    params={{ slug: article.slug }}
                    className="bg-white rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col"
                  >
                    <div
                      className="aspect-video w-full bg-gradient-to-br from-orange-100 to-orange-50"
                      aria-hidden="true"
                    />
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-orange-500 text-xs uppercase tracking-wider mb-2">
                        {article.category}
                      </p>
                      <h3 className="font-serif font-bold text-lg leading-snug mb-3 text-zinc-900">
                        {article.title}
                      </h3>
                      <p className="text-zinc-600 text-sm leading-relaxed mb-4 flex-1">
                        {article.excerpt}
                      </p>
                      <p className="text-orange-500 text-sm font-medium">Read more →</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
