"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import CountUp from "@/components/ui/CountUp";

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
  { value: "12000+", label: "Members", display: "12K+" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (origin) params.set("origin", origin);
    if (destination) params.set("destination", destination);
    router.push(`/deals?${params}`);
  };

  return (
    <section className="bg-white pt-10 pb-0 overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center mb-8"
        >
          <motion.div variants={item}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700 mb-5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-500 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
              </span>
              500+ live deals verified right now
            </motion.div>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 leading-tight mb-3"
          >
            Never Overpay
            <br />
            <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
              For Travel Again
            </span>
          </motion.h1>

          <motion.p variants={item} className="text-lg text-gray-500 max-w-xl mx-auto">
            Verified deals, hidden fee detection &amp; AI savings — in one platform.
          </motion.p>
        </motion.div>

        {/* Search bar */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto mb-8"
        >
          <motion.div
            animate={focused ? { boxShadow: "0 8px 40px rgba(124,58,237,0.18)" } : { boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row gap-2 p-2 rounded-2xl border border-gray-200 bg-white"
          >
            <div className="flex-1 flex items-center gap-2 px-3">
              <span className="text-gray-400">📍</span>
              <input
                type="text"
                placeholder="From — city or airport"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
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
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="flex-1 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 px-6 py-3 text-sm font-bold text-white shadow-md shadow-violet-200 whitespace-nowrap"
            >
              Find Deals →
            </motion.button>
          </motion.div>
        </motion.form>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-8 mb-10 pb-6 border-b border-gray-100"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 + i * 0.08 }}
              className="text-center"
            >
              <div className="text-2xl font-black text-gray-900">
                <CountUp value={stat.display ?? stat.value} />
              </div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Popular routes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mb-8"
        >
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span>🔥</span> Popular routes right now
          </p>
          <div className="flex flex-wrap gap-2">
            {POPULAR_ROUTES.map((r, i) => (
              <motion.div
                key={`${r.from}-${r.to}`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.9 + i * 0.05 }}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href={`/deals?origin=${encodeURIComponent(r.from)}&destination=${encodeURIComponent(r.to)}`}
                  className="inline-block rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-700 hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50 transition-colors shadow-sm"
                >
                  {r.from} → {r.to}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Popular destinations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="pb-10"
        >
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span>❤️</span> Popular destinations
          </p>
          <div className="flex flex-wrap gap-2">
            {POPULAR_DESTINATIONS.map((dest, i) => (
              <motion.div
                key={dest}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1.05 + i * 0.04 }}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href={`/deals?destination=${encodeURIComponent(dest)}`}
                  className="inline-block rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-700 hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50 transition-colors shadow-sm"
                >
                  {dest}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
