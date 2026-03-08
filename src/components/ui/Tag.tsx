"use client";

import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  dot?: boolean;
  pulse?: boolean;
  className?: string;
}

export function Tag({ children, dot = true, pulse = false, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 text-gold-light text-sm font-medium",
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            "w-2 h-2 rounded-full bg-ok",
            pulse && "animate-pulse-dot"
          )}
        />
      )}
      {children}
    </span>
  );
}
