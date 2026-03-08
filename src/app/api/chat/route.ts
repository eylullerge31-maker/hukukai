import { NextRequest, NextResponse } from "next/server";
import { getChatResponse } from "@/lib/openai";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
  const limit = checkRateLimit(request);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Çok fazla istek. Lütfen biraz bekleyip tekrar deneyin." },
      { status: 429, headers: limit.retryAfter ? { "Retry-After": String(limit.retryAfter) } : undefined }
    );
  }

  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Geçersiz mesaj formatı" },
        { status: 400 }
      );
    }

    const response = await getChatResponse(messages);

    return NextResponse.json({ content: response });
  } catch (error) {
    console.error("Chat API hatası:", error);
    return NextResponse.json(
      { error: "Bir hata oluştu. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
