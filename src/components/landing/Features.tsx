"use client";

import { FEATURES } from "@/lib/constants";
import {
  MessageSquare,
  FileText,
  BookOpen,
  Shield,
  Calendar,
  Monitor,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  MessageSquare: <MessageSquare className="w-6 h-6" />,
  FileText: <FileText className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Calendar: <Calendar className="w-6 h-6" />,
  Monitor: <Monitor className="w-6 h-6" />,
};

export function Features() {
  return (
    <section id="ozellikler" className="py-20 bg-bg2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-txt mb-4">
            Her İhtiyacınız İçin Çözüm
          </h2>
          <p className="text-txt2 text-lg max-w-2xl mx-auto">
            Hukuki süreçlerinizde size yardımcı olacak güçlü araçlar.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map((feature) => (
              <button
                key={feature.name}
                type="button"
                onClick={() => {
                  if (feature.scrollTo) {
                    document.querySelector(feature.scrollTo)?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="w-full text-left bg-surface rounded-xl border border-line p-6 hover:border-gold/40 transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-bg2"
              >
                <div className="w-12 h-12 rounded-lg bg-gold-dim flex items-center justify-center text-gold mb-4 group-hover:bg-gold/20 transition-colors">
                  {iconMap[feature.icon] ?? <MessageSquare className="w-6 h-6" />}
                </div>
                <h3 className="text-txt font-semibold text-lg mb-2">{feature.name}</h3>
                <p className="text-txt2 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </button>
          ))}
        </div>
      </div>
    </section>
  );
}
