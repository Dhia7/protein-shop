import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center gap-2 rounded-[2px] px-[26px] py-4 text-[15px] font-bold no-underline transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none";

export function ShopButton({
  href,
  children,
  variant = "primary",
  className,
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  external?: boolean;
}) {
  const classNames = cn(
    base,
    variant === "primary"
      ? "bg-primary text-primary-foreground"
      : "border-[1.5px] border-steel bg-transparent text-foreground",
    className,
  );

  if (external || href.includes("#")) {
    return (
      <a
        href={href}
        className={classNames}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classNames}>
      {children}
    </Link>
  );
}
