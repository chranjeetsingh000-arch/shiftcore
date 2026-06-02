"use client";

import { useState } from "react";

interface LoyaltyProgram {
  id: string;
  name: string;
  icon: string;
  type: "airline" | "hotel" | "card";
  points: number;
  tier: string;
  tierColor: string;
  pointValue: number; // £ per point
  expiryDate?: string;
  transferPartners: string[];
  transferBonus?: string;
}

const PROGRAMS: LoyaltyProgram[] = [
  {
    id: "avios",
    name: "British Airways Avios",
    icon: "✈",
    type: "airline",
    points: 42500,
    tier: "Silver",
    tierColor: "text-slate-300",
    pointValue: 0.01,
    expiryDate: "Dec 2026",
    transferPartners: ["Iberia", "Aer Lingus", "Qatar Airways", "Finnair"],
    transferBonus: "35% bonus to Iberia until 31 Jul",
  },
  {
    id: "virgin",
    name: "Virgin Atlantic Flying Club",
    icon: "🔴",
    type: "airline",
    points: 18200,
    tier: "Red",
    tierColor: "text-red-400",
    pointValue: 0.011,
    transferPartners: ["Delta", "Air France", "KLM", "Singapore Airlines"],
  },
  {
    id: "marriott",
    name: "Marriott Bonvoy",
    icon: "🏨",
    type: "hotel",
    points: 87000,
    tier: "Gold Elite",
    tierColor: "text-amber-400",
    pointValue: 0.007,
    expiryDate: "Feb 2026",
    transferPartners: ["United", "Cathay Pacific", "Thai Airways"],
    transferBonus: "25% bonus to United this month",
  },
  {
    id: "amex",
    name: "Amex Membership Rewards",
    icon: "💳",
    type: "card",
    points: 34000,
    tier: "Preferred",
    tierColor: "text-emerald-400",
    pointValue: 0.012,
    transferPartners: ["Avios", "Virgin Atlantic", "Hilton", "Marriott"],
  },
  {
    id: "hilton",
    name: "Hilton Honors",
    icon: "🏩",
    type: "hotel",
    points: 55000,
    tier: "Gold",
    tierColor: "text-amber-400",
    pointValue: 0.005,
    transferPartners: ["Virgin Atlantic"],
  },
];

const TYPE_LABELS = { airline: "Airline", hotel: "Hotel", card: "Card" } as const;

interface AddProgramForm {
  name: string;
  points: string;
}

