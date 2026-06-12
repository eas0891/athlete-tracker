import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const log = await prisma.trainingLog.create({
      data: {
        athleteId: body.athleteId,
        trainingTypeId: body.trainingTypeId,
        date: new Date(body.date),
        activity: body.activity || null,
        durationMins: body.durationMins ? parseInt(body.durationMins) : null,
        intensity: body.intensity ? parseInt(body.intensity) : null,
        notes: body.notes || null,
      },
    });
    return NextResponse.json(log, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to save training log" }, { status: 500 });
  }
}
