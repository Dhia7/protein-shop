"use client";

import Image from "next/image";
import { useCart } from "@/components/cart-provider";
import { useLocale } from "@/components/locale-provider";
import { productImageSrc, type Product } from "@/lib/products";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { addItem } = useCart();
  const { t } = useLocale();

  return (
    <article className="flex flex-col overflow-hidden rounded-[2px] border border-line bg-iron-2">
      <div className="relative flex h-[220px] items-center justify-center bg-[#ece8df]">
        {product.tag ? (
          <span className="absolute top-3 start-3 z-[1] rounded-full bg-primary px-2.5 py-1 text-[10px] font-extrabold tracking-[0.03em] text-[#14100D]">
            {product.tag}
          </span>
        ) : null}
        <Image
          src={productImageSrc(product)}
          alt={product.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-3"
        />
      </div>
      <div className="flex flex-1 flex-col px-[18px] pt-[18px] pb-[22px]">
        <h4 className="mb-1 text-base font-bold">{product.name}</h4>
        <p className="mb-3.5 text-xs text-chalk-dim">
          {product.size} · {product.flavour}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <div className="font-display text-xl leading-none uppercase">
            {product.price}
            {product.detail ? (
              <small className="mt-1 block font-sans text-[11px] font-semibold normal-case text-chalk-dim">
                {product.detail}
              </small>
            ) : null}
          </div>
          <button
            type="button"
            aria-label={`${t("addToCart")} ${product.name}`}
            className="flex size-[34px] items-center justify-center rounded-full bg-primary text-lg font-extrabold text-[#14100D]"
            onClick={() => addItem(product)}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}
