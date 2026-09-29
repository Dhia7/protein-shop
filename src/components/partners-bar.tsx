"use client";

import { Reveal } from "@/components/reveal";
import { useLocale } from "@/components/locale-provider";
import { PARTNER_NAMES, WRAP } from "@/lib/site";

export function PartnersBar() {
  const { t } = useLocale();

  return (
    <div id="partenaires" className="scroll-mt-[76px] border-y border-line bg-white">
      <Reveal
        className={`${WRAP} flex flex-wrap items-center justify-between gap-5 py-9`}
      >
        <span className="text-[11px] font-black tracking-[0.22em] text-zinc-400 uppercase">
          {t("recommendedBy")}
        </span>
        <div className="font-display flex flex-wrap gap-10 text-2xl tracking-[0.04em] text-black/40">
          {PARTNER_NAMES.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
