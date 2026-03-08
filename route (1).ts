import { NextRequest, NextResponse } from "next/server";
import { generateDocument } from "@/lib/openai";

export async function POST(request: NextRequest) {
  try {
    const { docType, docName, formData } = await request.json();

    if (!docType || !docName || !formData) {
      return NextResponse.json(
        { error: "Eksik bilgi. Belge tipi, adı ve form verileri gerekli." },
        { status: 400 }
      );
    }

    const content = await generateDocument(docType, docName, formData);

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Document API hatası:", error);
    return NextResponse.json(
      { error: "Belge oluşturulurken hata oluştu." },
      { status: 500 }
    );
  }
}
