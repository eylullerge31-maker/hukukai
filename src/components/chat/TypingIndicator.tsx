"use client";

export function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-gold-dim flex items-center justify-center shrink-0">
        <span className="text-gold text-sm font-semibold">H</span>
      </div>
      <div className="bg-surface rounded-2xl px-4 py-3 border border-line">
        <div className="flex gap-1.5">
          <span
            className="w-2 h-2 rounded-full bg-gold animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-gold animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-gold animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}
