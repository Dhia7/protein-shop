"use client";

import { ShopButton } from "@/components/shop-button";
import { Reveal } from "@/components/reveal";
import { useLocale } from "@/components/locale-provider";
import { WHATSAPP_HREF } from "@/lib/products";
import { WRAP } from "@/lib/site";

export function HomeCta() {
  const { t } = useLocale();

  return (
    <div className="relative overflow-hidden bg-black py-[110px] text-center text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundSize: "40px 40px",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.7) 1px, transparent 1px)",
        }}
      />
      <Reveal className={WRAP}>
        <h2 className="font-display mx-auto mb-6 max-w-[16ch] text-[clamp(44px,7vw,84px)]">
          {t("homeCtaTitle")}
        </h2>
        <p className="mb-9 text-zinc-400">{t("homeCtaLead")}</p>
        <ShopButton href={WHATSAPP_HREF} external>
          {t("homeCtaButton")}
        </ShopButton>
      </Reveal>
    </div>
  );
}
