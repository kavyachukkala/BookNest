import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/books", label: "Books" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/admin", label: "Admin" },
];

export function SiteHeader() {
  const { itemCount, wishlist } = useCart();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 glass-light">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-cyan-gradient text-navy-deep shadow-glow">
            <BookOpen className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">BookNest</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 ml-4">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                pathname === n.to
                  ? "text-navy bg-secondary"
                  : "text-muted-foreground hover:text-navy hover:bg-secondary/60",
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search titles, authors, ISBN…"
              className="w-full h-10 pl-9 pr-3 rounded-full bg-secondary/70 border border-transparent focus:bg-card focus:border-accent focus:outline-none text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-1 ml-auto">
          <Link to="/dashboard" className="hidden sm:inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-secondary relative">
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-accent text-[10px] font-bold text-navy-deep grid place-items-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-secondary relative">
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-accent text-[10px] font-bold text-navy-deep grid place-items-center">
                {itemCount}
              </span>
            )}
          </Link>
          <Link to="/profile" className="hidden sm:inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-secondary">
            <User className="h-5 w-5" />
          </Link>
          <Link
            to="/login"
            className="hidden md:inline-flex h-10 items-center rounded-full bg-navy text-primary-foreground px-4 text-sm font-semibold hover:bg-navy-deep transition-colors"
          >
            Sign in
          </Link>

          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-secondary"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-card animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-semibold bg-navy text-primary-foreground text-center"
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
