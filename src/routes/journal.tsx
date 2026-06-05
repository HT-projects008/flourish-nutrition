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


function JournalListing() {
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const videoRef = useRef<HTMLVideoElement>(null);

  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleScroll = () => {
      if (!video.duration) return;

      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const scrollProgress = Math.min(currentScrollY / heroHeight, 1);

      video.currentTime = scrollProgress * video.duration;

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      lastScrollY.current = currentScrollY;
    };

    video.currentTime = 0;

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const handleScrollDown = () => {
    const articlesSection = document.getElementById("articles");
    if (!articlesSection) return;

    const targetY = articlesSection.getBoundingClientRect().top + window.scrollY - 80;
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 1800;
    let startTime: number | null = null;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + distance * easeInOutCubic(progress));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

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

          {/* Video background — gradient fallback if video not found */}
          <div
            className="absolute inset-0 z-0 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #D4744A 0%, #E8B84B 50%, #C4445A 100%)" }}
          >
            <video
              ref={videoRef}
              src="/assets/science-hero.mp4"
              className="science-hero-video"
              muted
              playsInline
              preload="auto"
              onError={() => {
                if (videoRef.current) {
                  videoRef.current.style.display = "none";
                }
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center center",
              }}
            />
            {/* Dark overlay for text legibility */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.55) 100%)",
                zIndex: 1,
              }}
            />
          </div>

          {/* Grain texture */}
          <div
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{ backgroundImage: GRAIN_SVG, opacity: 0.08 }}
          />


          {/* Hero text — above all background layers */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
            <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white leading-tight">
              What it means to Flourish...
            </h1>
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
