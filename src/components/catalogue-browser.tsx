"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { priceAmount } from "@/components/cart-provider";
import { useLocale } from "@/components/locale-provider";
import {
  PRODUCTS,
  WHATSAPP_HREF,
  isCategoryId,
  type CategoryId,
  type Product,
} from "@/lib/products";
import type { TranslationKey } from "@/lib/i18n";
import { WRAP } from "@/lib/site";
import { cn } from "@/lib/utils";

type SortId = "featured" | "new" | "name" | "price-asc" | "price-desc";
type FilterId =
  | "whey"
  | "isolat"
  | "mass"
  | "preworkout"
  | "bcaa"
  | "creatine"
  | "accessoires"
  | "vegan"
  | "casein"
  | "collagen"
  | "eaa";

const PAGE_SIZE = 8;

const FILTERS: {
  id: FilterId;
  labelKey: TranslationKey;
  test: (product: Product) => boolean;
}[] = [
  { id: "whey", labelKey: "catWhey", test: (product) => product.category === "whey" },
  {
    id: "isolat",
    labelKey: "catIsolat",
    test: (product) => /isolat/i.test(product.name),
  },
  { id: "mass", labelKey: "catGainers", test: (product) => product.category === "mass" },
  {
    id: "preworkout",
    labelKey: "preworkout",
    test: (product) => product.category === "preworkout",
  },
  { id: "bcaa", labelKey: "catAmino", test: (product) => product.category === "bcaa" || product.category === "eaa" },
  {
    id: "eaa",
    labelKey: "catEaa",
    test: (product) => product.category === "eaa",
  },
  {
    id: "creatine",
    labelKey: "creatine",
    test: (product) => product.category === "creatine",
  },
  {
    id: "accessoires",
    labelKey: "catAccess",
    test: (product) => product.category === "accessoires",
  },
  {
    id: "vegan",
    labelKey: "catVegan",
    test: (product) => product.category === "vegan",
  },
  {
    id: "casein",
    labelKey: "catCasein",
    test: (product) => product.category === "casein",
  },
  {
    id: "collagen",
    labelKey: "catCollagen",
    test: (product) => product.category === "collagen",
  },
];

const PRICE_FLOOR = Math.min(...PRODUCTS.map((product) => priceAmount(product.price)));
const PRICE_CEIL = Math.max(...PRODUCTS.map((product) => priceAmount(product.price)));

function initialSelected(category: CategoryId): Set<FilterId> {
  if (category === "all") return new Set();
  if (FILTERS.some((filter) => filter.id === category)) {
    return new Set([category as FilterId]);
  }
  return new Set();
}

