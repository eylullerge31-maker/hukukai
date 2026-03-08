# GitHub + Vercel Bağlama Rehberi

## 1. Git Kurulumu

Bilgisayarınızda Git yüklü değilse:
- **[git-scm.com/download/win](https://git-scm.com/download/win)** adresinden indirip kurun
- Kurulum sonrası terminali (PowerShell/CMD) kapatıp yeniden açın

---

## 2. GitHub Repo Oluşturma

1. [github.com](https://github.com) → Giriş yapın
2. Sağ üst **+** → **New repository**
3. Repository name: `hukukai`
4. Public seçin
5. **Create repository** tıklayın (README eklemeyin, proje zaten mevcut)

---

## 3. Projeyi GitHub'a Yükleme

Proje klasöründe PowerShell veya CMD açın, sırayla:

```bash
cd c:\Users\packardbell\Desktop\HUKUKAIPROJECT

git init
git add .
git commit -m "HukukAI ilk commit"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/hukukai.git
git push -u origin main
```

`KULLANICI_ADINIZ` yerine kendi GitHub kullanıcı adınızı yazın.

> GitHub sizden kullanıcı adı ve şifre/token isteyebilir. Token kullanmanız gerekirse:  
> GitHub → Settings → Developer settings → Personal access tokens

---

## 4. Vercel'e Bağlama

1. [vercel.com](https://vercel.com) → Giriş yapın (GitHub ile giriş yapabilirsiniz)
2. **Add New** → **Project**
3. **Import Git Repository** → `hukukai` reponuzu seçin
4. **Environment Variables** bölümüne şunları ekleyin:

| Değişken | Değer |
|----------|-------|
| `DATABASE_URL` | Neon'dan aldığınız PostgreSQL URL |
| `OPENAI_API_KEY` | .env.local'daki değer |
| `AUTH_SECRET` | `npx auth secret` ile üretin |
| `AUTH_GOOGLE_ID` | .env.local'daki değer |
| `AUTH_GOOGLE_SECRET` | .env.local'daki değer |
| `NEXT_PUBLIC_APP_URL` | İlk deploy sonrası verilecek URL (örn. https://hukukai-xxx.vercel.app) |

5. **Deploy** tıklayın

---

## 5. Deploy Sonrası

1. Vercel size `https://hukukai-xxx.vercel.app` gibi bir URL verecek
2. Vercel → Proje → **Settings** → **Environment Variables**
3. `NEXT_PUBLIC_APP_URL` ekleyin/güncelleyin: `https://hukukai-xxx.vercel.app`
4. Google Cloud Console’da **Authorized redirect URIs** kısmına ekleyin:  
   `https://hukukai-xxx.vercel.app/api/auth/callback/google`
5. **Deployments** → Son deploy → **Redeploy** ile tekrar deploy edin
