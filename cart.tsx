import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — BookNest" }] }),
  component: CartPage,
});

function CartPage() {
  const { cart, setQty, removeFromCart, subtotal } = useCart();
  const shipping = subtotal > 35 || subtotal === 0 ? 0 : 4.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 flex-1 w-full">
        <h1 className="font-display text-4xl font-bold mb-2">Your cart</h1>
        <p className="text-muted-foreground mb-8">{cart.length} {cart.length === 1 ? "item" : "items"}</p>

        {cart.length === 0 ? (
          <div className="rounded-3xl glass-light border border-border p-16 text-center">
            <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground" />
            <h2 className="font-display text-2xl font-bold mt-4">Your cart is empty</h2>
            <p className="text-muted-foreground mt-2">Start exploring our shelves and find your next read.</p>
            <Link to="/books" className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-navy text-primary-foreground px-6 font-semibold">
              Browse books <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            <ul className="space-y-4">
              {cart.map(({ book, qty }) => (
                <li key={book.id} className="rounded-2xl bg-card border border-border p-4 flex gap-4">
                  <img src={book.cover} alt={book.title} className="w-24 h-32 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0 flex flex-col">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{book.category}</p>
                    <h3 className="font-display text-lg font-semibold truncate">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                    <div className="mt-auto flex items-center justify-between gap-2 flex-wrap">
                      <div className="inline-flex items-center rounded-full border border-border">
                        <button onClick={() => setQty(book.id, qty - 1)} className="h-9 w-9 grid place-items-center hover:bg-secondary rounded-l-full">
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                        <button onClick={() => setQty(book.id, qty + 1)} className="h-9 w-9 grid place-items-center hover:bg-secondary rounded-r-full">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-display text-lg font-bold">${(book.price * qty).toFixed(2)}</span>
                        <button onClick={() => removeFromCart(book.id)} className="h-9 w-9 grid place-items-center rounded-full hover:bg-destructive/10 text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="rounded-2xl bg-card border border-border p-6 lg:sticky lg:top-20 lg:self-start space-y-4">
              <h2 className="font-display text-xl font-bold">Order summary</h2>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt>Subtotal</dt><dd>${subtotal.toFixed(2)}</dd></div>
                <div className="flex justify-between"><dt>Shipping</dt><dd>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</dd></div>
                <div className="flex justify-between"><dt>Tax (est.)</dt><dd>${tax.toFixed(2)}</dd></div>
              </dl>
              <div className="border-t border-border pt-4 flex justify-between text-lg font-bold">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
              <Link to="/checkout" className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-full bg-cyan-gradient text-navy-deep font-semibold shadow-glow hover:scale-[1.01] transition-transform">
                Checkout <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="text-xs text-muted-foreground text-center">Free shipping on orders over $35.</p>
            </aside>
          </div>
        )}
      </section>
      <SiteFooter />
    </div>
  );
}
