import { useState, useEffect, useRef } from "react";
import { useLocation } from "@tanstack/react-router";
import { Menu, X, ChevronDown, Check } from "lucide-react";
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
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

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 h-16 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-sm border-b border-zinc-100" : "bg-transparent"
        }`}
      >
        <div className="relative h-full mx-auto max-w-7xl px-6 lg:px-10 flex items-center">

          {/* LEFT */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href={shopHref} className="text-sm font-medium text-zinc-800 hover:text-orange-500 transition-colors">
              Shop
            </a>
            <button
              onClick={() => setPanelOpen(true)}
              className="text-sm font-medium text-zinc-800 hover:text-orange-500 transition-colors"
            >
              Journal
            </button>
            <a href={aboutHref} className="text-sm font-medium text-zinc-800 hover:text-orange-500 transition-colors">
              About
            </a>
          </nav>

          {/* CENTRE */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <a href="/" className="font-serif text-xl font-bold text-orange-500 tracking-tight">
              Flourish
            </a>
          </div>

          {/* RIGHT */}
          <div className="hidden lg:flex items-center gap-6 ml-auto">
            {/* Currency */}
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

          {/* MOBILE — hamburger only */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden ml-auto p-2 text-zinc-800"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-zinc-100 px-6 py-6 flex flex-col gap-5">
            <a href={shopHref} onClick={() => setMobileOpen(false)} className="text-base font-medium text-zinc-800">
              Shop
            </a>
            <button
              onClick={() => { setMobileOpen(false); setPanelOpen(true); }}
              className="text-base font-medium text-zinc-800 text-left"
            >
              Journal
            </button>
            <a href={aboutHref} onClick={() => setMobileOpen(false)} className="text-base font-medium text-zinc-800">
              About
            </a>
            <a
              href={onHome ? "#waitlist" : "/#waitlist"}
              onClick={() => setMobileOpen(false)}
              className="inline-flex justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              Join Waitlist
            </a>
          </div>
        )}
      </header>

      <JournalPanel open={panelOpen} onClose={() => setPanelOpen(false)} />
    </>
  );
}
