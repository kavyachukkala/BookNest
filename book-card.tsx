import { Heart, ShoppingBag, Star } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import type { Book } from "@/lib/books-data";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function BookCard({ book }: { book: Book }) {
  const { addToCart, toggleWish, isWished } = useCart();
  const wished = isWished(book.id);

  return (
    <div className="group relative flex flex-col rounded-2xl bg-card border border-border/80 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-elegant">
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <img
          src={book.cover}
          alt={book.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {book.bestseller && (
          <span className="absolute top-3 left-3 rounded-full bg-accent text-navy-deep text-[10px] font-bold uppercase tracking-wide px-2.5 py-1">
            Bestseller
          </span>
        )}
        <button
          onClick={() => {
            toggleWish(book);
            toast(wished ? "Removed from wishlist" : "Added to wishlist");
          }}
          aria-label="Wishlist"
          className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full glass-light hover:bg-card transition-colors"
        >
          <Heart className={cn("h-4 w-4", wished && "fill-accent text-accent")} />
        </button>
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{book.category}</p>
        <h3 className="font-display text-lg leading-snug font-semibold line-clamp-2">{book.title}</h3>
        <p className="text-sm text-muted-foreground">{book.author}</p>
        <div className="flex items-center gap-1 text-xs">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          <span className="font-semibold">{book.rating}</span>
          <span className="text-muted-foreground">({book.reviews.toLocaleString()})</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-display text-xl font-bold">${book.price.toFixed(2)}</span>
          <button
            onClick={() => {
              addToCart(book);
              toast.success(`Added "${book.title}"`);
            }}
            className="inline-flex items-center gap-1.5 rounded-full bg-navy text-primary-foreground text-xs font-semibold px-3 h-9 hover:bg-navy-deep transition-colors"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
