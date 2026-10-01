"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Check,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { BlurImage } from "@/components/blur-image";
import { useCart } from "@/components/cart-provider";
import { useLocale } from "@/components/locale-provider";
import { ProductCard } from "@/components/product-card";
import { QuantityStepper } from "@/components/quantity-stepper";
import { Reveal, RevealItem, RevealStagger } from "@/components/reveal";
import { productImage } from "@/lib/media";
import {
  CATEGORY_LABEL_KEYS,
  PRODUCT_TAG_KEYS,
  type Product,
  type ProductCategory,
} from "@/lib/products";
import type { TranslationKey } from "@/lib/i18n";
import { WRAP } from "@/lib/site";
import { cn } from "@/lib/utils";

const PDP_LEAD: Record<ProductCategory, TranslationKey> = {
  whey: "pdpLeadWhey",
  mass: "pdpLeadMass",
  bcaa: "pdpLeadBcaa",
  creatine: "pdpLeadCreatine",
  preworkout: "pdpLeadPreworkout",
  accessoires: "pdpLeadAccessoires",
  vegan: "pdpLeadVegan",
  casein: "pdpLeadCasein",
  collagen: "pdpLeadCollagen",
  eaa: "pdpLeadEaa",
};

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
  const tagLabel = product.tag
    ? PRODUCT_TAG_KEYS[product.tag]
      ? t(PRODUCT_TAG_KEYS[product.tag])
      : product.tag
    : null;
  const facts = [
    { label: t("categories"), value: t(CATEGORY_LABEL_KEYS[product.category]) },
    { label: t("flavour"), value: product.flavour, latin: true },
    { label: t("format"), value: product.size, latin: true },
    ...(product.detail
      ? [{ label: t("productFacts"), value: product.detail, latin: true }]
      : []),
    { label: t("priceWord"), value: product.price, latin: true },
  ];

  return (
    <div className="bg-grid bg-white pb-28">
      <div className={`${WRAP} py-12`}>
        <nav
          className="mb-8 flex flex-wrap items-center gap-2 text-[10px] font-black tracking-widest text-zinc-400 uppercase"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="no-underline hover:text-primary">
            {t("breadcrumbHome")}
          </Link>
          <ChevronRight className="size-3 rtl:rotate-180" aria-hidden />
          <Link
            href={`/catalogue?categorie=${product.category}`}
            className="no-underline hover:text-primary"
          >
            {t(CATEGORY_LABEL_KEYS[product.category])}
          </Link>
          <ChevronRight className="size-3 rtl:rotate-180" aria-hidden />
          <span className="text-black" dir="ltr">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-6">
            <div
              ref={imageRef}
              className="group relative overflow-hidden border-2 border-zinc-100 bg-white p-8 md:p-12"
            >
              <div className="diagonal-stripe absolute top-0 end-0 z-0 size-32 translate-x-16 -translate-y-16 rotate-45 rtl:-translate-x-16" />
              {tagLabel ? (
                <span className="absolute top-4 start-4 z-[1] bg-black px-2 py-1 text-[10px] font-black tracking-widest text-primary uppercase">
                  {tagLabel}
                </span>
              ) : null}
              <BlurImage
                src={productImage(product)}
                alt={product.alt}
                priority
                sizes="(min-width: 1024px) 50vw, 90vw"
                className="relative z-10 h-auto w-full object-contain"
              />
            </div>
            <div className="grid max-w-[8rem] grid-cols-1 gap-4">
              <button
                type="button"
                className="border-2 border-primary bg-white p-2"
                aria-current="true"
                aria-label={product.name}
              >
                <div className="relative aspect-square">
                  <BlurImage
                    src={productImage(product)}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-contain"
                  />
                </div>
              </button>
            </div>
          </div>

          <div className="space-y-8 lg:col-span-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                {tagLabel ? (
                  <span className="bg-black px-2 py-1 text-[10px] font-black tracking-widest text-primary uppercase">
                    {tagLabel}
                  </span>
                ) : null}
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                  <CheckCircle2 className="size-4" aria-hidden />
                  {t("inStock")}
                </span>
              </div>
              <h1 className="section-display text-6xl leading-none text-black">
                <span dir="ltr" className="font-display">
                  {product.name}
                </span>
                <br />
                <span className="font-display italic text-primary">
                  {t(CATEGORY_LABEL_KEYS[product.category])}
                </span>
              </h1>
            </div>

            <div className="flex items-baseline gap-4 border-b border-zinc-100 pb-8">
              <span className="font-display text-5xl tracking-wide" dir="ltr">
                {product.price}
              </span>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">
                  {t("flavour")}
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="border-2 border-black px-4 py-2 text-sm font-bold uppercase" dir="ltr">
                    {product.flavour}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">
                  {t("format")}
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="border-2 border-black px-4 py-2 text-sm font-bold uppercase" dir="ltr">
                    {product.size}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <QuantityStepper
                  size="lg"
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
                    "btn-primary flex-1",
                    justAdded && "add-flash",
                  )}
                  onClick={handleAdd}
                >
                  {addLabel}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="flex items-center gap-3 border border-zinc-100 bg-zinc-50 p-4">
                <Truck className="size-6 text-primary" aria-hidden />
                <span className="text-[9px] font-black tracking-widest uppercase">
                  {t("deliveryFast")}
                </span>
              </div>
              <div className="flex items-center gap-3 border border-zinc-100 bg-zinc-50 p-4">
                <ShieldCheck className="size-6 text-primary" aria-hidden />
                <span className="text-[9px] font-black tracking-widest uppercase">
                  {t("authentic")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <h2 className="font-display text-4xl text-black">
              {t("pdpDescriptionTitle")}
            </h2>
            <div className="h-1.5 w-20 bg-primary" />
            <p className="leading-relaxed text-zinc-600">
              {t(PDP_LEAD[product.category])}
            </p>
            {product.detail ? (
              <ul className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
                <li className="flex items-center gap-2 text-xs font-bold uppercase">
                  <Check className="size-4 text-primary" aria-hidden />
                  <span dir="ltr">{product.detail}</span>
                </li>
                <li className="flex items-center gap-2 text-xs font-bold uppercase">
                  <Check className="size-4 text-primary" aria-hidden />
                  {t("deliveryNote")}
                </li>
              </ul>
            ) : (
              <p className="text-sm text-zinc-500">{t("deliveryNote")}</p>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-28 border-t-8 border-primary bg-black p-8 text-white">
              <h3 className="font-display mb-6 text-3xl tracking-wide">
                {t("productFacts")}
              </h3>
              <div className="space-y-0">
                {facts.map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between gap-4 border-b border-white/10 py-3 last:border-b-0"
                  >
                    <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
                      {row.label}
                    </span>
                    <span
                      className="font-display text-xl text-end"
                      dir={"latin" in row && row.latin ? "ltr" : undefined}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 ? (
          <section className="mt-16 md:mt-24">
            <Reveal>
              <h2 className="font-display mb-8 text-4xl">
                {t("relatedProducts")}
              </h2>
            </Reveal>
            <RevealStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <RevealItem key={item.id} className="h-full">
                  <ProductCard product={item} compact />
                </RevealItem>
              ))}
            </RevealStagger>
          </section>
        ) : null}
      </div>

      <div
        className={cn(
          "sticky-add-bar fixed inset-x-0 bottom-0 z-[55] border-t border-line bg-white/95 backdrop-blur-[8px] transition-transform duration-300",
          showBar ? "translate-y-0" : "translate-y-full",
        )}
        aria-hidden={!showBar}
        {...(!showBar ? { inert: true } : {})}
      >
        <div className={`${WRAP} flex items-center justify-between gap-4 py-3`}>
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative size-12 shrink-0 overflow-hidden bg-zinc-50">
              <BlurImage
                src={productImage(product)}
                alt=""
                fill
                sizes="48px"
                className="object-contain p-1"
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
              className="inline-flex h-10 items-center justify-center bg-primary px-4 text-xs font-extrabold tracking-[0.08em] text-black uppercase sm:px-5 sm:text-sm"
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
