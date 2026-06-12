import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// POST /api/athlete — create a new athlete
export async function POST(req: Request) {
  try {
    const { name, birthdate } = await req.json();

    const athlete = await prisma.athlete.create({
      data: {
        name,
        birthdate: new Date(birthdate),
      },
    });

    return NextResponse.json(athlete, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create athlete" }, { status: 500 });
  }
}

// GET /api/athlete — list all athletes
export async function GET() {
  const athletes = await prisma.athlete.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(athletes);
}
