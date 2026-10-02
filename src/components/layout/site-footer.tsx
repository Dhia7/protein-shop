"use client";

import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { SiteLogo } from "@/components/site-logo";
import { useLocale } from "@/components/locale-provider";
import { WHATSAPP_HREF } from "@/lib/products";
import { WRAP } from "@/lib/site";

export function SiteFooter() {
  const { t } = useLocale();

  const categoryLinks = [
    { href: "/catalogue?categorie=whey", label: t("catWhey") },
    { href: "/catalogue?categorie=mass", label: t("catGainers") },
    { href: "/catalogue?categorie=vegan", label: t("catVegan") },
    { href: "/catalogue?categorie=casein", label: t("catCasein") },
    { href: "/catalogue?categorie=collagen", label: t("catCollagen") },
    { href: "/catalogue?categorie=eaa", label: t("catEaa") },
    { href: "/catalogue?categorie=preworkout", label: t("preworkout") },
    { href: "/catalogue?categorie=accessoires", label: t("catAccess") },
  ];

  const infoLinks = [
    { href: "/contact", label: t("footerAbout") },
    { href: "/contact", label: t("footerShipping") },
    { href: "/contact", label: t("navContact") },
  ];

  return (
    <footer className="border-t border-primary/20 bg-black text-white">
      <div className={`${WRAP} mb-12 grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 sm:py-16 lg:grid-cols-4 lg:py-20`}>
        <div className="space-y-6">
          <SiteLogo inverse />
          <p className="text-sm leading-relaxed text-zinc-500">{t("footerBlurb")}</p>
        </div>
        <div>
          <h4 className="mb-8 text-xs font-bold tracking-widest uppercase">
            {t("footerCategories")}
          </h4>
          <ul className="space-y-4 text-sm font-medium text-zinc-400">
            {categoryLinks.map((item) => (
              <li key={item.href + item.label}>
                <Link
                  href={item.href}
                  className="text-zinc-400 no-underline transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-8 text-xs font-bold tracking-widest uppercase">
            {t("footerInfo")}
          </h4>
          <ul className="space-y-4 text-sm font-medium text-zinc-400">
            {infoLinks.map((item) => (
              <li key={item.href + item.label}>
                <Link
                  href={item.href}
                  className="text-zinc-400 no-underline transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-8 text-xs font-bold tracking-widest uppercase">
            {t("storeTitle")}
          </h4>
          <div className="space-y-4 text-sm text-zinc-400">
            <div className="flex gap-3">
              <MapPin className="size-4 shrink-0 text-primary" aria-hidden />
              <span>{t("storeAddress")}</span>
            </div>
            <div className="flex gap-3">
              <Clock className="size-4 shrink-0 text-primary" aria-hidden />
              <span>{t("storeHours")}</span>
            </div>
            <div className="flex gap-3">
              <Phone className="size-4 shrink-0 text-primary" aria-hidden />
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 no-underline hover:text-primary"
              >
                {t("whatsappDisplay")}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${WRAP} flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 pb-10 md:flex-row`}
      >
        <p className="text-xs text-zinc-600">{t("copyright")}</p>
        <p className="text-xs text-zinc-600">{t("cod")}</p>
      </div>
    </footer>
  );
}
