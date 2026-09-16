import { ProductCard } from "@/components/product-card";
import { SectionHead } from "@/components/section-head";
import type { Product } from "@/lib/products";
import { WRAP } from "@/lib/site";

export function EssentialsGrid({ products }: { products: Product[] }) {
  return (
    <section id="produits" className="scroll-mt-[76px] py-16 md:py-24">
      <div className={WRAP}>
        <SectionHead
          title="Les essentiels"
          description="Whey, créatine, pré-workout, BCAA, snacks et gainers — les produits qui sortent le plus cette semaine."
        />
        <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
