"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Banknote,
  Check,
  MapPin,
  MessageCircle,
  PhoneCall,
  Truck,
} from "lucide-react";
import { BlurImage } from "@/components/blur-image";
import { formatPrice, priceAmount } from "@/components/cart-provider";
import { useLocale } from "@/components/locale-provider";
import { ShopButton } from "@/components/shop-button";
import { PRODUCT_IMAGES } from "@/lib/media";
import {
  loadOrder,
  whatsappCheckoutHref,
  type OrderSnapshot,
} from "@/lib/order";
import { WHATSAPP_HREF, getProduct } from "@/lib/products";
import { WRAP } from "@/lib/site";

export function OrderConfirmation() {
  const { t } = useLocale();
  const reduced = useReducedMotion();
  const [order, setOrder] = useState<OrderSnapshot | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOrder(loadOrder());
    setReady(true);
  }, []);

  if (!ready) {
    return <div className="min-h-[50vh] bg-zinc-50" />;
  }

  if (!order) {
    return (
      <div className={`${WRAP} py-20 text-center`}>
        <p className="mb-8 text-sm text-zinc-500">{t("confirmEmpty")}</p>
        <ShopButton href="/catalogue">{t("confirmContinue")}</ShopButton>
      </div>
    );
  }

  const waHref = whatsappCheckoutHref(
    order.items,
    order.subtotal,
    order.customer,
  );

  return (
    <div className="flex flex-1 flex-col bg-zinc-50">
      <header className="diagonal-header confirm-banner relative overflow-hidden py-24">
        <div
          className={`${WRAP} relative z-10 flex flex-col items-center text-center`}
        >
          <motion.div
            className="mb-8 flex size-24 items-center justify-center rounded-full bg-black shadow-2xl"
            initial={reduced ? false : { scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <Check className="size-12 text-primary" strokeWidth={3} aria-hidden />
          </motion.div>
          <motion.h1
            className="font-display mb-4 text-6xl leading-none text-black md:text-8xl"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            {t("confirmTitle")}
          </motion.h1>
          <motion.p
            className="text-sm font-black tracking-[0.3em] text-black uppercase italic md:text-lg"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.22 }}
          >
            {t("confirmLead")}
          </motion.p>
        </div>
        <div className="pointer-events-none absolute top-0 -right-20 font-display text-[300px] text-black/5 select-none">
          OK
        </div>
      </header>

      <div className={`${WRAP} relative z-20 -mt-16 pb-24`}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <div className="border border-zinc-200 bg-white p-8 shadow-[20px_20px_0_rgba(0,0,0,0.05)] md:p-12">
              <div className="mb-10 flex flex-col justify-between gap-6 border-b border-zinc-100 pb-8 md:flex-row md:items-center">
                <div className="space-y-1">
                  <span className="text-[10px] font-black tracking-widest text-zinc-400 uppercase">
                    {t("confirmNumber")}
                  </span>
                  <div className="font-display text-3xl tracking-wider">
                    #{order.id}
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black tracking-widest text-zinc-400 uppercase">
                    {t("confirmEta")}
                  </span>
                  <div className="flex items-center gap-2 text-xl font-bold">
                    <Truck className="size-5 text-primary" aria-hidden />
                    {t("confirmEtaValue")}
                  </div>
                </div>
              </div>

              <h3 className="font-display mb-6 flex items-center gap-3 text-3xl">
                <span className="h-1 w-8 bg-primary" />
                {t("confirmItems")}
              </h3>
              <div className="space-y-6">
                {order.items.map((item) => {
                  const image = PRODUCT_IMAGES[item.id];
                  const product = getProduct(item.id);
                  return (
                    <div key={item.id} className="flex items-center gap-6">
                      <div className="relative size-20 shrink-0 border border-zinc-100 bg-zinc-50 p-2">
                        {image ? (
                          <BlurImage
                            src={image}
                            alt={product?.alt ?? item.name}
                            fill
                            sizes="80px"
                            className="object-contain"
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-lg leading-tight font-bold uppercase">
                          {item.name}
                        </h4>
                        <p className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
                          {item.flavour} | {item.size}
                        </p>
                      </div>
                      <div className="text-end">
                        <div className="text-sm font-bold text-zinc-400 italic">
                          x {item.quantity}
                        </div>
                        <div className="font-display text-2xl">
                          {formatPrice(priceAmount(item.price) * item.quantity)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 space-y-3 border-t-4 border-black pt-8">
                <div className="flex items-center justify-between text-sm font-bold tracking-widest uppercase">
                  <span className="text-zinc-500">{t("cartSubtotal")}</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold tracking-widest uppercase">
                  <span className="text-zinc-500">{t("cartShipping")}</span>
                  <span className="text-primary">{t("cartShippingValue")}</span>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <span className="font-display text-4xl">{t("cartTotal")}</span>
                  <span className="font-display text-5xl">
                    {formatPrice(order.subtotal)}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4 bg-black p-8 text-white">
                <MessageCircle className="size-8 text-primary" aria-hidden />
                <h4 className="font-display text-2xl">{t("confirmWaTitle")}</h4>
                <p className="text-sm text-zinc-400">{t("confirmWaBody")}</p>
              </div>
              <div className="space-y-4 border border-zinc-200 bg-white p-8 shadow-[20px_20px_0_rgba(0,0,0,0.05)]">
                <PhoneCall className="size-8 text-primary" aria-hidden />
                <h4 className="font-display text-2xl text-black">
                  {t("confirmSupport")}
                </h4>
                <p className="text-sm text-zinc-600">
                  {t("whatsappDisplay")}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-4">
            <div className="space-y-6 bg-zinc-900 p-8 text-white">
              <h3 className="font-display text-3xl text-primary">
                {t("checkoutTitle")}
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <MapPin className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
                  <div>
                    <div className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">
                      {t("confirmAddress")}
                    </div>
                    <p className="text-sm font-semibold">
                      {order.customer.name}
                      <br />
                      {order.customer.address}
                      <br />
                      {order.customer.city} {order.customer.zip}
                      <br />
                      +216 {order.customer.phone}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Banknote className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
                  <div>
                    <div className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">
                      {t("checkoutPayMethod")}
                    </div>
                    <p className="text-sm font-semibold">{t("confirmPay")}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 border-t border-white/10 pt-6">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full no-underline"
                >
                  WhatsApp
                </a>
                <ShopButton href="/catalogue" variant="ghost" className="w-full">
                  {t("confirmContinue")}
                </ShopButton>
              </div>
            </div>

            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-primary p-8 text-black no-underline"
            >
              <h4 className="font-display mb-4 text-2xl">{t("cartAssist")}</h4>
              <p className="text-sm font-bold italic">{t("whatsappDisplay")}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
