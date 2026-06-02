"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const TICKER_DEALS = [
  "✈ London → Barcelona from £49",
  "🏨 Paris hotel 4★ from £62/night",
  "✈ Manchester → Rome from £38",
  "💰 12% cashback on Hotels.com today",
  "✈ Edinburgh → Amsterdam from £41",
  "🏨 Dubai resort 50% off — 3 nights left",
  "✈ Bristol → Lisbon from £35",
  "💰 Quidco 8% cashback on easyJet",
  "✈ London → New York from £289",
  "🏨 Barcelona apartment from £44/night",
];

// Duplicate for seamless loop
const ITEMS = [...TICKER_DEALS, ...TICKER_DEALS];

export default function DealsTicker() {
  return (
    <div className="bg-gradient-to-r from-violet-600 to-pink-500 py-2.5 overflow-hidden">
      <div className="flex items-center gap-4">
        <Link
          href="/deals"
          className="flex-shrink-0 ml-4 rounded-full bg-white/20 border border-white/30 px-3 py-0.5 text-[11px] font-black text-white hover:bg-white/30 transition-colors whitespace-nowrap"
        >
          LIVE DEALS
        </Link>
        <div className="flex-1 overflow-hidden relative">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-violet-600 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-pink-500 to-transparent z-10" />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-8 whitespace-nowrap"
          >
            {ITEMS.map((deal, i) => (
              <Link
                key={i}
                href="/deals"
                className="text-[12px] font-semibold text-white/90 hover:text-white transition-colors"
              >
                {deal}
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
