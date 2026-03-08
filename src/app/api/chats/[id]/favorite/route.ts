import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
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

  let body: { favorite?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  const chat = await prisma.chat.findFirst({
    where: { id, userId },
  });
  if (!chat) {
    return NextResponse.json({ error: "Sohbet bulunamadı" }, { status: 404 });
  }

  await prisma.chat.update({
    where: { id },
    data: { favorite: body.favorite ?? !chat.favorite },
  });

  return NextResponse.json({ ok: true, favorite: body.favorite ?? !chat.favorite });
}
