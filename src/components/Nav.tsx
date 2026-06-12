import Link from "next/link";

export default function Nav() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center gap-8">
      <Link href="/" className="text-lg font-bold text-emerald-400">
        🏃 Athlete Tracker
      </Link>
      <div className="flex gap-6 text-sm">
        <Link href="/athlete" className="hover:text-emerald-400 transition-colors">
          Profile
        </Link>
        <Link href="/sleep" className="hover:text-emerald-400 transition-colors">
          Sleep
        </Link>
        <Link href="/training" className="hover:text-emerald-400 transition-colors">
          Training
        </Link>
        <Link href="/nutrition" className="hover:text-emerald-400 transition-colors">
          Nutrition
        </Link>
      </div>
    </nav>
  );
}
