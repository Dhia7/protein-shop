"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { BlurImage } from "@/components/blur-image";
import {
  formatPrice,
  priceAmount,
  useCart,
} from "@/components/cart-provider";
import { useLocale } from "@/components/locale-provider";
import { QuantityStepper } from "@/components/quantity-stepper";
import { PRODUCT_IMAGES } from "@/lib/media";
import { getProduct, productHref } from "@/lib/products";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    count,
    subtotal,
    open,
    setOpen,
    setItemQuantity,
    removeItem,
    checkoutHref,
  } = useCart();
  const { t } = useLocale();
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  useEffect(() => {
    if (!open) return;

    previousFocus.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function closeCart() {
    setOpen(false);
    requestAnimationFrame(() => previousFocus.current?.focus?.());
  }

  return (
    <div
      className={cn("fixed inset-0 z-[70]", !open && "pointer-events-none")}
      aria-hidden={!open}
      {...(!open ? { inert: true } : {})}
    >
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        className={cn(
          "absolute inset-0 bg-black/55 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
        aria-label={t("cartClose")}
        onClick={closeCart}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className={cn(
          "cart-panel absolute inset-y-0 end-0 flex w-[min(26rem,100vw)] flex-col border-s border-line bg-iron-2 transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full rtl:-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2
            id="cart-title"
            className="text-sm font-extrabold tracking-[0.04em] uppercase"
          >
            {t("cartTitle")}
            {count > 0 ? ` (${count})` : ""}
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="flex size-9 items-center justify-center rounded-full border border-line text-chalk-dim hover:text-foreground"
            aria-label={t("cartClose")}
            onClick={closeCart}
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-1 flex-col justify-center py-10 text-center">
              <p className="text-sm font-bold">{t("cartEmpty")}</p>
              <p className="mt-2 text-sm leading-relaxed text-chalk-dim">
                {t("cartEmptyHint")}
              </p>
            </div>
          ) : (
            items.map((item) => {
              const image = PRODUCT_IMAGES[item.id];
              const product = getProduct(item.id);
              const href = productHref(item.id);
              const lineTotal = priceAmount(item.price) * item.quantity;

              return (
                <div key={item.id} className="flex gap-3">
                  <Link
                    href={href}
                    className="relative size-[4.5rem] shrink-0 overflow-hidden rounded-[2px] bg-[#ece8df]"
                  >
                    {image ? (
                      <BlurImage
                        src={image}
                        alt={product?.alt ?? item.name}
                        fill
                        sizes="72px"
                        className="pointer-events-none object-cover object-center"
                      />
                    ) : null}
                    <span className="sr-only">{item.name}</span>
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={href}
                        className="text-sm font-bold leading-snug text-foreground no-underline hover:text-primary"
                      >
                        {item.name}
                      </Link>
                      <p className="font-display shrink-0 text-base">
                        {formatPrice(lineTotal)}
                      </p>
                    </div>
                    <p className="mt-0.5 text-xs text-chalk-dim">
                      {item.size} · {item.flavour}
                      {item.quantity > 1 ? ` · ${item.price} × ${item.quantity}` : ""}
                    </p>
                    <div className="mt-2.5 flex items-center justify-between gap-2">
                      <QuantityStepper
                        size="sm"
                        value={item.quantity}
                        onChange={(quantity) =>
                          setItemQuantity(item.id, quantity)
                        }
                        max={99}
                        label={t("quantity")}
                        decreaseLabel={t("decreaseQty")}
                        increaseLabel={t("increaseQty")}
                      />
                      <button
                        type="button"
                        className="text-xs font-bold text-chalk-dim hover:text-primary"
                        onClick={() => removeItem(item.id)}
                      >
                        {t("cartRemove")}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-line p-5">
          {items.length === 0 ? (
            <Link
              href="/catalogue"
              className="inline-flex items-center justify-center rounded-[2px] bg-primary px-5 py-3 text-sm font-bold text-primary-foreground no-underline"
            >
              {t("cartShop")}
            </Link>
          ) : (
            <>
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-extrabold tracking-[0.04em] text-chalk-dim uppercase">
                  {t("cartTotal")}
                </span>
                <span className="font-display text-2xl">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-chalk-dim">
                {t("cartDelivery")}
              </p>
              <a
                href={checkoutHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-[2px] bg-primary px-5 py-3 text-sm font-bold text-primary-foreground no-underline"
                onClick={closeCart}
              >
                {t("cartCheckout")}
              </a>
              <Link
                href="/catalogue"
                className="inline-flex items-center justify-center rounded-[2px] border-[1.5px] border-steel px-5 py-2.5 text-sm font-bold text-foreground no-underline hover:border-primary"
              >
                {t("cartContinue")}
              </Link>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
