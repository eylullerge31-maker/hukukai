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
  formData: Record<string, string>
) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `Türk hukuku uzmanısın. Kullanıcının bilgilerine göre resmi, profesyonel Türkçe hukuki belge oluştur. Başlık büyük harf. Tarih, taraf bilgileri, hukuki dayanak, talep ve imza alanı ekle.

Belge sonunda MUTLAKA şu dipnotu ekle (aynı formatta):
---
Bu belge HukukAI yapay zeka platformu tarafından oluşturulmuştur. Taslak niteliğinde olup genel bilgi amaçlıdır. Resmi makamlara sunmadan veya hukuki işlemde kullanmadan önce mutlaka bir avukata danışınız ve belgenizi inceletiniz. HukukAI bu belgenin kullanımından doğabilecek hukuki sonuçlardan sorumlu değildir.
---`,
      },
      {
        role: "user",
        content: `${docName} belgesi oluştur.\nBilgiler: ${JSON.stringify(formData)}\nTarih: ${new Date().toLocaleDateString("tr-TR")}`,
      },
    ],
    max_tokens: 1500,
  });

  return response.choices[0].message.content || "";
}
