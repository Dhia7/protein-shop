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
      className="fixed z-[60] end-4 bottom-[max(1rem,env(safe-area-inset-bottom))] flex size-12 items-center justify-center bg-primary text-black shadow-[6px_6px_0_#000] no-underline sm:end-[26px] sm:bottom-[26px] sm:size-14 rtl:shadow-[-6px_6px_0_#000]"
    >
      <MessageCircle className="size-6" aria-hidden />
    </a>
  );
}
