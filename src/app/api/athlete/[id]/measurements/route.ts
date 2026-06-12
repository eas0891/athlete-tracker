import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// POST /api/athlete/[id]/measurements — log a new measurement snapshot
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const measurement = await prisma.measurement.create({
      data: {
        athleteId: id,
        recordedAt: body.recordedAt ? new Date(body.recordedAt) : new Date(),
        weightLbs: body.weightLbs ? parseFloat(body.weightLbs) : null,
        heightIn: body.heightIn ? parseFloat(body.heightIn) : null,
        inseamIn: body.inseamIn ? parseFloat(body.inseamIn) : null,
        wingspanIn: body.wingspanIn ? parseFloat(body.wingspanIn) : null,
        handSpanIn: body.handSpanIn ? parseFloat(body.handSpanIn) : null,
        handLengthIn: body.handLengthIn ? parseFloat(body.handLengthIn) : null,
        forearmLengthIn: body.forearmLengthIn ? parseFloat(body.forearmLengthIn) : null,
        shoeSize: body.shoeSize ? parseFloat(body.shoeSize) : null,
        pubertyStage: body.pubertyStage ? parseInt(body.pubertyStage) : null,
        notes: body.notes || null,
      },
    });

    return NextResponse.json(measurement, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to save measurement" }, { status: 500 });
  }
}
