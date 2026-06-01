import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { X, ArrowRight } from "lucide-react";
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

function Panel({ open, onClose }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) setActiveCategory(null);
  }, [open]);

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
        className={`fixed top-0 right-0 h-full z-[70] w-full max-w-2xl bg-white shadow-2xl transition-transform duration-[400ms] ease-in-out flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-zinc-100 flex-shrink-0">
          <h2 className="font-serif font-bold text-xl text-zinc-900">Journal</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-50 transition-colors"
            aria-label="Close"
          >
            <X className="size-4 text-zinc-400 hover:text-zinc-900 transition-colors" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          {/* All Articles */}
          <div className="px-6 pt-5 pb-2">
            <button
              onClick={goJournal}
              className="w-full bg-zinc-50 rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-zinc-100 transition-colors"
            >
              <div className="flex items-center">
                <span className="font-semibold text-zinc-900">All Articles</span>
                <span className="ml-1 text-zinc-400 text-sm">({articles.length})</span>
              </div>
              <ArrowRight className="size-4 text-orange-500 flex-shrink-0" />
            </button>
          </div>

          {/* Browse by topic */}
          <div className="px-6 pt-5">
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
                        : "border border-zinc-200 text-zinc-500 bg-transparent"
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
                className="w-full flex items-start py-5 border-b border-zinc-100 hover:bg-zinc-50 rounded-xl px-2 -mx-2 transition-colors text-left"
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
                View all articles →
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
