"use client";

import { ShopButton } from "@/components/shop-button";
import { Reveal } from "@/components/reveal";
import { useLocale } from "@/components/locale-provider";
import { WRAP } from "@/lib/site";

export function BundleCta() {
  const { t } = useLocale();

  return (
    <section id="packs" className="scroll-mt-[76px] bg-white py-16 md:py-24">
      <div className={WRAP}>
        <Reveal>
        <div className="relative overflow-hidden bg-black px-5 py-10 text-white md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-8 md:px-14 md:py-16">
          <div className="diagonal-stripe pointer-events-none absolute -top-10 -end-16 h-40 w-56 opacity-80" />
          <div>
            <h3 className="section-display font-display mb-3 text-[clamp(32px,4vw,52px)]">
              {t("bundleTitle")}
            </h3>
            <p className="max-w-[52ch] text-[15px] leading-relaxed text-zinc-400">
              {t("bundleBody")}
            </p>
          </div>
          <ShopButton href="/catalogue" className="relative z-[1] mt-8 md:mt-0">
            {t("bundleCta")}
          </ShopButton>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
