import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });
  }

  const { id } = await params;
  const userId = (session.user as { id?: string }).id;
  if (!userId) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
  }

  const chat = await prisma.chat.findFirst({
    where: { id, userId },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });

  if (!chat) {
    return NextResponse.json({ error: "Sohbet bulunamadı" }, { status: 404 });
  }

  return NextResponse.json({
    id: chat.id,
    title: chat.title,
    favorite: chat.favorite,
    messages: chat.messages.map((m) => ({ role: m.role, content: m.content })),
  });
}
