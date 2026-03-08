"use client";

import { useState, useCallback } from "react";
import { ChatMessage, ChatState } from "@/types";
import { generateId } from "@/lib/utils";

export function useChat() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: ChatMessage = {
      id: generateId(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...state.messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "API hatası");
      }

      const data = await response.json();

      const aiMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
      };

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, aiMessage],
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu",
      }));
    }
  }, [state.messages]);

  const clearChat = useCallback(() => {
    setState({ messages: [], isLoading: false, error: null });
  }, []);

  const copyChat = useCallback(() => {
    const text = state.messages
      .map((m) => `${m.role === "user" ? "Siz" : "HukukAI"}: ${m.content}`)
      .join("\n\n");
    navigator.clipboard.writeText(text || "Sohbet boş");
  }, [state.messages]);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
    clearChat,
    copyChat,
  };
}
