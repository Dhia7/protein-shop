"use client";

import Link from "next/link";
import { ArrowLeft, PhoneCall, ShoppingBag, Trash2, Truck } from "lucide-react";
import { BlurImage } from "@/components/blur-image";
import {
  formatPrice,
  priceAmount,
  useCart,
} from "@/components/cart-provider";
import { useLocale } from "@/components/locale-provider";
import { QuantityStepper } from "@/components/quantity-stepper";
import { Reveal, RevealItem, RevealStagger } from "@/components/reveal";
import { ShopButton } from "@/components/shop-button";
import { PRODUCT_IMAGES } from "@/lib/media";
import { getProduct, productHref, CATEGORY_LABEL_KEYS } from "@/lib/products";
import { WRAP } from "@/lib/site";

export function CartPage() {
  const { items, count, subtotal, setItemQuantity, removeItem } = useCart();
  const { t } = useLocale();

  return (
    <div className="bg-grid flex-1 bg-white">
      <div className="relative overflow-hidden bg-black py-10 text-white md:py-16">
        <div className="absolute top-0 end-0 h-full w-[40%] translate-x-[30%] -skew-x-[20deg] bg-primary opacity-20 rtl:-translate-x-[30%] rtl:skew-x-[20deg]" />
        <div className={`${WRAP} relative z-10`}>
          <h1 className="section-display font-display text-[clamp(2.75rem,14vw,6rem)] tracking-tighter uppercase md:text-8xl">
            {t("cartPageTitle")}
          </h1>
          <div className="mt-4 flex items-center gap-4">
            <div className="h-1 w-12 bg-primary" />
            <p className="font-bold tracking-[0.12em] text-zinc-400 uppercase sm:tracking-[0.2em]">
              {count} {t("cartArticles")}
            </p>
          </div>
        </div>
      </div>

      <div className={`${WRAP} py-8 md:py-16`}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <ShoppingBag
                  className="mb-6 size-20 text-zinc-100"
                  strokeWidth={1.25}
                  aria-hidden
                />
                <h2 className="font-display mb-4 text-4xl uppercase">
                  {t("cartEmpty")}
                </h2>
                <p className="mb-10 text-sm font-bold tracking-widest text-zinc-500 uppercase">
                  {t("cartEmptyHint")}
                </p>
                <ShopButton href="/catalogue">{t("cartContinue")}</ShopButton>
              </div>
            ) : (
              <RevealStagger className="space-y-8">
                {items.map((item) => {
                  const image = PRODUCT_IMAGES[item.id];
                  const product = getProduct(item.id);
                  const href = productHref(item.id);

                  return (
                    <RevealItem key={item.id}>
                      <div className="cart-item-shadow flex flex-col items-center gap-6 border-2 border-black bg-white p-4 sm:p-6 md:flex-row md:gap-8">
                        <Link
                          href={href}
                          className="relative size-32 shrink-0 overflow-hidden border border-zinc-100 bg-zinc-50 md:size-40"
                        >
                          {image ? (
                            <BlurImage
                              src={image}
                              alt={product?.alt ?? item.name}
                              fill
                              sizes="160px"
                              className="object-contain p-2"
                            />
                          ) : null}
                          <span className="sr-only">{item.name}</span>
                        </Link>
                        <div className="min-w-0 w-full flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-[10px] font-black tracking-widest text-zinc-400 uppercase">
                                {product
                                  ? t(CATEGORY_LABEL_KEYS[product.category])
                                  : t("shop")}
                              </p>
                              <h3 className="font-display mt-1 text-2xl uppercase">
                                <Link
                                  href={href}
                                  className="force-ltr text-foreground no-underline hover:text-primary"
                                >
                                  {item.name}
                                </Link>
                              </h3>
                              <p className="text-sm font-bold tracking-wider text-zinc-500 uppercase">
                                {t("flavour")}:{" "}
                                <span className="force-ltr">
                                  {item.flavour} · {item.size}
                                </span>
                              </p>
                            </div>
                            <button
                              type="button"
                              className="text-zinc-400 hover:text-red-600"
                              aria-label={t("cartRemove")}
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="size-6" aria-hidden />
                            </button>
                          </div>
                          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
                            <QuantityStepper
                              boxed
                              value={item.quantity}
                              onChange={(quantity) =>
                                setItemQuantity(item.id, quantity)
                              }
                              max={99}
                              label={t("quantity")}
                              decreaseLabel={t("decreaseQty")}
                              increaseLabel={t("increaseQty")}
                            />
                            <div className="text-end">
                              <div className="text-sm font-bold tracking-widest text-zinc-400 uppercase">
                                {t("cartUnitPrice")}
                              </div>
                              <div className="font-display text-3xl">
                                {item.price}
                              </div>
                              {item.quantity > 1 ? (
                                <p className="text-xs font-bold text-zinc-400">
                                  {formatPrice(
                                    priceAmount(item.price) * item.quantity,
                                  )}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </RevealItem>
                  );
                })}
              </RevealStagger>
            )}

            <div className="flex justify-between pt-8">
              <Link
                href="/catalogue"
                className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase no-underline hover:text-primary"
              >
                <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden />
                {t("cartBack")}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-28 border-b-8 border-primary bg-black p-5 text-white shadow-2xl sm:p-8">
              <h2 className="font-display mb-8 text-4xl tracking-wider uppercase">
                {t("cartSummary")}
              </h2>
              <div className="mb-8 space-y-4">
                <div className="flex justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
                    {t("cartSubtotal")}
                  </span>
                  <span className="font-display text-2xl">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
                    {t("cartShipping")}
                  </span>
                  <span className="text-xs font-bold tracking-widest text-primary uppercase">
                    {t("cartShippingValue")}
                  </span>
                </div>
                <div className="flex justify-between pt-4">
                  <span className="font-display text-xl tracking-wider uppercase">
                    {t("cartTotal")}
                  </span>
                  <span className="font-display text-4xl text-primary">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>
              {items.length > 0 ? (
                <ShopButton href="/commande" className="w-full text-lg">
                  {t("cartPay")}
                </ShopButton>
              ) : (
                <ShopButton href="/catalogue" className="w-full text-lg">
                  {t("cartShop")}
                </ShopButton>
              )}
              <div className="flex items-center justify-center gap-2 py-4 text-[10px] font-black tracking-[0.12em] text-zinc-500 uppercase sm:tracking-[0.2em]">
                {t("cartCodSecure")}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center gap-2 border-2 border-black bg-white p-4 text-center">
                <Truck className="size-6" aria-hidden />
                <span className="text-[8px] font-black tracking-widest uppercase">
                  {t("deliveryFast")}
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 border-2 border-black bg-white p-4 text-center">
                <PhoneCall className="size-6" aria-hidden />
                <span className="text-[8px] font-black tracking-widest uppercase">
                  {t("cartAssist")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
