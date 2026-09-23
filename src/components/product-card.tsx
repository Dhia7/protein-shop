"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BlurImage } from "@/components/blur-image";
import { useCart } from "@/components/cart-provider";
import { useLocale } from "@/components/locale-provider";
import { QuantityStepper } from "@/components/quantity-stepper";
import { productImage } from "@/lib/media";
import { productHref, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

const ADDED_MS = 1000;

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
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[2px] border border-line bg-iron-2">
      <div className="relative aspect-square overflow-hidden bg-[#ece8df]">
        {product.tag ? (
          <span className="absolute top-3 start-3 z-[1] rounded-full bg-primary px-2.5 py-1 text-[10px] font-extrabold tracking-[0.03em] text-[#14100D]">
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
            className="product-card-image object-cover transition-transform duration-300 group-hover:scale-[1.06]"
          />
        </Link>
        <div className="quick-add absolute inset-x-2 bottom-2 z-[2] flex items-center justify-between gap-2 rounded-[2px] bg-[rgba(16,17,20,0.88)] px-2 py-1.5">
          <span className="text-[10px] font-extrabold tracking-[0.04em] text-primary uppercase">
            {t("quickAdd")}
          </span>
          <QuantityStepper
            size="sm"
            value={quantity}
            onChange={setQuantity}
            label={t("quantity")}
            decreaseLabel={t("decreaseQty")}
            increaseLabel={t("increaseQty")}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col px-[18px] pt-[18px] pb-[22px]">
        <h4 className="mb-1 text-base font-bold">
          <Link href={href} className="text-foreground no-underline hover:text-primary">
            {product.name}
          </Link>
        </h4>
        <p className="mb-3.5 text-xs text-chalk-dim">
          {product.size} · {product.flavour}
        </p>
        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="font-display text-xl leading-none uppercase">
            {product.price}
            {product.detail ? (
              <small className="mt-1 block font-sans text-[11px] font-semibold normal-case text-chalk-dim">
                {product.detail}
              </small>
            ) : null}
          </div>
          <button
            ref={buttonRef}
            type="button"
            aria-label={`${t("addToCart")} ${product.name}`}
            className={cn(
              "add-to-cart-btn flex h-[34px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary font-extrabold whitespace-nowrap text-[#14100D] transition-[width,max-width,padding,font-size] duration-300",
              justAdded
                ? "w-auto max-w-[11rem] px-3 text-[11px]"
                : "w-[34px] max-w-[34px] text-lg",
            )}
            onClick={handleAdd}
          >
            <span aria-live="polite" aria-atomic="true">
              {justAdded ? t("addedToCart") : "+"}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
