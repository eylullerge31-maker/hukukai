import OpenAI from "openai";
import { SYSTEM_PROMPT } from "./prompts";

// Server-side only — API key .env.local'dan gelir
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getChatResponse(
  messages: { role: "user" | "assistant"; content: string }[]
) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    max_tokens: 1000,
    temperature: 0.7,
  });

  return response.choices[0].message.content || "";
}

export async function generateDocument(
  docType: string,
  docName: string,
  formData: Record<string, string>,
  fieldLabels?: Record<string, string>
) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `Türk hukuku uzmanısın. Kullanıcı SADECE belirtilen belge tipini istiyor. O tip dışında başka yapı kullanma.

TAM DİLEKÇE FORMATI (zorunlu sıra):
1. Başlık (büyük harf, ortalanmış): BELGE ADI
2. Tarih: 00.00.0000
3. Muhatap: İLGİLİ MAHKEMEYE (veya kurum)
4. DAVACI: Ad Soyad, Adres, Telefon (placeholder [Davacının adresi] kullanılabilir)
5. DAVALI: Ad/Şirket, Adres, Telefon
6. KONU: Tek cümle
7. AÇIKLAMALAR: Numaralı paragraflar (1. 2. 3.)
8. TALEP: Açık talep cümlesi
9. "Gereğini arz ederim."
10. İmza (alt çizgi ile boş alan)

İş Davası için "Talep Türü" değerine göre farklı hukuki dayanak ve paragraf yapısı kullan. Resmi, profesyonel Türkçe. Türkçe karakterleri doğru kullan (ş, ğ, ü, ö, ç, ı, İ).

Belge sonunda MUTLAKA şu dipnotu ekle (aynı formatta):
---
Bu belge HukukAI yapay zeka platformu tarafından oluşturulmuştur. Taslak niteliğinde olup genel bilgi amaçlıdır. Resmi makamlara sunmadan veya hukuki işlemde kullanmadan önce mutlaka bir avukata danışınız ve belgenizi inceletiniz. HukukAI bu belgenin kullanımından doğabilecek hukuki sonuçlardan sorumlu değildir.
---`,
      },
      {
        role: "user",
        content: `SADECE "${docName}" (tip: ${docType}) belgesi oluştur. Başka belge tipi ile karıştırma.

Bilgiler:\n${Object.entries(formData)
          .filter(([, v]) => v)
          .map(([k, v]) => `- ${fieldLabels?.[k] ?? k}: ${v}`)
          .join("\n")}

Tarih: ${new Date().toLocaleDateString("tr-TR")}`,
      },
    ],
    max_tokens: 1500,
  });

  return response.choices[0].message.content || "";
}
