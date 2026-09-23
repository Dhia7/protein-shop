"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BlurImage } from "@/components/blur-image";
import { useCart } from "@/components/cart-provider";
import { useLocale } from "@/components/locale-provider";
import { ProductCard } from "@/components/product-card";
import { QuantityStepper } from "@/components/quantity-stepper";
import { productImage } from "@/lib/media";
import {
  categoryLabel,
  type Product,
} from "@/lib/products";
import { WRAP } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const { addItem } = useCart();
  const { t } = useLocale();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setQuantity(1);
    setJustAdded(false);
    setShowBar(false);
  }, [product.id]);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowBar(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-76px 0px 0px 0px" },
    );

    observer.observe(image);
    return () => observer.disconnect();
  }, [product.id]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  function handleAdd() {
    addItem(product, quantity);
    setJustAdded(true);
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setJustAdded(false), 1200);
  }

  const addLabel = justAdded ? t("addedToCart") : t("productCta");

  return (
    <div className="pb-28">
      <div className={`${WRAP} pt-8 md:pt-10`}>
        <p className="text-xs font-bold tracking-[0.04em] text-chalk-dim uppercase">
          <Link href="/catalogue" className="no-underline hover:text-primary">
            {t("backToCatalogue")}
          </Link>
          <span aria-hidden> · </span>
          {categoryLabel(product.category)}
        </p>

        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[minmax(0,32rem)_minmax(0,1fr)] lg:gap-14 xl:gap-16">
          <div
            ref={imageRef}
            className="relative mx-auto aspect-square w-full max-w-[32rem] overflow-hidden rounded-[2px] bg-[#ece8df] lg:mx-0"
          >
            {product.tag ? (
              <span className="absolute top-4 start-4 z-[1] rounded-full bg-primary px-2.5 py-1 text-[10px] font-extrabold tracking-[0.03em] text-[#14100D]">
                {product.tag}
              </span>
            ) : null}
            <BlurImage
              src={productImage(product)}
              alt={product.alt}
              fill
              priority
              sizes="(min-width: 1024px) 512px, (min-width: 640px) 32rem, 100vw"
              className="object-cover object-center"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="font-display text-[clamp(32px,4vw,48px)]">
              {product.name}
            </h1>
            <p className="mt-3 text-sm text-chalk-dim">
              {product.size} · {product.flavour}
            </p>
            <p className="font-display mt-5 text-4xl">{product.price}</p>
            {product.detail ? (
              <p className="mt-2 text-sm font-semibold text-chalk-dim">
                {product.detail}
              </p>
            ) : null}
            <p className="mt-6 max-w-[46ch] text-sm leading-relaxed text-chalk-dim">
              {t("deliveryNote")}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <QuantityStepper
                value={quantity}
                onChange={setQuantity}
                max={99}
                label={t("quantity")}
                decreaseLabel={t("decreaseQty")}
                increaseLabel={t("increaseQty")}
              />
              <button
                type="button"
                className={cn(
                  "inline-flex min-h-10 items-center justify-center rounded-[2px] bg-primary px-6 text-sm font-bold text-primary-foreground",
                  justAdded && "add-flash",
                )}
                onClick={handleAdd}
              >
                {addLabel}
              </button>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className={`${WRAP} mt-16 md:mt-24`}>
          <h2 className="font-display mb-8 text-3xl">
            {t("relatedProducts")}
          </h2>
          <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}

      <div
        className={cn(
          "sticky-add-bar fixed inset-x-0 bottom-0 z-[55] border-t border-line bg-[color-mix(in_srgb,var(--color-iron)_94%,transparent)] backdrop-blur-[8px] transition-transform duration-300",
          showBar ? "translate-y-0" : "translate-y-full",
        )}
        aria-hidden={!showBar}
        {...(!showBar ? { inert: true } : {})}
      >
        <div
          className={`${WRAP} flex items-center justify-between gap-4 py-3`}
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-[2px] bg-[#ece8df]">
              <BlurImage
                src={productImage(product)}
                alt=""
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{product.name}</p>
              <p className="font-display text-base">{product.price}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <QuantityStepper
              size="sm"
              value={quantity}
              onChange={setQuantity}
              max={99}
              label={t("quantity")}
              decreaseLabel={t("decreaseQty")}
              increaseLabel={t("increaseQty")}
            />
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-[2px] bg-primary px-4 text-xs font-bold text-primary-foreground sm:px-5 sm:text-sm"
              onClick={handleAdd}
            >
              {addLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
