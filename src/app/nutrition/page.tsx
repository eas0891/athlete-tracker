import Link from "next/link";

export default function NutritionPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Nutrition</h1>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[
          { href: "/nutrition/log", label: "Daily Log", desc: "Log meals and nutrients" },
          { href: "/nutrition/brands", label: "Brands", desc: "Your custom brand products" },
          { href: "/nutrition/recipes", label: "Recipes", desc: "Saved recipes like Buckwheat Pancakes" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:border-emerald-400 hover:shadow-md transition-all"
          >
            <div className="font-semibold text-gray-800">{item.label}</div>
            <div className="text-sm text-gray-500 mt-1">{item.desc}</div>
          </Link>
        ))}
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        Nutrition logging is coming next — brands, recipes, USDA food search, and full micronutrient tracking.
      </div>
    </div>
  );
}
