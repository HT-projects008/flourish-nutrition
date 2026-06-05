import { Link, useLocation } from "@tanstack/react-router";
import { Reveal } from "./Reveal";

const footerLinks = [
  { label: "Science", href: "/journal" },
  { label: "About", href: "/#waitlist" },
];

const year = new Date().getFullYear();

export default function Footer() {
  const location = useLocation();
  const contactHref = location.pathname === "/" ? "#contact" : "/#contact";

  return (
    <footer className="bg-[oklch(0.18_0.015_60)] text-background/85">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <Reveal>
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4">
              <Link to="/" className="font-serif text-3xl font-semibold text-primary">
                Flourish
              </Link>
              <p className="mt-2 text-background/60 italic">Feel lighter. Every day.</p>
              <p className="mt-3 text-background/40 text-xs">Launching 2026</p>
            </div>
            <nav aria-label="Footer links" className="lg:col-span-4 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {footerLinks.map((l) => (
                <a key={l.label} href={l.href} className="hover:text-primary transition">
                  {l.label}
                </a>
              ))}
              <a
                href={contactHref}
                className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-16 pt-8 border-t border-background/15 flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-xs text-background/55">
            <p>© {year} Flourish. All rights reserved.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <span className="opacity-50 cursor-default">Privacy Policy</span>
              <span className="opacity-50 cursor-default">Terms</span>
              <span className="opacity-50 cursor-default">Instagram</span>
              <span className="opacity-50 cursor-default">TikTok</span>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
