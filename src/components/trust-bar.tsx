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
        className={`${WRAP} grid grid-cols-2 gap-8 py-10 lg:grid-cols-4`}
      >
        {ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <RevealItem
              key={item.title}
              className="flex flex-col items-center gap-3 md:items-start"
            >
              <Icon className="size-8 text-primary" aria-hidden />
              <h4 className="text-xs font-black tracking-widest uppercase">
                {t(item.title)}
              </h4>
              <p className="text-[10px] font-bold text-zinc-500 uppercase">
                {t(item.hint)}
              </p>
            </RevealItem>
          );
        })}
      </RevealStagger>
    </section>
  );
}
