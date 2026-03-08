"use client";

import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { STATS } from "@/lib/constants";
import { MessageSquare, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(200,169,110,0.15),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(200,169,110,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(200,169,110,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <Tag dot pulse className="mb-6">
              Yapay Zeka Destekli
            </Tag>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-txt leading-tight mb-6">
              Hukuki Sorularınıza{" "}
              <span className="text-gold">Anında</span>, Güvenilir Yanıtlar
            </h1>
            <p className="text-txt2 text-lg mb-8 max-w-xl">
              Türk hukuku konusunda 7/24 yapay zeka destekli danışmanlık.
              Kanun maddelerine dayalı profesyonel bilgi, anında.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                leftIcon={<MessageSquare className="w-5 h-5" />}
                onClick={() => document.getElementById("ai-asistan")?.scrollIntoView({ behavior: "smooth" })}
              >
                Ücretsiz Başlayın
              </Button>
              <Button
                variant="secondary"
                size="lg"
                leftIcon={<Play className="w-5 h-5" />}
                onClick={() => document.getElementById("ozellikler")?.scrollIntoView({ behavior: "smooth" })}
              >
                Nasıl Çalışır
              </Button>
            </div>
            <div className="flex flex-wrap gap-8 mt-12">
              {STATS.slice(0, 3).map((stat) => (
                <div key={stat.label}>
                  <span className="text-2xl sm:text-3xl font-bold text-gold">
                    {stat.value.toLocaleString("tr-TR")}
                    {stat.suffix}
                  </span>
                  <p className="text-txt2 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative animate-float">
              <div className="bg-surface rounded-2xl border border-line p-6 shadow-xl max-w-sm ml-auto">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gold-dim flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-txt">HukukAI Danışmanı</p>
                    <p className="text-ok text-sm">Çevrimiçi</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-bg2 rounded-lg p-3 text-sm text-txt2">
                    Kıdem tazminatı hesaplaması için ne bilmem gerekiyor?
                  </div>
                  <div className="bg-gold-dim/50 rounded-lg p-3 text-sm text-txt border-l-2 border-gold ml-4">
                    İş Kanunu Madde 17&apos;ye göre kıdem tazminatı, işçinin
                    son brüt ücreti üzerinden hesaplanır...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
