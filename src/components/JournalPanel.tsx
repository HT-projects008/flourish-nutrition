import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { X, ArrowRight, ChevronDown } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { articles } from "../data/articles";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CATEGORIES = [
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

const PANEL_GRADIENT = "linear-gradient(135deg, #D4744A 0%, #E8B84B 50%, #C4445A 100%)";

function Panel({ open, onClose }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) setActiveCategory(null);
  }, [open]);

  const handleScroll = () => {
    if (!scrollRef.current || !heroImgRef.current) return;
    heroImgRef.current.style.transform = `translateY(${scrollRef.current.scrollTop * 0.4}px)`;
  };

  const goJournal = () => {
    onClose();
    navigate({ to: "/journal" });
  };

  const filteredArticles = activeCategory
    ? articles.filter((a) => a.category === activeCategory)
    : articles.slice(0, 3);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-[400ms] ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full z-[70] w-full max-w-2xl bg-[var(--color-cream)] shadow-2xl transition-transform duration-[400ms] ease-in-out flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          aria-label="Close"
        >
          <X className="size-4 text-zinc-700" />
        </button>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto"
        >
          {/* Hero */}
          <div className="relative h-64 overflow-hidden">
            <div
              ref={heroImgRef}
              className="absolute inset-0 w-full"
              style={{ background: PANEL_GRADIENT, height: "140%", top: "-20%" }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
              <h2 className="font-serif text-2xl font-bold text-white leading-tight">
                How Flourish helps you...
              </h2>
              <ChevronDown className="mt-4 size-6 text-white animate-bounce-slow" />
            </div>
          </div>

          {/* All Articles */}
          <div className="px-6 pt-6 pb-2">
            <button
              onClick={goJournal}
              className="w-full bg-white rounded-2xl p-4 flex items-center justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <span className="font-serif font-semibold text-zinc-900">All Articles</span>
                <span className="ml-2 text-zinc-400 text-sm">({articles.length})</span>
              </div>
              <ArrowRight className="size-4 text-orange-500 flex-shrink-0" />
            </button>
          </div>

          {/* Category pills */}
          <div className="px-6 pt-4">
            <p className="text-zinc-400 text-xs uppercase tracking-widest mb-3">Browse by topic</p>
            <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
              {CATEGORIES.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(active ? null : cat)}
                    className={`rounded-full px-4 py-1.5 text-xs whitespace-nowrap cursor-pointer transition-colors flex-shrink-0 ${
                      active
                        ? "bg-orange-500 text-white"
                        : "border border-zinc-300 text-zinc-500"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Article list */}
          <div className="px-6 pb-10 mt-2">
            {filteredArticles.map((article) => (
              <button
                key={article.slug}
                onClick={goJournal}
                className="w-full flex items-start py-5 border-b border-zinc-200 hover:bg-white/60 rounded-xl px-2 -mx-2 transition-colors text-left"
              >
                <div className="w-20 h-20 rounded-xl bg-zinc-100 flex-shrink-0" />
                <div className="ml-4 flex-1 min-w-0">
                  <p className="text-orange-500 text-xs uppercase tracking-wider mb-1">
                    {article.category}
                  </p>
                  <p className="font-serif font-bold text-sm leading-snug text-zinc-900">
                    {article.title}
                  </p>
                  <p className="text-zinc-400 text-xs mt-1">Read more →</p>
                </div>
              </button>
            ))}

            {!activeCategory && (
              <button
                onClick={goJournal}
                className="mt-6 text-orange-500 text-sm font-medium"
              >
                See all {articles.length} articles →
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default function JournalPanel(props: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return ReactDOM.createPortal(<Panel {...props} />, document.body);
}
