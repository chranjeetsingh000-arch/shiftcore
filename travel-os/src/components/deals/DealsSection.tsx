"use client";

import { useState, useMemo } from "react";
import { DEALS } from "@/lib/data";
import type { DealType } from "@/lib/data";
import DealCard from "./DealCard";

const FILTER_TYPES: { value: "all" | DealType; label: string; icon: string }[] =
  [
    { value: "all", label: "All Deals", icon: "🎯" },
    { value: "flight", label: "Flights", icon: "✈️" },
    { value: "hotel", label: "Hotels", icon: "🏨" },
    { value: "train", label: "Trains", icon: "🚄" },
    { value: "package", label: "Packages", icon: "🌴" },
    { value: "voucher", label: "Vouchers", icon: "🎫" },
  ];

const ORIGIN_FILTERS = [
  { value: "all", label: "Anywhere" },
  { value: "LHR", label: "London" },
  { value: "MAN", label: "Manchester" },
  { value: "EDI", label: "Edinburgh" },
];

export default function DealsSection() {
  const [typeFilter, setTypeFilter] = useState<"all" | DealType>("all");
  const [originFilter, setOriginFilter] = useState("all");
  const [liveOnly, setLiveOnly] = useState(false);

  const filtered = useMemo(() => {
    return DEALS.filter((deal) => {
      if (typeFilter !== "all" && deal.dealType !== typeFilter) return false;
      if (liveOnly && deal.status !== "LIVE") return false;
      if (
        originFilter !== "all" &&
        deal.originCodes.length > 0 &&
        !deal.originCodes.includes(originFilter)
      )
        return false;
      return true;
    });
  }, [typeFilter, originFilter, liveOnly]);

  const liveCount = DEALS.filter((d) => d.status === "LIVE").length;

  return (
    <section id="deals" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-2">
              Verified Deals
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900">
              Live Travel Deals
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              <span className="text-violet-600 font-bold">{liveCount}</span>{" "}
              deals verified right now · Updated every 15 minutes
            </p>
          </div>
          <a
            href="#community"
            className="text-sm font-semibold text-violet-600 hover:text-violet-500 transition-colors"
          >
            + Submit a deal →
          </a>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          {/* Type pills */}
          <div className="flex gap-2 flex-wrap">
            {FILTER_TYPES.map((f) => (
              <button
                key={f.value}
                onClick={() => setTypeFilter(f.value)}
                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all ${
                  typeFilter === f.value
                    ? "border-violet-400 bg-violet-50 text-violet-600"
                    : "border-gray-300 bg-white text-gray-500 hover:border-gray-400 hover:text-gray-700"
                }`}
              >
                <span>{f.icon}</span>
                {f.label}
              </button>
            ))}
          </div>

          {/* Origin select */}
          <select
            value={originFilter}
            onChange={(e) => setOriginFilter(e.target.value)}
            className="rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-500 focus:outline-none focus:border-violet-400 focus:text-violet-600 cursor-pointer"
          >
            {ORIGIN_FILTERS.map((o) => (
              <option key={o.value} value={o.value} className="bg-gray-50">
                {o.label}
              </option>
            ))}
          </select>

          {/* Live only toggle */}
          <button
            onClick={() => setLiveOnly(!liveOnly)}
            className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all ${
              liveOnly
                ? "border-violet-400 bg-violet-50 text-violet-600"
                : "border-gray-300 bg-white text-gray-500 hover:border-gray-400"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${liveOnly ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`}
            />
            Live only
          </button>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-lg font-semibold text-gray-700 mb-2">
              No deals match your filters
            </p>
            <p className="text-sm text-gray-400">
              Try adjusting filters or check back soon — deals update every 15
              minutes.
            </p>
            <button
              onClick={() => {
                setTypeFilter("all");
                setOriginFilter("all");
                setLiveOnly(false);
              }}
              className="mt-4 text-sm text-violet-600 hover:text-violet-500 underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Load more CTA */}
        {filtered.length > 0 && (
          <div className="mt-10 text-center">
            <p className="text-sm text-gray-400 mb-4">
              Showing {filtered.length} of 500+ verified deals
            </p>
            <button className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:border-gray-400 hover:text-gray-900 transition-all">
              Load More Deals
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
