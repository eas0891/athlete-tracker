"use client";

import { useState, useEffect } from "react";

type TrainingType = { id: string; name: string };

export default function TrainingTypesPage() {
  const [types, setTypes] = useState<TrainingType[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/training-types");
    setTypes(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError("");

    const res = await fetch("/api/training-types", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim() }),
    });

    if (res.ok) {
      setName("");
      await load();
    } else {
      setError("Could not add type. It may already exist.");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Training Types</h1>

      <form onSubmit={handleAdd} className="bg-white rounded-xl border border-gray-200 p-5 flex gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Basketball, Strength, Recovery"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <button type="submit" disabled={loading}
          className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors font-medium disabled:opacity-50">
          Add
        </button>
      </form>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {types.length === 0 ? (
        <p className="text-gray-500 text-sm">No training types yet. Add some above.</p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {types.map((t) => (
            <div key={t.id} className="px-4 py-3 text-gray-800 text-sm">{t.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}
