"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

const fields = [
  { name: "heightIn", label: "Height (inches)", placeholder: "e.g. 65.5", hint: "65.5 = 5'5½\"" },
  { name: "weightLbs", label: "Weight (lbs)", placeholder: "e.g. 130" },
  { name: "inseamIn", label: "Inseam (inches)", placeholder: "e.g. 30" },
  { name: "wingspanIn", label: "Wingspan (inches)", placeholder: "e.g. 68" },
  { name: "handSpanIn", label: "Hand Span (inches)", placeholder: "e.g. 8.5" },
  { name: "handLengthIn", label: "Hand Length (inches)", placeholder: "e.g. 7" },
  { name: "forearmLengthIn", label: "Forearm Length (inches)", placeholder: "e.g. 10" },
  { name: "shoeSize", label: "Shoe Size (US)", placeholder: "e.g. 9.5" },
];

export default function NewMeasurementPage() {
  const router = useRouter();
  const params = useParams();
  const athleteId = params.id as string;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    form.forEach((value, key) => {
      if (value) data[key] = value as string;
    });

    const res = await fetch(`/api/athlete/${athleteId}/measurements`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push(`/athlete/${athleteId}`);
    } else {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Log Measurements</h1>
      <p className="text-gray-500 text-sm mb-6">Fill in as many fields as you have. All are optional except the date.</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            name="recordedAt"
            type="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {/* Measurement fields */}
        <div className="grid grid-cols-2 gap-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
                {field.hint && <span className="text-gray-400 font-normal ml-1">({field.hint})</span>}
              </label>
              <input
                name={field.name}
                type="number"
                step="0.1"
                placeholder={field.placeholder}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          ))}
        </div>

        {/* Puberty Stage */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Puberty Stage (Tanner Scale 1–5)
          </label>
          <select
            name="pubertyStage"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <option value="">— Select —</option>
            <option value="1">1 — Prepubertal</option>
            <option value="2">2 — Early puberty</option>
            <option value="3">3 — Mid puberty</option>
            <option value="4">4 — Late puberty</option>
            <option value="5">5 — Adult</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            name="notes"
            rows={2}
            placeholder="Any notes about this measurement..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition-colors font-medium disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Measurements"}
        </button>
      </form>
    </div>
  );
}
