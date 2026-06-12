import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function TrainingPage() {
  const athletes = await prisma.athlete.findMany({ orderBy: { name: "asc" } });
  const logs = await prisma.trainingLog.findMany({
    orderBy: { date: "desc" },
    take: 20,
    include: { athlete: true, trainingType: true },
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Training</h1>
        <div className="flex gap-2">
          <Link href="/training/types" className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            Manage Types
          </Link>
          {athletes.length > 0 && (
            <Link href="/training/new" className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium">
              + Log Training
            </Link>
          )}
        </div>
      </div>

      {athletes.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500 mb-4">Add an athlete first before logging training.</p>
          <Link href="/athlete/new" className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium">
            Add Athlete
          </Link>
        </div>
      ) : logs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500 mb-4">No training logs yet.</p>
          <Link href="/training/new" className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium">
            Log first session
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-xs text-gray-400 uppercase">
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-left px-4 py-3">Athlete</th>
                <th className="text-left px-4 py-3">Type</th>
                <th className="text-left px-4 py-3">Activity</th>
                <th className="text-left px-4 py-3">Duration</th>
                <th className="text-left px-4 py-3">Intensity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.map((log) => (
                <tr key={log.id} className="text-gray-700 hover:bg-gray-50">
                  <td className="px-4 py-3">{new Date(log.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{log.athlete.name}</td>
                  <td className="px-4 py-3">{log.trainingType.name}</td>
                  <td className="px-4 py-3">{log.activity || "—"}</td>
                  <td className="px-4 py-3">{log.durationMins ? `${log.durationMins} min` : "—"}</td>
                  <td className="px-4 py-3">{log.intensity ? `${log.intensity}/10` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
