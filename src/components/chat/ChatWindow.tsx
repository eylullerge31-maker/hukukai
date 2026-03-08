"use client";

import { useRef, useEffect, useState } from "react";
import { useChat } from "@/hooks/useChat";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/ui/Button";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { QuickChips } from "./QuickChips";
import { Trash2, Copy, Save, Send } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

export function ChatWindow() {
  const {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    saveChat,
    loadMessages,
  } = useChat();
  const { user } = useAuth();
  const { addToast } = useToast();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    sendMessage(text);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[500px] bg-surface rounded-xl border border-line overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-line bg-bg2/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gold-dim flex items-center justify-center">
            <span className="text-gold font-semibold">H</span>
          </div>
          <div>
            <h3 className="font-semibold text-txt">HukukAI Danışmanı</h3>
            <p className="text-ok text-xs">Çevrimiçi</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearChat}
            leftIcon={<Trash2 className="w-4 h-4" />}
          >
            Temizle
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={async () => {
              const text = messages.map((m) => `${m.role === "user" ? "Siz" : "HukukAI"}: ${m.content}`).join("\n\n");
              await copyToClipboard(text || "Sohbet boş");
              addToast("Kopyalandı", "ok");
            }}
            leftIcon={<Copy className="w-4 h-4" />}
          >
            Kopyala
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={async () => {
              if (!user) {
                addToast("Kaydetmek için giriş yapın", "info");
                return;
              }
              const title = messages.find((m) => m.role === "user")?.content?.slice(0, 80) ?? "Yeni Sohbet";
              const res = await saveChat(title, messages.map((m) => ({ role: m.role, content: m.content })));
              if (res.ok) addToast("Sohbet kaydedildi", "ok");
              else addToast(res.error, "error");
            }}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Kaydet
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="space-y-4">
            <p className="text-txt2 text-sm">
              Merhaba, hukuki sorularınız için buradayım. Aşağıdaki örnek
              sorulardan birini seçebilir veya kendi sorunuzu yazabilirsiniz.
            </p>
            <QuickChips onSelect={sendMessage} disabled={isLoading} />
          </div>
        )}
        {messages.map((m) => (
          <ChatMessage
            key={m.id}
            message={m}
            onCopy={async (content) => {
              await copyToClipboard(content);
              addToast("Kopyalandı", "ok");
            }}
          />
        ))}
        {isLoading && <TypingIndicator />}
        {error && (
          <p className="text-err text-sm bg-err/10 rounded-lg p-3">{error}</p>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-line">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                const text = input.trim();
                if (text && !isLoading) {
                  sendMessage(text);
                  setInput("");
                }
              }
            }}
            placeholder="Sorunuzu yazın... (Enter gönder, Shift+Enter yeni satır)"
            rows={2}
            className="flex-1 px-4 py-3 bg-bg2 border border-line rounded-lg text-txt placeholder:text-txt3 resize-none focus:border-gold outline-none"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="md"
            disabled={!input.trim() || isLoading}
            leftIcon={<Send className="w-4 h-4" />}
          >
            Gönder
          </Button>
        </div>
        <p className="text-txt3 text-xs mt-2">
          Yanıtlar genel bilgi amaçlıdır. Kesin hukuki karar için uzmana
          danışın.
        </p>
      </form>
    </div>
  );
}
