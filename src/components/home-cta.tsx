import { ShopButton } from "@/components/shop-button";
import { WRAP } from "@/lib/site";

export function HomeCta() {
  return (
    <div className="border-b border-line bg-[linear-gradient(120deg,#1a1b1f,#0b0c0e)] py-[110px] text-center">
      <div className={WRAP}>
        <h2 className="font-display mx-auto mb-6 max-w-[16ch] text-[clamp(40px,6vw,68px)]">
          Prêt à
          <br />
          pousser plus fort ?
        </h2>
        <p className="mb-9 text-chalk-dim">
          Commande avant 15h, livré demain dans le Grand Tunis.
        </p>
        <ShopButton href="#produits">Commander maintenant →</ShopButton>
      </div>
    </div>
  );
}
