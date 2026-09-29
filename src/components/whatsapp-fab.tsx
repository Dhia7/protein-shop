"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { WHATSAPP_HREF } from "@/lib/products";

export function WhatsAppFab() {
  const pathname = usePathname();
  if (pathname.startsWith("/produit")) return null;

  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      title="Commander via WhatsApp"
      aria-label="Commander via WhatsApp"
      className="fixed end-[26px] bottom-[26px] z-[60] flex size-14 items-center justify-center bg-primary text-black shadow-[6px_6px_0_#000] no-underline"
    >
      <MessageCircle className="size-6" aria-hidden />
    </a>
  );
}
