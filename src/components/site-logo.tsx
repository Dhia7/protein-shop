import Link from "next/link";
import { cn } from "@/lib/utils";

export function SiteLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "font-display text-[20px] tracking-[0.02em] whitespace-nowrap text-foreground no-underline",
        className,
      )}
      dir="ltr"
    >
      PROTEIN SHOP<span className="text-primary">.</span>
    </Link>
  );
}
