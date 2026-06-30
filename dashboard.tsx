import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, Heart, BookOpen, Star, Trash2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useCart } from "@/lib/cart-context";
import { books } from "@/lib/books-data";
import { BookCard } from "@/components/book-card";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — BookNest" }] }),
  component: Dashboard,
});

const recentOrders = [
  { id: "BN-10293", date: "Jun 24, 2026", items: 3, total: 56.97, status: "Delivered" },
  { id: "BN-10240", date: "Jun 12, 2026", items: 1, total: 18.99, status: "Shipped" },
  { id: "BN-10211", date: "May 30, 2026", items: 2, total: 38.5, status: "Delivered" },
];

function Dashboard() {
  const { wishlist, toggleWish, addToCart } = useCart();
  const recommended = books.slice(4, 8);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10 flex-1 w-full">
        {/* profile header */}
        <div className="rounded-3xl bg-hero text-primary-foreground p-8 md:p-10 grid md:grid-cols-[auto_1fr_auto] gap-6 items-center shadow-elegant">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-cyan-gradient text-navy-deep font-display text-2xl font-bold">
            EJ
          </div>
          <div>
            <p className="text-primary-foreground/70 text-sm">Welcome back,</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold">Elena Jameson</h1>
            <p className="text-primary-foreground/70 text-sm mt-1">Member since March 2024 · Gold reader</p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <Stat label="Orders" value="14" />
            <Stat label="Wishlist" value={String(wishlist.length)} />
            <Stat label="Points" value="2,450" />
          </div>
        </div>

        {/* Recent orders */}
        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-accent" /> Recent orders
          </h2>
          <div className="rounded-2xl bg-card border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-muted-foreground">
                <tr>
                  <th className="text-left p-4 font-semibold">Order</th>
                  <th className="text-left p-4 font-semibold hidden sm:table-cell">Date</th>
                  <th className="text-left p-4 font-semibold hidden sm:table-cell">Items</th>
                  <th className="text-left p-4 font-semibold">Total</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-t border-border">
                    <td className="p-4 font-mono">{o.id}</td>
                    <td className="p-4 hidden sm:table-cell">{o.date}</td>
                    <td className="p-4 hidden sm:table-cell">{o.items}</td>
                    <td className="p-4 font-semibold">${o.total.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${o.status === "Delivered" ? "bg-accent/20 text-navy-deep" : "bg-secondary text-foreground"}`}>{o.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Wishlist */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
            <Heart className="h-5 w-5 text-accent" /> Your wishlist
          </h2>
          {wishlist.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
              Heart any book to save it here.
              <div className="mt-3"><Link to="/books" className="text-accent font-semibold hover:underline">Browse books</Link></div>
            </div>
          ) : (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishlist.map((b) => (
                <li key={b.id} className="rounded-2xl bg-card border border-border p-4 flex gap-3">
                  <img src={b.cover} alt="" className="w-16 h-22 object-cover rounded-md" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{b.category}</p>
                    <h3 className="font-display font-semibold leading-tight truncate">{b.title}</h3>
                    <div className="flex items-center gap-1 text-xs mt-1"><Star className="h-3 w-3 fill-accent text-accent" /> {b.rating}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => addToCart(b)} className="text-xs h-7 px-3 rounded-full bg-navy text-primary-foreground font-semibold">Add to cart</button>
                      <button onClick={() => toggleWish(b)} className="h-7 w-7 grid place-items-center rounded-full hover:bg-destructive/10 text-destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Recommended */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-accent" /> Recommended for you
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {recommended.map((b) => <BookCard key={b.id} book={b} />)}
          </div>
        </section>
      </section>
      <SiteFooter />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl glass p-3">
      <p className="font-display text-2xl font-bold">{value}</p>
      <p className="text-xs text-primary-foreground/70">{label}</p>
    </div>
  );
}
