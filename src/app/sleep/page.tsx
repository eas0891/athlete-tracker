import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function SleepPage() {
  const athletes = await prisma.athlete.findMany({ orderBy: { name: "asc" } });
  const logs = await prisma.sleepLog.findMany({
    orderBy: { date: "desc" },
    take: 20,
    include: { athlete: true },
  });

  function totalHours(bedtime: Date, wakeTime: Date) {
    const diff = wakeTime.getTime() - bedtime.getTime();
    return (diff / (1000 * 60 * 60)).toFixed(1);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Sleep</h1>
        {athletes.length > 0 && (
          <Link
            href="/sleep/new"
            className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium"
          >
            + Log Sleep
          </Link>
        )}
      </div>

      {athletes.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500 mb-4">Add an athlete first before logging sleep.</p>
          <Link href="/athlete/new" className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium">
            Add Athlete
          </Link>
        </div>
      ) : logs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500 mb-4">No sleep logs yet.</p>
          <Link href="/sleep/new" className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium">
            Log first night
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-xs text-gray-400 uppercase">
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-left px-4 py-3">Athlete</th>
                <th className="text-left px-4 py-3">Hours</th>
                <th className="text-left px-4 py-3">Quality</th>
                <th className="text-left px-4 py-3">Hygiene</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.map((log) => {
                const checks = [
                  log.noScreens90Min,
                  log.noMealsBeforeBed,
                  log.asleepBy10pm,
                  log.magnesiumTaken,
                ].filter(Boolean).length;
                return (
                  <tr key={log.id} className="text-gray-700 hover:bg-gray-50">
                    <td className="px-4 py-3">{new Date(log.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{log.athlete.name}</td>
                    <td className="px-4 py-3">{totalHours(log.bedtime, log.wakeTime)}h</td>
                    <td className="px-4 py-3">{log.qualityRating ? `${log.qualityRating}/10` : "—"}</td>
                    <td className="px-4 py-3">{checks}/4</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
