import { MessageCircle } from "lucide-react";
import { WHATSAPP_HREF } from "@/lib/products";

export function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      title="Commander via WhatsApp"
      aria-label="Commander via WhatsApp"
      className="fixed right-[26px] bottom-[26px] z-[60] flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(245,196,0,0.4)] no-underline"
    >
      <MessageCircle className="size-6" aria-hidden />
    </a>
  );
}
