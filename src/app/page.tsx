import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto mt-16 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Athlete Tracker</h1>
      <p className="text-gray-500 mb-10 text-lg">
        Track sleep, nutrition, training, and growth for your young athlete.
      </p>
      <div className="grid grid-cols-2 gap-4">
        {[
          { href: "/athlete", label: "Profile & Growth", desc: "Measurements over time" },
          { href: "/sleep", label: "Sleep", desc: "Logs & hygiene checklist" },
          { href: "/training", label: "Training", desc: "Workouts & intensity" },
          { href: "/nutrition", label: "Nutrition", desc: "Meals, macros & micros" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="bg-white rounded-xl border border-gray-200 p-6 text-left hover:border-emerald-400 hover:shadow-md transition-all"
          >
            <div className="text-xl font-semibold text-gray-800">{item.label}</div>
            <div className="text-sm text-gray-500 mt-1">{item.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
