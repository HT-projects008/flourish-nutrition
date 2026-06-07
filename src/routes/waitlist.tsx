import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle, Loader2, Lock, Leaf } from "lucide-react";
import { submitWaitlist } from "../lib/submit-waitlist";

export const Route = createFileRoute("/waitlist")({
  head: () => ({
    meta: [
      { title: "Join the Waitlist — Flourish" },
      {
        name: "description",
        content:
          "Be the first to try Flourish. Join the waitlist for early access and 20% off your first order.",
      },
    ],
    links: [{ rel: "canonical", href: "https://flourish.com/waitlist" }],
  }),
  component: WaitlistPage,
});

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const BENEFITS = ["8 organic ingredients", "Before every meal", "Made in the UK"] as const;

function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const result = await submitWaitlist({ data: { email, source: "waitlist-page" } });
    if (result.success) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
      setIsDuplicate(result.code === "DUPLICATE");
      setMessage(result.error);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* LEFT — gradient visual, desktop only */}
      <div
        className="hidden lg:flex relative flex-col overflow-hidden"
        style={{ background: "linear-gradient(135deg, #D4744A 0%, #D4744A 55%, #C4441A 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: GRAIN_SVG, opacity: 0.08 }}
        />
        <div className="relative z-10 p-8">
          <Link to="/" className="font-serif text-2xl font-bold text-white tracking-tight">
            Flourish
          </Link>
        </div>
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-12">
          <div className="max-w-xs">
            <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-medium text-white">
              <Leaf className="size-3" />
              Founding member offer
            </div>
            <h2 className="font-serif text-5xl font-bold text-white leading-tight">
              Feel lighter.
              <br />
              Every day.
            </h2>
            <p className="mt-4 text-white/80 text-sm leading-relaxed">
              The gut health formula built on 8 organic ingredients — designed to reduce bloating and support digestion, naturally.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {BENEFITS.map((badge) => (
                <span key={badge} className="rounded-full bg-white/20 text-white px-3 py-1 text-xs">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT — form */}
      <div className="relative flex flex-col min-h-screen bg-white">
        {/* Mobile gradient accent bar */}
        <div
          className="lg:hidden h-1.5 w-full flex-shrink-0"
          style={{ background: "linear-gradient(90deg, #D4744A, #D4744A)" }}
        />

        <main id="main-content" className="flex-1 flex flex-col items-center justify-center px-6 sm:px-10 lg:px-16 py-12">
          <Link
            to="/"
            className="lg:hidden font-serif text-xl font-bold mb-10 self-start"
            style={{ color: "#D4744A" }}
          >
            Flourish
          </Link>

          <div className="w-full max-w-sm">
            {status === "success" ? (
              <div className="text-center">
                <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-orange-50">
                  <CheckCircle className="size-7 text-primary" />
                </div>
                <h1 className="font-serif text-3xl font-bold text-zinc-900">
                  You're in. Welcome to Flourish.
                </h1>
                <p className="mt-3 text-zinc-600 text-sm leading-relaxed">
                  Your 20% founding member discount is reserved. We'll send it straight to your inbox the moment we launch — no action needed.
                </p>
                <Link
                  to="/"
                  className="mt-8 inline-block text-sm font-medium hover:underline"
                  style={{ color: "#D4744A" }}
                >
                  ← Back to Flourish
                </Link>
              </div>
            ) : (
              <>
                {/* Founding member badge */}
                <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1.5 text-xs font-medium">
                  <Leaf className="size-3" />
                  Founding member — 20% off at launch
                </div>

                <h1 className="font-serif text-3xl lg:text-4xl font-bold text-zinc-900 mb-3">
                  Be first to Flourish.
                </h1>
                <p className="text-zinc-600 text-sm mb-6 leading-relaxed">
                  Flourish launches soon. Secure your founding member discount — 20% off your first order, reserved exclusively for waitlist subscribers.
                </p>

                {/* Mobile benefit pills — hidden on desktop (desktop left panel shows these) */}
                <div className="lg:hidden flex flex-wrap gap-1.5 mb-6">
                  {BENEFITS.map((b) => (
                    <span key={b} className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">
                      {b}
                    </span>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-0">
                  <label htmlFor="waitlist-page-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="waitlist-page-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    disabled={status === "loading"}
                    className="w-full px-4 py-3.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="mt-3 w-full flex items-center justify-center gap-2 bg-primary hover:brightness-95 active:brightness-90 text-white font-semibold text-sm py-3.5 rounded-xl transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "loading" && <Loader2 className="size-4 animate-spin" />}
                    {status === "loading" ? "Joining…" : "Claim My 20% Off"}
                  </button>
                </form>

                {status === "error" && (
                  <p className={`mt-2 text-sm text-center ${isDuplicate ? "text-primary" : "text-red-500"}`}>
                    {message}
                  </p>
                )}

                <p className="mt-4 text-zinc-400 text-xs text-center flex items-center justify-center gap-1.5">
                  <Lock className="size-3 shrink-0" />
                  No spam. Your discount is held until launch. Unsubscribe anytime.
                </p>
              </>
            )}
          </div>
        </main>

        <div className="flex justify-center pb-6 flex-shrink-0">
          <Link to="/" className="text-zinc-400 text-xs hover:text-zinc-600 transition-colors">
            ← Back to Flourish
          </Link>
        </div>
      </div>

    </div>
  );
}
