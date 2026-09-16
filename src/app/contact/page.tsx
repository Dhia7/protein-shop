import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { WHATSAPP_HREF } from "@/lib/products";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Écrivez à Protein Shop : commande, stock, livraison. Réponse aussi via WhatsApp.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-[clamp(32px,4vw,48px)]">Contact</h1>
        <p className="text-muted-foreground">
          Dites-nous le produit, la quantité et la ville de livraison. Vous
          pouvez aussi nous écrire sur{" "}
          <a
            href={WHATSAPP_HREF}
            className="text-primary underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          .
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
