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
        content: `Türk hukuku uzmanısın. Kullanıcının bilgilerine göre resmi, profesyonel Türkçe hukuki belge oluştur. Başlık büyük harf. Tarih, taraf bilgileri, hukuki dayanak, talep ve imza alanı ekle. Son satırda: "Bu belge HukukAI tarafından oluşturulmuştur." yaz.`,
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
