import { Link } from "@tanstack/react-router";

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 h-16 bg-white/95 backdrop-blur-sm border-b border-zinc-100">
      <div className="relative h-full mx-auto max-w-7xl px-8 flex items-center justify-between">

        {/* LEFT — Journal link (desktop) / Flourish wordmark (mobile) */}
        <div>
          <Link
            to="/journal"
            className="hidden lg:inline text-sm text-zinc-700 hover:text-zinc-900 transition-colors"
          >
            Journal
          </Link>
          <Link
            to="/"
            className="lg:hidden font-serif text-xl font-bold text-orange-500 tracking-tight"
          >
            Flourish
          </Link>
        </div>

        {/* CENTRE — wordmark (desktop, absolutely centred) */}
        <Link
          to="/"
          className="hidden lg:block absolute left-1/2 -translate-x-1/2 font-serif text-xl font-bold text-orange-500 tracking-tight"
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
  );
}
