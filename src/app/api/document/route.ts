import { NextRequest, NextResponse } from "next/server";
import { generateDocument } from "@/lib/openai";
import { DOC_NAMES } from "@/lib/constants";
import { checkRateLimit } from "@/lib/rateLimit";

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
    "Bu belge HukukAI tarafından oluşturulmuştur.",
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

    let content: string;
    try {
      const timeoutMs = 45000;
      content = await Promise.race([
        generateDocument(docType, docName, formData),
        new Promise<string>((_, reject) =>
          setTimeout(() => reject(new Error("Zaman aşımı")), timeoutMs)
        ),
      ]);
    } catch (err) {
      console.error("Document API (fallback):", err);
      content = buildFallbackDocument(docName, formData);
    }

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Document API hatası:", error);
    return NextResponse.json(
      { error: "Belge oluşturulurken bir hata oluştu." },
      { status: 500 }
    );
  }
}
