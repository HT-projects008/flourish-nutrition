import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Reveal } from "../components/Reveal";

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

interface Article {
  category: string;
  title: string;
  excerpt: string;
}

const articles: Article[] = [
  {
    category: "Anti-Inflammatory",
    title: "Turmeric, curcumin, and chronic inflammation — a deep dive",
    excerpt:
      "Chronic low-grade inflammation is linked to bloating, fatigue, and long-term health risk. Curcumin is one of the most studied natural anti-inflammatories in the world.",
  },
  {
    category: "Blood Sugar",
    title: "Ceylon cinnamon and blood sugar — why the type of cinnamon matters",
    excerpt:
      "Not all cinnamon is equal. Ceylon cinnamon has a meaningfully different effect on blood sugar stability than the Cassia variety most brands use. We chose Ceylon for a reason.",
  },
  {
    category: "Digestion",
    title: "Ginger extract and bloating — the clinical evidence",
    excerpt:
      "Ginger has been used for digestive support for centuries. Modern clinical studies now show exactly why — and the dosage that actually makes a difference.",
  },
  {
    category: "Energy",
    title: "Why blood sugar stability is the key to sustained energy — and how Flourish supports it",
    excerpt:
      "Energy crashes after meals are often a blood sugar response. Here's how the Flourish formula works to keep levels steady and energy consistent throughout the day.",
  },
  {
    category: "Fat Loss",
    title: "Apple cider vinegar and fat management — what the science says",
    excerpt:
      "ACV has been studied for its effects on appetite, blood sugar, and fat metabolism. We break down the evidence honestly.",
  },
  {
    category: "Gut Health",
    title: "What is inulin — and why is it in the Flourish formula?",
    excerpt:
      "Inulin is one of the most well-studied prebiotic fibres in existence. Here's what it does, why we use it, and what the research actually says.",
  },
  {
    category: "Immunity",
    title: "The role of your gut microbiome in immune function",
    excerpt:
      "Around 70% of your immune system lives in your gut. Discover how prebiotic fibre and anti-inflammatory ingredients support your body's natural defences.",
  },
  {
    category: "Mental Wellbeing",
    title: "The gut-brain axis — how your digestive health affects your mood",
    excerpt:
      "Your gut and brain communicate constantly via the vagus nerve. Emerging research shows that a healthier gut microbiome directly supports mood, focus, and mental clarity.",
  },
  {
    category: "Nutrient Absorption",
    title: "Why black pepper and turmeric belong together — the piperine effect",
    excerpt:
      "Black pepper doesn't just add warmth to the Flourish formula. Piperine increases curcumin absorption from turmeric by up to 2,000%. Here's why that matters.",
  },
  {
    category: "Skin",
    title: "How gut health affects your skin — the gut-skin axis explained",
    excerpt:
      "Your skin reflects what's happening inside your gut. Here's the science behind the connection and how supporting your microbiome can lead to a clearer, healthier complexion.",
  },
  {
    category: "Skin",
    title: "Lemon, vitamin C, and collagen synthesis — the skin connection",
    excerpt:
      "Lemon juice powder in the Flourish formula contributes natural vitamin C — a key cofactor in collagen production and skin brightness.",
  },
];

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

function JournalPage() {
  const [activeCategory, setActiveCategory] = useState("All Articles");

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
        <section className="pt-40 pb-10 px-6 lg:px-10 text-center">
          <Reveal>
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-6">
              ● FLOURISH JOURNAL
            </p>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground leading-[1.1]">
              Ingredients for a better life.
            </h1>
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

        <section className="pb-28 px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((article, i) => (
                <Reveal key={article.title} delay={i * 80}>
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
