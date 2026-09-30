"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { CheckCircle2, Dumbbell, Flame } from "lucide-react";
import { BlurImage } from "@/components/blur-image";
import { CountUp } from "@/components/count-up";
import { ShopButton } from "@/components/shop-button";
import { useLocale } from "@/components/locale-provider";
import { productImage } from "@/lib/media";
import { getHeroProduct, PRODUCTS } from "@/lib/products";
import { PARTNER_NAMES, WRAP } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function HomeHero() {
  const { t } = useLocale();
  const product = getHeroProduct();

  return (
    <header className="relative overflow-hidden bg-white lg:h-[900px]">
      <div className="bg-grid absolute inset-0 opacity-50" />
      <motion.div
        className="absolute top-0 right-0 z-0 hidden h-full w-[60%] bg-black lg:block"
        initial={{ x: "40%", skewX: -15 }}
        animate={{ x: "20%", skewX: -15 }}
        transition={{ duration: 1, ease }}
      />
      <motion.div
        className="diagonal-stripe absolute top-0 right-0 z-0 hidden h-full w-[55%] opacity-80 lg:block"
        initial={{ x: "55%", skewX: -15 }}
        animate={{ x: "35%", skewX: -15 }}
        transition={{ duration: 1.1, delay: 0.08, ease }}
      />
      <div className="pointer-events-none absolute -left-20 top-1/2 hidden -translate-y-1/2 rotate-[-90deg] font-display text-[280px] leading-none text-black/[0.03] select-none lg:block">
        Strength
      </div>

      <div
        className={`${WRAP} relative z-10 grid h-full items-center gap-10 py-14 lg:grid-cols-12 lg:gap-6 lg:py-0`}
      >
        <motion.div
          className="space-y-8 lg:col-span-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
          }}
        >
          <motion.div
            className="flex items-center gap-4"
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
            }}
          >
            <div className="h-1.5 w-12 bg-primary" />
            <span className="text-sm font-black tracking-[0.4em] text-black uppercase">
              {t("heroEyebrow")}
            </span>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 28 },
              show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
            }}
          >
            <h1 className="font-display text-[clamp(52px,14vw,160px)] leading-[0.8] tracking-tight text-black">
              {t("heroTitleA")}
              <br />
              <span className="italic text-primary">{t("heroTitleB")}</span>
            </h1>
            <div className="mt-4 h-4 w-48 -skew-x-[20deg] bg-black md:w-64" />
          </motion.div>

          <motion.p
            className="max-w-lg border-l-4 border-primary pl-6 text-xl leading-relaxed font-semibold text-zinc-600 italic"
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
            }}
          >
            {t("heroLead")}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-8 pt-2"
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
            }}
          >
            <ShopButton href="/catalogue">{t("heroCta")}</ShopButton>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-primary" aria-hidden />
                <span className="text-sm font-bold tracking-widest uppercase">
                  {t("heroCert")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-primary" aria-hidden />
                <span className="text-sm font-bold tracking-widest uppercase">
                  {t("heroStock")}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="grid max-w-lg grid-cols-3 gap-6 pt-4"
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
            }}
          >
            <div>
              <div className="font-display text-5xl text-black">
                <CountUp to={PRODUCTS.length} />
              </div>
              <div className="text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase">
                {t("heroStatProducts")}
              </div>
            </div>
            <div>
              <div className="font-display text-5xl text-black">
                <CountUp to={24} suffix="H" delay={0.12} />
              </div>
              <div className="text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase">
                {t("heroStatDelivery")}
              </div>
            </div>
            <div>
              <div className="font-display text-5xl text-black">
                <CountUp to={PARTNER_NAMES.length} delay={0.24} />
              </div>
              <div className="text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase">
                {t("heroStatRank")}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative flex justify-center lg:col-span-6 lg:justify-end"
          initial={{ opacity: 0, x: 48, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          <Link
            href={`/produit/${product.id}`}
            className="hero-product-link group relative z-20 block"
          >
            <div className="hero-pulse pointer-events-none absolute -top-16 -right-8 size-32 animate-pulse rounded-full border-[16px] border-primary/20" />
            <div className="pointer-events-none absolute top-1/2 -left-16 z-0 h-1 w-28 rotate-45 bg-primary" />
            <div className="hero-float relative h-[360px] w-[280px] md:h-[500px] md:w-[400px] lg:h-[560px] lg:w-[440px]">
              <div className="hero-visual absolute inset-0">
                <BlurImage
                  src={productImage(product)}
                  alt={product.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 440px, 70vw"
                  className="product-shadow object-contain"
                />
              </div>
            </div>
            {product.detail ? (
              <motion.div
                className="absolute top-8 -left-6 z-20 flex rotate-[-8deg] flex-col items-center bg-black p-5 font-display text-4xl leading-none text-primary shadow-[10px_10px_0_rgba(255,193,7,0.3)] md:text-5xl"
                initial={{ opacity: 0, y: -16, rotate: -8 }}
                animate={{ opacity: 1, y: 0, rotate: -8 }}
                transition={{ duration: 0.5, delay: 0.55, ease }}
              >
                <Flame className="mb-1 size-6" aria-hidden />
                <span>{product.detail.split(" ")[0]}</span>
                <span className="mt-2 font-sans text-[10px] font-black tracking-[0.3em] uppercase">
                  {product.detail.replace(/^[^\s]+\s/, "")}
                </span>
              </motion.div>
            ) : null}
            <motion.div
              className="absolute right-0 bottom-16 z-20 flex -skew-x-[12deg] items-center gap-4 border-r-[12px] border-black bg-primary px-6 py-3 text-black shadow-2xl md:-right-6"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7, ease }}
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-black">
                <Dumbbell className="size-5 text-primary" aria-hidden />
              </div>
              <div className="flex skew-x-[12deg] flex-col">
                <span className="font-display text-3xl leading-none md:text-4xl">
                  {product.size}
                </span>
                <span className="text-[9px] font-black tracking-[0.25em] uppercase">
                  {product.flavour}
                </span>
              </div>
            </motion.div>
            <div className="absolute -bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap border border-primary/50 bg-zinc-900 px-5 py-2 text-white">
              <span className="relative flex size-2.5 shrink-0" aria-hidden>
                <span className="stock-dot-ring absolute inset-0 rounded-full bg-primary" />
                <span className="stock-dot-core relative size-2.5 rounded-full bg-primary" />
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase">
                {t("heroBadgeStock")}
              </span>
            </div>
          </Link>
        </motion.div>
      </div>
    </header>
  );
}
