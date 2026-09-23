"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

function formatValue(value: number, decimals: number) {
  return decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));
}

export function CountUp({
  to,
  decimals = 0,
  suffix = "",
  duration = 1.05,
  delay = 0,
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (reducedMotion) {
      setValue(to);
      return;
    }

    const controls = animate(0, to, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setValue,
    });

    return () => controls.stop();
  }, [delay, duration, inView, reducedMotion, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {formatValue(value, decimals)}
      {suffix}
    </span>
  );
}
