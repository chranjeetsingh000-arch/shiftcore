"use client";

import { useState } from "react";

type SubmissionType = "deal" | "hack" | "voucher" | "scam" | "price";

const SUBMISSION_TYPES: {
  value: SubmissionType;
  label: string;
  icon: string;
  desc: string;
}[] = [
  {
    value: "deal",
    label: "Travel Deal",
    icon: "✈️",
    desc: "A flight, hotel, or package deal you found",
  },
  {
    value: "hack",
    label: "Travel Hack",
    icon: "💡",
    desc: "A money-saving strategy or booking trick",
  },
  {
    value: "voucher",
    label: "Voucher Code",
    icon: "🎫",
    desc: "A working promo code for a travel merchant",
  },
  {
    value: "scam",
    label: "Scam Alert",
    icon: "⚠️",
    desc: "A tourist scam or trap at a destination",
  },
  {
    value: "price",
    label: "Price Report",
    icon: "💰",
    desc: "Report what you paid for a flight or hotel",
  },
];

const LEADERBOARD = [
  {
    rank: 1,
    name: "DealHunter_Maya",
    tier: "Travel Expert",
    points: 4820,
    deals: 312,
    badge: "🏆",
  },
  {
    rank: 2,
    name: "FlightWatch_UK",
    tier: "Travel Expert",
    points: 3910,
    deals: 241,
    badge: "🥈",
  },
  {
    rank: 3,
    name: "TrainDeals_EU",
    tier: "Deal Hunter",
    points: 2650,
    deals: 189,
    badge: "🥉",
  },
  {
    rank: 4,
    name: "TransatDeals",
    tier: "Deal Hunter",
    points: 1890,
    deals: 147,
    badge: "⭐",
  },
  {
    rank: 5,
    name: "HotelHunter_Priya",
    tier: "Deal Hunter",
    points: 1540,
    deals: 98,
    badge: "⭐",
  },
];

const TIER_COLORS: Record<string, string> = {
  "Travel Expert": "text-amber-400",
  "Deal Hunter": "text-violet-600",
  "Verified Traveler": "text-violet-600",
  Newcomer: "text-gray-500",
};

