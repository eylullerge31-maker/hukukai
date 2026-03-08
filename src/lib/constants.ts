import {
  PricingPlan,
  DocumentTemplate,
  FAQItem,
  Testimonial,
  StatItem,
} from "@/types";

// ═══════════════════════════════════════
// Fiyatlandırma Planları
// ═══════════════════════════════════════
export const PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Ücretsiz",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Başlangıç için ideal",
    features: [
      { text: "Günde 5 soru", included: true },
      { text: "Temel hukuki bilgi", included: true },
      { text: "1 belge/gün", included: true },
      { text: "Topluluk desteği", included: true },
      { text: "Sözleşme analizi", included: false },
      { text: "Öncelikli destek", included: false },
      { text: "API erişimi", included: false },
    ],
  },
  {
    id: "starter",
    name: "Başlangıç",
    monthlyPrice: 99,
    yearlyPrice: 79,
    description: "Bireysel kullanıcılar için",
    features: [
      { text: "Günde 50 soru", included: true },
      { text: "Detaylı hukuki analiz", included: true },
      { text: "10 belge/gün", included: true },
      { text: "E-posta desteği", included: true },
      { text: "Temel sözleşme analizi", included: true },
      { text: "Öncelikli destek", included: false },
      { text: "API erişimi", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 299,
    yearlyPrice: 239,
    description: "Profesyoneller ve KOBİ'ler için",
    featured: true,
    badge: "En Popüler",
    features: [
      { text: "Sınırsız soru", included: true },
      { text: "Kapsamlı hukuki analiz", included: true },
      { text: "Sınırsız belge", included: true },
      { text: "Öncelikli destek", included: true },
      { text: "Gelişmiş sözleşme analizi", included: true },
      { text: "Dava takibi", included: true },
      { text: "API erişimi", included: false },
    ],
  },
  {
    id: "plus",
    name: "Plus",
    monthlyPrice: 599,
    yearlyPrice: 479,
    description: "Hukuk büroları ve kurumsal",
    features: [
      { text: "Sınırsız her şey", included: true },
      { text: "GPT-4 Turbo erişimi", included: true },
      { text: "Özel model eğitimi", included: true },
      { text: "7/24 VIP destek", included: true },
      { text: "Tam sözleşme paketi", included: true },
      { text: "Çoklu kullanıcı", included: true },
      { text: "Tam API erişimi", included: true },
    ],
  },
];

// ═══════════════════════════════════════
// Dilekçe Şablonları
// ═══════════════════════════════════════
export const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    type: "kira",
    name: "Kira İhtarnamesi",
    description: "Kira borcu, tahliye ve kira artışı ihtarnameleri",
    icon: "Home",
    fields: [
      { id: "d0", label: "Kiraya Veren Ad Soyad", type: "text", placeholder: "Ad Soyad", required: true },
      { id: "d1", label: "Kiracı Ad Soyad", type: "text", placeholder: "Ad Soyad", required: true },
      { id: "d2", label: "Kiralanan Adres", type: "textarea", placeholder: "Tam adres", required: true },
      { id: "d3", label: "Aylık Kira (₺)", type: "number", placeholder: "5000" },
      { id: "d4", label: "Geciken Ay", type: "number", placeholder: "3" },
      {
        id: "d5",
        label: "İhtar Konusu",
        type: "select",
        options: ["Kira Borcunun Ödenmesi", "Tahliye Talebi", "Kira Artışı", "Hasar / Bakım"],
      },
    ],
  },
  {
    type: "is",
    name: "İş Davası Dilekçesi",
    description: "Kıdem, ihbar tazminatı ve işe iade davaları",
    icon: "Briefcase",
    fields: [
      { id: "d0", label: "İşçi Ad Soyad", type: "text", placeholder: "Ad Soyad", required: true },
      { id: "d1", label: "İşveren / Şirket", type: "text", placeholder: "Şirket adı", required: true },
      { id: "d2", label: "İşe Başlama Tarihi", type: "date" },
      { id: "d3", label: "Ayrılış Tarihi", type: "date" },
      {
        id: "d4",
        label: "Talep",
        type: "select",
        options: ["Kıdem Tazminatı", "İhbar Tazminatı", "İşe İade", "Fazla Mesai", "Yıllık İzin Ücreti"],
      },
      { id: "d5", label: "Aylık Brüt Maaş (₺)", type: "number", placeholder: "15000" },
    ],
  },
  {
    type: "tuketici",
    name: "Tüketici Şikayeti",
    description: "Ayıplı ürün, iade ve garanti şikayetleri",
    icon: "ShieldAlert",
    fields: [
      { id: "d0", label: "Şikayetçi Ad Soyad", type: "text", placeholder: "Ad Soyad", required: true },
      { id: "d1", label: "Satıcı / Firma", type: "text", placeholder: "Firma adı", required: true },
      { id: "d2", label: "Ürün / Hizmet", type: "text", placeholder: "Ürün adı" },
      {
        id: "d3",
        label: "Şikayet Konusu",
        type: "select",
        options: ["Ayıplı Ürün", "Hizmet Yetersizliği", "İade Reddi", "Garanti Kapsamı", "Yanıltıcı Reklam"],
      },
      { id: "d4", label: "Talep Edilen Tutar (₺)", type: "number", placeholder: "2500" },
    ],
  },
  {
    type: "borc",
    name: "Borç İhtarnamesi",
    description: "Alacak takibi ve borç ihtarı",
    icon: "Banknote",
    fields: [
      { id: "d0", label: "Alacaklı Ad Soyad", type: "text", placeholder: "Ad Soyad", required: true },
      { id: "d1", label: "Borçlu Ad Soyad", type: "text", placeholder: "Ad Soyad", required: true },
      { id: "d2", label: "Borç Tutarı (₺)", type: "number", placeholder: "10000", required: true },
      { id: "d3", label: "Borç Tarihi", type: "date" },
      { id: "d4", label: "Borç Sebebi", type: "textarea", placeholder: "Borcun sebebi..." },
    ],
  },
  {
    type: "vekaletname",
    name: "Vekaletname",
    description: "Genel ve özel vekaletname hazırlama",
    icon: "Stamp",
    fields: [
      { id: "d0", label: "Vekil Eden Ad Soyad", type: "text", placeholder: "Ad Soyad", required: true },
      { id: "d1", label: "Vekil Ad Soyad", type: "text", placeholder: "Ad Soyad", required: true },
      { id: "d2", label: "TC Kimlik No (Vekil Eden)", type: "text", placeholder: "11 haneli" },
      { id: "d3", label: "Vekaletname Konusu", type: "textarea", placeholder: "Yetki kapsamı..." },
    ],
  },
  {
    type: "genel",
    name: "Genel Dilekçe",
    description: "Mahkeme, savcılık ve kurumlara dilekçe",
    icon: "FileText",
    fields: [
      { id: "d0", label: "Dilekçe Sahibi", type: "text", placeholder: "Ad Soyad", required: true },
      { id: "d1", label: "Muhatap Kurum", type: "text", placeholder: "Kurum adı", required: true },
      { id: "d2", label: "Konu", type: "text", placeholder: "Dilekçe konusu" },
      { id: "d3", label: "Açıklama", type: "textarea", placeholder: "Detaylı açıklama..." },
    ],
  },
];

