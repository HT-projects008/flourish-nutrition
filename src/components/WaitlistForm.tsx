import { useState, type FormEvent } from "react";
import { submitWaitlist } from "../lib/submit-waitlist";

interface Props {
  id?: string;
  variant?: "light" | "dark";
  source?: string;
}

export function WaitlistForm({ id, variant = "light", source = "homepage" }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    const result = await submitWaitlist({ data: { email, source } });
    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setIsDuplicate(result.code === "DUPLICATE");
      setErrorMsg(result.error);
    }
  }

  const dark = variant === "dark";

  if (status === "success") {
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
    <div className="flex flex-col gap-3 w-full max-w-lg">
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
        <input
          id={id}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={status === "loading"}
          className={
            dark
              ? "flex-1 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-base text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary/60 disabled:opacity-60"
              : "flex-1 rounded-full border border-border bg-white px-5 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60"
          }
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={
            dark
              ? "rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-sm transition hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              : "rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition hover:brightness-105 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          }
        >
          {status === "loading" ? "Joining…" : "Join the Waitlist"}
        </button>
      </form>
      {status === "error" && (
        <p className={`text-sm text-center ${isDuplicate ? (dark ? "text-orange-300" : "text-orange-500") : (dark ? "text-red-400" : "text-red-600")}`}>
          {errorMsg}
        </p>
      )}
    </div>
  );
}
