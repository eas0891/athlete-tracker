import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const types = await prisma.trainingType.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(types);
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    const type = await prisma.trainingType.create({ data: { name } });
    return NextResponse.json(type, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create type" }, { status: 500 });
  }
}
