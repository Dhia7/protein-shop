"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Dumbbell, Menu, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_HREF } from "@/lib/products";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b border-primary/20 bg-background/70 backdrop-blur-xl transition-[background-color,box-shadow,padding] duration-300",
          scrolled && "bg-background/90 shadow-black/40 shadow-sm",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-6xl items-center gap-3 px-4 md:px-6",
            scrolled ? "py-2" : "py-3",
          )}
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold tracking-wide text-primary"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/30">
              <Dumbbell className="size-4" aria-hidden />
            </span>
            Protein Shop
          </Link>

          <nav className="ml-4 hidden items-center gap-1 sm:flex" aria-label="Principal">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
                    active && "text-primary-foreground hover:text-primary-foreground",
                  )}
                >
                  {active ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-primary"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Button asChild size="sm">
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
                <MessageCircle />
                WhatsApp
              </a>
            </Button>
            <Button
              type="button"
              size="icon-sm"
              variant="outline"
              className="sm:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="mobile-nav"
            className="fixed inset-0 z-[60] sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/55 backdrop-blur-sm"
              aria-label="Fermer le menu"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              className="absolute inset-y-0 right-0 flex w-[min(20rem,88vw)] flex-col gap-6 overflow-y-auto border-l border-primary/25 bg-card p-5 pt-16 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
            >
              <Button
                type="button"
                size="icon-sm"
                variant="outline"
                className="absolute top-4 right-4"
                aria-label="Fermer le menu"
                onClick={() => setMenuOpen(false)}
              >
                <X />
              </Button>
              <nav className="flex flex-col gap-1">
                {NAV.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "rounded-lg px-3 py-2.5 text-base text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                        active &&
                          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              <Button asChild>
                <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
                  <MessageCircle />
                  Commander sur WhatsApp
                </a>
              </Button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