export default function LoyaltyTracker() {
  const [programs, setPrograms] = useState<LoyaltyProgram[]>(PROGRAMS);
  const [selected, setSelected] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState<AddProgramForm>({ name: "", points: "" });
  const [filter, setFilter] = useState<"all" | "airline" | "hotel" | "card">("all");

  const filtered = programs.filter((p) => filter === "all" || p.type === filter);
  const totalValue = programs.reduce((sum, p) => sum + p.points * p.pointValue, 0);
  const selectedProg = programs.find((p) => p.id === selected);

  const updatePoints = (id: string, delta: number) => {
    setPrograms((prev) =>
      prev.map((p) => p.id === id ? { ...p, points: Math.max(0, p.points + delta) } : p)
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-100 mb-1">Loyalty Portfolio</h1>
        <p className="text-slate-400">Track points across all your programs. Spot transfer bonuses before they expire.</p>
      </div>

      {/* Summary cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <p className="text-xs text-slate-500 mb-1">Total Portfolio Value</p>
          <p className="text-3xl font-black text-slate-100">£{totalValue.toFixed(0)}</p>
          <p className="text-xs text-slate-500 mt-1">across {programs.length} programs</p>
        </div>
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
          <p className="text-xs text-slate-500 mb-1">Active Transfer Bonuses</p>
          <p className="text-3xl font-black text-emerald-400">
            {programs.filter((p) => p.transferBonus).length}
          </p>
          <p className="text-xs text-emerald-500/70 mt-1">
            {programs.find((p) => p.transferBonus)?.transferBonus ?? "None active"}
          </p>
        </div>
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
          <p className="text-xs text-slate-500 mb-1">Expiring Soon</p>
          <p className="text-3xl font-black text-amber-400">
            {programs.filter((p) => p.expiryDate).length}
          </p>
          <p className="text-xs text-amber-500/70 mt-1">programs with expiry dates</p>
        </div>
      </div>

      {/* Filter pills + add button */}
      <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
        <div className="flex gap-2 flex-wrap">
          {(["all", "airline", "hotel", "card"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                filter === f
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600"
              }`}
            >
              {f === "all" ? "All programs" : TYPE_LABELS[f]}
            </button>
          ))}
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2 text-xs font-bold text-slate-950"
        >
          + Add Program
        </button>
      </div>

      {/* Program list */}
      <div className="space-y-3">
        {filtered.map((prog) => (
          <div
            key={prog.id}
            className={`rounded-2xl border bg-slate-900/60 p-5 cursor-pointer transition-all ${
              selected === prog.id
                ? "border-emerald-500/40"
                : "border-slate-800 hover:border-slate-700"
            }`}
            onClick={() => setSelected(selected === prog.id ? null : prog.id)}
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center text-lg flex-shrink-0">
                {prog.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-bold text-slate-200">{prog.name}</h3>
                  <span className={`text-[10px] font-bold ${prog.tierColor}`}>{prog.tier}</span>
                  {prog.transferBonus && (
                    <span className="rounded-full bg-emerald-500/15 text-emerald-400 px-2 py-0.5 text-[10px] font-bold">
                      🔥 Bonus active
                    </span>
                  )}
                  {prog.expiryDate && (
                    <span className="rounded-full bg-amber-500/15 text-amber-400 px-2 py-0.5 text-[10px] font-bold">
                      Expires {prog.expiryDate}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {TYPE_LABELS[prog.type]} · £{(prog.points * prog.pointValue).toFixed(0)} value
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xl font-black text-slate-100">
                  {prog.points.toLocaleString()}
                </p>
                <p className="text-[10px] text-slate-500">points</p>
              </div>
            </div>

            {/* Expanded detail */}
            {selected === prog.id && (
              <div className="mt-5 pt-5 border-t border-slate-800" onClick={(e) => e.stopPropagation()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 mb-2">Transfer Partners</p>
                    <div className="flex flex-wrap gap-1.5">
                      {prog.transferPartners.map((tp) => (
                        <span key={tp} className="rounded-lg bg-slate-800 border border-slate-700 px-2.5 py-1 text-xs text-slate-300">
                          {tp}
                        </span>
                      ))}
                    </div>
                    {prog.transferBonus && (
                      <p className="text-xs text-emerald-400 mt-2">🔥 {prog.transferBonus}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 mb-2">Update Balance</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updatePoints(prog.id, -1000)}
                        className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-bold text-slate-400 hover:text-slate-200"
                      >
                        −1k
                      </button>
                      <span className="flex-1 text-center text-sm font-black text-slate-200">
                        {prog.points.toLocaleString()}
                      </span>
                      <button
                        onClick={() => updatePoints(prog.id, 1000)}
                        className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-bold text-slate-400 hover:text-slate-200"
                      >
                        +1k
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 text-center">
                      Est. value: £{(prog.points * prog.pointValue).toFixed(0)} @ £{prog.pointValue}/pt
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add program modal */}
      {addOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-lg font-black text-slate-100 mb-4">Add Loyalty Program</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Program Name</label>
                <input
                  type="text"
                  placeholder="e.g. Delta SkyMiles"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Current Points Balance</label>
                <input
                  type="number"
                  placeholder="25000"
                  value={form.points}
                  onChange={(e) => setForm((f) => ({ ...f, points: e.target.value }))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => {
                  if (form.name && form.points) {
                    setPrograms((prev) => [...prev, {
                      id: `custom-${Date.now()}`,
                      name: form.name,
                      icon: "⭐",
                      type: "airline",
                      points: parseInt(form.points),
                      tier: "Member",
                      tierColor: "text-slate-400",
                      pointValue: 0.008,
                      transferPartners: [],
                    }]);
                    setForm({ name: "", points: "" });
                    setAddOpen(false);
                  }
                }}
                className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-3 text-sm font-bold text-slate-950"
              >
                Add Program
              </button>
              <button
                onClick={() => setAddOpen(false)}
                className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
