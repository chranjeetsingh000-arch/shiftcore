"use client";

import { useState } from "react";
import { TOURISM_CARDS } from "@/lib/data";
import type { TourismCard } from "@/lib/data";

function CardCalculator({ card }: { card: TourismCard }) {
  const [selectedTier, setSelectedTier] = useState(0);
  const [checkedAttractions, setCheckedAttractions] = useState<boolean[]>(
    card.topAttractions.map(() => true)
  );

  const toggle = (i: number) => {
    setCheckedAttractions((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  const cardPrice = card.prices[selectedTier].price;
  const curr = card.currency === "GBP" ? "£" : "€";

  const individualTotal = card.topAttractions.reduce(
    (sum, attr, i) => sum + (checkedAttractions[i] ? attr.price : 0),
    0
  );
  const saving = individualTotal - cardPrice;
  const worthIt = saving > 0;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-100">{card.cardName}</h3>
          <p className="text-sm text-slate-500 mt-0.5">
            📍 {card.city}, {card.country}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-amber-400 text-sm">★</span>
          <span className="text-sm font-semibold text-slate-300">
            {card.rating}
          </span>
        </div>
      </div>

      {/* Duration picker */}
      <div className="flex flex-wrap gap-2 mb-4">
        {card.prices.map((price, i) => (
          <button
            key={price.tier}
            onClick={() => setSelectedTier(i)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
              selectedTier === i
                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600"
            }`}
          >
            {price.tier} — {curr}
            {price.price}
          </button>
        ))}
      </div>

      {/* Attraction checkboxes */}
      <div className="space-y-2 mb-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600 mb-2">
          Select your planned attractions
        </p>
        {card.topAttractions.map((attr, i) => (
          <label
            key={attr.name}
            className="flex items-center justify-between gap-3 cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`h-4 w-4 rounded flex-shrink-0 border transition-all flex items-center justify-center ${
                  checkedAttractions[i]
                    ? "border-emerald-500 bg-emerald-500"
                    : "border-slate-600 bg-slate-800"
                }`}
                onClick={() => toggle(i)}
              >
                {checkedAttractions[i] && (
                  <svg
                    className="h-2.5 w-2.5 text-slate-950"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M2 5l2.5 2.5L8 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span
                className={`text-xs transition-colors ${checkedAttractions[i] ? "text-slate-300" : "text-slate-500 line-through"}`}
              >
                {attr.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {attr.included && (
                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded px-1.5 py-0.5">
                  INCL
                </span>
              )}
              <span className="text-xs font-semibold text-slate-400 tabular-nums">
                {curr}
                {attr.price}
              </span>
            </div>
          </label>
        ))}
      </div>

      {card.transport && (
        <div className="flex items-center gap-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-3 py-2 mb-4">
          <span className="text-xs">🚇</span>
          <span className="text-xs text-cyan-400 font-medium">
            Includes unlimited public transport
          </span>
        </div>
      )}

      {/* Result */}
      <div
        className={`rounded-xl border p-4 ${worthIt ? "border-emerald-500/30 bg-emerald-500/10" : "border-red-500/30 bg-red-500/10"}`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-400">
            Individual total
          </span>
          <span className="text-sm font-bold text-slate-300">
            {curr}
            {individualTotal}
          </span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-400">Card cost</span>
          <span className="text-sm font-bold text-slate-300">
            {curr}
            {cardPrice}
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-slate-700 pt-3">
          <span
            className={`text-sm font-black ${worthIt ? "text-emerald-400" : "text-red-400"}`}
          >
            {worthIt ? `✅ Save ${curr}${saving}` : `❌ Costs ${curr}${Math.abs(saving)} more`}
          </span>
          <span
            className={`text-xs font-semibold rounded-full px-2.5 py-1 ${worthIt ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}
          >
            {worthIt ? "Worth it!" : "Skip card"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TourismCards() {
  return (
    <section id="tourism-cards" className="py-20 sm:py-28 border-t border-slate-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400 mb-3">
            Tourism Card Calculator
          </p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-100 mb-4">
            Is the city card worth it?
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Tick the attractions you&apos;re planning to visit. We&apos;ll tell
            you instantly whether the tourism card saves you money.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {TOURISM_CARDS.map((card) => (
            <CardCalculator key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
