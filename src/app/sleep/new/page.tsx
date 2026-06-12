"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Athlete = { id: string; name: string };

export default function NewSleepLogPage() {
  const router = useRouter();
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/athlete").then((r) => r.json()).then(setAthletes);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const data = {
      athleteId: form.get("athleteId"),
      date: form.get("date"),
      bedtime: form.get("bedtime"),
      wakeTime: form.get("wakeTime"),
      qualityRating: form.get("qualityRating"),
      notes: form.get("notes"),
      noScreens90Min: form.get("noScreens90Min") === "on",
      noMealsBeforeBed: form.get("noMealsBeforeBed") === "on",
      asleepBy10pm: form.get("asleepBy10pm") === "on",
      magnesiumTaken: form.get("magnesiumTaken") === "on",
    };

    const res = await fetch("/api/sleep", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/sleep");
    } else {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Log Sleep</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Athlete</label>
          <select name="athleteId" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400">
            <option value="">— Select athlete —</option>
            {athletes.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input name="date" type="date" required defaultValue={new Date().toISOString().split("T")[0]}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bedtime</label>
            <input name="bedtime" type="time" required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Wake Time</label>
            <input name="wakeTime" type="time" required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sleep Quality (1–10)</label>
          <input name="qualityRating" type="number" min="1" max="10" placeholder="e.g. 8"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">Sleep Hygiene Checklist</p>
          <div className="space-y-2">
            {[
              { name: "noScreens90Min", label: "No screens 90 minutes before bed" },
              { name: "noMealsBeforeBed", label: "No meals / very low carb before bed" },
              { name: "asleepBy10pm", label: "Asleep by 10pm" },
              { name: "magnesiumTaken", label: "Magnesium taken before bed" },
            ].map((item) => (
              <label key={item.name} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name={item.name}
                  className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-400" />
                <span className="text-sm text-gray-700">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea name="notes" rows={2} placeholder="Any notes about this night..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" disabled={loading}
          className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition-colors font-medium disabled:opacity-50">
          {loading ? "Saving..." : "Save Sleep Log"}
        </button>
      </form>
    </div>
  );
}
