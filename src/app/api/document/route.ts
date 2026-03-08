import { NextRequest, NextResponse } from "next/server";
import { generateDocument } from "@/lib/openai";
import { DOC_NAMES, DOCUMENT_TEMPLATES } from "@/lib/constants";
import { checkRateLimit } from "@/lib/rateLimit";

const DOCUMENT_FOOTER =
  "\n\n---\nBu belge HukukAI yapay zeka platformu tarafından oluşturulmuştur. Taslak niteliğinde olup genel bilgi amaçlıdır. Resmi makamlara sunmadan veya hukuki işlemde kullanmadan önce mutlaka bir avukata danışınız. HukukAI bu belgenin kullanımından doğabilecek hukuki sonuçlardan sorumlu değildir.\n---";

function ensureFooter(content: string): string {
  const oldShort = "Bu belge HukukAI tarafından oluşturulmuştur.";
  const hasNewFooter = content.includes("Resmi makamlara sunmadan");
  if (hasNewFooter) return content;
  let clean = content.replace(new RegExp(oldShort.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), "").trimEnd();
  return clean + DOCUMENT_FOOTER;
}

function buildFallbackDocument(docName: string, formData: Record<string, string>): string {
  const tarih = new Date().toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" });
  const bilgiler = Object.values(formData).filter(Boolean).join(", ");
  const lines = [
    docName.toUpperCase(),
    "",
    `Tarih: ${tarih}`,
    "",
    `Bilgiler: ${bilgiler || "-"}`,
    "",
    "Talep/İçerik: Yukarıdaki bilgilere göre ilgili makamlarca değerlendirilmesini saygıyla arz ederim.",
    "",
    "İmza",
    "",
    "---",
    "Bu belge HukukAI yapay zeka platformu tarafından oluşturulmuştur. Taslak niteliğinde olup genel bilgi amaçlıdır. Resmi makamlara sunmadan veya hukuki işlemde kullanmadan önce mutlaka bir avukata danışınız. HukukAI bu belgenin kullanımından doğabilecek hukuki sonuçlardan sorumlu değildir.",
    "---",
  ];
  return lines.join("\n");
}

export async function POST(request: NextRequest) {
  const limit = checkRateLimit(request);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Çok fazla istek. Lütfen biraz bekleyip tekrar deneyin." },
      { status: 429, headers: limit.retryAfter ? { "Retry-After": String(limit.retryAfter) } : undefined }
    );
  }

  try {
    const { docType, formData } = await request.json();

    if (!docType || !formData) {
      return NextResponse.json(
        { error: "docType ve formData gerekli" },
        { status: 400 }
      );
    }

    const docName = DOC_NAMES[docType] ?? docType;
    const template = DOCUMENT_TEMPLATES.find((t) => t.type === docType);
    const fieldLabels: Record<string, string> = {};
    template?.fields.forEach((f) => {
      fieldLabels[f.id] = f.label;
    });

    let content: string;
    try {
      const timeoutMs = 45000;
      content = await Promise.race([
        generateDocument(docType, docName, formData, fieldLabels),
        new Promise<string>((_, reject) =>
          setTimeout(() => reject(new Error("Zaman aşımı")), timeoutMs)
        ),
      ]);
    } catch (err) {
      console.error("Document API (fallback):", err);
      content = buildFallbackDocument(docName, formData);
    }

    content = ensureFooter(content);
    return NextResponse.json({ content });
  } catch (error) {
    console.error("Document API hatası:", error);
    return NextResponse.json(
      { error: "Belge oluşturulurken bir hata oluştu." },
      { status: 500 }
    );
  }
}
