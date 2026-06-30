import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Book } from "./books-data";

export type CartItem = { book: Book; qty: number };
export type WishItem = Book;

type Ctx = {
  cart: CartItem[];
  wishlist: WishItem[];
  addToCart: (b: Book, qty?: number) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWish: (b: Book) => void;
  isWished: (id: string) => boolean;
  subtotal: number;
  itemCount: number;
};

const CartContext = createContext<Ctx | null>(null);

const isBrowser = typeof window !== "undefined";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!isBrowser) return;
    try {
      const c = localStorage.getItem("bn_cart");
      const w = localStorage.getItem("bn_wish");
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || !isBrowser) return;
    localStorage.setItem("bn_cart", JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated || !isBrowser) return;
    localStorage.setItem("bn_wish", JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const addToCart = (b: Book, qty = 1) =>
    setCart((c) => {
      const i = c.findIndex((x) => x.book.id === b.id);
      if (i >= 0) {
        const next = [...c];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return [...c, { book: b, qty }];
    });

  const removeFromCart = (id: string) => setCart((c) => c.filter((x) => x.book.id !== id));
  const setQty = (id: string, qty: number) =>
    setCart((c) => c.map((x) => (x.book.id === id ? { ...x, qty: Math.max(1, qty) } : x)));
  const clearCart = () => setCart([]);
  const toggleWish = (b: Book) =>
    setWishlist((w) => (w.some((x) => x.id === b.id) ? w.filter((x) => x.id !== b.id) : [...w, b]));
  const isWished = (id: string) => wishlist.some((x) => x.id === id);

  const subtotal = cart.reduce((s, x) => s + x.book.price * x.qty, 0);
  const itemCount = cart.reduce((s, x) => s + x.qty, 0);

  return (
    <CartContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, setQty, clearCart, toggleWish, isWished, subtotal, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
