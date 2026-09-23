import { BlurImage } from "@/components/blur-image";
import { CountUp } from "@/components/count-up";
import { ShopButton } from "@/components/shop-button";
import { HERO_IMAGE } from "@/lib/media";
import { PRODUCTS } from "@/lib/products";
import { WRAP } from "@/lib/site";

export function HomeHero() {
  return (
    <header className="relative overflow-hidden border-b border-line pt-[76px]">
      <div
        className={`${WRAP} grid items-center gap-8 pb-8 lg:min-h-[640px] lg:grid-cols-2 lg:gap-12 lg:pb-0`}
      >
        <div className="flex flex-col justify-center py-10">
          <p className="mb-[18px] text-[13px] font-bold tracking-[0.06em] text-primary">
            100% Whey · Testé en labo · Livraison Tunisie
          </p>
          <h1 className="font-display max-w-[11ch] text-[clamp(52px,7vw,92px)]">
            La force
            <br />
            se construit
            <br />
            <em className="not-italic text-primary">ici.</em>
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg font-medium text-chalk-dim">
            Protéines, créatine et pré-workout pensés pour ceux qui poussent en
            salle chaque semaine — pas pour l&apos;influenceur qui vend un rêve.
          </p>
          <div className="mt-[34px] flex flex-wrap gap-3.5">
            <ShopButton href="#produits">Voir les produits →</ShopButton>
            <ShopButton href="#objectif" variant="ghost">
              Trouve ton objectif
            </ShopButton>
          </div>
          <div className="mt-12 flex flex-wrap gap-9 border-t border-line pt-7">
            <div>
              <b
                className="font-display block text-[30px] font-normal text-foreground"
                aria-label={`${PRODUCTS.length} produits`}
              >
                <CountUp to={PRODUCTS.length} />
              </b>
              <span className="text-xs font-semibold tracking-[0.02em] text-chalk-dim">
                produits au catalogue
              </span>
            </div>
            <div>
              <b
                className="font-display block text-[30px] font-normal text-foreground"
                aria-label="24h"
              >
                <CountUp to={24} suffix="h" delay={0.12} />
              </b>
              <span className="text-xs font-semibold tracking-[0.02em] text-chalk-dim">
                livraison Grand Tunis
              </span>
            </div>
            <div>
              <b
                className="font-display block text-[30px] font-normal text-foreground"
                aria-label="12"
              >
                <CountUp to={12} delay={0.24} />
              </b>
              <span className="text-xs font-semibold tracking-[0.02em] text-chalk-dim">
                salles partenaires
              </span>
            </div>
          </div>
        </div>

        <div className="relative aspect-square w-full overflow-hidden bg-iron">
          <BlurImage
            src={HERO_IMAGE}
            alt="Athlète tenant un isolat de whey et des pots de protéines"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </header>
  );
}
