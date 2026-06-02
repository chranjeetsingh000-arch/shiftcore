"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="text-base font-bold text-gray-900">{card.cardName}</h3>
          <p className="text-sm text-gray-400 mt-0.5">
            📍 {card.city}, {card.country}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-amber-400 text-sm">★</span>
          <span className="text-sm font-semibold text-gray-700">
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
                ? "border-violet-400 bg-violet-50 text-violet-600"
                : "border-gray-300 bg-white text-gray-500 hover:border-gray-400"
            }`}
          >
            {price.tier} — {curr}
            {price.price}
          </button>
        ))}
      </div>

      {/* Attraction checkboxes */}
      <div className="space-y-2 mb-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
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
                    : "border-gray-400 bg-gray-100"
                }`}
                onClick={() => toggle(i)}
              >
                {checkedAttractions[i] && (
                  <svg
                    className="h-2.5 w-2.5 text-white"
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
                className={`text-xs transition-colors ${checkedAttractions[i] ? "text-gray-700" : "text-gray-400 line-through"}`}
              >
                {attr.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {attr.included && (
                <span className="text-[9px] font-bold text-violet-600 bg-violet-50 border border-violet-200 rounded px-1.5 py-0.5">
                  INCL
                </span>
              )}
              <span className="text-xs font-semibold text-gray-500 tabular-nums">
                {curr}
                {attr.price}
              </span>
            </div>
          </label>
        ))}
      </div>

      {card.transport && (
        <div className="flex items-center gap-2 rounded-lg bg-violet-50 border border-violet-200 px-3 py-2 mb-4">
          <span className="text-xs">🚇</span>
          <span className="text-xs text-violet-600 font-medium">
            Includes unlimited public transport
          </span>
        </div>
      )}

      {/* Result */}
      <div
        className={`rounded-xl border p-4 ${worthIt ? "border-violet-200 bg-violet-50" : "border-red-500/30 bg-red-500/10"}`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-gray-500">
            Individual total
          </span>
          <span className="text-sm font-bold text-gray-700">
            {curr}
            {individualTotal}
          </span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-gray-500">Card cost</span>
          <span className="text-sm font-bold text-gray-700">
            {curr}
            {cardPrice}
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-gray-300 pt-3">
          <span
            className={`text-sm font-black ${worthIt ? "text-violet-600" : "text-red-400"}`}
          >
            {worthIt ? `✅ Save ${curr}${saving}` : `❌ Costs ${curr}${Math.abs(saving)} more`}
          </span>
          <span
            className={`text-xs font-semibold rounded-full px-2.5 py-1 ${worthIt ? "bg-violet-50 text-violet-600" : "bg-red-500/15 text-red-400"}`}
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
    <section id="tourism-cards" className="py-20 sm:py-28 border-t border-gray-200/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-3">
            Tourism Card Calculator
          </p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 mb-4">
            Is the city card worth it?
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Tick the attractions you&apos;re planning to visit. We&apos;ll tell
            you instantly whether the tourism card saves you money.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {TOURISM_CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <CardCalculator card={card} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
