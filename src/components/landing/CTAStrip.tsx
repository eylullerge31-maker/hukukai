"use client";

import { Button } from "@/components/ui/Button";
import { MessageSquare, ArrowRight } from "lucide-react";

export function CTAStrip() {
  return (
    <section className="py-16 bg-gradient-to-r from-gold/20 via-gold/15 to-gold/20 border-y border-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-txt mb-2">
              Hukuki Sorularınız İçin Hemen Başlayın
            </h2>
            <p className="text-txt2">
              Ücretsiz hesapla dakikalar içinde ilk yanıtınızı alın.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" leftIcon={<MessageSquare className="w-5 h-5" />}>
              Ücretsiz Başlayın
            </Button>
            <Button
              variant="secondary"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Fiyatları İncele
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
