"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/constants";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [openId, setOpenId] = useState<number | null>(0);

  return (
    <section id="sss" className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-txt mb-4">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-txt2 text-lg">
            Merak ettiklerinizin yanıtları burada.
          </p>
        </div>
        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className="bg-surface rounded-lg border border-line overflow-hidden"
            >
              <button
                onClick={() => setOpenId(openId === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-gold-dim/30 transition-colors"
              >
                <span className="font-medium text-txt">{item.question}</span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-gold shrink-0 transition-transform",
                    openId === i && "rotate-180"
                  )}
                />
              </button>
              {openId === i && (
                <div className="px-6 pb-4">
                  <p className="text-txt2 text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
