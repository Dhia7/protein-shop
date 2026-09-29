import type { Metadata } from "next";
import { OrderConfirmation } from "@/components/order-confirmation";

export const metadata: Metadata = {
  title: "Commande confirmée",
  description:
    "Votre commande Protein Shop a été enregistrée. Suivi via WhatsApp, paiement à la livraison.",
};

export default function CommandeConfirmeePage() {
  return <OrderConfirmation />;
}
