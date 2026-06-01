import { useState, useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Menu, X, ChevronDown, ShoppingBag } from "lucide-react";
import { articles } from "../data/articles";

const currencies = [
  { code: "GBP", symbol: "£" },
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "AED", symbol: "د.إ" },
  { code: "AUD", symbol: "A$" },
  { code: "CAD", symbol: "C$" },
  { code: "SGD", symbol: "S$" },
];

const TOPICS = [
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

const LATEST_ARTICLES = articles.slice(0, 3);

export default function Nav() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [journalOpen, setJournalOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [currency, setCurrency] = useState(currencies[0]);
  const [mobileJournalOpen, setMobileJournalOpen] = useState(false);
  const [mobileCurrencyOpen, setMobileCurrencyOpen] = useState(false);

  const journalRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (journalRef.current && !journalRef.current.contains(e.target as Node)) {
        setJournalOpen(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) {
        setCurrencyOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // Close dropdowns on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setJournalOpen(false);
        setCurrencyOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [mobileMenuOpen]);

  const goHome = () => navigate({ to: "/" });
  const goShop = () => {
    setJournalOpen(false);
    navigate({ to: "/" });
    setTimeout(() => document.getElementById("flavours")?.scrollIntoView({ behavior: "smooth" }), 50);
  };
  const goWaitlist = () => {
    setJournalOpen(false);
    navigate({ to: "/" });
    setTimeout(() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" }), 50);
  };
  const goJournal = () => {
    setJournalOpen(false);
    setMobileMenuOpen(false);
    navigate({ to: "/journal" });
  };

  const navLinkClass = "text-sm text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer";

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 h-16 bg-white/95 backdrop-blur-sm border-b border-zinc-100">
        <div className="relative h-full mx-auto max-w-7xl px-8 grid grid-cols-3 items-center">

          {/* LEFT — desktop nav */}
          <nav className="hidden lg:flex items-center gap-8 justify-self-start">
            <button onClick={goShop} className={navLinkClass}>Shop</button>

            {/* Journal trigger */}
            <div ref={journalRef} className="relative">
              <button
                onClick={() => setJournalOpen((v) => !v)}
                aria-expanded={journalOpen}
                aria-controls="journal-dropdown"
                className={`${navLinkClass} flex items-center gap-1`}
              >
                Journal
                <ChevronDown
                  className={`size-3.5 opacity-60 transition-transform duration-150 ${journalOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            <button onClick={goWaitlist} className={navLinkClass}>About</button>
          </nav>

          {/* LEFT — mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            className="lg:hidden p-2 -ml-2 text-zinc-800 justify-self-start"
          >
            <Menu className="size-5" />
          </button>

          {/* CENTRE — wordmark */}
          <button
            onClick={goHome}
            className="justify-self-center font-serif text-xl font-bold text-orange-500 tracking-tight"
          >
            Flourish
          </button>

          {/* RIGHT — desktop */}
          <div className="hidden lg:flex items-center gap-6 justify-self-end">
            <div ref={currencyRef} className="relative">
              <button
                onClick={() => setCurrencyOpen((v) => !v)}
                className={navLinkClass}
              >
                {currency.code}
              </button>
              {currencyOpen && (
                <div
                  className="absolute right-0 top-[calc(100%+8px)] w-36 bg-white rounded-xl border border-zinc-100 shadow-md py-2 z-40"
                  style={{ animation: "navDropIn 180ms ease-out" }}
                >
                  {currencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => { setCurrency(c); setCurrencyOpen(false); }}
                      className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-zinc-50 transition-colors ${
                        currency.code === c.code ? "text-orange-500 font-medium" : "text-zinc-700"
                      }`}
                    >
                      <span>{c.code}</span>
                      <span className="opacity-60">{c.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <a href="#" className={navLinkClass}>Log in</a>
            <a href="#" className={navLinkClass}>Bag [ 0 ]</a>
          </div>

          {/* RIGHT — mobile bag */}
          <div className="lg:hidden ml-auto justify-self-end">
            <a href="#" className="flex items-center gap-1 p-2 text-zinc-800">
              <ShoppingBag className="size-5" />
              <span className="text-sm font-medium">[ 0 ]</span>
            </a>
          </div>
        </div>
      </header>

      {/* Journal dropdown — full width below nav */}
      <div
        id="journal-dropdown"
        className={`fixed top-16 inset-x-0 z-40 bg-white border-b border-zinc-100 shadow-sm transition-[opacity,transform] duration-[180ms] ease-out ${
          journalOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1.5 pointer-events-none"
        }`}
      >
        <div className="mx-auto max-w-7xl px-8 py-8 grid grid-cols-3 gap-12">
          {/* Column 1 — Featured */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-zinc-400 mb-4">Journal</p>
              <button
                onClick={goJournal}
                className="font-serif font-bold text-2xl text-zinc-900 hover:text-orange-500 transition-colors duration-150 text-left leading-snug"
              >
                All Articles →
              </button>
              <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                Science-backed reading on gut health and nutrition.
              </p>
            </div>
            <p className="text-zinc-300 text-xs mt-6">{articles.length} articles</p>
          </div>

          {/* Column 2 — Topics */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-zinc-400 mb-4">Browse by Topic</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
              {TOPICS.map((topic) => (
                <button
                  key={topic}
                  onClick={goJournal}
                  className="py-1 text-sm text-zinc-700 hover:text-orange-500 transition-colors duration-150 text-left"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3 — Latest */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-zinc-400 mb-4">Latest</p>
            <div className="space-y-1">
              {LATEST_ARTICLES.map((article) => (
                <button
                  key={article.slug}
                  onClick={goJournal}
                  className="group block py-1.5 text-left w-full"
                >
                  <span className="text-sm text-zinc-700 group-hover:text-orange-500 transition-colors duration-150 leading-snug">
                    {article.title}
                  </span>
                  <span className="block text-[11px] text-zinc-400 mt-0.5">{article.category}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu — backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-200 lg:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile menu — left-slide panel */}
      <div
        id="mobile-menu"
        className={`fixed top-0 left-0 h-full z-[70] w-72 max-w-[80vw] bg-white shadow-2xl flex flex-col will-change-transform transition-transform duration-[300ms] lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-50 transition-colors"
          aria-label="Close menu"
        >
          <X className="size-5 text-zinc-500" />
        </button>

        <div className="flex flex-col flex-1 pt-8 pb-6 px-6 overflow-y-auto">
          <button
            onClick={() => { setMobileMenuOpen(false); goHome(); }}
            className="font-serif text-lg font-bold text-orange-500 tracking-tight mb-8 text-left"
          >
            Flourish
          </button>

          <nav className="space-y-1">
            <button
              onClick={() => { setMobileMenuOpen(false); goShop(); }}
              className="block w-full text-left text-zinc-900 text-base font-medium hover:text-orange-500 transition-colors py-2"
            >
              Shop
            </button>

            {/* Journal accordion */}
            <div>
              <button
                onClick={() => setMobileJournalOpen((v) => !v)}
                className="flex w-full items-center justify-between text-zinc-900 text-base font-medium hover:text-orange-500 transition-colors py-2"
              >
                Journal
                <ChevronDown
                  className={`size-4 opacity-50 transition-transform duration-200 ${mobileJournalOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-[max-height] duration-200 ease-out ${mobileJournalOpen ? "max-h-96" : "max-h-0"}`}
              >
                <div className="pl-4 space-y-3 pt-2 pb-3">
                  <button
                    onClick={goJournal}
                    className="block text-sm text-zinc-600 hover:text-orange-500 transition-colors"
                  >
                    All Articles
                  </button>
                  {TOPICS.map((topic) => (
                    <button
                      key={topic}
                      onClick={goJournal}
                      className="block text-sm text-zinc-600 hover:text-orange-500 transition-colors"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => { setMobileMenuOpen(false); goWaitlist(); }}
              className="block w-full text-left text-zinc-900 text-base font-medium hover:text-orange-500 transition-colors py-2"
            >
              About
            </button>
          </nav>

          <div className="border-t border-zinc-100 my-6" />

          {/* Currency accordion */}
          <div>
            <button
              onClick={() => setMobileCurrencyOpen((v) => !v)}
              className="flex w-full items-center justify-between text-zinc-900 text-sm font-medium hover:text-orange-500 transition-colors py-2"
            >
              <span>Currency</span>
              <span className="flex items-center gap-1.5">
                <span className="text-orange-500 font-medium">{currency.code}</span>
                <ChevronDown
                  className={`size-3.5 opacity-50 transition-transform duration-200 ${mobileCurrencyOpen ? "rotate-180" : ""}`}
                />
              </span>
            </button>
            <div
              className={`overflow-hidden transition-[max-height] duration-200 ease-out ${mobileCurrencyOpen ? "max-h-60" : "max-h-0"}`}
            >
              <div className="pl-4 space-y-1 pt-1 pb-3">
                {currencies.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => { setCurrency(c); setMobileCurrencyOpen(false); }}
                    className={`flex w-full items-center gap-2 py-1.5 text-sm transition-colors ${
                      currency.code === c.code ? "text-orange-500 font-medium" : "text-zinc-600 hover:text-orange-500"
                    }`}
                  >
                    <span>{c.code}</span>
                    <span className="opacity-60 text-xs">{c.symbol}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <a href="#" className="block text-zinc-500 text-sm hover:text-zinc-900 transition-colors">
              Log in
            </a>
            <a href="#" className="block text-zinc-500 text-sm hover:text-zinc-900 transition-colors">
              Bag [ 0 ]
            </a>
          </div>

          <div className="mt-auto pt-6">
            <p className="text-zinc-300 text-xs">© 2025 Flourish. All rights reserved.</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes navDropIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
