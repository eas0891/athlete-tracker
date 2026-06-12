import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AthletePage() {
  const athletes = await prisma.athlete.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      measurements: {
        orderBy: { recordedAt: "desc" },
        take: 1,
      },
    },
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Athletes</h1>
        <Link
          href="/athlete/new"
          className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium"
        >
          + Add Athlete
        </Link>
      </div>

      {athletes.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500 mb-4">No athletes yet.</p>
          <Link
            href="/athlete/new"
            className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium"
          >
            Add your first athlete
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {athletes.map((athlete) => {
            const age = Math.floor(
              (Date.now() - new Date(athlete.birthdate).getTime()) /
                (1000 * 60 * 60 * 24 * 365.25)
            );
            const latest = athlete.measurements[0];
            return (
              <Link
                key={athlete.id}
                href={`/athlete/${athlete.id}`}
                className="block bg-white rounded-xl border border-gray-200 p-5 hover:border-emerald-400 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{athlete.name}</div>
                    <div className="text-sm text-gray-500">Age {age}</div>
                  </div>
                  {latest && (
                    <div className="text-right text-sm text-gray-500">
                      {latest.heightIn && <div>{latest.heightIn}" tall</div>}
                      {latest.weightLbs && <div>{latest.weightLbs} lbs</div>}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
