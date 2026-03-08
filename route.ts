import { NextRequest, NextResponse } from "next/server";
import { getChatResponse } from "@/lib/openai";

export async function POST(request: NextRequest) {
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
