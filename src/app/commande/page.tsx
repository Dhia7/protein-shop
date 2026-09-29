import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout-form";

export const metadata: Metadata = {
  title: "Commande",
  description:
    "Finalisez votre commande Protein Shop : adresse, paiement à la livraison, envoi WhatsApp.",
};

export default function CommandePage() {
  return <CheckoutForm />;
}
