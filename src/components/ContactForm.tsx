import { useState, type FormEvent } from "react";
import { sendContactEmail } from "../lib/send-contact";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name || !email || !message) return;
    setStatus("loading");
    try {
      await sendContactEmail({ data: { name, email, message } });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-primary/10 border border-primary/30 px-8 py-10 text-center">
        <p className="font-serif text-2xl font-semibold text-foreground">Thanks for reaching out.</p>
        <p className="mt-3 text-muted-foreground">We'll get back to you within 1–2 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 w-full">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="rounded-xl border border-border bg-white px-5 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="rounded-xl border border-border bg-white px-5 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we help?"
          className="rounded-xl border border-border bg-white px-5 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong — please try again or email us directly.</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="self-start rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-sm transition hover:brightness-95 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
