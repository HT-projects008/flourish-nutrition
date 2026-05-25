import { useState, type FormEvent } from "react";

export function WaitlistForm({ id, variant = "light" }: { id?: string; variant?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  const dark = variant === "dark";

  if (submitted) {
    return (
      <div
        className={
          dark
            ? "rounded-full bg-white/10 border border-white/20 px-6 py-4 text-white text-center"
            : "rounded-xl bg-primary/10 border border-primary/30 px-5 py-4 text-primary"
        }
      >
        You're on the list 🌿 We'll be in touch soon.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
      <input
        id={id}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className={
          dark
            ? "flex-1 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-base text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary/60"
            : "flex-1 rounded-full border border-border bg-white px-5 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
        }
      />
      <button
        type="submit"
        className={
          dark
            ? "rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-sm transition hover:brightness-110 active:scale-[0.98]"
            : "rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition hover:brightness-105 active:scale-[0.98]"
        }
      >
        Join the Waitlist
      </button>
    </form>
  );
}
