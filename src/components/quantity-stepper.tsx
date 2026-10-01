"use client";

import { cn } from "@/lib/utils";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 9,
  label,
  decreaseLabel,
  increaseLabel,
  size = "md",
  boxed = false,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label: string;
  decreaseLabel: string;
  increaseLabel: string;
  size?: "sm" | "md" | "lg";
  boxed?: boolean;
}) {
  const compact = size === "sm";
  const large = size === "lg";

  return (
    <div
      dir="ltr"
      className={cn(
        "flex items-center bg-white",
        large
          ? "qty-box"
          : boxed
            ? "h-10 border-2 border-black"
            : cn("border border-line", compact ? "h-8" : "h-10"),
      )}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        className={cn(
          "flex items-center justify-center font-bold text-zinc-500 hover:bg-zinc-100 hover:text-foreground disabled:opacity-30",
          large
            ? "h-full w-12 text-base"
            : boxed
              ? "size-10 border-e-2 border-black"
              : compact
                ? "size-8 text-sm"
                : "size-10 text-sm",
        )}
        aria-label={decreaseLabel}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        −
      </button>
      <span
        className={cn(
          "text-center font-extrabold tabular-nums",
          large ? "w-12 text-base" : boxed ? "w-12 text-lg" : "min-w-[1.25rem]",
          !large && !boxed && (compact ? "text-xs" : "text-sm"),
        )}
      >
        {value}
      </span>
      <button
        type="button"
        className={cn(
          "flex items-center justify-center font-bold text-zinc-500 hover:bg-zinc-100 hover:text-foreground disabled:opacity-30",
          large
            ? "h-full w-12 text-base"
            : boxed
              ? "size-10 border-s-2 border-black"
              : compact
                ? "size-8 text-sm"
                : "size-10 text-sm",
        )}
        aria-label={increaseLabel}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        +
      </button>
    </div>
  );
}