export default function CommunitySection() {
  const [activeType, setActiveType] = useState<SubmissionType>("deal");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    url: "",
    origin: "",
    destination: "",
    price: "",
    code: "",
    location: "",
    category: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="community" className="py-20 sm:py-28 border-t border-gray-200/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-3">
            Community Intelligence
          </p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 mb-4">
            You know something. Share it.
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Every deal you submit, every scam you report, every hack you share
            makes Travel OS smarter for everyone. Earn reputation points and
            unlock contributor tiers.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Submission form — 2 cols */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="rounded-2xl border border-violet-200 bg-violet-50 p-10 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl font-black text-violet-600 mb-2">
                  Submission received!
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Your contribution is in the verification queue. Our AI agent
                  will review it shortly, and community members can confirm it.
                  You&apos;ll earn reputation points once verified.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      title: "",
                      description: "",
                      url: "",
                      origin: "",
                      destination: "",
                      price: "",
                      code: "",
                      location: "",
                      category: "",
                    });
                  }}
                  className="rounded-xl border border-emerald-500/40 bg-violet-50 px-6 py-2.5 text-sm font-semibold text-violet-600 hover:bg-emerald-500/20 transition-all"
                >
                  Submit another
                </button>
              </div>
            ) : (
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-5">
                  Submit a contribution
                </h3>

                {/* Type selector */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
                  {SUBMISSION_TYPES.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setActiveType(type.value)}
                      className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all ${
                        activeType === type.value
                          ? "border-violet-400 bg-violet-50 text-violet-600"
                          : "border-gray-300 bg-gray-50 text-gray-500 hover:border-gray-400"
                      }`}
                    >
                      <span className="text-xl">{type.icon}</span>
                      <span className="text-[10px] font-semibold leading-tight">
                        {type.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Context hint */}
                <div className="rounded-lg bg-gray-50 border border-gray-300/50 px-3.5 py-2.5 mb-5">
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold text-gray-700">
                      {SUBMISSION_TYPES.find((t) => t.value === activeType)?.icon}{" "}
                      {SUBMISSION_TYPES.find((t) => t.value === activeType)?.label}:
                    </span>{" "}
                    {SUBMISSION_TYPES.find((t) => t.value === activeType)?.desc}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Common: Title */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                      {activeType === "scam" ? "Scam description" : "Title"}
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                      placeholder={
                        activeType === "deal"
                          ? "e.g. London → Tokyo from £489 return"
                          : activeType === "hack"
                            ? "e.g. Book Eurostar 90 days ahead for 40% off"
                            : activeType === "voucher"
                              ? "e.g. Booking.com 15% off code — SAVE15"
                              : activeType === "scam"
                                ? "e.g. Taxi overcharge at Bangkok Airport"
                                : "e.g. London to New York, September"
                      }
                      required
                      className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-400"
                    />
                  </div>

                  {/* Conditional fields */}
                  {(activeType === "deal" || activeType === "price") && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                          Origin
                        </label>
                        <input
                          type="text"
                          value={form.origin}
                          onChange={(e) =>
                            setForm({ ...form, origin: e.target.value })
                          }
                          placeholder="e.g. London LHR"
                          className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                          Destination
                        </label>
                        <input
                          type="text"
                          value={form.destination}
                          onChange={(e) =>
                            setForm({ ...form, destination: e.target.value })
                          }
                          placeholder="e.g. Tokyo NRT"
                          className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-400"
                        />
                      </div>
                    </div>
                  )}

                  {(activeType === "deal" || activeType === "price") && (
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                        Price (£ or €)
                      </label>
                      <input
                        type="number"
                        value={form.price}
                        onChange={(e) =>
                          setForm({ ...form, price: e.target.value })
                        }
                        placeholder="e.g. 489"
                        className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-400"
                      />
                    </div>
                  )}

                  {activeType === "voucher" && (
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                        Voucher Code
                      </label>
                      <input
                        type="text"
                        value={form.code}
                        onChange={(e) =>
                          setForm({ ...form, code: e.target.value })
                        }
                        placeholder="e.g. SAVE15"
                        className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-sm font-mono text-violet-600 placeholder-gray-400 focus:outline-none focus:border-violet-400 uppercase"
                      />
                    </div>
                  )}

                  {activeType === "scam" && (
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                        Location
                      </label>
                      <input
                        type="text"
                        value={form.location}
                        onChange={(e) =>
                          setForm({ ...form, location: e.target.value })
                        }
                        placeholder="e.g. Bangkok, Suvarnabhumi Airport"
                        className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-400"
                      />
                    </div>
                  )}

                  {/* URL (not required for scam/price) */}
                  {activeType !== "scam" && activeType !== "price" && (
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                        Booking / Source URL
                      </label>
                      <input
                        type="url"
                        value={form.url}
                        onChange={(e) =>
                          setForm({ ...form, url: e.target.value })
                        }
                        placeholder="https://..."
                        className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-400"
                      />
                    </div>
                  )}

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                      Details / Notes
                    </label>
                    <textarea
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                      rows={3}
                      placeholder="Add any conditions, tips, or context that other travelers should know..."
                      className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-400 resize-none"
                    />
                  </div>

                  {/* Disclaimer */}
                  <p className="text-[11px] text-gray-400">
                    By submitting, you confirm this information is accurate to
                    your knowledge. Submissions are reviewed by our AI agent and
                    community before publication.
                  </p>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition-all hover:shadow-violet-200 hover:scale-[1.02]"
                  >
                    Submit Contribution →
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Leaderboard + Tiers */}
          <div className="space-y-5">
            {/* Leaderboard */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-4">
                🏆 Top Contributors
              </h3>
              <div className="space-y-3">
                {LEADERBOARD.map((user) => (
                  <div key={user.rank} className="flex items-center gap-3">
                    <span className="text-lg w-6 text-center">
                      {user.badge}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {user.name}
                      </p>
                      <p
                        className={`text-[10px] font-semibold ${TIER_COLORS[user.tier]}`}
                      >
                        {user.tier}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-700 tabular-nums">
                        {user.points.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-gray-400">pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tier breakdown */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-4">
                📊 Contributor Tiers
              </h3>
              <div className="space-y-3">
                {[
                  { tier: "Newcomer", range: "0–99 pts", color: "bg-slate-600", perks: "View all content" },
                  { tier: "Verified Traveler", range: "100–499 pts", color: "bg-emerald-600", perks: "Submit + vote" },
                  { tier: "Deal Hunter", range: "500–1,999 pts", color: "bg-cyan-600", perks: "Elevated trust weight" },
                  { tier: "Travel Expert", range: "2,000+ pts", color: "bg-amber-600", perks: "Moderator privileges" },
                ].map((t) => (
                  <div key={t.tier} className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 h-3 w-3 rounded-full flex-shrink-0 ${t.color}`}
                    />
                    <div>
                      <p className="text-xs font-bold text-gray-700">
                        {t.tier}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {t.range} · {t.perks}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent activity */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-4">
                ⚡ Recent Activity
              </h3>
              <div className="space-y-3">
                {[
                  { action: "Deal verified", user: "Maya", detail: "LHR → NRT £489", time: "2m" },
                  { action: "New hack posted", user: "James", detail: "Avios sweet spot EU", time: "8m" },
                  { action: "Scam reported", user: "Priya", detail: "Rome taxi scam", time: "15m" },
                  { action: "Code confirmed", user: "Carlos", detail: "GENIUS20 — Booking.com", time: "23m" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-700">
                        <span className="font-semibold">{item.user}</span>{" "}
                        {item.action.toLowerCase()}
                      </p>
                      <p className="text-[10px] text-gray-400 truncate">
                        {item.detail}
                      </p>
                    </div>
                    <span className="text-[10px] text-gray-400 flex-shrink-0">
                      {item.time} ago
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
