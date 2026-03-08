"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { POPULAR_TOPICS } from "@/lib/constants";
import { BarChart3, Zap, Lightbulb, MessageSquare, Star } from "lucide-react";

type SavedChat = { id: string; title: string; favorite: boolean; createdAt: string };

export function Sidebar({
  isLoggedIn = false,
  savedChats = [],
  onLoadChat,
  onToggleFavorite,
}: {
  isLoggedIn?: boolean;
  savedChats?: SavedChat[];
  onLoadChat?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
}) {
  return (
    <aside className="w-72 shrink-0 space-y-6">
      {isLoggedIn && (
        <div className="bg-surface rounded-xl border border-line p-5">
          <h3 className="text-txt font-semibold text-sm mb-4 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-gold" />
            Kaydedilen sohbetler
          </h3>
          {savedChats.length === 0 ? (
            <p className="text-txt2 text-sm">Henüz kayıtlı sohbet yok.</p>
          ) : (
            <ul className="space-y-2">
              {savedChats.map((chat) => (
                <li
                  key={chat.id}
                  className="flex items-center gap-2 rounded-lg border border-line p-2 hover:bg-bg2/50"
                >
                  <button
                    type="button"
                    onClick={() => onToggleFavorite?.(chat.id)}
                    className="shrink-0 text-txt2 hover:text-gold"
                    aria-label={chat.favorite ? "Favoriden çıkar" : "Favorilere ekle"}
                  >
                    <Star className={cn("w-4 h-4", chat.favorite && "fill-gold text-gold")} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onLoadChat?.(chat.id)}
                    className="flex-1 text-left text-sm text-txt truncate hover:text-gold"
                  >
                    {chat.title || "Sohbet"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="bg-surface rounded-xl border border-line p-5">
        <h3 className="text-txt font-semibold text-sm mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-gold" />
          Popüler Konular
        </h3>
        <div className="space-y-3">
          {POPULAR_TOPICS.map((topic) => (
            <div key={topic.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-txt2">{topic.label}</span>
                <span className="text-gold">{topic.percentage}%</span>
              </div>
              <div className="h-2 bg-bg2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold/60 rounded-full transition-all duration-500"
                  style={{ width: `${topic.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-gold-dim to-transparent rounded-xl border border-gold/30 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-gold" />
          <h3 className="text-txt font-semibold text-sm">Premium&apos;a Geçin</h3>
        </div>
        <p className="text-txt2 text-sm mb-4">
          Sınırsız soru, gelişmiş analiz ve öncelikli destek için Pro plana
          yükseltin.
        </p>
        <Button variant="primary" size="sm" className="w-full">
          Yükselt
        </Button>
      </div>

      <div className="bg-surface rounded-xl border border-line p-5">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5 text-gold" />
          <h3 className="text-txt font-semibold text-sm">İpucu</h3>
        </div>
        <p className="text-txt2 text-sm">
          Sorularınızı net ve spesifik sorarsanız, AI daha doğru yanıtlar
          üretir. İlgili kanun maddelerini de belirtebilirsiniz.
        </p>
      </div>
    </aside>
  );
}
