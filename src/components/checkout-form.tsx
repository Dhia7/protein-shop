"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Banknote,
  CreditCard,
  HelpCircle,
  Landmark,
  Lock,
  MapPin,
  Phone,
  Truck,
} from "lucide-react";
import { BlurImage } from "@/components/blur-image";
import {
  formatPrice,
  priceAmount,
  useCart,
} from "@/components/cart-provider";
import { useLocale } from "@/components/locale-provider";
import { ShopButton } from "@/components/shop-button";
import { PRODUCT_IMAGES } from "@/lib/media";
import {
  makeOrderId,
  saveOrder,
  whatsappCheckoutHref,
  type OrderCustomer,
} from "@/lib/order";
import { WHATSAPP_HREF, getProduct } from "@/lib/products";
import type { TranslationKey } from "@/lib/i18n";
import { WRAP } from "@/lib/site";
import { cn } from "@/lib/utils";

const CITIES: TranslationKey[] = [
  "cityTunis",
  "citySousse",
  "citySfax",
  "cityBizerte",
  "cityOther",
];

export function CheckoutForm() {
  const { items, subtotal, clearCart } = useCart();
  const { t } = useLocale();
  const router = useRouter();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("cityTunis");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);

  if (items.length === 0 && !placing) {
    return (
      <div className={`${WRAP} py-16`}>
        <p className="mb-8 text-sm text-zinc-500">{t("checkoutEmpty")}</p>
        <ShopButton href="/catalogue">{t("cartShop")}</ShopButton>
      </div>
    );
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const customer: OrderCustomer = {
      name: name.trim(),
      address: address.trim(),
      city: t(city as TranslationKey),
      zip: zip.trim(),
      phone: phone.replace(/\D/g, ""),
    };

    if (
      customer.name.length < 2 ||
      customer.address.length < 4 ||
      customer.city.length < 2 ||
      customer.phone.length < 8
    ) {
      setError(t("checkoutRequired"));
      return;
    }

    setPlacing(true);
    const snapshot = {
      id: makeOrderId(),
      items,
      subtotal,
      customer,
      createdAt: new Date().toISOString(),
    };
    saveOrder(snapshot);
    window.open(
      whatsappCheckoutHref(items, subtotal, customer),
      "_blank",
      "noopener,noreferrer",
    );
    router.push("/commande/confirmee");
    clearCart();
  }

  return (
    <form onSubmit={onSubmit} className={`${WRAP} py-12 md:py-16`}>
      <div className="mb-10">
        <h1 className="font-display text-[clamp(2.25rem,9vw,3.75rem)] md:text-6xl">{t("checkoutTitle")}</h1>
        <div className="mt-2 h-1.5 w-24 bg-primary" />
      </div>

      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-8">
          <div className="mb-8 flex max-w-2xl items-start justify-between gap-1 sm:items-center sm:gap-0">
            <div className="flex min-w-0 flex-col items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-black sm:size-10">
                1
              </div>
              <span className="max-w-[7ch] text-center text-[9px] font-black tracking-wider uppercase sm:max-w-none sm:text-[10px] sm:tracking-widest">
                {t("checkoutStepDelivery")}
              </span>
            </div>
            <div className="mx-1 mb-6 h-0.5 min-w-4 flex-1 bg-primary sm:mx-4" />
            <div className="flex min-w-0 flex-col items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full border-2 border-zinc-200 bg-white text-sm font-bold text-zinc-400 sm:size-10">
                2
              </div>
              <span className="max-w-[7ch] text-center text-[9px] font-black tracking-wider text-zinc-400 uppercase sm:max-w-none sm:text-[10px] sm:tracking-widest">
                {t("checkoutStepPay")}
              </span>
            </div>
            <div className="mx-1 mb-6 h-0.5 min-w-4 flex-1 bg-zinc-200 sm:mx-4" />
            <div className="flex min-w-0 flex-col items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-zinc-200 text-sm font-bold text-zinc-400 sm:size-10">
                3
              </div>
              <span className="max-w-[7ch] text-center text-[9px] font-black tracking-wider text-zinc-400 uppercase sm:max-w-none sm:text-[10px] sm:tracking-widest">
                {t("checkoutStepReview")}
              </span>
            </div>
          </div>

          <div className="border border-zinc-100 bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-8 flex items-center gap-4">
              <MapPin className="size-6 text-primary" aria-hidden />
              <h2 className="text-xl font-bold tracking-wider uppercase">
                {t("checkoutAddress")}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label
                  htmlFor="checkout-name"
                  className="mb-2 block text-[10px] font-black tracking-widest text-zinc-500 uppercase"
                >
                  {t("checkoutName")}
                </label>
                <input
                  id="checkout-name"
                  className="input-field"
                  placeholder={t("checkoutNamePh")}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="checkout-address"
                  className="mb-2 block text-[10px] font-black tracking-widest text-zinc-500 uppercase"
                >
                  {t("checkoutStreet")}
                </label>
                <input
                  id="checkout-address"
                  className="input-field"
                  placeholder={t("checkoutStreetPh")}
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  autoComplete="street-address"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="checkout-city"
                  className="mb-2 block text-[10px] font-black tracking-widest text-zinc-500 uppercase"
                >
                  {t("checkoutCity")}
                </label>
                <select
                  id="checkout-city"
                  className="input-field"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                >
                  {CITIES.map((key) => (
                    <option key={key} value={key}>
                      {t(key)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="checkout-zip"
                  className="mb-2 block text-[10px] font-black tracking-widest text-zinc-500 uppercase"
                >
                  {t("checkoutZip")}
                </label>
                <input
                  id="checkout-zip"
                  className="input-field force-ltr"
                  placeholder={t("checkoutZipPh")}
                  value={zip}
                  onChange={(event) => setZip(event.target.value)}
                  autoComplete="postal-code"
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="checkout-phone"
                  className="mb-2 block text-[10px] font-black tracking-widest text-zinc-500 uppercase"
                >
                  {t("checkoutPhone")}
                </label>
                <div className="force-ltr flex">
                  <span className="border border-e-0 border-zinc-200 bg-zinc-100 px-4 py-3 text-zinc-500">
                    +216
                  </span>
                  <input
                    id="checkout-phone"
                    type="tel"
                    className="input-field force-ltr"
                    placeholder={t("checkoutPhonePh")}
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border border-zinc-100 bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-8 flex items-center gap-4">
              <Truck className="size-6 text-primary" aria-hidden />
              <h2 className="text-xl font-bold tracking-wider uppercase">
                {t("checkoutShipping")}
              </h2>
            </div>
            <div className="border border-primary bg-zinc-50 p-4">
              <p className="text-sm font-bold uppercase">{t("deliveryFast")}</p>
              <p className="text-xs text-zinc-500">{t("checkoutShippingOnly")}</p>
            </div>
          </div>

          <div className="border border-zinc-100 bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-8 flex items-center gap-4">
              <CreditCard className="size-6 text-primary" aria-hidden />
              <h2 className="text-xl font-bold tracking-wider uppercase">
                {t("checkoutPayMethod")}
              </h2>
            </div>
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex flex-col items-center gap-2 border-2 border-primary bg-zinc-50 p-6">
                <Banknote className="size-8" aria-hidden />
                <span className="text-[10px] font-black tracking-widest uppercase">
                  {t("checkoutCod")}
                </span>
              </div>
              <div
                className="flex flex-col items-center gap-2 border-2 border-zinc-100 p-6 opacity-45"
                aria-disabled="true"
              >
                <CreditCard className="size-8" aria-hidden />
                <span className="text-[10px] font-black tracking-widest uppercase">
                  {t("checkoutCard")}
                </span>
                <span className="text-[9px] font-bold text-zinc-400 uppercase">
                  {t("comingSoon")}
                </span>
              </div>
              <div
                className="flex flex-col items-center gap-2 border-2 border-zinc-100 p-6 opacity-45"
                aria-disabled="true"
              >
                <Landmark className="size-8" aria-hidden />
                <span className="text-[10px] font-black tracking-widest uppercase">
                  {t("checkoutTransfer")}
                </span>
                <span className="text-[9px] font-bold text-zinc-400 uppercase">
                  {t("comingSoon")}
                </span>
              </div>
            </div>
            <div className="border border-zinc-200 bg-zinc-50 p-6">
              <p className="text-sm leading-relaxed text-zinc-600">
                <strong>{t("checkoutCod")} :</strong> {t("checkoutCodHint")}
              </p>
            </div>
          </div>

          {error ? (
            <p className="text-sm font-bold text-red-600" role="alert">
              {error}
            </p>
          ) : null}
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            <div className="bg-black p-5 text-white sm:p-8">
              <h3 className="font-display mb-6 border-b border-white/10 pb-4 text-2xl tracking-wider">
                {t("checkoutSummary")}
              </h3>
              <div className="mb-8 space-y-6">
                {items.map((item) => {
                  const image = PRODUCT_IMAGES[item.id];
                  const product = getProduct(item.id);
                  return (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative size-16 shrink-0 border border-white/10 bg-zinc-900 p-1">
                        {image ? (
                          <BlurImage
                            src={image}
                            alt={product?.alt ?? item.name}
                            fill
                            sizes="64px"
                            className="object-contain"
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-bold tracking-widest text-primary uppercase">
                          {item.name}
                        </p>
                        <div className="mt-1 flex items-center justify-between gap-2">
                          <span className="text-xs text-zinc-500">
                            {t("quantity")}: {item.quantity}
                          </span>
                          <span className="font-bold">
                            {formatPrice(priceAmount(item.price) * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="space-y-3 border-t border-white/10 pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">{t("cartSubtotal")}</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">{t("cartShipping")}</span>
                  <span>{t("cartShippingValue")}</span>
                </div>
                <div className="mt-2 flex justify-between border-t border-white/10 pt-4 font-display text-2xl tracking-wider text-primary">
                  <span>{t("cartTotal")}</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>
              <button type="submit" className={cn("btn-primary mt-8 w-full")}>
                {t("checkoutPlace")}
              </button>
              <div className="mt-6 flex items-center justify-center gap-2 text-zinc-500">
                <Lock className="size-3" aria-hidden />
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase">
                  {t("cartCodSecure")}
                </span>
              </div>
            </div>

            <div className="border border-zinc-100 bg-white p-6">
              <h4 className="mb-4 flex items-center gap-2 text-[10px] font-black tracking-widest uppercase">
                <HelpCircle className="size-5 text-primary" aria-hidden />
                {t("checkoutHelp")}
              </h4>
              <p className="mb-4 text-xs text-zinc-500">{t("checkoutHelpBody")}</p>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-bold no-underline hover:text-primary"
              >
                <Phone className="size-4" aria-hidden />
                {t("whatsappDisplay")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
