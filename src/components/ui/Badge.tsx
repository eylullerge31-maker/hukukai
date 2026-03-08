"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "success" | "warning";
  className?: string;
}

const variantStyles = {
  default: "bg-surface2 text-txt2 border-line",
  gold: "bg-gold-dim text-gold border-gold/40",
  success: "bg-ok/15 text-ok border-ok/40",
  warning: "bg-warn/15 text-warn border-warn/40",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
