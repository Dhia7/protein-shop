import Link from "next/link";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function SiteLogo({
  className,
}: {
  className?: string;
  inverse?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Protein Shop Tunisie"
      className={cn(
        "force-ltr inline-flex shrink-0 items-center no-underline",
        className,
      )}
    >
      <span className="flex size-9 items-center justify-center rounded bg-primary text-black sm:size-10">
        <Zap className="size-4 fill-current sm:size-5" aria-hidden />
      </span>
    </Link>
  );
}
