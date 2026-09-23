"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct, type Product, WHATSAPP_HREF } from "@/lib/products";

export type CartItem = {
  id: string;
  name: string;
  flavour: string;
  size: string;
  price: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  ready: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  addItem: (product: Product, quantity?: number) => void;
  setItemQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  checkoutHref: string;
};

const STORAGE_KEY = "protein-shop-cart";
const CartContext = createContext<CartContextValue | null>(null);

export function priceAmount(price: string) {
  const match = price.match(/(\d+)/);
  return match ? Number(match[1]) : 0;
}

export function formatPrice(amount: number) {
  return `${amount} DT`;
}

function toCartItem(product: Product, quantity: number): CartItem {
  return {
    id: product.id,
    name: product.name,
    flavour: product.flavour,
    size: product.size,
    price: product.price,
    quantity: Math.min(99, Math.max(1, Math.floor(quantity) || 1)),
  };
}

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    const byId = new Map<string, CartItem>();
    for (const row of parsed) {
      if (!row || typeof row !== "object") continue;
      const id = "id" in row && typeof row.id === "string" ? row.id : "";
      const product = getProduct(id);
      if (!product) continue;
      const rawQty = "quantity" in row ? Number(row.quantity) : 1;
      const next = toCartItem(product, rawQty);
      const existing = byId.get(id);
      byId.set(
        id,
        existing
          ? { ...next, quantity: Math.min(99, existing.quantity + next.quantity) }
          : next,
      );
    }
    return [...byId.values()];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setItems(loadCart());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, ready]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    const qty = Math.min(99, Math.max(1, Math.floor(quantity)));
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? toCartItem(product, item.quantity + qty)
            : item,
        );
      }
      return [...current, toCartItem(product, qty)];
    });
  }, []);

  const setItemQuantity = useCallback((id: string, quantity: number) => {
    const qty = Math.min(99, Math.max(0, Math.floor(quantity)));
    setItems((current) => {
      if (qty < 1) return current.filter((item) => item.id !== id);
      return current.map((item) => {
        if (item.id !== id) return item;
        const product = getProduct(id);
        return product ? toCartItem(product, qty) : { ...item, quantity: qty };
      });
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + priceAmount(item.price) * item.quantity,
    0,
  );

  const checkoutHref = useMemo(() => {
    if (items.length === 0) return WHATSAPP_HREF;
    const lines = items.map(
      (item) =>
        `- ${item.name} (${item.flavour}, ${item.size}) x${item.quantity} — ${item.price}`,
    );
    const message = encodeURIComponent(
      `Bonjour Protein Shop, je souhaite commander :\n${lines.join("\n")}\nTotal : ${formatPrice(subtotal)}`,
    );
    return `${WHATSAPP_HREF}?text=${message}`;
  }, [items, subtotal]);

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      ready,
      open,
      setOpen,
      addItem,
      setItemQuantity,
      removeItem,
      checkoutHref,
    }),
    [
      items,
      count,
      subtotal,
      ready,
      open,
      addItem,
      setItemQuantity,
      removeItem,
      checkoutHref,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
