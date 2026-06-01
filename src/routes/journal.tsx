import { createFileRoute } from "@tanstack/react-router";
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

const HERO_GRADIENT = "linear-gradient(135deg, #D4744A 0%, #E8B84B 50%, #C4445A 100%)";

function JournalPage() {
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const heroBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
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
      <main>
        {/* Hero banner */}
        <div className="relative h-72 lg:h-96 overflow-hidden">
          <div
            ref={heroBgRef}
            className="absolute inset-0 w-full"
            style={{ background: HERO_GRADIENT, height: "140%", top: "-20%" }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-16">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight">
              How Flourish helps you...
            </h1>
            <p className="mt-2 text-white/80 text-sm">
              Explore the science behind every ingredient.
            </p>
            <ChevronDown className="mt-4 size-6 text-white animate-bounce-slow" />
          </div>
        </div>

        {/* Header copy + filters */}
        <section className="py-10 px-6 lg:px-10 text-center">
          <Reveal>
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-6">
              ● FLOURISH JOURNAL
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground leading-[1.1]">
              Ingredients for a better life.
            </h2>
            <p className="mt-6 text-lg text-zinc-500 leading-relaxed max-w-xl mx-auto">
              Science-backed reading on gut health, nutrition, and the ingredients behind the Flourish formula.
            </p>
          </Reveal>
          <div
            className="mt-10 flex gap-2 overflow-x-auto pb-2 justify-start lg:justify-center"
            style={{ scrollbarWidth: "none" }}
          >
            {CATEGORIES.map((cat) => {
              const count = countFor(cat);
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-5 py-2 text-sm cursor-pointer transition-colors whitespace-nowrap flex-shrink-0 ${
                    active
                      ? "bg-orange-500 text-white"
                      : "border border-zinc-300 text-zinc-500 bg-transparent hover:border-orange-400"
                  }`}
                >
                  {cat}
                  <span className={`ml-1.5 text-xs ${active ? "text-white/70" : "text-zinc-400"}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Article grid */}
        <section className="pb-28 px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((article, i) => (
                <Reveal key={article.slug} delay={i * 80}>
                  <div className="bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                    <div className="aspect-video w-full bg-zinc-100 flex items-center justify-center text-zinc-300 text-xs tracking-widest uppercase">
                      Article Image
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-orange-500 text-xs uppercase tracking-wider mb-2">
                        {article.category}
                      </p>
                      <h3 className="font-serif font-bold text-lg leading-snug mb-3 text-zinc-900">
                        {article.title}
                      </h3>
                      <p className="text-zinc-500 text-sm leading-relaxed mb-4 flex-1">
                        {article.excerpt}
                      </p>
                      <p className="text-orange-500 text-sm font-medium">Read more →</p>
                    </div>
                  </div>
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
