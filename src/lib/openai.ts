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
1. Başlık (büyük harf): BELGE ADI
2. Tarih: 00.00.0000
3. Muhatap: İLGİLİ MAHKEMEYE
4. DAVACI/DAVALI: Sadece kullanıcının formda verdiği bilgileri yaz. Adres ve TC Kimlik formda YOKSA hiç yazma. [Adres], [TC] gibi placeholder EKLEME.
5. KONU, AÇIKLAMALAR, TALEP, "Gereğini arz ederim.", İmza

KRİTİK - Kesin hukuki sonuç cümleleri KULLANMA:
- YASAK: "bu durum İş Kanunu'na aykırıdır", "ihlal edilmiştir", "kesinlikle"
- KULLAN: "değerlendirilebilir", "uygulanması gerektiği düşünülmektedir", "ilgili hükümler kapsamında incelenmesi önerilir", "bu konuda mahkemece değerlendirilmesi gerekmektedir"
Hukuki iddiaları ihtiyatlı, şartlı ifadelerle yaz. Riske girme.

İş Davası: "Talep Türü"ne göre farklı yapı. Kısa ve öz tut, 1 sayfayı aşmamaya çalış. Resmi Türkçe, doğru karakterler (ş, ğ, ü, ö, ç, ı, İ).

Belge sonunda (tek satır) şu dipnotu ekle: --- Bu belge HukukAI yapay zeka platformu tarafından oluşturulmuştur. Taslak niteliğindedir. Resmi kullanım öncesi avukata danışınız. HukukAI hukuki sorumluluk üstlenmez. ---`,
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
