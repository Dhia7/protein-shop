import type { CartItem } from "@/components/cart-provider";
import { formatPrice } from "@/components/cart-provider";
import { WHATSAPP_HREF } from "@/lib/products";

export const ORDER_STORAGE_KEY = "protein-shop-last-order";

export type OrderCustomer = {
  name: string;
  address: string;
  city: string;
  zip: string;
  phone: string;
};

export type OrderSnapshot = {
  id: string;
  items: CartItem[];
  subtotal: number;
  customer: OrderCustomer;
  createdAt: string;
};

export function saveOrder(snapshot: OrderSnapshot) {
  try {
    sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    /* ignore */
  }
}

export function loadOrder(): OrderSnapshot | null {
  try {
    const raw = sessionStorage.getItem(ORDER_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as OrderSnapshot;
    if (!parsed?.id || !Array.isArray(parsed.items)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function makeOrderId() {
  return `PS-${Date.now().toString(36).toUpperCase()}`;
}

export function whatsappCheckoutHref(
  items: CartItem[],
  subtotal: number,
  customer: OrderCustomer,
) {
  const lines = items.map(
    (item) =>
      `- ${item.name} (${item.flavour}, ${item.size}) x${item.quantity} — ${item.price}`,
  );
  const message = encodeURIComponent(
    `Bonjour Protein Shop, je souhaite commander :\n${lines.join("\n")}\nTotal : ${formatPrice(subtotal)}\n\nLivraison :\n${customer.name}\n${customer.address}\n${customer.city} ${customer.zip}\nTél : +216 ${customer.phone}\nPaiement à la livraison.`,
  );
  return `${WHATSAPP_HREF}?text=${message}`;
}
