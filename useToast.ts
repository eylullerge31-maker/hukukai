"use client";

import { useState, useCallback } from "react";
import { Toast, ToastType } from "@/types";
import { generateId } from "@/lib/utils";

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = "info") => {
    const id = generateId();
    setToasts((prev) => [...prev, { id, message, type }]);

    // 3.5 saniye sonra otomatik kaldır
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}
