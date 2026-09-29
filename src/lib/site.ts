import type { TranslationKey } from "@/lib/i18n";

export const WRAP = "mx-auto w-full max-w-[1440px] px-6";

export const PARTNER_NAMES = [
  "IRON CLUB",
  "POWERHOUSE",
  "FLEX GYM",
  "TITAN FITNESS",
  "APEX",
] as const;

export const NAV_LINKS: { href: string; labelKey: TranslationKey }[] = [
  { href: "/", labelKey: "navHome" },
  { href: "/catalogue?categorie=whey", labelKey: "whey" },
  { href: "/catalogue?categorie=mass", labelKey: "navGainers" },
  { href: "/catalogue?categorie=preworkout", labelKey: "navPerformance" },
  { href: "/#partenaires", labelKey: "navBrands" },
];
