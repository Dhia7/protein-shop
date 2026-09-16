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
import { type Product, WHATSAPP_HREF } from "@/lib/products";

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
  open: boolean;
  setOpen: (open: boolean) => void;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  checkoutHref: string;
};

const STORAGE_KEY = "protein-shop-cart";
const CartContext = createContext<CartContextValue | null>(null);

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
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

  const addItem = useCallback((product: Product) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          flavour: product.flavour,
          size: product.size,
          price: product.price,
          quantity: 1,
        },
      ];
    });
    setOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  const checkoutHref = useMemo(() => {
    if (items.length === 0) return WHATSAPP_HREF;
    const lines = items.map(
      (item) =>
        `- ${item.name} (${item.flavour}, ${item.size}) x${item.quantity} — ${item.price}`,
    );
    const message = encodeURIComponent(
      `Bonjour Protein Shop, je souhaite commander :\n${lines.join("\n")}`,
    );
    return `${WHATSAPP_HREF}?text=${message}`;
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      count,
      open,
      setOpen,
      addItem,
      removeItem,
      checkoutHref,
    }),
    [items, count, open, addItem, removeItem, checkoutHref],
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
