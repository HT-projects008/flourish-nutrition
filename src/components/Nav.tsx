import { useState, useEffect, useRef } from "react";
import { useLocation } from "@tanstack/react-router";
import { Menu, X, ChevronDown, Check, ShoppingBag } from "lucide-react";
import JournalPanel from "./JournalPanel";

const currencies = [
  { flag: "🇬🇧", code: "GBP", symbol: "£", name: "British Pound" },
  { flag: "🇺🇸", code: "USD", symbol: "$", name: "US Dollar" },
  { flag: "🇪🇺", code: "EUR", symbol: "€", name: "Euro" },
  { flag: "🇦🇪", code: "AED", symbol: "د.إ", name: "UAE Dirham" },
  { flag: "🇦🇺", code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { flag: "🇨🇦", code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { flag: "🇸🇬", code: "SGD", symbol: "S$", name: "Singapore Dollar" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [journalOpen, setJournalOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [currency, setCurrency] = useState(currencies[0]);
  const currencyRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const shopHref = onHome ? "#flavours" : "/#flavours";
  const aboutHref = onHome ? "#waitlist" : "/#waitlist";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) {
        setCurrencyOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 h-16 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-sm border-b border-zinc-100" : "bg-transparent"
        }`}
      >
        <div className="relative h-full mx-auto max-w-7xl px-6 lg:px-10 flex items-center">

          {/* LEFT — desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href={shopHref} className="text-sm font-medium text-zinc-800 hover:text-orange-500 transition-colors">
              Shop
            </a>
            <button
              onClick={() => setJournalOpen(true)}
              className="text-sm font-medium text-zinc-800 hover:text-orange-500 transition-colors"
            >
              Journal
            </button>
            <a href={aboutHref} className="text-sm font-medium text-zinc-800 hover:text-orange-500 transition-colors">
              About
            </a>
          </nav>

          {/* LEFT — mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 text-zinc-800"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>

          {/* CENTRE — wordmark */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <a href="/" className="font-serif text-xl font-bold text-orange-500 tracking-tight">
              Flourish
            </a>
          </div>

          {/* RIGHT — desktop */}
          <div className="hidden lg:flex items-center gap-6 ml-auto">
            <div ref={currencyRef} className="relative">
              <button
                onClick={() => setCurrencyOpen((v) => !v)}
                className="flex items-center gap-1.5 text-sm font-medium text-zinc-800 hover:text-orange-500 transition-colors"
              >
                {currency.symbol} {currency.code}
                <ChevronDown className="size-3.5 opacity-60" />
              </button>
              {currencyOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-xl p-2 z-50 min-w-[240px]">
                  {currencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => { setCurrency(c); setCurrencyOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-zinc-50 transition-colors text-left"
                    >
                      <span className="text-base leading-none">{c.flag}</span>
                      <span className="text-sm font-medium text-zinc-800">{c.code}</span>
                      <span className="text-sm text-zinc-400">— {c.symbol}</span>
                      <span className="text-xs text-zinc-400 ml-auto">{c.name}</span>
                      {currency.code === c.code && (
                        <Check className="size-3.5 text-orange-500 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <a href="#" className="text-sm font-medium text-zinc-800 hover:text-orange-500 transition-colors">
              Log in
            </a>
            <a href="#" className="text-sm font-medium text-zinc-800 hover:text-orange-500 transition-colors">
              Bag [0]
            </a>
          </div>

          {/* RIGHT — mobile bag */}
          <div className="lg:hidden ml-auto">
            <a href="#" className="flex items-center gap-1 p-2 text-zinc-800">
              <ShoppingBag className="size-5" />
              <span className="text-sm font-medium">[0]</span>
            </a>
          </div>
        </div>
      </header>

      {/* Mobile menu — backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-[350ms] lg:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile menu — left-slide panel */}
      <div
        className={`fixed top-0 left-0 h-full z-[70] w-72 max-w-[80vw] bg-white shadow-2xl flex flex-col transition-transform duration-[350ms] ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-50 transition-colors"
          aria-label="Close menu"
        >
          <X className="size-5 text-zinc-500" />
        </button>

        <div className="flex flex-col flex-1 pt-8 pb-6 px-6 overflow-y-auto">
          <a
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-lg font-bold text-orange-500 tracking-tight mb-8 inline-block"
          >
            Flourish
          </a>

          <nav className="space-y-6">
            <a
              href={shopHref}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-zinc-900 text-base font-medium hover:text-orange-500 transition-colors"
            >
              Shop
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setTimeout(() => setJournalOpen(true), 350);
              }}
              className="block w-full text-left text-zinc-900 text-base font-medium hover:text-orange-500 transition-colors"
            >
              Journal
            </button>
            <a
              href={aboutHref}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-zinc-900 text-base font-medium hover:text-orange-500 transition-colors"
            >
              About
            </a>
          </nav>

          <div className="border-t border-zinc-100 my-6" />

          <div className="space-y-4">
            <div>
              <p className="text-zinc-400 text-xs uppercase tracking-widest mb-2">Currency</p>
              <div className="space-y-1">
                {currencies.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setCurrency(c)}
                    className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-zinc-50 transition-colors text-left"
                  >
                    <span className="text-base leading-none">{c.flag}</span>
                    <span className="text-sm font-medium text-zinc-700">{c.code}</span>
                    <span className="text-xs text-zinc-400 flex-1">{c.name}</span>
                    {currency.code === c.code && (
                      <span className="size-2 rounded-full bg-orange-500 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <a href="#" className="block text-zinc-500 text-sm hover:text-zinc-900 transition-colors">
              Log in
            </a>
            <a href="#" className="block text-zinc-500 text-sm hover:text-zinc-900 transition-colors">
              Bag [0]
            </a>
          </div>

          <div className="mt-auto pt-6">
            <p className="text-zinc-300 text-xs">© 2025 Flourish. All rights reserved.</p>
          </div>
        </div>
      </div>

      <JournalPanel open={journalOpen} onClose={() => setJournalOpen(false)} />
    </>
  );
}
