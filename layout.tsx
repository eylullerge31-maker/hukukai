import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HukukAI — Yapay Zeka Destekli Hukuki Danışmanlık",
  description:
    "7/24 hukuki danışmanlık, dilekçe oluşturma ve kanun rehberi. Türk hukuku konusunda yapay zeka destekli profesyonel danışmanlık platformu.",
  keywords: [
    "hukuk",
    "yapay zeka",
    "hukuki danışmanlık",
    "dilekçe",
    "avukat",
    "türk hukuku",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
