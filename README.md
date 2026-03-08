# HukukAI — Yapay Zeka Destekli Hukuki Danışmanlık Platformu

Türk hukuku odaklı, yapay zeka destekli danışmanlık ve dilekçe oluşturma uygulaması.

## Özellikler

- **AI Hukuki Danışman** — OpenAI ile sohbet, hukuki soru/cevap
- **Dilekçe Oluşturucu** — Kira ihtarnamesi, iş davası, tüketici şikayeti vb.
- **Gece / Gündüz modu** — Tema tercihi localStorage’da saklanır
- **Fiyatlandırma** — Plan seçimi ve ödeme modali
- **Auth (mock)** — Giriş, kayıt, ayarlar, API anahtarı
- **KVKK / Kullanım koşulları** modalleri

## 🏗️ Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout + ThemeProvider
│   ├── page.tsx            # Ana sayfa
│   ├── globals.css         # Global stiller (gece/gündüz değişkenleri)
│   └── api/
│       ├── chat/route.ts    # Chat API
│       └── document/route.ts # Belge API
├── components/
│   ├── layout/             # Navbar, Footer, Sidebar, ScrollProgress
│   ├── chat/               # ChatWindow, ChatSection, QuickChips
│   ├── documents/          # DocumentGenerator, DocumentForm, DocumentPreview
│   ├── pricing/            # PricingSection, PricingCard, PricingToggle
│   ├── landing/            # Hero, Features, Stats, Testimonials, FAQ, CTAStrip
│   ├── modals/             # Login, Register, Payment, Settings, Contact, Legal
│   ├── ui/                 # Button, Input, Tag, Toast, Modal, Badge
│   └── ThemeProvider.tsx   # Gece/gündüz tema
├── lib/                    # openai, prompts, utils, constants, theme
├── hooks/                  # useChat, useAuth, useToast
└── types/                  # TypeScript tipleri
```

## 🚀 Kurulum

```bash
npm install
cp env.example .env.local
# .env.local içine OPENAI_API_KEY ekleyin
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) açın.

## 🔧 Komutlar

| Komut | Açıklama |
|-------|----------|
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Production build |
| `npm run start` | Build sonrası sunucuyu çalıştırma |
| `npm run lint` | ESLint |

## 🎯 Teknoloji

- **Framework:** Next.js 14 (App Router)
- **Dil:** TypeScript
- **Stil:** Tailwind CSS + CSS değişkenleri (gece/gündüz)
- **AI:** OpenAI API (gpt-4o-mini)
- **State:** React hooks + ThemeProvider context

## 📦 Deploy (Vercel)

Detaylı adımlar için [DEPLOY.md](./DEPLOY.md) dosyasına bakın.

```bash
npx vercel
```

Vercel’de `OPENAI_API_KEY` ortam değişkenini tanımlayın.

## 📄 Lisans

Proje eğitim / demo amaçlıdır.

