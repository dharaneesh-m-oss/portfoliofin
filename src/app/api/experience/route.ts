import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const data = await prisma.experience.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const data = await prisma.experience.create({ data: body });
  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  await prisma.experience.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
