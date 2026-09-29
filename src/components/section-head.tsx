import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHead({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6",
        className,
      )}
    >
      <div>
        {eyebrow ? (
          <p className="mb-3 text-[11px] font-black tracking-[0.28em] text-primary uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display max-w-[16ch] text-[clamp(36px,5vw,64px)]">
          {title}
        </h2>
      </div>
      <div className="flex max-w-[36ch] flex-col items-start gap-4 sm:items-end">
        {description ? (
          <p className="text-[15px] leading-relaxed text-zinc-500">
            {description}
          </p>
        ) : null}
        {action}
      </div>
    </div>
  );
}
