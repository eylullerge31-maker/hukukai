"use client";

import { cn } from "@/lib/utils";
import type { ToastType } from "@/types";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";

const icons: Record<ToastType, React.ReactNode> = {
  ok: <CheckCircle className="w-5 h-5 text-ok" />,
  error: <AlertCircle className="w-5 h-5 text-err" />,
  warning: <AlertTriangle className="w-5 h-5 text-warn" />,
  info: <Info className="w-5 h-5 text-txt2" />,
};

const bgStyles: Record<ToastType, string> = {
  ok: "bg-surface border-ok/40",
  error: "bg-surface border-err/40",
  warning: "bg-surface border-warn/40",
  info: "bg-surface border-line",
};

interface ToastItemProps {
  id: string;
  message: string;
  type: ToastType;
  onClose: (id: string) => void;
}

export function ToastItem({ id, message, type, onClose }: ToastItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg animate-toast-in",
        bgStyles[type]
      )}
    >
      {icons[type]}
      <p className="flex-1 text-txt text-sm">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="p-1 rounded hover:bg-gold-dim text-txt2 hover:text-txt transition-colors"
        aria-label="Kapat"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

interface ToastContainerProps {
  children: React.ReactNode;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

export function ToastContainer({
  children,
  position = "top-right",
}: ToastContainerProps) {
  const positionStyles = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };
  return (
    <div
      className={cn(
        "fixed z-[9999] flex flex-col gap-2 max-w-sm",
        positionStyles[position]
      )}
    >
      {children}
    </div>
  );
}
