"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const POPULAR_DESTINATIONS = [
  "London", "Paris", "Barcelona", "Rome", "Amsterdam", "Lisbon",
  "Tokyo", "New York", "Dubai", "Bangkok", "Bali", "Sydney",
];

const POPULAR_ROUTES = [
  { from: "London", to: "Paris" },
  { from: "Manchester", to: "Barcelona" },
  { from: "Edinburgh", to: "Amsterdam" },
  { from: "London", to: "New York" },
  { from: "Birmingham", to: "Rome" },
  { from: "Bristol", to: "Lisbon" },
];

const STATS = [
  { value: "500+", label: "Live verified deals" },
  { value: "£340", label: "Avg saved per trip" },
  { value: "94%", label: "Deal accuracy" },
  { value: "12K+", label: "Members" },
];

export default function Hero() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (origin) params.set("origin", origin);
    if (destination) params.set("destination", destination);
    router.push(`/deals?${params}`);
  };

  return (
    <section className="bg-white pt-10 pb-0">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 leading-tight mb-3">
            Never Overpay
            <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent"> For Travel Again</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Verified deals, hidden fee detection &amp; AI savings — in one platform.
          </p>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-2 p-2 rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100">
            <div className="flex-1 flex items-center gap-2 px-3">
              <span className="text-gray-400">📍</span>
              <input
                type="text"
                placeholder="From — city or airport"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="flex-1 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
              />
            </div>
            <div className="hidden sm:flex items-center text-gray-200 text-xl">|</div>
            <div className="flex-1 flex items-center gap-2 px-3">
              <span className="text-gray-400">🏁</span>
              <input
                type="text"
                placeholder="To — city or destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="flex-1 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 px-6 py-3 text-sm font-bold text-white shadow-md shadow-violet-200 hover:shadow-violet-300 transition-all hover:scale-105 whitespace-nowrap"
            >
              Find Deals →
            </button>
          </div>
        </form>

        {/* Stats row */}
        <div className="flex flex-wrap items-center justify-center gap-8 mb-10 pb-6 border-b border-gray-100">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-black text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Popular routes */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span>🔥</span> Popular routes right now
          </p>
          <div className="flex flex-wrap gap-2">
            {POPULAR_ROUTES.map((r) => (
              <Link
                key={`${r.from}-${r.to}`}
                href={`/deals?origin=${encodeURIComponent(r.from)}&destination=${encodeURIComponent(r.to)}`}
                className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-700 hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50 transition-all shadow-sm"
              >
                {r.from} → {r.to}
              </Link>
            ))}
          </div>
        </div>

        {/* Popular destinations */}
        <div className="mb-0 pb-10">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span>❤️</span> Popular destinations
          </p>
          <div className="flex flex-wrap gap-2">
            {POPULAR_DESTINATIONS.map((dest) => (
              <Link
                key={dest}
                href={`/deals?destination=${encodeURIComponent(dest)}`}
                className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-700 hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50 transition-all shadow-sm"
              >
                {dest}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
