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
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label: string;
  decreaseLabel: string;
  increaseLabel: string;
  size?: "sm" | "md";
}) {
  const compact = size === "sm";

  return (
    <div
      className={cn(
        "flex items-center rounded-full border border-line bg-iron-2",
        compact ? "h-8" : "h-10",
      )}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        className={cn(
          "flex items-center justify-center text-sm font-bold text-chalk-dim hover:text-foreground",
          compact ? "size-8" : "size-10",
        )}
        aria-label={decreaseLabel}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        −
      </button>
      <span
        className={cn(
          "min-w-[1.25rem] text-center font-extrabold tabular-nums",
          compact ? "text-xs" : "text-sm",
        )}
      >
        {value}
      </span>
      <button
        type="button"
        className={cn(
          "flex items-center justify-center text-sm font-bold text-chalk-dim hover:text-foreground",
          compact ? "size-8" : "size-10",
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
