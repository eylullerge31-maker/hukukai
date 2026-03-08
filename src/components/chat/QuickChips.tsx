"use client";

import { QUICK_QUESTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface QuickChipsProps {
  onSelect: (question: string) => void;
  disabled?: boolean;
}

export function QuickChips({ onSelect, disabled }: QuickChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {QUICK_QUESTIONS.map((q) => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          disabled={disabled}
          className={cn(
            "px-4 py-2 rounded-full text-sm text-txt2 bg-surface border border-line",
            "hover:border-gold/50 hover:text-gold transition-colors",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {q}
        </button>
      ))}
    </div>
  );
}
