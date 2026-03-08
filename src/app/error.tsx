"use client";

import { useEffect } from "react";
import "./globals.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--txt)] px-4">
      <h1 className="text-xl font-semibold text-[var(--err)] mb-2">Bir hata oluştu</h1>
      <p className="text-[var(--txt2)] mb-8 text-center max-w-md">
        İşleminiz sırasında beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.
      </p>
      <button
        type="button"
        onClick={reset}
        className="px-6 py-3 rounded-[var(--r)] bg-[var(--gold)] text-[var(--bg)] font-medium hover:opacity-90 transition"
      >
        Tekrar dene
      </button>
    </div>
  );
}
