"use client";

import { Award, HeartPulse, Percent, Truck } from "lucide-react";
import { RevealItem, RevealStagger } from "@/components/reveal";
import { useLocale } from "@/components/locale-provider";
import { WRAP } from "@/lib/site";
import type { TranslationKey } from "@/lib/i18n";

const ITEMS: {
  icon: typeof Truck;
  title: TranslationKey;
  hint: TranslationKey;
}[] = [
  { icon: Truck, title: "trustDelivery", hint: "trustDeliveryHint" },
  { icon: Award, title: "trustAuth", hint: "trustAuthHint" },
  { icon: Percent, title: "trustPrice", hint: "trustPriceHint" },
  { icon: HeartPulse, title: "trustCoach", hint: "trustCoachHint" },
];

export function TrustBar() {
  const { t } = useLocale();

  return (
    <section className="border-y border-primary/20 bg-black text-white">
      <RevealStagger
        className={`${WRAP} grid grid-cols-2 gap-x-3 gap-y-8 py-8 lg:grid-cols-4 lg:gap-8 lg:py-10`}
      >
        {ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <RevealItem
              key={item.title}
              className="flex flex-col items-center gap-2 text-center md:items-start md:text-start"
            >
              <Icon className="size-8 text-primary" aria-hidden />
              <h4 className="text-[11px] font-black tracking-wider uppercase sm:text-xs sm:tracking-widest">
                {t(item.title)}
              </h4>
              <p className="max-w-[16ch] text-[10px] leading-snug font-bold text-zinc-500 uppercase sm:max-w-none">
                {t(item.hint)}
              </p>
            </RevealItem>
          );
        })}
      </RevealStagger>
    </section>
  );
}
