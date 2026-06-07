import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CheckCircle } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { sendContactEmail } from "../lib/send-contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Flourish" },
      {
        name: "description",
        content:
          "Questions about Flourish, need help with an order, or want to say hello? We'd love to hear from you.",
      },
    ],
    links: [{ rel: "canonical", href: "https://flourish-nutrition.henrytaylor-projects.workers.dev/contact" }],
  }),
  component: ContactPage,
});

const REQUEST_TYPES = [
  "General enquiry",
  "Order help",
  "Subscription question",
  "Product feedback",
  "Wholesale / stockist enquiry",
  "Press / media",
  "Something else",
];

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [requestType, setRequestType] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name || !email || !requestType || !message) return;
    setStatus("loading");
    try {
      await sendContactEmail({
        data: { name, email, requestType, orderNumber: orderNumber || undefined, message },
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-colors";
  const labelClass = "block text-sm font-medium text-zinc-700 mb-1.5";

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      <Nav />

      {/* Header */}
      <section className="py-20 px-6 text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 bg-orange-500/10 text-orange-500 rounded-full px-4 py-1.5 text-xs uppercase tracking-widest font-medium">
          ● Get in Touch
        </span>
        <h1 className="font-serif text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight mt-4">
          We'd love to hear from you.
        </h1>
        <p className="text-zinc-500 mt-4 text-base leading-relaxed">
          Whether you have a question about Flourish, need help with an order, or just want to say hello — we're here.
        </p>
      </section>

      {/* Form */}
      <div className="max-w-xl mx-auto px-6 pb-20">
        {status === "success" ? (
          <div className="bg-white rounded-3xl p-10 border border-zinc-100 text-center">
            <CheckCircle className="w-12 h-12 text-orange-500 mx-auto" strokeWidth={1.5} />
            <h2 className="font-serif text-2xl font-bold text-zinc-900 mt-5">Message sent!</h2>
            <p className="text-zinc-500 text-sm mt-2 leading-relaxed">
              We'll get back to you within 24 hours.
            </p>
            <Link
              to="/"
              className="inline-block mt-6 text-sm text-zinc-500 hover:text-orange-500 transition-colors"
            >
              ← Back to Flourish
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 border border-zinc-100">
            <form onSubmit={onSubmit} className="flex flex-col gap-5">
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className={labelClass}>
                  Full name <span className="text-orange-500">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className={labelClass}>
                  Email address <span className="text-orange-500">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={inputClass}
                />
              </div>

              {/* Request type */}
              <div>
                <label htmlFor="contact-type" className={labelClass}>
                  What can we help with? <span className="text-orange-500">*</span>
                </label>
                <select
                  id="contact-type"
                  required
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  <option value="" disabled>
                    Select a topic...
                  </option>
                  {REQUEST_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Order number */}
              <div>
                <label htmlFor="contact-order" className={labelClass}>
                  Order number (optional)
                </label>
                <input
                  id="contact-order"
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="e.g. FLR-00123"
                  className={inputClass}
                />
                <p className="text-zinc-400 text-xs mt-1">
                  Only needed if your enquiry relates to a specific order
                </p>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className={labelClass}>
                  Your message <span className="text-orange-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us how we can help..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {status === "error" && (
                <p className="text-red-500 text-sm">
                  Something went wrong — please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-orange-500 text-white rounded-full py-3 font-medium text-sm mt-2 hover:bg-orange-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send message"
                )}
              </button>
            </form>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
