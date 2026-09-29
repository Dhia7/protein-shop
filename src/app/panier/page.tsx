import type { Metadata } from "next";
import { CartPage } from "@/components/cart-page";

export const metadata: Metadata = {
  title: "Panier",
  description:
    "Votre panier Protein Shop. Vérifiez les quantités, puis commandez avec paiement à la livraison via WhatsApp.",
};

export default function PanierPage() {
  return <CartPage />;
}
