import type { Metadata } from "next";
import { CatalogueBrowser } from "@/components/catalogue-browser";
import { isCategoryId } from "@/lib/products";

export const metadata: Metadata = {
  title: "Catalogue",
  description:
    "Parcourez le catalogue Protein Shop : whey, mass gainer, BCAA, créatine et accessoires. Filtrez par catégorie et commandez sur WhatsApp.",
};

export default async function CataloguePage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  const params = await searchParams;
  const initialCategory = isCategoryId(params.categorie)
    ? params.categorie
    : "all";

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Catalogue</h1>
        <p className="max-w-2xl text-muted-foreground">
          Tous les produits de démonstration. Filtrez par catégorie, recherchez
          un nom, puis commandez via WhatsApp — paiement à la livraison.
        </p>
      </div>
      <CatalogueBrowser
        key={initialCategory}
        initialCategory={initialCategory}
      />
    </div>
  );
}
