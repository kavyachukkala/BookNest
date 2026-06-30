import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Star } from "lucide-react";
import { books, categories } from "@/lib/books-data";
import { BookCard } from "@/components/book-card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/books")({
  head: () => ({
    meta: [
      { title: "Browse Books — BookNest" },
      { name: "description", content: "Search and filter our full catalogue of fiction, non-fiction, sci-fi, romance, business and more." },
    ],
  }),
  component: BooksPage,
});

const PER_PAGE = 8;

function BooksPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState(30);
  const [minRating, setMinRating] = useState(0);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return books.filter((b) =>
      (cat === "All" || b.category === cat) &&
      b.price <= maxPrice &&
      b.rating >= minRating &&
      (q === "" || b.title.toLowerCase().includes(q.toLowerCase()) || b.author.toLowerCase().includes(q.toLowerCase()))
    );
  }, [q, cat, maxPrice, minRating]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="bg-hero text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold">The shelf</h1>
          <p className="text-primary-foreground/75 mt-2 max-w-lg">{books.length} curated titles across {categories.length - 1} genres.</p>
          <div className="mt-6 relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-navy-deep/60" />
            <input
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(1); }}
              placeholder="Search titles, authors…"
              className="w-full h-14 pl-12 pr-4 rounded-full bg-white text-navy-deep placeholder:text-navy-deep/50 focus:outline-none focus:ring-4 focus:ring-accent/40"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
          <div className="flex items-center gap-2 font-semibold">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-semibold">Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => { setCat(c); setPage(1); }}
                  className={cn(
                    "px-3 h-8 rounded-full text-xs font-medium border transition-colors",
                    cat === c ? "bg-navy text-primary-foreground border-navy" : "bg-card border-border hover:border-accent"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-semibold">Max price</p>
            <input
              type="range" min={5} max={30} step={1} value={maxPrice}
              onChange={(e) => { setMaxPrice(Number(e.target.value)); setPage(1); }}
              className="w-full accent-[var(--accent)]"
            />
            <p className="text-sm font-semibold mt-1">Up to ${maxPrice}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-semibold">Min rating</p>
            <div className="flex gap-1">
              {[0, 3, 4, 4.5].map((r) => (
                <button
                  key={r}
                  onClick={() => { setMinRating(r); setPage(1); }}
                  className={cn(
                    "flex items-center gap-1 px-3 h-8 rounded-full text-xs font-medium border",
                    minRating === r ? "bg-navy text-primary-foreground border-navy" : "bg-card border-border"
                  )}
                >
                  <Star className="h-3 w-3 fill-current" />
                  {r === 0 ? "Any" : `${r}+`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-muted-foreground">Showing <span className="font-semibold text-foreground">{paged.length}</span> of {filtered.length} books</p>
          </div>

          {paged.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
              No books match your filters.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {paged.map((b) => <BookCard key={b.id} book={b} />)}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-10 flex justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={cn(
                    "h-10 w-10 rounded-full text-sm font-semibold border",
                    page === i + 1 ? "bg-navy text-primary-foreground border-navy" : "bg-card border-border hover:border-accent"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
