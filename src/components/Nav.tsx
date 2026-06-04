import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Body scroll lock when panel is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 h-16 bg-white/95 backdrop-blur-sm border-b border-zinc-100">
        <div className="relative h-full mx-auto max-w-7xl px-6 flex items-center justify-between">

          {/* LEFT — hamburger + desktop Science link */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center justify-center -ml-1 text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link
              to="/journal"
              className="hidden lg:inline text-sm text-zinc-700 hover:text-zinc-900 transition-colors"
            >
              Science
            </Link>
          </div>

          {/* CENTRE — wordmark (absolutely centred) */}
          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 font-serif text-xl font-bold text-orange-500 tracking-tight"
          >
            Flourish
          </Link>

          {/* RIGHT — Get Early Access CTA */}
          <a
            href="#waitlist"
            className="inline-flex items-center rounded-full bg-primary px-5 py-2 lg:px-6 lg:py-2.5 text-xs lg:text-sm font-semibold text-primary-foreground shadow-sm hover:brightness-95 active:scale-[0.97] transition-[filter,transform] duration-150"
          >
            Get Early Access
          </a>
        </div>
      </header>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Slide-in panel — from left */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-white z-50 flex flex-col transition-transform duration-[350ms] ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Navigation menu"
        aria-hidden={!menuOpen}
      >
        {/* Panel header */}
        <div className="px-6 pt-8 pb-2 relative flex items-center">
          <span className="font-serif text-lg font-bold text-orange-500">Flourish</span>
          <button
            onClick={close}
            className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary nav links */}
        <nav className="px-3 mt-6 space-y-0.5 flex-1" aria-label="Site navigation">
          <a
            href="/#flavours"
            onClick={close}
            className="block px-3 py-3 text-base font-medium text-zinc-800 rounded-xl hover:bg-zinc-50 hover:text-orange-500 transition-colors"
          >
            Shop
          </a>
          <Link
            to="/journal"
            onClick={close}
            className="block px-3 py-3 text-base font-medium text-zinc-800 rounded-xl hover:bg-zinc-50 hover:text-orange-500 transition-colors"
          >
            Science
          </Link>
          <a
            href="/#waitlist"
            onClick={close}
            className="block px-3 py-3 text-base font-medium text-zinc-800 rounded-xl hover:bg-zinc-50 hover:text-orange-500 transition-colors"
          >
            About
          </a>
        </nav>

        {/* Divider + secondary CTA */}
        <div>
          <div className="border-t border-zinc-100 mx-6 my-4" />
          <div className="px-6 pb-2">
            <a
              href="#waitlist"
              onClick={close}
              className="block text-sm font-medium text-orange-500 py-2"
            >
              Get Early Access →
            </a>
          </div>
        </div>

        {/* Panel footer */}
        <div className="px-6 pb-8">
          <p className="text-zinc-300 text-xs">© 2026 Flourish</p>
        </div>
      </aside>
    </>
  );
}
