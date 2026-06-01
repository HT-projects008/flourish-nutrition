import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const onJournal = pathname === "/journal";
  const shopHref = onJournal ? "/#flavours" : "#flavours";
  const waitlistHref = onJournal ? "/#waitlist" : "#waitlist";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-18 py-4 flex items-center justify-between">
        <a href="/" className="font-serif text-2xl font-semibold text-primary tracking-tight">
          Flourish
        </a>
        <nav className="hidden lg:flex items-center gap-10">
          <a href={shopHref} className="text-sm font-medium text-foreground/75 hover:text-primary transition-colors">
            Shop
          </a>
          <Link to="/journal" className="text-sm font-medium text-foreground/75 hover:text-primary transition-colors">
            Journal
          </Link>
          <a href="#" className="text-sm font-medium text-foreground/75 hover:text-primary transition-colors">
            About
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={waitlistHref}
            className="hidden sm:inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-95 transition"
          >
            Join Waitlist
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 -mr-2 text-foreground"
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden bg-white border-t border-border px-6 py-6 flex flex-col gap-5">
          <a href={shopHref} onClick={() => setOpen(false)} className="text-base font-medium text-foreground">
            Shop
          </a>
          <Link to="/journal" onClick={() => setOpen(false)} className="text-base font-medium text-foreground">
            Journal
          </Link>
          <a href="#" onClick={() => setOpen(false)} className="text-base font-medium text-foreground">
            About
          </a>
          <a
            href={waitlistHref}
            onClick={() => setOpen(false)}
            className="sm:hidden inline-flex justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            Join Waitlist
          </a>
        </div>
      )}
    </header>
  );
}