export const DOC_NAMES: Record<string, string> = {
  kira: "Kira İhtarnamesi",
  is: "İş Davası Dilekçesi",
  tuketici: "Tüketici Şikayeti",
  borc: "Borç İhtarnamesi",
  vekaletname: "Vekaletname",
  genel: "Genel Dilekçe",
};

// ═══════════════════════════════════════
// SSS
// ═══════════════════════════════════════
export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "HukukAI gerçek bir avukat yerine geçer mi?",
    answer:
      "Hayır. HukukAI genel hukuki bilgi ve yönlendirme sunar. Kesin hukuki karar ve dava takibi için mutlaka uzman bir avukata danışmanızı öneriyoruz. Platformumuz size ön bilgi sağlayarak avukatınızla daha verimli görüşmenize yardımcı olur.",
  },
  {
    question: "Hangi hukuk alanlarında yardım alabiliyorum?",
    answer:
      "İş Hukuku, Aile Hukuku, Ceza Hukuku, Borçlar Hukuku, Ticaret Hukuku, İdare Hukuku, Tüketici Hukuku, Kira Hukuku, Miras Hukuku ve Vergi Hukuku alanlarında destek sunuyoruz.",
  },
  {
    question: "Verilerim güvende mi?",
    answer:
      "Evet. Tüm verileriniz SSL/TLS şifreleme ile korunur. KVKK uyumlu çalışıyoruz ve verilerinizi üçüncü taraflarla paylaşmıyoruz. Sohbet geçmişiniz şifrelenmiş olarak saklanır.",
  },
  {
    question: "Ücretsiz plan ne kadar süre kullanılabilir?",
    answer:
      "Ücretsiz plan süresiz olarak kullanılabilir. Günde 5 soru ve 1 belge oluşturma hakkınız vardır. Daha fazla kullanım için ücretli planlarımıza göz atabilirsiniz.",
  },
  {
    question: "API anahtarımı nasıl eklerim?",
    answer:
      "Ayarlar menüsünden 'API Anahtarı' sekmesine gidin. OpenAI API anahtarınızı girin ve kaydedin. Kendi API anahtarınızı kullanarak sınırsız sorgu yapabilirsiniz.",
  },
  {
    question: "Aboneliğimi nasıl iptal edebilirim?",
    answer:
      "Hesap ayarlarından istediğiniz zaman aboneliğinizi iptal edebilirsiniz. İptal işlemi mevcut dönem sonunda geçerli olur ve kalan süre boyunca hizmetiniz devam eder.",
  },
];

