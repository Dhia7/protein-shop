import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <MotionProvider>
          <SiteHeader />
          <main className="flex flex-1 flex-col">{children}</main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
