import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHead({
  title,
  description,
  className,
}: {
  title: ReactNode;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6",
        className,
      )}
    >
      <h2 className="font-display max-w-[14ch] text-[clamp(32px,4vw,48px)]">
        {title}
      </h2>
      <p className="max-w-[34ch] text-[15px] text-chalk-dim">{description}</p>
    </div>
  );
}
