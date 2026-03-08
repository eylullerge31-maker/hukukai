"use client";

import { formatTime } from "@/lib/utils";
import { formatMessage } from "@/lib/utils";
import { Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageType } from "@/types";

interface ChatMessageProps {
  message: ChatMessageType;
  onCopy?: (content: string) => void;
}

export function ChatMessage({ message, onCopy }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-3",
        isUser && "flex-row-reverse"
      )}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gold-dim flex items-center justify-center shrink-0">
          <span className="text-gold text-sm font-semibold">H</span>
        </div>
      )}
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3",
          isUser
            ? "bg-gold/20 border border-gold/30 text-txt"
            : "bg-surface border border-line"
        )}
      >
        <div
          className={cn(
            "text-sm leading-relaxed",
            !isUser && "prose prose-invert prose-sm max-w-none [&_strong]:text-gold"
          )}
          dangerouslySetInnerHTML={
            isUser
              ? { __html: formatMessage(message.content) }
              : { __html: formatMessage(message.content) }
          }
        />
        <div
          className={cn(
            "flex items-center gap-2 mt-2",
            isUser ? "justify-end" : "justify-between"
          )}
        >
          <span className="text-txt3 text-xs">
            {formatTime(message.timestamp)}
          </span>
          {!isUser && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => onCopy?.(message.content)}
                className="p-1.5 rounded hover:bg-gold-dim text-txt2 hover:text-gold transition-colors"
                title="Kopyala"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                className="p-1.5 rounded hover:bg-gold-dim text-txt2 hover:text-gold transition-colors"
                title="Beğen"
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
              <button
                className="p-1.5 rounded hover:bg-gold-dim text-txt2 hover:text-err transition-colors"
                title="Beğenme"
              >
                <ThumbsDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
