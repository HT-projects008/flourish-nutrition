import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

// TODO: Replace with actual Flourish WhatsApp number
const WA_HREF =
  "https://wa.me/447700000000?text=Hi%20Flourish%2C%20I%20have%20a%20question%20about%20your%20product";

function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={WA_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Text us on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 50,
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        backgroundColor: "#25D366",
        color: "#fff",
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "12px",
        paddingBottom: "12px",
        borderRadius: "9999px",
        boxShadow: "0 4px 12px rgba(37,211,102,0.3)",
        fontWeight: 500,
        fontSize: "14px",
        cursor: "pointer",
        transition: "filter 0.2s, transform 0.2s",
        filter: hovered ? "brightness(1.05)" : "brightness(1)",
        transform: hovered ? "scale(1.02)" : "scale(1)",
        textDecoration: "none",
      }}
      className="wa-float"
    >
      {/* Simple WhatsApp icon */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      <span className="hidden sm:inline">Text us</span>
      {/* Desktop tooltip */}
      {hovered && (
        <span
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            right: 0,
            backgroundColor: "#18181b",
            color: "#fff",
            fontSize: "12px",
            padding: "6px 12px",
            borderRadius: "8px",
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
          className="hidden lg:block"
        >
          Get a quick response on WhatsApp
        </span>
      )}
    </a>
  );
}

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

          {/* LEFT — desktop: text links | mobile: hamburger */}
          <div className="flex items-center gap-5">
            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-8">
              <a
                href="/#flavours"
                className="text-sm text-zinc-700 hover:text-zinc-900 transition-colors"
              >
                Shop
              </a>
              <Link
                to="/journal"
                className="text-sm text-zinc-700 hover:text-zinc-900 transition-colors"
              >
                Science
              </Link>
              <a
                href="/#waitlist"
                className="text-sm text-zinc-700 hover:text-zinc-900 transition-colors"
              >
                About
              </a>
            </div>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden flex items-center justify-center -ml-1 text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
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

      <WhatsAppButton />
    </>
  );
}