// ═══════════════════════════════════════
// Yorumlar
// ═══════════════════════════════════════
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Av. Mehmet Kaya",
    role: "Serbest Avukat",
    avatar: "MK",
    avatarColor: "#6366f1",
    content:
      "Müvekkillerime ön bilgilendirme yaparken HukukAI'dan aldığım içgörüler çok değerli. Özellikle dilekçe taslakları büyük zaman kazandırıyor.",
    rating: 5,
  },
  {
    id: "2",
    name: "Zeynep Demir",
    role: "İnsan Kaynakları Müdürü",
    avatar: "ZD",
    avatarColor: "#ec4899",
    content:
      "İş hukuku konusunda anlık bilgi alabilmek harika. Çalışan haklarıyla ilgili soruları hızlıca yanıtlayabiliyorum.",
    rating: 5,
  },
  {
    id: "3",
    name: "Ali Yıldırım",
    role: "KOBİ Sahibi",
    avatar: "AY",
    avatarColor: "#f59e0b",
    content:
      "Kiracılarla yaşadığım sorunlarda HukukAI sayesinde haklarımı öğrendim ve doğru adımları attım. Dilekçe oluşturucu çok pratik.",
    rating: 5,
  },
  {
    id: "4",
    name: "Dr. Elif Arslan",
    role: "Akademisyen — Hukuk Fakültesi",
    avatar: "EA",
    avatarColor: "#14b8a6",
    content:
      "Öğrencilerime önerdiğim bir platform. Kanun maddelerine referans vererek açıklama yapması eğitim açısından çok faydalı.",
    rating: 5,
  },
];

// ═══════════════════════════════════════
// İstatistikler
// ═══════════════════════════════════════
export const STATS: StatItem[] = [
  { value: 50000, suffix: "+", label: "Aktif Kullanıcı" },
  { value: 1000000, suffix: "+", label: "Yanıtlanan Soru" },
  { value: 98, suffix: "%", label: "Memnuniyet Oranı" },
  { value: 150000, suffix: "+", label: "Oluşturulan Belge" },
];

// ═══════════════════════════════════════
// Chat Hazır Sorular
// ═══════════════════════════════════════
export const QUICK_QUESTIONS = [
  "İşten çıkarıldım, kıdem tazminatı hakkım var mı?",
  "Kiracım kira ödemedi, ne yapabilirim?",
  "Boşanma davası nasıl açılır?",
  "Tüketici şikayeti nasıl yapılır?",
  "Trafik kazasında tazminat hakkım var mı?",
];

// ═══════════════════════════════════════
// Özellikler (Features)
// ═══════════════════════════════════════
export const FEATURES: { icon: string; name: string; description: string; scrollTo?: string }[] = [
  {
    icon: "MessageSquare",
    name: "AI Hukuki Danışman",
    description:
      "Türk hukuku konusunda 7/24 yapay zeka destekli danışmanlık. Anında, kanun maddelerine dayalı yanıtlar.",
    scrollTo: "#ai-asistan",
  },
  {
    icon: "FileText",
    name: "Dilekçe Oluşturucu",
    description:
      "Kira ihtarnamesi, iş davası dilekçesi, tüketici şikayeti ve daha fazlasını saniyeler içinde oluşturun.",
    scrollTo: "#dilekce",
  },
  {
    icon: "BookOpen",
    name: "Kanun Rehberi",
    description:
      "Güncel Türk mevzuatına hızlı erişim. İlgili kanun maddeleri, içtihatlar ve emsal kararlar parmaklarınızın ucunda.",
    scrollTo: "#ai-asistan",
  },
  {
    icon: "Shield",
    name: "Sözleşme & Risk Analizi",
    description:
      "Belgelerinizi yükleyin; yapay zeka olası riskleri, eksik maddeleri ve iyileştirme önerilerini kapsamlı raporla sunar.",
    scrollTo: "#ai-asistan",
  },
  {
    icon: "Calendar",
    name: "Dava & Süreç Takibi",
    description:
      "Hukuki süreçlerinizin durumunu izleyin, önemli tarihleri ve duruşmaları kaçırmayın. Belge ve notlarınızı güvenle saklayın.",
    scrollTo: "#fiyatlandirma",
  },
  {
    icon: "Monitor",
    name: "Çoklu Platform Erişimi",
    description:
      "Web, mobil uygulama ve API üzerinden erişin. Sohbet geçmişiniz, belgeleriniz ve dosyalarınız tüm cihazlarınızda senkronize.",
    scrollTo: "#fiyatlandirma",
  },
];

// ═══════════════════════════════════════
// Popüler Konular (Sidebar)
// ═══════════════════════════════════════
export const POPULAR_TOPICS = [
  { label: "İş Hukuku", percentage: 72 },
  { label: "Aile Hukuku", percentage: 54 },
  { label: "Kira Hukuku", percentage: 42 },
  { label: "Tüketici", percentage: 35 },
  { label: "Ceza Hukuku", percentage: 28 },
];
