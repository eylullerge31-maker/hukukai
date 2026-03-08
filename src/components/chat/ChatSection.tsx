"use client";

import { ChatWindow } from "./ChatWindow";
import { Sidebar } from "@/components/layout/Sidebar";
import { useChat } from "@/hooks/useChat";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState, useCallback } from "react";

type SavedChat = { id: string; title: string; favorite: boolean; createdAt: string };

export function ChatSection() {
  const { loadMessages } = useChat();
  const { user } = useAuth();
  const [savedChats, setSavedChats] = useState<SavedChat[]>([]);

  const fetchChats = useCallback(async () => {
    if (!user || (user.id === "demo-user")) return;
    try {
      const res = await fetch("/api/chats");
      const data = await res.json();
      if (res.ok && Array.isArray(data.chats)) setSavedChats(data.chats);
    } catch {
      setSavedChats([]);
    }
  }, [user]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const handleLoadChat = useCallback(
    async (id: string) => {
      try {
        const res = await fetch(`/api/chats/${id}`);
        const data = await res.json();
        if (res.ok && data.messages) loadMessages(data.messages);
      } catch {
        // ignore
      }
    },
    [loadMessages]
  );

  const handleToggleFavorite = useCallback(
    async (id: string) => {
      try {
        await fetch(`/api/chats/${id}/favorite`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });
        fetchChats();
      } catch {
        // ignore
      }
    },
    [fetchChats]
  );

  return (
    <section id="ai-asistan" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-txt mb-4">
            AI Hukuki Danışman
          </h2>
          <p className="text-txt2 text-lg max-w-2xl mx-auto">
            Hukuki sorularınızı yazın, anında profesyonel yanıtlar alın.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <ChatWindow />
          </div>
          <Sidebar
            isLoggedIn={!!user && user.id !== "demo-user"}
            savedChats={savedChats}
            onLoadChat={handleLoadChat}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      </div>
    </section>
  );
}
