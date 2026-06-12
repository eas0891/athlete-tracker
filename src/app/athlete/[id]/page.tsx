import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function AthleteProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const athlete = await prisma.athlete.findUnique({
    where: { id },
    include: {
      measurements: {
        orderBy: { recordedAt: "desc" },
      },
    },
  });

  if (!athlete) notFound();

  const age = Math.floor(
    (Date.now() - new Date(athlete.birthdate).getTime()) /
      (1000 * 60 * 60 * 24 * 365.25)
  );

  const latest = athlete.measurements[0];

  // Convert decimal inches to feet/inches display
  function fmtHeight(inches: number) {
    const ft = Math.floor(inches / 12);
    const i = Math.round(inches % 12);
    return `${ft}'${i}"`;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{athlete.name}</h1>
          <p className="text-gray-500">Age {age} · Born {new Date(athlete.birthdate).toLocaleDateString()}</p>
        </div>
        <Link
          href={`/athlete/${id}/measurements/new`}
          className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium"
        >
          + Log Measurements
        </Link>
      </div>

      {/* Current Stats */}
      {latest ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Current Stats
            <span className="text-sm font-normal text-gray-400 ml-2">
              as of {new Date(latest.recordedAt).toLocaleDateString()}
            </span>
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Height", value: latest.heightIn ? fmtHeight(latest.heightIn) : "—" },
              { label: "Weight", value: latest.weightLbs ? `${latest.weightLbs} lbs` : "—" },
              { label: "Inseam", value: latest.inseamIn ? `${latest.inseamIn}"` : "—" },
              { label: "Wingspan", value: latest.wingspanIn ? `${latest.wingspanIn}"` : "—" },
              { label: "Hand Span", value: latest.handSpanIn ? `${latest.handSpanIn}"` : "—" },
              { label: "Hand Length", value: latest.handLengthIn ? `${latest.handLengthIn}"` : "—" },
              { label: "Forearm", value: latest.forearmLengthIn ? `${latest.forearmLengthIn}"` : "—" },
              { label: "Shoe Size", value: latest.shoeSize ? `${latest.shoeSize}` : "—" },
              { label: "Puberty Stage", value: latest.pubertyStage ? `Tanner ${latest.pubertyStage}` : "—" },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</div>
                <div className="text-lg font-semibold text-gray-900 mt-1">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
          <p className="text-gray-400 mb-4">No measurements logged yet.</p>
          <Link
            href={`/athlete/${id}/measurements/new`}
            className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium"
          >
            Log first measurement
          </Link>
        </div>
      )}

      {/* Measurement History */}
      {athlete.measurements.length > 1 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Measurement History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-xs text-gray-400 uppercase border-b">
                  <th className="pb-2 pr-4">Date</th>
                  <th className="pb-2 pr-4">Height</th>
                  <th className="pb-2 pr-4">Weight</th>
                  <th className="pb-2 pr-4">Wingspan</th>
                  <th className="pb-2">Shoe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {athlete.measurements.map((m) => (
                  <tr key={m.id} className="text-gray-700">
                    <td className="py-2 pr-4">{new Date(m.recordedAt).toLocaleDateString()}</td>
                    <td className="py-2 pr-4">{m.heightIn ? fmtHeight(m.heightIn) : "—"}</td>
                    <td className="py-2 pr-4">{m.weightLbs ? `${m.weightLbs} lbs` : "—"}</td>
                    <td className="py-2 pr-4">{m.wingspanIn ? `${m.wingspanIn}"` : "—"}</td>
                    <td className="py-2">{m.shoeSize ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
