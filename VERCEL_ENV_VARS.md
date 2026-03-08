# Vercel Ortam Değişkenleri

Vercel → Proje → Settings → Environment Variables bölümüne ekleyin:

| Ad | Değer |
|----|-------|
| `DATABASE_URL` | Neon PostgreSQL bağlantı URL'i |
| `OPENAI_API_KEY` | OpenAI API anahtarı |
| `AUTH_SECRET` | `npx auth secret` ile üret (veya mevcut) |
| `AUTH_GOOGLE_ID` | Google OAuth Client ID |
| `AUTH_GOOGLE_SECRET` | Google OAuth Client Secret |
| `NEXT_PUBLIC_APP_URL` | Deploy sonrası `https://hukukai-xxx.vercel.app` yapın |

---

Deploy sonrası:
1. Google Console'da Vercel URL'ini redirect URI olarak ekleyin.
2. Vercel'de `NEXT_PUBLIC_APP_URL` değerini güncelleyip Redeploy edin.
