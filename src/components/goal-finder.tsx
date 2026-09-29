"use client";

import Link from "next/link";
import type { StaticImageData } from "next/image";
import { BlurImage } from "@/components/blur-image";
import { Reveal, RevealItem, RevealStagger } from "@/components/reveal";
import { SectionHead } from "@/components/section-head";
import { useLocale } from "@/components/locale-provider";
import { GOAL_IMAGES } from "@/lib/media";
import { WRAP } from "@/lib/site";
import type { TranslationKey } from "@/lib/i18n";

const GOALS: {
  num: string;
  titleKey: TranslationKey;
  bodyKey: TranslationKey;
  href: string;
  image: StaticImageData;
  alt: string;
}[] = [
  {
    num: "01",
    titleKey: "goalMassTitle",
    bodyKey: "goalMassBody",
    href: "/catalogue?categorie=mass",
    image: GOAL_IMAGES.mass,
    alt: "Sachet de mass gainer et athlète buvant un shake",
  },
  {
    num: "02",
    titleKey: "goalCutTitle",
    bodyKey: "goalCutBody",
    href: "/catalogue?categorie=whey",
    image: GOAL_IMAGES.cut,
    alt: "Tisane coupe-faim naturel",
  },
  {
    num: "03",
    titleKey: "goalRecoveryTitle",
    bodyKey: "goalRecoveryBody",
    href: "/catalogue?categorie=bcaa",
    image: GOAL_IMAGES.recovery,
    alt: "Pot de BCAA et glutamine",
  },
];

export function GoalFinder() {
  const { t } = useLocale();

  return (
    <section id="objectif" className="scroll-mt-[76px] bg-zinc-50 py-16 md:py-24">
      <div className={WRAP}>
        <Reveal>
          <SectionHead
            title={
              <>
                {t("goalTitleA")}
                <br />
                {t("goalTitleB")}
              </>
            }
            description={t("goalLead")}
          />
        </Reveal>
        <RevealStagger className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {GOALS.map((goal) => (
            <RevealItem key={goal.num}>
            <article
              className="goal-card group relative z-0 flex min-h-[420px] flex-col overflow-hidden border border-line bg-white md:min-h-[480px]"
            >
              <div className="relative min-h-[240px] flex-1 overflow-hidden bg-zinc-100">
                <BlurImage
                  src={goal.image}
                  alt={goal.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="goal-card-image object-cover object-center transition-transform duration-500 group-hover:scale-[1.06]"
                />
              </div>
              <div className="relative z-[1] border-t-4 border-primary bg-white px-6 py-6">
                <span className="font-display mb-3 block text-sm text-primary">
                  <span className="goal-num-digits inline-block origin-center transition-transform duration-300 ease-out">
                    {goal.num}
                  </span>
                  <span
                    aria-hidden
                    className="goal-num-bar mt-1.5 block h-1 w-[1.6em] origin-start scale-x-0 bg-primary transition-transform duration-300 ease-out"
                  />
                </span>
                <h3 className="font-display mb-2 text-[28px]">
                  {t(goal.titleKey)}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-zinc-500">
                  {t(goal.bodyKey)}
                </p>
                <Link
                  href={goal.href}
                  className="text-[13px] font-extrabold tracking-[0.08em] text-black uppercase no-underline hover:text-primary"
                >
                  {t("goalPack")}
                </Link>
              </div>
            </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
