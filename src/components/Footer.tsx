import { Reveal } from "./Reveal";

const footerLinks = [
  { label: "Shop", href: "/#flavours" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[oklch(0.18_0.015_60)] text-background/85">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <Reveal>
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4">
              <a href="/" className="font-serif text-3xl font-semibold text-primary">Flourish</a>
              <p className="mt-2 text-background/60 italic">Feel lighter. Every day.</p>
            </div>
            <nav className="lg:col-span-4 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {footerLinks.map((l) => (
                <a key={l.label} href={l.href} className="hover:text-primary transition">
                  {l.label}
                </a>
              ))}
              <a href="/contact" className="hover:text-primary transition">Contact</a>
            </nav>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-16 pt-8 border-t border-background/15 flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-xs text-background/55">
            <p>© 2025 Flourish. All rights reserved.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a href="#" className="hover:text-primary transition">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition">Terms</a>
              <a href="/contact" className="hover:text-primary transition">Contact</a>
              <a href="#" className="hover:text-primary transition">Instagram</a>
              <a href="#" className="hover:text-primary transition">TikTok</a>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
