"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { animate } from "motion/react";
import { CartDrawer } from "@/components/cart-drawer";
import { useCart } from "@/components/cart-provider";
import { useLocale } from "@/components/locale-provider";
import { SiteLogo } from "@/components/site-logo";
import { NAV_LINKS, WRAP } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function navLinkActive(
  href: string,
  pathname: string,
  category: string | null,
) {
  if (href === "/") return pathname === "/";
  if (!href.startsWith("/catalogue")) return false;
  if (!pathname.startsWith("/catalogue")) return false;
  const wanted = href.split("categorie=")[1] ?? null;
  return category === wanted;
}

function DesktopNav() {
  const { t } = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get("categorie");

  return (
    <ul className="hidden list-none items-center gap-8 text-xs font-extrabold tracking-[0.2em] uppercase lg:flex">
      {NAV_LINKS.map((item) => {
        const active = navLinkActive(item.href, pathname, category);
        return (
          <li key={item.href + item.labelKey}>
            <Link
              href={item.href}
              className={cn(
                "text-black no-underline transition-colors hover:text-primary",
                active && "border-b-2 border-primary pb-1",
              )}
            >
              {t(item.labelKey)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function LanguageToggle() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      className="flex border border-line text-[11px] font-black tracking-[0.08em]"
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
                ? "bg-primary px-2.5 py-1.5 text-black"
                : "bg-transparent px-2.5 py-1.5 text-zinc-500"
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
      className="relative text-black transition-all hover:scale-110 hover:text-primary"
      aria-label={t("cartLabel")}
      onClick={() => setOpen(true)}
    >
      <ShoppingBag className="size-5" aria-hidden />
      {count > 0 || displayCount > 0 ? (
        <span
          className={cn(
            "absolute -top-2 -end-2 flex size-4 items-center justify-center rounded-full bg-black text-[10px] font-black text-primary",
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
      <div className="sticky top-0 z-50">
        <p className="border-b border-white/10 bg-black py-2.5 text-center text-[10px] font-bold tracking-[0.25em] text-primary uppercase md:text-xs">
          {t("ticker")}
        </p>
        <nav className="border-b border-black/5 bg-white">
          <div className={`${WRAP} flex h-20 items-center justify-between`}>
            <SiteLogo />
            <Suspense
              fallback={
                <ul className="hidden list-none items-center gap-8 text-xs font-extrabold tracking-[0.2em] uppercase lg:flex">
                  {NAV_LINKS.map((item) => (
                    <li key={item.href + item.labelKey}>
                      <Link
                        href={item.href}
                        className="text-black no-underline transition-colors hover:text-primary"
                      >
                        {t(item.labelKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              }
            >
              <DesktopNav />
            </Suspense>
            <div className="flex items-center gap-6">
              <LanguageToggle />
              <Link
                href="/catalogue"
                className="hidden text-black transition-all hover:scale-110 hover:text-primary sm:block"
                aria-label={t("searchProducts")}
              >
                <Search className="size-5" aria-hidden />
              </Link>
              <CartButton />
              <button
                type="button"
                className="flex size-10 items-center justify-center text-black transition-all hover:scale-110 hover:text-primary lg:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                aria-label={menuOpen ? t("menuClose") : t("menuOpen")}
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
      </div>

      <CartDrawer />

      {menuOpen ? (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/45"
            aria-label={t("menuClose")}
            onClick={() => setMenuOpen(false)}
          />
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label={t("navHome")}
            className="absolute inset-y-0 end-0 flex w-[min(20rem,88vw)] flex-col gap-6 border-s border-line bg-white p-5 pt-16"
          >
            <button
              type="button"
              className="absolute top-4 end-4 flex size-10 items-center justify-center border border-line"
              aria-label={t("menuClose")}
              onClick={() => setMenuOpen(false)}
            >
              <X className="size-4" aria-hidden />
            </button>
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href + item.labelKey}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2.5 text-sm font-black tracking-[0.12em] text-foreground uppercase no-underline hover:bg-zinc-50"
                >
                  {t(item.labelKey)}
                </Link>
              ))}
              <Link
                href="/catalogue"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-black tracking-[0.12em] text-foreground uppercase no-underline hover:bg-zinc-50"
              >
                {t("navCatalogue")}
              </Link>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-black tracking-[0.12em] text-foreground uppercase no-underline hover:bg-zinc-50"
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
