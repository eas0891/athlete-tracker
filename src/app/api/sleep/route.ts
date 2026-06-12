import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const date = new Date(body.date);

    // Combine the date with the time inputs to build full DateTime values
    const bedtime = new Date(`${body.date}T${body.bedtime}`);
    let wakeTime = new Date(`${body.date}T${body.wakeTime}`);

    // If wake time is before bedtime, it crossed midnight — add a day
    if (wakeTime <= bedtime) {
      wakeTime.setDate(wakeTime.getDate() + 1);
    }

    const log = await prisma.sleepLog.create({
      data: {
        athleteId: body.athleteId,
        date,
        bedtime,
        wakeTime,
        qualityRating: body.qualityRating ? parseInt(body.qualityRating) : null,
        notes: body.notes || null,
        noScreens90Min: body.noScreens90Min ?? false,
        noMealsBeforeBed: body.noMealsBeforeBed ?? false,
        asleepBy10pm: body.asleepBy10pm ?? false,
        magnesiumTaken: body.magnesiumTaken ?? false,
      },
    });

    return NextResponse.json(log, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to save sleep log" }, { status: 500 });
  }
}
