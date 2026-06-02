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
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400 mb-2">
              Verified Deals
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-100">
              Live Travel Deals
            </h2>
            <p className="text-slate-400 mt-2 text-sm">
              <span className="text-emerald-400 font-bold">{liveCount}</span>{" "}
              deals verified right now · Updated every 15 minutes
            </p>
          </div>
          <a
            href="#community"
            className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
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
                    ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-400"
                    : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600 hover:text-slate-300"
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
            className="rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2 text-xs font-semibold text-slate-400 focus:outline-none focus:border-emerald-500/50 focus:text-emerald-400 cursor-pointer"
          >
            {ORIGIN_FILTERS.map((o) => (
              <option key={o.value} value={o.value} className="bg-slate-900">
                {o.label}
              </option>
            ))}
          </select>

          {/* Live only toggle */}
          <button
            onClick={() => setLiveOnly(!liveOnly)}
            className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all ${
              liveOnly
                ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-400"
                : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600"
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
            <p className="text-lg font-semibold text-slate-300 mb-2">
              No deals match your filters
            </p>
            <p className="text-sm text-slate-500">
              Try adjusting filters or check back soon — deals update every 15
              minutes.
            </p>
            <button
              onClick={() => {
                setTypeFilter("all");
                setOriginFilter("all");
                setLiveOnly(false);
              }}
              className="mt-4 text-sm text-emerald-400 hover:text-emerald-300 underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Load more CTA */}
        {filtered.length > 0 && (
          <div className="mt-10 text-center">
            <p className="text-sm text-slate-500 mb-4">
              Showing {filtered.length} of 500+ verified deals
            </p>
            <button className="rounded-xl border border-slate-700 bg-slate-800/50 px-6 py-3 text-sm font-semibold text-slate-300 hover:border-slate-600 hover:text-slate-100 transition-all">
              Load More Deals
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
