"use client";

import { cn } from "@/lib/utils";

interface PricingToggleProps {
  yearly: boolean;
  onChange: (yearly: boolean) => void;
}

export function PricingToggle({ yearly, onChange }: PricingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-3 mb-12">
      <span
        className={cn(
          "text-sm font-medium transition-colors",
          !yearly ? "text-txt" : "text-txt2"
        )}
      >
        Aylık
      </span>
      <button
        onClick={() => onChange(!yearly)}
        className={cn(
          "relative w-14 h-7 rounded-full transition-colors",
          yearly ? "bg-gold" : "bg-surface2"
        )}
      >
        <span
          className={cn(
            "absolute top-1 w-5 h-5 rounded-full bg-txt transition-transform",
            yearly ? "left-8" : "left-1"
          )}
        />
      </button>
      <span
        className={cn(
          "text-sm font-medium transition-colors",
          yearly ? "text-txt" : "text-txt2"
        )}
      >
        Yıllık
      </span>
      <span className="px-2 py-0.5 rounded bg-ok/20 text-ok text-xs font-medium">
        %20 Tasarruf
      </span>
    </div>
  );
}
