import Link from "next/link";
import { HomeHero } from "@/components/home-hero";
import { ProductCard } from "@/components/product-card";
import { Reveal, RevealItem, RevealStagger } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { CATEGORIES, FEATURED_PRODUCTS } from "@/lib/products";

export default function HomePage() {
  return (
    <div className="flex w-full flex-col">
      <HomeHero />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-12 md:px-6 md:py-16">
        <Reveal className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Catégories</h2>
          <p className="text-sm text-muted-foreground">
            Filtrez le catalogue comme le fera le client sur le site.
          </p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <Button key={category.id} asChild variant="outline" size="sm">
                <Link
                  href={
                    category.id === "all"
                      ? "/catalogue"
                      : `/catalogue?categorie=${category.id}`
                  }
                >
                  {category.label}
                </Link>
              </Button>
            ))}
          </div>
        </Reveal>

        <section className="flex flex-col gap-4">
          <Reveal className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Produits mis en avant</h2>
            <p className="text-sm text-muted-foreground">
              Whey, mass gainer, BCAA, créatine et accessoires — prix en dinars
              tunisiens.
            </p>
          </Reveal>
          <RevealStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_PRODUCTS.map((product) => (
              <RevealItem key={product.id}>
                <ProductCard product={product} />
              </RevealItem>
            ))}
          </RevealStagger>
        </section>
      </div>
    </div>
  );
}
