import { ShopButton } from "@/components/shop-button";
import { WRAP } from "@/lib/site";

export function BundleCta() {
  return (
    <section id="packs" className="scroll-mt-[76px] py-16 md:py-24">
      <div className={WRAP}>
        <div className="grid items-center gap-6 rounded border border-line bg-iron-2 px-8 py-11 md:grid-cols-[1fr_auto] md:px-12">
          <div>
            <h3 className="font-display mb-2.5 text-[30px] uppercase">
              Compose ton stack
            </h3>
            <p className="max-w-[48ch] text-[15px] text-chalk-dim">
              Whey + créatine + pré-workout, au prix le plus bas que si acheté
              séparément. Choisis tes 3 produits, on calcule la remise.
            </p>
          </div>
          <ShopButton href="/catalogue">Créer mon pack →</ShopButton>
        </div>
      </div>
    </section>
  );
}
