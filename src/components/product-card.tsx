"use client";

import Link from "next/link";
import { Check, ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BlurImage } from "@/components/blur-image";
import { useCart } from "@/components/cart-provider";
import { useLocale } from "@/components/locale-provider";
import { QuantityStepper } from "@/components/quantity-stepper";
import { productImage } from "@/lib/media";
import { CATEGORY_LABEL_KEYS, PRODUCT_TAG_KEYS, productHref, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

const ADDED_MS = 1100;

export function ProductCard({
  product,
  priority = false,
  compact = false,
  catalog = false,
}: {
  product: Product;
  priority?: boolean;
  compact?: boolean;
  catalog?: boolean;
}) {
  const { addItem } = useCart();
  const { t } = useLocale();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<number | null>(null);
  const href = productHref(product.id);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  function handleAdd() {
    addItem(product, quantity);
    setJustAdded(true);
    setQuantity(1);

    const button = buttonRef.current;
    if (button) {
      button.classList.remove("add-flash");
      void button.offsetWidth;
      button.classList.add("add-flash");
    }

    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setJustAdded(false);
      buttonRef.current?.classList.remove("add-flash");
    }, ADDED_MS);
  }

  return (
    <article className="product-card group relative flex h-full flex-col overflow-hidden border border-zinc-100 bg-white">
      <Link href={href} className="block no-underline">
        <div className="relative aspect-square overflow-hidden bg-zinc-100">
          {product.tag ? (
            <span className="absolute top-3 start-3 z-[2] bg-black px-2 py-1 text-[8px] font-black text-primary uppercase italic">
              {PRODUCT_TAG_KEYS[product.tag] ? t(PRODUCT_TAG_KEYS[product.tag]) : product.tag}
            </span>
          ) : null}
          <div className="product-card-visual absolute -inset-[12%]">
            <BlurImage
              src={productImage(product)}
              alt={product.alt}
              fill
              priority={priority}
              sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
              className="object-cover"
            />
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col space-y-1.5 p-4">
        <div className="flex items-start justify-between gap-2">
          <span className="text-[9px] font-black tracking-widest text-zinc-400 uppercase">
            {catalog ? (
              <span className="force-ltr">{t("brandOurs")}</span>
            ) : (
              t(CATEGORY_LABEL_KEYS[product.category])
            )}
          </span>
        </div>
        <h3 className="text-base leading-tight font-bold uppercase">
          <Link
            href={href}
            className="force-ltr text-foreground no-underline transition-colors group-hover:text-primary"
          >
            {product.name}
          </Link>
        </h3>
        {!compact && !catalog && product.detail ? (
          <p className="force-ltr text-xs text-zinc-500">{product.detail}</p>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <p className="force-ltr font-display text-3xl leading-none">{product.price}</p>
          <div className="flex items-center gap-2">
            {catalog ? null : (
              <div
                className={cn(
                  "transition-opacity duration-200",
                  compact
                    ? "max-md:opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
                    : "",
                )}
              >
                <QuantityStepper
                  size="sm"
                  value={quantity}
                  onChange={setQuantity}
                  max={99}
                  label={t("quantity")}
                  decreaseLabel={t("decreaseQty")}
                  increaseLabel={t("increaseQty")}
                />
              </div>
            )}
            <button
              ref={buttonRef}
              type="button"
              aria-label={`${t("addToCart")} ${product.name}`}
              className={cn(
                "flex size-10 items-center justify-center bg-primary text-black shadow-sm transition-colors hover:bg-black hover:text-primary",
                justAdded && "pointer-events-none bg-black text-primary",
              )}
              onClick={handleAdd}
            >
              {justAdded ? (
                <Check className="size-4" strokeWidth={2.5} aria-hidden />
              ) : (
                <ShoppingCart className="size-4" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
