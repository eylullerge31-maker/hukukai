import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });
  }

  const userId = (session.user as { id?: string }).id;
  if (!userId || userId === "demo-user") {
    return NextResponse.json({ chats: [] });
  }

  const chats = await prisma.chat.findMany({
    where: { userId },
    orderBy: [{ favorite: "desc" }, { createdAt: "desc" }],
    select: { id: true, title: true, favorite: true, createdAt: true },
  });

  return NextResponse.json({
    chats: chats.map((c) => ({
      id: c.id,
      title: c.title,
      favorite: c.favorite,
      createdAt: c.createdAt.toISOString(),
    })),
  });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Kaydetmek için giriş yapın" }, { status: 401 });
  }

  const userId = (session.user as { id?: string }).id;
  if (!userId || userId === "demo-user") {
    return NextResponse.json({ error: "Demo hesabı sohbet kaydedemez" }, { status: 403 });
  }

  let body: { title?: string; messages?: { role: string; content: string }[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  const messages = body.messages ?? [];
  const title = (body.title ?? "").trim() || "Yeni Sohbet";

  if (messages.length === 0) {
    return NextResponse.json({ error: "Kaydedilecek mesaj yok" }, { status: 400 });
  }

  const chat = await prisma.chat.create({
    data: {
      userId,
      title: title.slice(0, 200),
      messages: {
        create: messages.map((m) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.content,
        })),
      },
    },
    select: { id: true, title: true },
  });

  return NextResponse.json({ ok: true, chat: { id: chat.id, title: chat.title } });
}
