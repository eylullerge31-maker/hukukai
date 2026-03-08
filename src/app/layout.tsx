import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";

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
  openGraph: {
    title: "HukukAI — Yapay Zeka Destekli Hukuki Danışmanlık",
    description: "7/24 hukuki danışmanlık, dilekçe oluşturma ve kanun rehberi. Türk hukuku konusunda yapay zeka destekli danışmanlık.",
    locale: "tr_TR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('hukukai-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}else{document.documentElement.setAttribute('data-theme','dark');}})();`,
          }}
        />
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
