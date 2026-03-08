"use client";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PricingPlan } from "@/types";

interface PricingCardProps {
  plan: PricingPlan;
  yearly: boolean;
  onSelect: () => void;
}

export function PricingCard({ plan, yearly, onSelect }: PricingCardProps) {
  const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <div
      className={cn(
        "rounded-xl border p-6 flex flex-col relative",
        plan.featured
          ? "border-gold bg-gold-dim/20"
          : "border-line bg-surface"
      )}
    >
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="gold">{plan.badge}</Badge>
        </div>
      )}
      <h3 className="font-serif text-xl font-bold text-txt mb-1">{plan.name}</h3>
      <p className="text-txt2 text-sm mb-4">{plan.description}</p>
      <div className="mb-6">
        <span className="text-3xl font-bold text-gold">₺{price}</span>
        <span className="text-txt2 text-sm">/{yearly ? "ay" : "ay"}</span>
      </div>
      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            {f.included ? (
              <Check className="w-5 h-5 text-ok shrink-0" />
            ) : (
              <X className="w-5 h-5 text-txt3 shrink-0" />
            )}
            <span className={f.included ? "text-txt" : "text-txt3"}>
              {f.text}
            </span>
          </li>
        ))}
      </ul>
      <Button
        variant={plan.featured ? "primary" : "secondary"}
        className="w-full"
        onClick={onSelect}
      >
        {plan.monthlyPrice === 0 ? "Ücretsiz Başla" : "Planı Seç"}
      </Button>
    </div>
  );
}
