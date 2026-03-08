# CLAUDE CODE TALİMATLARI — HukukAI Projesi

Bu dosya, Claude Code'a verilecek adım adım talimatları içerir.
Her aşamayı sırayla Claude Code'a yapıştırın.

---

## AŞAMA 1: Proje Başlatma

```
Bu klasördeki hukukai projesini kur. Şu komutları çalıştır:

npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm

Sonra şu paketleri ekle:
npm install openai lucide-react framer-motion clsx

Mevcut dosyaları koruyarak devam et.
```

---

## AŞAMA 2: Tema ve Global Stiller

```
src/app/globals.css dosyasını oluştur. Projenin renk paleti:
- Arka plan: #08090f (koyu lacivert/siyah)
- Yüzey: #161927
- Altın/Gold: #c8a96e (primary accent)
- Altın açık: #e2c99a
- Metin: #e8eaf2
- İkincil metin: #7d8aab
- Başarı: #2db87a
- Hata: #e05252

CSS değişkenlerini :root'ta tanımla. 
Font: Outfit (sans) + Libre Baskerville (serif) — Google Fonts'tan.
Tailwind config'e bu renkleri ekle.
config/constants.ts dosyasını doldur.
styles/theme.ts dosyasını doldur.
```

---

## AŞAMA 3: Ortak UI Bileşenleri

```
src/components/ui/ altında şu bileşenleri oluştur:

1. Button.tsx — primary (altın), secondary (outline), ghost varyantları. sm/md/lg boyutlar.
2. Input.tsx — text, textarea, select. Sol ikon desteği. Koyu tema.
3. Tag.tsx — Üst başlık etiketi (dot + text, altın border, pill shape)
4. Toast.tsx — ok/error/warning/info tipleri. Sağ üstte gösterilecek.
5. Modal.tsx — Overlay + animasyonlu modal wrapper. Başlık + kapatma butonu.
6. Badge.tsx — Plan badge, bildirim badge.

Her bileşen TypeScript + Tailwind. Props tiplerini types/index.ts'e ekle.
```

---

## AŞAMA 4: Layout Bileşenleri

```
src/components/layout/ altında:

1. Navbar.tsx — Sabit navbar. Logo (terazi SVG ikonu + "HukukAI" serif text).
   Linkler: Özellikler, AI Asistan, Dilekçe, Fiyatlandırma, SSS.
   Sağda: Giriş Yap (ghost) + Başlayın (primary) butonları.
   Giriş yapıldığında: Avatar dropdown (profil, ayarlar, çıkış).
   Mobilde: Hamburger menü.
   Scroll'da: Blur arka plan + border.

2. Footer.tsx — 4 sütunlu grid: Marka + açıklama, Ürün linkleri, Şirket linkleri, İletişim.
   Alt bar: Telif + KVKK uyarısı.

3. Sidebar.tsx — Chat sayfası yanı: İstatistikler, Popüler konular bar chart, 
   Premium upgrade kartı, İpucu kartı.
```

---

## AŞAMA 5: Landing Page Bileşenleri

```
src/components/landing/ altında:

1. Hero.tsx — Sol: eyebrow tag (yeşil pulse dot + "Yapay Zeka Destekli"), 
   büyük başlık "Hukuki Sorularınıza Anında, Güvenilir Yanıtlar", 
   alt metin, 2 CTA butonu (Ücretsiz Başlayın + Nasıl Çalışır), 
   3 istatistik sayaç (50.000+ Kullanıcı, 1M+ Yanıt, %98 Memnuniyet).
   Sağ: Floating chat card preview (dekoratif, örnek mesajlarla).
   Arka plan: Grid pattern + radial gold glow.

2. Features.tsx — 6 özellik grid (3x2). Her hücre: ikon + başlık + açıklama.
   Özellikler: AI Hukuki Danışman, Dilekçe Oluşturucu, Kanun Rehberi, 
   Sözleşme Analizi, Dava Takibi, Çoklu Platform.

3. Stats.tsx — 4'lü istatistik satırı animasyonlu sayaçlarla.

4. Testimonials.tsx — 2x2 grid yorum kartları. Sol altın border.
   Her kart: 5 yıldız, italik yorum, avatar + isim + ünvan.

5. FAQ.tsx — Accordion tarzı. 6 soru. Tıkla aç/kapa + altın ikon dönüşü.

6. CTAStrip.tsx — Tam genişlikte altın gradient şerit. 
   Başlık + açıklama + 2 buton.
```

---

## AŞAMA 6: Chat Sistemi

