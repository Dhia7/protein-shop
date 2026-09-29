import type { Metadata } from "next";
import { CatalogueBrowser } from "@/components/catalogue-browser";
import { isCategoryId } from "@/lib/products";

export const metadata: Metadata = {
  title: "Catalogue Produits",
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
    <CatalogueBrowser initialCategory={initialCategory} />
  );
}
