"use client";

import Link from "next/link";
import "./globals.css";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--txt)] px-4">
      <h1 className="text-6xl font-bold text-[var(--gold)] mb-2">404</h1>
      <p className="text-[var(--txt2)] mb-8">Sayfa bulunamadı.</p>
      <Link
        href="/"
        className="px-6 py-3 rounded-[var(--r)] bg-[var(--gold)] text-[var(--bg)] font-medium hover:opacity-90 transition"
      >
        Ana sayfaya dön
      </Link>
    </div>
  );
}
