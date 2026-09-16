import type { Metadata } from "next";
import { Anton, Noto_Sans_Arabic, Work_Sans } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteProviders } from "@/components/site-providers";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-anton",
});

const workSans = Work_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-work-sans",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Protein Shop | Boutique protéines en Tunisie",
    template: "%s | Protein Shop",
  },
  description:
    "Boutique en ligne Protein Shop : whey, mass gainer, BCAA, créatine et accessoires. Commandez sur WhatsApp, paiement à la livraison en Tunisie.",
  openGraph: {
    title: "Protein Shop | Boutique protéines en Tunisie",
    description:
      "Catalogue clair, commandes WhatsApp et paiement à la livraison.",
    locale: "fr_TN",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`dark ${anton.variable} ${workSans.variable} ${notoArabic.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var h=document.documentElement;h.removeAttribute("data-qb-installed");h.removeAttribute("suppresshydrationwarning");})();`,
          }}
        />
        <MotionProvider>
          <SiteProviders>
            <SiteHeader />
            <main className="flex flex-1 flex-col">{children}</main>
            <SiteFooter />
            <WhatsAppFab />
          </SiteProviders>
        </MotionProvider>
      </body>
    </html>
  );
}
