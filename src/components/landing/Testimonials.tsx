"use client";

import { TESTIMONIALS } from "@/lib/constants";
import { Star } from "lucide-react";

export function Testimonials() {
  return (
    <section className="py-20 bg-bg2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-txt mb-4">
            Kullanıcı Yorumları
          </h2>
          <p className="text-txt2 text-lg max-w-2xl mx-auto">
            Binlerce kullanıcı HukukAI ile hukuki süreçlerini kolaylaştırıyor.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-surface rounded-xl border border-line p-6 hover:border-gold/40 transition-colors border-l-4 border-l-gold"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-gold text-gold"
                  />
                ))}
              </div>
              <p className="text-txt2 italic mb-6">&ldquo;{t.content}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-txt font-semibold text-sm"
                  style={{ backgroundColor: `${t.avatarColor}30` }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-txt">{t.name}</p>
                  <p className="text-txt2 text-sm">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