export function CatalogueBrowser({
  initialCategory,
}: {
  initialCategory: CategoryId;
}) {
  const { t } = useLocale();
  const router = useRouter();
  const [selected, setSelected] = useState<Set<FilterId>>(() =>
    initialSelected(initialCategory),
  );
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortId>("featured");
  const [maxPrice, setMaxPrice] = useState(PRICE_CEIL);
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setSelected(initialSelected(initialCategory));
    setPage(1);
    setQuery("");
  }, [initialCategory]);

  function syncUrl(next: Set<FilterId>) {
    const ids = [...next];
    if (ids.length === 1 && isCategoryId(ids[0])) {
      router.replace(`/catalogue?categorie=${ids[0]}`, { scroll: false });
      return;
    }
    if (ids.length === 0) {
      router.replace("/catalogue", { scroll: false });
    }
  }

  function toggleFilter(id: FilterId) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
    setPage(1);
    syncUrl(next);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = PRODUCTS.filter((product) => {
      const catOk =
        selected.size === 0 ||
        FILTERS.some(
          (filter) => selected.has(filter.id) && filter.test(product),
        );
      const priceOk = priceAmount(product.price) <= maxPrice;
      const haystack =
        `${product.name} ${product.flavour} ${product.size}`.toLowerCase();
      return catOk && priceOk && (q.length === 0 || haystack.includes(q));
    });

    return [...rows].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name, "fr");
      if (sort === "price-asc") return priceAmount(a.price) - priceAmount(b.price);
      if (sort === "price-desc") return priceAmount(b.price) - priceAmount(a.price);
      if (sort === "new") {
        const aNew = a.tag === "Nouveau" ? 1 : 0;
        const bNew = b.tag === "Nouveau" ? 1 : 0;
        if (aNew !== bNew) return bNew - aNew;
      }
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return 0;
    });
  }, [maxPrice, query, selected, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const end = Math.min(currentPage * PAGE_SIZE, filtered.length);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white">
      <div className="border-b border-zinc-200 bg-zinc-50 py-8">
        <div className={WRAP}>
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="inline-flex items-center gap-1 text-xs font-bold tracking-widest text-zinc-400 uppercase md:gap-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-zinc-400 no-underline hover:text-black">
                  {t("breadcrumbHome")}
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight
                    className="me-2 size-3.5 text-zinc-300 rtl:rotate-180"
                    aria-hidden
                  />
                  <span className="text-black">{t("shop")}</span>
                </div>
              </li>
            </ol>
          </nav>
          <h1 className="section-display font-display text-[clamp(2.35rem,10vw,3.75rem)] text-black">
            {t("allProducts")}
          </h1>
        </div>
      </div>

      <div className={`${WRAP} flex flex-col gap-10 py-12 md:flex-row`}>
        <aside className="w-full shrink-0 md:w-64">
          <div className="filter-sticky space-y-10 pe-4">
            <div>
              <h3 className="font-display mb-4 text-2xl tracking-wider">
                {t("searchLabel")}
              </h3>
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setPage(1);
                  }}
                  placeholder={t("searchPlaceholder")}
                  aria-label={t("searchProducts")}
                  className="w-full border-b-2 border-black py-2 pe-10 text-sm font-bold placeholder:text-zinc-300 transition-colors focus:border-primary focus:outline-none"
                />
                <Search
                  className="absolute top-2 end-2 size-4 text-zinc-400"
                  aria-hidden
                />
              </div>
            </div>

            <div>
              <h3 className="font-display mb-4 text-2xl tracking-wider">
                {t("categories")}
              </h3>
              <div className="space-y-3">
                {FILTERS.map((filter) => {
                  const active = selected.has(filter.id);
                  const count = PRODUCTS.filter(filter.test).length;
                  return (
                    <label
                      key={filter.id}
                      className="group flex cursor-pointer items-center"
                    >
                      <input
                        type="checkbox"
                        className="custom-checkbox me-3 size-4"
                        checked={active}
                        onChange={() => toggleFilter(filter.id)}
                      />
                      <span
                        className={cn(
                          "text-xs font-black tracking-widest uppercase transition-colors group-hover:text-primary",
                          active && "text-primary",
                        )}
                      >
                        {t(filter.labelKey)}
                      </span>
                      <span className="ms-auto text-[10px] text-zinc-400">
                        ({count})
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="font-display mb-4 text-2xl tracking-wider">
                {t("brandsTitle")}
              </h3>
              <label className="group flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="custom-checkbox me-3 size-4"
                  checked
                  readOnly
                />
                <span className="text-xs font-black tracking-widest text-primary uppercase">
                  {t("brandOurs")}
                </span>
              </label>
            </div>

            <div>
              <h3 className="font-display mb-4 text-2xl tracking-wider">
                {t("priceRange")}
              </h3>
              <div className="space-y-4">
                <input
                  type="range"
                  min={PRICE_FLOOR}
                  max={PRICE_CEIL}
                  value={maxPrice}
                  onChange={(event) => {
                    setMaxPrice(Number(event.target.value));
                    setPage(1);
                  }}
                  className="w-full accent-primary"
                  aria-label={t("priceRange")}
                />
                <div className="flex items-center justify-between text-[10px] font-black uppercase">
                  <span>
                    {t("priceMin")}: {PRICE_FLOOR} DT
                  </span>
                  <span>
                    {t("priceMax")}: {maxPrice} DT
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full bg-black py-3 text-xs font-black tracking-[0.2em] text-white uppercase transition-colors hover:bg-primary hover:text-black"
              onClick={() => {
                document.getElementById("catalogue-grid")?.focus();
              }}
            >
              {t("filterResults")}
            </button>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <div className="mb-10 flex flex-col items-center justify-between gap-6 border-b border-zinc-100 pb-6 md:flex-row">
            <p className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
              {t("showing")}{" "}
              <span className="text-black">
                {filtered.length === 0 ? "0" : `${start}-${end}`}
              </span>{" "}
              {t("of")} <span className="text-black">{filtered.length}</span>{" "}
              {t("productsWord")}
            </p>
            <div className="flex w-full items-center gap-4 md:w-auto">
              <span className="text-xs font-black tracking-widest whitespace-nowrap uppercase">
                {t("sortBy")}:
              </span>
              <select
                value={sort}
                onChange={(event) => {
                  setSort(event.target.value as SortId);
                  setPage(1);
                }}
                className="flex-1 border-2 border-black bg-white px-4 py-2 text-xs font-bold tracking-widest uppercase focus:border-primary focus:outline-none md:w-64"
                aria-label={t("sortBy")}
              >
                <option value="featured">{t("sortFeatured")}</option>
                <option value="new">{t("sortNew")}</option>
                <option value="price-asc">{t("sortPriceAsc")}</option>
                <option value="price-desc">{t("sortPriceDesc")}</option>
                <option value="name">{t("sortName")}</option>
              </select>
            </div>
          </div>

          {visible.length > 0 ? (
            <div
              id="catalogue-grid"
              tabIndex={-1}
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {visible.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  catalog
                  priority={index < 4}
                />
              ))}
            </div>
          ) : (
            <p id="catalogue-grid" tabIndex={-1} className="text-sm text-zinc-500">
              {t("noProducts")}
            </p>
          )}

          {filtered.length > 0 ? (
            <div className="mt-16 flex justify-center">
              <nav className="inline-flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
                <button
                  type="button"
                  className="flex size-12 items-center justify-center border-2 border-zinc-100 font-bold text-black transition-colors hover:border-primary disabled:opacity-30"
                  aria-label="Previous"
                  disabled={currentPage <= 1}
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                >
                  <ChevronLeft className="size-4 rtl:rotate-180" aria-hidden />
                </button>
                {Array.from({ length: totalPages }, (_, index) => {
                  const n = index + 1;
                  const active = n === currentPage;
                  return (
                    <button
                      key={n}
                      type="button"
                      className={cn(
                        "flex size-12 items-center justify-center border-2 font-bold transition-colors",
                        active
                          ? "border-primary bg-primary font-black text-black"
                          : "border-zinc-100 text-black hover:border-primary",
                      )}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setPage(n)}
                    >
                      {n}
                    </button>
                  );
                })}
                <button
                  type="button"
                  className="flex size-12 items-center justify-center border-2 border-zinc-100 font-bold text-black transition-colors hover:border-primary disabled:opacity-30"
                  aria-label="Next"
                  disabled={currentPage >= totalPages}
                  onClick={() =>
                    setPage((value) => Math.min(totalPages, value + 1))
                  }
                >
                  <ChevronRight className="size-4 rtl:rotate-180" aria-hidden />
                </button>
              </nav>
            </div>
          ) : null}
        </section>
      </div>

      <section className="mt-12 bg-primary py-12 md:py-20">
        <div
          className={`${WRAP} grid grid-cols-1 items-center gap-12 md:grid-cols-2`}
        >
          <div className="text-black">
            <h2 className="section-display font-display mb-4 text-[clamp(2.1rem,8vw,3rem)] leading-[0.9] uppercase">
              {t("joinTeam")}
              <br />
              <span className="force-ltr text-white">Protein Shop</span>
            </h2>
            <p className="text-xs font-bold tracking-widest uppercase italic">
              {t("joinTeamLead")}
            </p>
          </div>
          {subscribed ? (
            <p className="text-sm font-black uppercase">{t("subscribeThanks")}</p>
          ) : (
            <form
              className="flex flex-col gap-0 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                if (email.trim().length === 0) return;
                setSubscribed(true);
                window.open(WHATSAPP_HREF, "_blank", "noopener,noreferrer");
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t("emailPlaceholder")}
                required
                className="flex-1 border-2 border-black bg-white px-6 py-4 text-black placeholder:text-zinc-400 focus:outline-none sm:border-e-0"
              />
              <button
                type="submit"
                className="bg-black px-8 py-4 text-sm font-black tracking-widest text-white uppercase shadow-[6px_6px_0_rgba(0,0,0,0.2)] transition-colors hover:bg-zinc-800 active:translate-x-1 active:translate-y-1 active:shadow-none rtl:shadow-[-6px_6px_0_rgba(0,0,0,0.2)] rtl:active:-translate-x-1"
              >
                {t("subscribe")}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
