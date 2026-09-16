"use client";

import Link from "next/link";
import { SiteLogo } from "@/components/site-logo";
import { useLocale } from "@/components/locale-provider";
import { WHATSAPP_HREF } from "@/lib/products";
import { WRAP } from "@/lib/site";

export function SiteFooter() {
  const { t } = useLocale();

  const shopLinks = [
    { href: "/catalogue?categorie=whey", label: t("whey") },
    { href: "/catalogue?categorie=creatine", label: t("creatine") },
    { href: "/catalogue?categorie=preworkout", label: t("preworkout") },
    { href: "/#packs", label: t("packs") },
  ];

  const infoLinks = [
    { href: "/contact", label: t("delivery") },
    { href: "/#avis", label: t("partners") },
    { href: "/contact", label: t("navContact") },
  ];

  return (
    <footer className="pt-16 pb-10">
      <div className={WRAP}>
        <div className="mb-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <SiteLogo className="mb-3.5 inline-block" />
            <p className="max-w-[32ch] text-sm text-chalk-dim">{t("footerBlurb")}</p>
          </div>
          <div>
            <h5 className="mb-[18px] text-[13px] font-extrabold tracking-[0.04em] text-chalk-dim uppercase">
              {t("shop")}
            </h5>
            <ul className="list-none">
              {shopLinks.map((item) => (
                <li key={item.href + item.label} className="mb-[11px] text-sm">
                  <Link
                    href={item.href}
                    className="text-foreground no-underline opacity-85 hover:opacity-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="mb-[18px] text-[13px] font-extrabold tracking-[0.04em] text-chalk-dim uppercase">
              {t("info")}
            </h5>
            <ul className="list-none">
              {infoLinks.map((item) => (
                <li key={item.href + item.label} className="mb-[11px] text-sm">
                  <Link
                    href={item.href}
                    className="text-foreground no-underline opacity-85 hover:opacity-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="mb-[18px] text-[13px] font-extrabold tracking-[0.04em] text-chalk-dim uppercase">
              {t("follow")}
            </h5>
            <ul className="list-none">
              <li className="mb-[11px] text-sm">
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground no-underline opacity-85 hover:opacity-100"
                >
                  WhatsApp
                </a>
              </li>
              <li className="mb-[11px] text-sm opacity-85">Instagram</li>
              <li className="mb-[11px] text-sm opacity-85">TikTok</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-xs text-chalk-dim">
          <span>{t("copyright")}</span>
          <span>{t("cod")}</span>
        </div>
      </div>
    </footer>
  );
}
