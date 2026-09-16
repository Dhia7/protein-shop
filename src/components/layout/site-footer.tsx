import Link from "next/link";
import { WHATSAPP_HREF } from "@/lib/products";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 md:px-6">
        <p className="text-sm font-semibold text-primary">Protein Shop · Tunisie</p>
        <p className="text-sm text-muted-foreground">
          WhatsApp :{" "}
          <a
            href={WHATSAPP_HREF}
            className="text-primary underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            +216 28 700 958
          </a>
          {" · "}
          Paiement à la livraison. Commandes, stocks et promotions gérés après
          mise en ligne.
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Accueil
          </Link>
          <Link href="/catalogue" className="hover:text-foreground">
            Catalogue
          </Link>
          <Link href="/contact" className="hover:text-foreground">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
