"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { useLocale } from "@/components/locale-provider";

export function CartDrawer() {
  const { items, open, setOpen, removeItem, checkoutHref } = useCart();
  const { t } = useLocale();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        className="absolute inset-0 bg-black/55"
        aria-label={t("cartLabel")}
        onClick={() => setOpen(false)}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="absolute inset-y-0 end-0 flex w-[min(22rem,92vw)] flex-col border-s border-line bg-iron-2"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id="cart-title" className="text-sm font-extrabold tracking-[0.04em] uppercase">
            {t("cartTitle")}
          </h2>
          <button
            type="button"
            className="text-xs font-bold text-chalk-dim hover:text-foreground"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="text-sm text-chalk-dim">{t("cartEmpty")}</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold">{item.name}</p>
                  <p className="text-xs text-chalk-dim">
                    {item.size} · {item.flavour} · x{item.quantity}
                  </p>
                  <p className="mt-1 font-display text-base">{item.price}</p>
                </div>
                <button
                  type="button"
                  className="text-xs font-bold text-chalk-dim hover:text-primary"
                  onClick={() => removeItem(item.id)}
                >
                  {t("cartRemove")}
                </button>
              </div>
            ))
          )}
        </div>
        <div className="flex flex-col gap-2 border-t border-line p-5">
          {items.length === 0 ? (
            <Link
              href="/catalogue"
              className="inline-flex items-center justify-center rounded-[2px] bg-primary px-5 py-3 text-sm font-bold text-primary-foreground no-underline"
              onClick={() => setOpen(false)}
            >
              {t("cartShop")}
            </Link>
          ) : (
            <a
              href={checkoutHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-[2px] bg-primary px-5 py-3 text-sm font-bold text-primary-foreground no-underline"
              onClick={() => setOpen(false)}
            >
              {t("cartCheckout")}
            </a>
          )}
        </div>
      </aside>
    </div>
  );
}
