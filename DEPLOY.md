# HukukAI — Vercel ile Deploy

## Ön koşullar

- GitHub/GitLab/Bitbucket hesabı
- Vercel hesabı ([vercel.com](https://vercel.com))
- Proje `npm run build` ile hatasız derleniyor olmalı

## Adımlar

### 1. Projeyi Git’e ekleyin

```bash
git init
git add .
git commit -m "HukukAI initial"
git remote add origin <repo-url>
git push -u origin main
```

### 2. Vercel’e bağlayın

1. [vercel.com/new](https://vercel.com/new) adresine gidin.
2. “Import Git Repository” ile projeyi seçin.
3. **Build and Output Settings** (genelde otomatik gelir):
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: (boş bırakın)

### 3. Ortam değişkenleri

Vercel proje ayarlarından **Settings → Environment Variables**:

| İsim                   | Zorunlu | Açıklama |
|------------------------|--------|----------|
| `OPENAI_API_KEY`       | Evet   | OpenAI API anahtarınız |
| `AUTH_SECRET`          | Evet   | NextAuth oturum güvenliği (en az 32 karakter rastgele dize) |
| `DATABASE_URL`         | Evet   | Üretimde **PostgreSQL** bağlantı dizesi (Vercel Postgres veya harici DB). Yerelde SQLite: `file:./dev.db` |
| `NEXT_PUBLIC_APP_URL`  | Önerilir | Site adresi (örn. `https://hukukai.vercel.app`) — NextAuth callback için |
| `AUTH_DEMO_EMAIL`      | Hayır  | Demo giriş e-postası (yoksa `demo@hukukai.com`) |
| `AUTH_DEMO_PASSWORD`  | Hayır  | Demo giriş şifresi (yoksa `demo1234`) |

Değişkenleri **Production**, **Preview** ve **Development** için ekleyin.

**Veritabanı:** Üretimde SQLite kullanılamaz (dosya tabanlı). Vercel Postgres veya kendi PostgreSQL sunucunuzu kullanın. İlk kez deploy sonrası, üretim `DATABASE_URL` ile şu komutu çalıştırın:  
`npx prisma migrate deploy`

### 4. Deploy

- “Deploy”e tıklayın.
- Build bittikten sonra size verilen URL’den (örn. `hukukai.vercel.app`) siteyi açabilirsiniz.

## Özel domain

- **Settings → Domains** bölümünden kendi domain’inizi ekleyebilirsiniz.

## Notlar

- `.env.local` dosyası Git’e eklenmez; sadece Vercel’de tanımladığınız environment variable’lar kullanılır.
- API route’ları serverless function olarak çalışır; soğuk başlangıç nedeniyle ilk istek birkaç saniye sürebilir.
