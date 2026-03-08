"use client";

import { useState } from "react";
import { PLANS } from "@/lib/constants";
import { PricingToggle } from "./PricingToggle";
import { PricingCard } from "./PricingCard";
import type { PricingPlan } from "@/types";

interface PricingSectionProps {
  onPlanSelect?: (plan: PricingPlan) => void;
}

export function PricingSection({ onPlanSelect }: PricingSectionProps) {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="fiyatlandirma" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-txt mb-4">
            Fiyatlandırma
          </h2>
          <p className="text-txt2 text-lg max-w-2xl mx-auto">
            İhtiyacınıza uygun planı seçin. İstediğiniz zaman iptal edebilirsiniz.
          </p>
        </div>

        <PricingToggle yearly={yearly} onChange={setYearly} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              yearly={yearly}
              onSelect={() => onPlanSelect?.(plan)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
