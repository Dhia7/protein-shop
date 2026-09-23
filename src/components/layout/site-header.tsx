"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { animate } from "motion/react";
import { CartDrawer } from "@/components/cart-drawer";
import { useCart } from "@/components/cart-provider";
import { useLocale } from "@/components/locale-provider";
import { SiteLogo } from "@/components/site-logo";
import { NAV_LINKS, WRAP } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function LanguageToggle() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      className="flex gap-0.5 rounded-full border border-line p-[5px_4px] text-xs font-bold"
      role="group"
      aria-label={t("language")}
    >
      {(["fr", "ar"] as const).map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            className={
              active
                ? "rounded-full bg-primary px-2.5 py-[3px] text-[12px] font-bold text-[#111]"
                : "rounded-full bg-transparent px-2.5 py-[3px] text-[12px] font-bold text-chalk-dim"
            }
            aria-pressed={active}
            onClick={() => setLocale(code as Locale)}
          >
            {code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

function CartButton() {
  const { count, ready, setOpen } = useCart();
  const { t } = useLocale();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prevCount = useRef(0);
  const hydrated = useRef(false);
  const [displayCount, setDisplayCount] = useState(0);
  const [popBadge, setPopBadge] = useState(false);

  useEffect(() => {
    if (!ready) return;

    if (!hydrated.current) {
      hydrated.current = true;
      prevCount.current = count;
      setDisplayCount(count);
      return;
    }

    if (count > prevCount.current) {
      const from = prevCount.current;
      const button = buttonRef.current;
      if (button) {
        button.classList.remove("cart-bounce");
        void button.offsetWidth;
        button.classList.add("cart-bounce");
      }

      if (from === 0) setPopBadge(true);

      prevCount.current = count;
      const controls = animate(from, count, {
        duration: 0.3,
        ease: "easeOut",
        onUpdate: (value) => setDisplayCount(Math.round(value)),
      });
      const bounceTimer = window.setTimeout(() => {
        button?.classList.remove("cart-bounce");
      }, 450);

      return () => {
        controls.stop();
        window.clearTimeout(bounceTimer);
        button?.classList.remove("cart-bounce");
      };
    }

    if (count === 0) setPopBadge(false);
    prevCount.current = count;
    setDisplayCount(count);
  }, [count, ready]);

  const badgeValue = displayCount > 9 ? "9+" : displayCount;

  return (
    <button
      ref={buttonRef}
      type="button"
      className="relative flex size-[38px] items-center justify-center rounded-full border border-line text-foreground"
      aria-label={t("cartLabel")}
      onClick={() => setOpen(true)}
    >
      <span className="text-[16px] leading-none" aria-hidden>
        🛒
      </span>
      {count > 0 || displayCount > 0 ? (
        <span
          className={cn(
            "absolute -top-1 -end-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-extrabold text-[#111]",
            popBadge && "cart-badge-in",
          )}
        >
          {badgeValue}
        </span>
      ) : null}
    </button>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLocale();
  const { open: cartOpen, setOpen: setCartOpen } = useCart();

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!cartOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCartOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [cartOpen, setCartOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-line bg-[color-mix(in_srgb,var(--color-iron)_92%,transparent)] backdrop-blur-[8px]">
        <div className={`${WRAP} flex h-[76px] items-center justify-between`}>
          <SiteLogo />
          <ul className="hidden list-none gap-8 text-sm font-semibold tracking-[0.02em] lg:flex">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-foreground no-underline opacity-85 transition-opacity hover:opacity-100"
                >
                  {t(item.labelKey)}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-[18px]">
            <LanguageToggle />
            <CartButton />
            <button
              type="button"
              className="flex size-[38px] items-center justify-center rounded-full border border-line lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <X className="size-4" aria-hidden />
              ) : (
                <Menu className="size-4" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </nav>

      <CartDrawer />

      {menuOpen ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/55"
            aria-label="Fermer le menu"
            onClick={() => setMenuOpen(false)}
          />
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="absolute inset-y-0 end-0 flex w-[min(20rem,88vw)] flex-col gap-6 border-s border-line bg-iron-2 p-5 pt-16"
          >
            <button
              type="button"
              className="absolute top-4 end-4 flex size-[38px] items-center justify-center rounded-full border border-line"
              aria-label="Fermer le menu"
              onClick={() => setMenuOpen(false)}
            >
              <X className="size-4" aria-hidden />
            </button>
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-[2px] px-3 py-2.5 text-base text-foreground no-underline hover:bg-iron"
                >
                  {t(item.labelKey)}
                </a>
              ))}
              <Link
                href="/catalogue"
                onClick={() => setMenuOpen(false)}
                className="rounded-[2px] px-3 py-2.5 text-base text-foreground no-underline hover:bg-iron"
              >
                {t("navCatalogue")}
              </Link>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="rounded-[2px] px-3 py-2.5 text-base text-foreground no-underline hover:bg-iron"
              >
                {t("navContact")}
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
