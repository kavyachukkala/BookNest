import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CreditCard, Truck, Lock, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — BookNest" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const [payment, setPayment] = useState<"card" | "paypal" | "apple">("card");
  const nav = useNavigate();
  const shipping = subtotal > 35 || subtotal === 0 ? 0 : 4.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 flex-1 w-full">
        <h1 className="font-display text-4xl font-bold">Checkout</h1>
        <p className="text-muted-foreground mt-2 flex items-center gap-2"><Lock className="h-4 w-4" /> Secure 256-bit encryption</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Order placed! A confirmation is on its way.");
            clearCart();
            nav({ to: "/dashboard" });
          }}
          className="mt-8 grid lg:grid-cols-[1fr_400px] gap-8"
        >
          <div className="space-y-6">
            <section className="rounded-2xl bg-card border border-border p-6">
              <h2 className="flex items-center gap-2 font-display text-xl font-bold mb-4"><Truck className="h-5 w-5 text-accent" /> Shipping</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Full name" required />
                <Input label="Email" type="email" required />
                <Input label="Address" className="sm:col-span-2" required />
                <Input label="City" required />
                <Input label="ZIP code" required />
                <Input label="Country" defaultValue="United States" className="sm:col-span-2" required />
              </div>
            </section>

            <section className="rounded-2xl bg-card border border-border p-6">
              <h2 className="flex items-center gap-2 font-display text-xl font-bold mb-4"><CreditCard className="h-5 w-5 text-accent" /> Payment</h2>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {([
                  ["card", "Card"],
                  ["paypal", "PayPal"],
                  ["apple", "Apple Pay"],
                ] as const).map(([k, label]) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setPayment(k)}
                    className={cn(
                      "h-12 rounded-xl border text-sm font-semibold transition-colors",
                      payment === k ? "border-navy bg-navy text-primary-foreground" : "border-border hover:border-accent"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {payment === "card" && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Card number" placeholder="1234 5678 9012 3456" className="sm:col-span-2" required />
                  <Input label="Expiry" placeholder="MM/YY" required />
                  <Input label="CVC" placeholder="123" required />
                </div>
              )}
              {payment !== "card" && (
                <p className="text-sm text-muted-foreground">You'll be redirected to complete payment.</p>
              )}
            </section>
          </div>

          <aside className="rounded-2xl bg-card border border-border p-6 h-fit lg:sticky lg:top-20">
            <h2 className="font-display text-xl font-bold mb-4">Order summary</h2>
            <ul className="space-y-3 mb-4 max-h-72 overflow-auto">
              {cart.map(({ book, qty }) => (
                <li key={book.id} className="flex gap-3 text-sm">
                  <img src={book.cover} alt="" className="w-12 h-16 object-cover rounded-md" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{book.title}</p>
                    <p className="text-muted-foreground text-xs">Qty {qty}</p>
                  </div>
                  <span className="font-semibold">${(book.price * qty).toFixed(2)}</span>
                </li>
              ))}
              {cart.length === 0 && <p className="text-sm text-muted-foreground">Cart is empty — this is a demo checkout.</p>}
            </ul>
            <dl className="space-y-1.5 text-sm border-t border-border pt-4">
              <div className="flex justify-between"><dt>Subtotal</dt><dd>${subtotal.toFixed(2)}</dd></div>
              <div className="flex justify-between"><dt>Shipping</dt><dd>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</dd></div>
              <div className="flex justify-between"><dt>Tax</dt><dd>${tax.toFixed(2)}</dd></div>
              <div className="flex justify-between text-lg font-bold pt-2"><dt>Total</dt><dd>${total.toFixed(2)}</dd></div>
            </dl>
            <button className="w-full mt-5 inline-flex items-center justify-center gap-2 h-12 rounded-full bg-cyan-gradient text-navy-deep font-semibold shadow-glow">
              <Check className="h-4 w-4" /> Place order
            </button>
          </aside>
        </form>
      </section>
      <SiteFooter />
    </div>
  );
}

function Input({ label, className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={cn("block", className)}>
      <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">{label}</span>
      <input
        {...props}
        className="mt-1.5 w-full h-11 rounded-lg border border-border bg-background px-3 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
      />
    </label>
  );
}
