import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Sparkles, Star, Truck, ShieldCheck, Mail } from "lucide-react";
import heroImg from "@/assets/hero-books.jpg";
import interior from "@/assets/bookstore-interior.jpg";
import { books, categories, testimonials } from "@/lib/books-data";
import { BookCard } from "@/components/book-card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BookNest — Discover your next favorite book" },
      { name: "description", content: "A modern online bookstore with curated bestsellers, new releases and timeless classics. Free shipping over $35." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = books.filter((b) => b.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden bg-hero text-primary-foreground">
        <div className="absolute inset-0 opacity-30">
          <img src={heroImg} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Curated for curious minds
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] text-balance">
              Every story has a <span className="text-accent">nest</span>.
              <br /> Find yours.
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-lg">
              A modern bookstore of handpicked titles — from cult classics to tomorrow's bestsellers. Fast shipping, fair prices, beautiful packaging.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/books"
                className="inline-flex items-center gap-2 h-12 rounded-full bg-cyan-gradient text-navy-deep px-6 font-semibold shadow-glow hover:scale-[1.02] transition-transform"
              >
                Browse the shelf <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 h-12 rounded-full glass px-6 font-semibold hover:bg-white/15 transition-colors"
              >
                Join BookNest
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 pt-4 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-accent" /> Free shipping over $35</div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> 30-day returns</div>
            </div>
          </div>

          {/* floating book stack */}
          <div className="relative hidden md:block h-[480px]">
            {featured.slice(0, 3).map((b, i) => (
              <div
                key={b.id}
                className={`absolute rounded-2xl overflow-hidden shadow-elegant border border-white/10 ${
                  i === 0 ? "top-4 left-10 w-48 animate-float" :
                  i === 1 ? "top-20 right-4 w-56 animate-float-alt" :
                  "bottom-0 left-1/3 w-52 animate-float"
                }`}
                style={{ animationDelay: `${i * 0.6}s` }}
              >
                <img src={b.cover} alt={b.title} className="block w-full h-auto" />
              </div>
            ))}
            <div className="absolute -bottom-6 -right-6 w-48 rounded-2xl glass p-5">
              <div className="flex items-center gap-2 text-accent">
                <Star className="h-4 w-4 fill-accent" />
                <span className="font-semibold">4.9 / 5</span>
              </div>
              <p className="text-xs text-primary-foreground/70 mt-1">from 12,400+ reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-sm uppercase tracking-wider text-accent font-semibold">Categories</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">Find your genre</h2>
          </div>
          <Link to="/books" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold hover:text-accent">
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {categories.slice(1).map((c, i) => (
            <Link
              key={c}
              to="/books"
              className="group relative h-28 rounded-2xl overflow-hidden bg-hero text-primary-foreground p-4 flex flex-col justify-between hover:shadow-elegant transition-shadow"
            >
              <span className="text-xs font-mono opacity-70">0{i + 1}</span>
              <span className="font-display text-xl font-semibold">{c}</span>
              <ArrowRight className="absolute top-4 right-4 h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED BOOKS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-sm uppercase tracking-wider text-accent font-semibold">Featured</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">This week's reads</h2>
          </div>
          <Link to="/books" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold hover:text-accent">
            Shop all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {featured.map((b) => <BookCard key={b.id} book={b} />)}
        </div>
      </section>

      {/* BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="relative rounded-3xl overflow-hidden bg-hero text-primary-foreground p-8 md:p-14 grid md:grid-cols-2 gap-8 items-center shadow-elegant">
          <img src={interior} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/80 to-transparent" />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-balance">
              Members get <span className="text-accent">20% off</span> their first three orders.
            </h2>
            <p className="mt-3 text-primary-foreground/80 max-w-md">
              Join BookNest free. Earn points on every purchase. Get early access to launches and signed editions.
            </p>
            <Link to="/register" className="mt-6 inline-flex items-center gap-2 h-12 rounded-full bg-cyan-gradient text-navy-deep px-6 font-semibold">
              Create your account <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-sm uppercase tracking-wider text-accent font-semibold">Loved by readers</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">A community of curious minds</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl bg-card border border-border p-6 shadow-sm hover:shadow-elegant transition-shadow">
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-accent" />)}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed">"{t.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-cyan-gradient text-navy-deep font-bold text-sm">
                  {t.avatar}
                </span>
                <span>
                  <span className="block font-semibold text-sm">{t.name}</span>
                  <span className="block text-xs text-muted-foreground">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="rounded-3xl glass-light border border-border p-8 md:p-12 text-center">
          <Mail className="h-8 w-8 mx-auto text-accent" />
          <h2 className="font-display text-3xl font-bold mt-4">Bookish letters, once a week</h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            New releases, staff picks and reading lists curated by our booksellers. No spam, ever.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); }}
            className="mt-6 mx-auto flex max-w-md gap-2 flex-col sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="you@bookworm.com"
              className="flex-1 h-12 rounded-full px-5 bg-card border border-border focus:border-accent focus:outline-none"
            />
            <button className="h-12 rounded-full bg-navy text-primary-foreground px-6 font-semibold hover:bg-navy-deep transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
