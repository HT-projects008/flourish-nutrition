import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "../components/ContactForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Flourish" },
      { name: "description", content: "Get in touch with the Flourish team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      <div className="mx-auto max-w-3xl w-full px-6 lg:px-10 py-32">
        <a href="/" className="font-serif text-2xl font-semibold text-primary tracking-tight mb-16 block">
          Flourish
        </a>
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6">
          Get in Touch
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground leading-[1.1] mb-4">
          We'd love to hear from you.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-12">
          Questions about the formula, the waitlist, or anything else? Drop us a message and we'll get back to you shortly.
        </p>
        <ContactForm />
      </div>
    </div>
  );
}
