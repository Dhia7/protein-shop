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
      className={cn(
        "force-ltr flex min-w-0 items-center gap-2 no-underline sm:gap-2.5",
        className,
      )}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded bg-primary text-black sm:size-10">
        <Zap className="size-4 fill-current sm:size-5" aria-hidden />
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.15rem] tracking-wider whitespace-nowrap sm:text-2xl",
            inverse ? "text-white" : "text-foreground",
          )}
        >
          Protein Shop
        </span>
        <span className="-mt-0.5 text-[8px] font-black tracking-[0.22em] text-primary uppercase sm:text-[9px] sm:tracking-[0.3em]">
          Tunisie
        </span>
      </span>
    </Link>
  );
}
