import { createFileRoute, Link } from "@tanstack/react-router";
import { articles } from "../data/articles";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const Route = createFileRoute("/journal/$slug")({
  head: ({ params }) => {
    const article = articles.find((a) => a.slug === params.slug);
    return {
      meta: article
        ? [
            { title: `${article.title} — Flourish Journal` },
            { name: "description", content: article.excerpt },
          ]
        : [{ title: "Article not found — Flourish Journal" }],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-[var(--color-cream)]">
        <Nav />
        <main className="mx-auto max-w-3xl px-6 lg:px-10 py-32 text-center">
          <h1 className="font-serif text-4xl font-bold text-foreground">Article not found</h1>
          <Link to="/journal" className="mt-8 inline-block text-primary hover:underline">
            ← Back to Journal
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      <Nav />
      <main className="mx-auto max-w-3xl px-6 lg:px-10 py-32">
        <Link to="/journal" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          ← Journal
        </Link>
        <p className="mt-8 text-xs font-semibold tracking-[0.2em] uppercase text-primary">
          {article.category}
        </p>
        <h1 className="mt-4 font-serif text-4xl sm:text-5xl font-bold text-foreground leading-[1.1]">
          {article.title}
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{article.excerpt}</p>
        <div className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 px-8 py-10 text-center">
          <p className="font-serif text-xl font-semibold text-foreground">Full article coming soon.</p>
          <p className="mt-2 text-muted-foreground">
            We're still writing this one. Join the waitlist to be notified when it's live.
          </p>
          <a
            href="/#waitlist"
            className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:brightness-95"
          >
            Join the Waitlist
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
