# HukukAI — Vercel Deploy & Google/Apple Giriş Kurulumu

**Önce Neon PostgreSQL oluştur, sonra Google OAuth ayarla, ardından Vercel’e deploy et.**

---

## 1. Ücretsiz PostgreSQL (Neon)

1. [neon.tech](https://neon.tech) → Sign up (ücretsiz)
2. **New Project** → Proje adı: `hukukai`
3. **Connection string** kopyala (örn. `postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`)
4. `.env.local` dosyasına ekle: `DATABASE_URL="postgresql://..."`

---

## 2. Google OAuth Anahtarları

1. [console.cloud.google.com](https://console.cloud.google.com/)
2. **APIs & Services** → **Credentials** → **+ Create Credentials** → **OAuth client ID**
3. Uygulama türü: **Web application**
4. **Authorized redirect URIs** ekle:
   - Local: `http://localhost:3000/api/auth/callback/google`
   - Vercel: `https://SENIN-PROJE.vercel.app/api/auth/callback/google`
5. **Client ID** ve **Client Secret** kopyala

---

## 3. Apple Sign In (Opsiyonel — Ücretli)

1. [developer.apple.com](https://developer.apple.com/) (Apple Developer Program ~99$/yıl)
2. **Certificates, Identifiers & Profiles** → **Identifiers** → Sign in with Apple
3. **Keys** → Yeni key oluştur → .p8 indir
4. Client Secret JWT üret (NextAuth Apple docs)

---

## 4. Vercel Deploy

### A. GitHub’a Yükle

```bash
git init
git add .
git commit -m "HukukAI deploy"
# GitHub’da yeni repo oluştur
git remote add origin https://github.com/KULLANICI/hukukai.git
git push -u origin main
```

### B. Vercel Projesi

1. [vercel.com](https://vercel.com) → **Add New** → **Project**
2. GitHub reponuzu seç → **Import**
3. **Environment Variables** ekle:

| Name | Value |
|------|-------|
| `DATABASE_URL` | Neon’dan kopyaladığın PostgreSQL URL |
| `OPENAI_API_KEY` | OpenAI API key |
| `AUTH_SECRET` | `npx auth secret` ile üret |
| `AUTH_GOOGLE_ID` | Google Client ID |
| `AUTH_GOOGLE_SECRET` | Google Client Secret |
| `AUTH_APPLE_ID` | (Opsiyonel) |
| `AUTH_APPLE_SECRET` | (Opsiyonel) |
| `NEXT_PUBLIC_APP_URL` | `https://hukukai-xxx.vercel.app` (deploy sonrası güncelle) |

4. **Deploy** tıkla

### C. İlk Deploy Sonrası

1. Proje URL’i: `https://hukukai-xxx.vercel.app`
2. Google Console’da bu redirect URI’yi ekle:  
   `https://hukukai-xxx.vercel.app/api/auth/callback/google`
3. Vercel → Settings → Environment Variables → `NEXT_PUBLIC_APP_URL` → `https://hukukai-xxx.vercel.app` yap
4. **Redeploy** (Deployments → ... → Redeploy)

---

## 5. Veritabanı

Build sırasında `prisma db push` otomatik çalışır — şema veritabanına uygulanır.  
Ek migration gerekmez. Neon URL’ini `DATABASE_URL` olarak verdiğinizde tablolar otomatik oluşturulur.

---

## 6. AUTH_SECRET Üretme

```bash
npx auth secret
```

Çıkan değeri `AUTH_SECRET` olarak kullan.
