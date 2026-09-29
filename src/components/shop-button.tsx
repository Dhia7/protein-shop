import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
    variant === "primary" ? "btn-primary" : "btn-ghost",
    "no-underline",
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
