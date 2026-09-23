import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import {
  getProduct,
  PRODUCTS,
  relatedProducts,
} from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Produit" };

  return {
    title: product.name,
    description: `${product.name} — ${product.size}, ${product.flavour}. ${product.price}. Commande WhatsApp, paiement à la livraison.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <ProductDetail product={product} related={relatedProducts(product)} />
  );
}