```
src/components/chat/ altında:

1. ChatWindow.tsx — Ana chat penceresi. Üstte: avatar + "HukukAI Danışmanı" + 
   "Çevrimiçi" durumu + temizle/kopyala/kaydet butonları.
   Ortada: Mesaj listesi (AI ve kullanıcı balonları).
   Altta: Textarea input + gönder butonu + uyarı metni.

2. ChatMessage.tsx — AI mesajı: sol avatar + balon + kopyala/beğen/beğenme butonları + saat.
   Kullanıcı mesajı: sağa hizalı altın balon.

3. QuickChips.tsx — Hazır soru butonları: "Kıdem tazminatı", "Kira ihtarnamesi", 
   "Boşanma davası", "Tüketici şikayeti", "Trafik kazası".

4. TypingIndicator.tsx — 3 nokta animasyonu.

hooks/useChat.ts — Chat state yönetimi:
- messages dizisi
- sendMessage fonksiyonu (OpenAI API çağrısı)
- isLoading state
- clearChat, copyChat fonksiyonları

lib/openai.ts — OpenAI API wrapper (server-side).
lib/prompts.ts — Sistem prompt'u (Türk hukuku uzmanı rolü + yanıt kuralları).
app/api/chat/route.ts — POST endpoint, streaming destekli.
```

---

## AŞAMA 7: Dilekçe Oluşturucu

```
src/components/documents/ altında:

1. DocumentGenerator.tsx — 3 adımlı wizard:
   Adım 1: Belge tipi seçimi (6 kart grid).
   Adım 2: Form doldurma (dinamik form).
   Adım 3: Önizleme + indirme.

2. DocumentTypeCard.tsx — İkon + isim + açıklama. Seçildiğinde altın border.
   Tipler: Kira İhtarnamesi, İş Davası Dilekçesi, Tüketici Şikayeti, 
   Borç İhtarnamesi, Vekaletname, Genel Dilekçe.

3. DocumentForm.tsx — Belge tipine göre dinamik form alanları.

4. DocumentPreview.tsx — Oluşturulan belge önizlemesi + kopyala + .txt indir.

lib/doc-templates.ts — Her belge tipi için form alanları ve etiketler.
app/api/document/route.ts — Belge oluşturma API endpoint.
```

---

## AŞAMA 8: Fiyatlandırma ve Ödeme

```
src/components/pricing/ altında:

1. PricingSection.tsx — Aylık/Yıllık toggle + 4 plan kartı grid.
   Planlar: Ücretsiz (₺0), Başlangıç (₺99), Pro (₺299, öne çıkan), Plus (₺599).
   Her kart: Plan adı, fiyat, açıklama, özellik listesi (✓/✗), CTA butonu.
   Yıllık: %20 indirim + tasarruf göstergesi.

2. PricingCard.tsx — Tek plan kartı bileşeni. "feat" prop ile öne çıkan kart.

3. PricingToggle.tsx — Aylık/Yıllık switch + "%20 Tasarruf" badge.

src/components/modals/ altında:
4. PaymentModal.tsx — Sipariş özeti + Kredi kartı / Havale / Kupon tabları.
```

---

## AŞAMA 9: Auth ve Modaller

```
src/components/modals/ altında:

1. LoginModal.tsx — Google/GitHub sosyal giriş butonları + email/şifre formu.
   "Beni hatırla" + "Şifremi unuttum" linkleri. Alt: Kayıt ol linki.

2. RegisterModal.tsx — Plan seçim tabları + Ad Soyad + Email + Şifre 
   (güç göstergesi barları) + KVKK/Kullanım koşulları checkbox + Kayıt Ol butonu.
   Başarılı: onay animasyonu.

3. SettingsModal.tsx — Profil / Güvenlik / API Anahtarı / Bildirim tabları.
   API sekmesi: OpenAI key input + kaydet.

4. ContactModal.tsx — Ad, email, konu, mesaj formu + gönder.

5. LegalModal.tsx — Kullanım koşulları / KVKK metinleri.

hooks/useAuth.ts — Basit auth state (user/null). 
Login/register/logout fonksiyonları (şimdilik localStorage mock).
```

---

## AŞAMA 10: Sayfa Birleştirme ve Son Ayarlar

```
src/app/page.tsx dosyasını oluştur — Tüm bileşenleri sırayla birleştir:

1. Navbar
2. Hero
3. Features (arka plan: bg2)
4. Chat Section (AI Asistan)
5. Document Generator (Dilekçe)
6. Stats
7. Pricing
8. Testimonials (arka plan: bg2)
9. FAQ
10. CTA Strip
11. Footer

Scroll animasyonları ekle (framer-motion intersection observer ile).
Progress bar (sayfanın en üstünde scroll'a göre genişleyen çizgi).
Toast provider'ı root layout'a ekle.
Responsive kontrol: mobil menü, grid breakpoint'ler.

Son olarak:
- .env.example dosyasını kontrol et
- package.json scripts'leri kontrol et
- Tailwind purge ayarlarını kontrol et
- Build test: npm run build
```

---

## 🔑 Ortam Değişkenleri (.env.local)

```
OPENAI_API_KEY=sk-your-openai-api-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## ⚡ Hızlı Komutlar

```bash
# Geliştirme
npm run dev

# Build
npm run build

# Vercel deploy
npx vercel
```
