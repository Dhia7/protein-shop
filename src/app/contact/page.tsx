import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { WHATSAPP_HREF } from "@/lib/products";
import { WRAP } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Écrivez à Protein Shop : commande, stock, livraison. Réponse aussi via WhatsApp.",
};

export default function ContactPage() {
  return (
    <div className={`${WRAP} py-10 md:py-16`}>
      <div className="flex max-w-3xl flex-col gap-6">
        <div className="flex flex-col gap-3 border-b border-line pb-6">
          <p className="text-[11px] font-black tracking-[0.28em] text-primary uppercase">
            Infos
          </p>
          <h1 className="font-display text-[clamp(40px,6vw,72px)]">Contact</h1>
          <p className="text-zinc-500">
            Dites-nous le produit, la quantité et la ville de livraison. Vous
            pouvez aussi nous écrire sur{" "}
            <a
              href={WHATSAPP_HREF}
              className="font-bold text-foreground underline-offset-4 hover:text-primary hover:underline"
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
    </div>
  );
}
