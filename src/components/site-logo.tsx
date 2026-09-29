import Link from "next/link";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function SiteLogo({
  className,
  inverse = false,
}: {
  className?: string;
  inverse?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5 no-underline", className)}
      dir="ltr"
    >
      <span className="flex size-10 items-center justify-center rounded bg-primary text-black">
        <Zap className="size-5 fill-current" aria-hidden />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-2xl tracking-wider",
            inverse ? "text-white" : "text-foreground",
          )}
        >
          Protein Shop
        </span>
        <span className="-mt-0.5 text-[9px] font-black tracking-[0.3em] text-primary uppercase">
          Tunisie
        </span>
      </span>
    </Link>
  );
}
