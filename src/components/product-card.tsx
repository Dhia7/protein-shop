"use client";

import Link from "next/link";
import { Check, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BlurImage } from "@/components/blur-image";
import { useCart } from "@/components/cart-provider";
import { useLocale } from "@/components/locale-provider";
import { QuantityStepper } from "@/components/quantity-stepper";
import { productImage } from "@/lib/media";
import { categoryLabel, productHref, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

const ADDED_MS = 1100;

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
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
    <article className="product-card group relative flex h-full flex-col overflow-hidden rounded-[2px] border border-line bg-iron-2">
      <div className="relative aspect-square overflow-hidden bg-[#ece8df]">
        {product.tag ? (
          <span className="absolute top-3 start-3 z-[2] rounded-full bg-primary px-2.5 py-1 text-[10px] font-extrabold tracking-[0.04em] text-[#14100D] uppercase">
            {product.tag}
          </span>
        ) : null}
        <Link href={href} className="absolute inset-0 block" tabIndex={-1}>
          <span className="sr-only">{product.name}</span>
          <BlurImage
            src={productImage(product)}
            alt={product.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="product-card-image object-cover transition-transform duration-500 ease-out group-hover:scale-[1.07] group-focus-within:scale-[1.07]"
          />
          <span aria-hidden className="product-card-shine" />
        </Link>
      </div>

      <div className="flex flex-1 flex-col px-4 pt-4 pb-4">
        <p className="mb-1.5 text-[11px] font-extrabold tracking-[0.08em] text-primary uppercase">
          {categoryLabel(product.category)}
        </p>
        <h4 className="mb-2 text-[17px] leading-snug font-bold">
          <Link
            href={href}
            className="text-foreground no-underline transition-colors duration-200 hover:text-primary"
          >
            {product.name}
          </Link>
        </h4>
        <div className="mb-3 flex flex-wrap gap-1.5">
          <span className="rounded-full border border-line bg-iron px-2 py-0.5 text-[11px] font-semibold text-chalk">
            {product.size}
          </span>
          <span className="rounded-full border border-line bg-iron px-2 py-0.5 text-[11px] font-semibold text-chalk">
            {product.flavour}
          </span>
        </div>
        {product.detail ? (
          <p className="mb-3 text-xs text-chalk-dim">{product.detail}</p>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-3">
          <p className="font-display text-[28px] leading-none text-primary">
            {product.price}
          </p>
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

        <button
          ref={buttonRef}
          type="button"
          aria-label={`${t("addToCart")} ${product.name}`}
          className={cn(
            "add-to-cart-btn product-add-btn mt-3 inline-flex h-11 w-full items-center justify-center gap-2 text-[13px] font-extrabold tracking-[0.14em] uppercase",
            justAdded && "pointer-events-none product-add-btn-added",
          )}
          onClick={handleAdd}
        >
          {justAdded ? (
            <Check className="size-4" strokeWidth={2.5} aria-hidden />
          ) : (
            <Plus className="size-4" strokeWidth={2.5} aria-hidden />
          )}
          <span aria-live="polite" aria-atomic="true">
            {justAdded ? t("addedToCartShort") : t("addToCartShort")}
          </span>
        </button>
      </div>
    </article>
  );
}
