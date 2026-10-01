"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { RevealItem, RevealStagger } from "@/components/reveal";
import { useLocale } from "@/components/locale-provider";
import type { Product } from "@/lib/products";
import { WRAP } from "@/lib/site";

export function EssentialsGrid({ products }: { products: Product[] }) {
  const { t } = useLocale();

  return (
    <section id="produits" className="scroll-mt-[76px] bg-white py-16 md:py-24">
      <div className={WRAP}>
        <Reveal className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-primary">
              <div className="h-1 w-8 bg-primary" />
              <span className="text-sm font-black tracking-[0.4em] uppercase">
                {t("arrivalsEyebrow")}
              </span>
            </div>
            <h2 className="section-display font-display text-6xl leading-none">
              {t("arrivalsTitle")}
            </h2>
          </div>
          <Link
            href="/catalogue"
            className="group inline-flex items-center gap-4 bg-black px-8 py-4 text-xs font-black tracking-[0.2em] text-white uppercase no-underline transition-colors hover:bg-primary hover:text-black"
          >
            {t("arrivalsCta")}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-2 rtl:rotate-180 rtl:group-hover:-translate-x-2" />
          </Link>
        </Reveal>
        <RevealStagger className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <RevealItem key={product.id} className="h-full">
              <ProductCard product={product} priority={index < 2} compact />
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
