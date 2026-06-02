"use client";

import { useState } from "react";
import Link from "next/link";
import { DEALS } from "@/lib/data";
import DealStatusBadge from "@/components/deals/DealStatusBadge";

const MOCK_USER = {
  name: "Alex Torres",
  email: "alex@example.com",
  tier: "Explorer",
  points: 340,
  contributorTier: "Verified Traveler",
  savedDeals: ["1", "3", "5"],
  alerts: [
    { id: "1", route: "London → Barcelona", type: "flight", threshold: 60, active: true },
    { id: "2", route: "London → Tokyo", type: "flight", threshold: 500, active: true },
    { id: "3", route: "Manchester → Amsterdam", type: "flight", threshold: 90, active: false },
  ],
  loyaltyPrograms: [
    { name: "British Airways Executive Club", code: "BAEC", points: 14500, tier: "Blue", value: "~£87" },
    { name: "Marriott Bonvoy", code: "BONVOY", points: 28000, tier: "Silver", value: "~£112" },
    { name: "Flying Blue (Air France KLM)", code: "FB", points: 6200, tier: "Explorer", value: "~£56" },
  ],
  recentSavings: [
    { item: "Barcelona hotel booking", saving: 34.50, method: "8.5% TopCashback", date: "3 days ago" },
    { item: "Eurostar Paris return", saving: 18.00, method: "10% Quidco cashback", date: "1 week ago" },
    { item: "Rentalcars.com booking", saving: 22.40, method: "9% TopCashback", date: "2 weeks ago" },
  ],
};

const TABS = ["Overview", "Saved Deals", "Alerts", "Loyalty", "Savings"] as const;
type Tab = typeof TABS[number];

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>("Overview");
  const [alerts, setAlerts] = useState(MOCK_USER.alerts);

  const savedDeals = DEALS.filter((d) => MOCK_USER.savedDeals.includes(d.id));
  const totalSaved = MOCK_USER.recentSavings.reduce((s, r) => s + r.saving, 0);
  const totalLoyaltyValue = MOCK_USER.loyaltyPrograms.reduce((s, p) => s + parseInt(p.value.replace(/[^0-9]/g, "")), 0);

  const toggleAlert = (id: string) => {
    setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, active: !a.active } : a));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
        <div>
          <p className="text-sm text-slate-500 mb-1">Welcome back</p>
          <h1 className="text-3xl font-black text-slate-100">
            {MOCK_USER.name}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-400">
              {MOCK_USER.tier} Plan
            </span>
            <span className="rounded-full bg-slate-800 border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-400">
              {MOCK_USER.contributorTier} · {MOCK_USER.points} pts
            </span>
          </div>
        </div>
        <Link
          href="/#deals"
          className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2.5 text-sm font-bold text-slate-950"
        >
          Browse Deals →
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Saved", value: `£${totalSaved.toFixed(2)}`, sub: "last 30 days", color: "text-emerald-400" },
          { label: "Loyalty Value", value: `~£${totalLoyaltyValue}`, sub: "across all programs", color: "text-cyan-400" },
          { label: "Saved Deals", value: `${MOCK_USER.savedDeals.length}`, sub: "in your list", color: "text-slate-100" },
          { label: "Active Alerts", value: `${alerts.filter((a) => a.active).length}`, sub: "routes monitored", color: "text-amber-400" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
            <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-slate-600 mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-800 mb-6 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
              tab === t
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "Overview" && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent savings */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="text-sm font-bold text-slate-200 mb-4">
              💰 Recent Savings
            </h3>
            <div className="space-y-3">
              {MOCK_USER.recentSavings.map((s, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-800/60 last:border-0">
                  <div>
                    <p className="text-sm text-slate-300 font-medium">{s.item}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{s.method} · {s.date}</p>
                  </div>
                  <span className="text-sm font-black text-emerald-400">+£{s.saving.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active alerts */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-200">
                🔔 Active Alerts
              </h3>
              <Link href="#" className="text-xs text-emerald-400 hover:text-emerald-300">
                + Add alert
              </Link>
            </div>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center gap-3 py-2 border-b border-slate-800/60 last:border-0">
                  <div className="flex-1">
                    <p className="text-sm text-slate-300 font-medium">{alert.route}</p>
                    <p className="text-xs text-slate-500">
                      Alert when below £{alert.threshold}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleAlert(alert.id)}
                    className={`relative h-5 w-9 rounded-full transition-colors flex-shrink-0 ${alert.active ? "bg-emerald-500" : "bg-slate-700"}`}
                  >
                    <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${alert.active ? "left-4" : "left-0.5"}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Upgrade prompt if on free */}
          <div className="lg:col-span-2 rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 p-5 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm font-bold text-emerald-400 mb-1">
                Upgrade to Premium for £9.99/mo
              </p>
              <p className="text-xs text-slate-400">
                Unlock the Booking Path Optimizer, Loyalty Portfolio Sync, and AI Travel Planner.
              </p>
            </div>
            <Link
              href="/#pricing"
              className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2.5 text-sm font-bold text-slate-950 flex-shrink-0"
            >
              Upgrade →
            </Link>
          </div>
        </div>
      )}

      {tab === "Saved Deals" && (
        <div>
          {savedDeals.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">🔖</div>
              <p className="text-slate-400">No saved deals yet.</p>
              <Link href="/#deals" className="mt-3 inline-block text-sm text-emerald-400 underline">
                Browse deals
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedDeals.map((deal) => (
                <Link key={deal.id} href={`/deals/${deal.id}`} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-slate-700 hover:bg-slate-900 transition-all block">
                  <div className="flex items-center gap-2 mb-2">
                    <DealStatusBadge status={deal.status} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-200 mb-1">{deal.title}</h3>
                  <p className="text-xl font-black text-emerald-400">
                    {deal.currency === "GBP" ? "£" : "€"}{deal.priceFrom.toLocaleString()}
                  </p>
                  {deal.expiresIn && (
                    <p className="text-xs text-amber-400 mt-1.5">⏱ {deal.expiresIn}</p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "Alerts" && (
        <div className="max-w-2xl">
          <div className="space-y-3 mb-6">
            {alerts.map((alert) => (
              <div key={alert.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-200">{alert.route}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    ✈️ Flight · Alert below £{alert.threshold}
                  </p>
                </div>
                <button
                  onClick={() => toggleAlert(alert.id)}
                  className={`relative h-6 w-11 rounded-full transition-colors flex-shrink-0 ${alert.active ? "bg-emerald-500" : "bg-slate-700"}`}
                >
                  <div className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${alert.active ? "left-6" : "left-1"}`} />
                </button>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="text-sm font-bold text-slate-200 mb-4">+ New Alert</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="Origin (e.g. London)"
                className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50"
              />
              <input
                type="text"
                placeholder="Destination (e.g. Tokyo)"
                className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Max price £"
                className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50"
              />
              <button className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2.5 text-sm font-bold text-slate-950">
                Create Alert
              </button>
            </div>
          </div>
        </div>
      )}

      {tab === "Loyalty" && (
        <div className="max-w-2xl space-y-4">
          {MOCK_USER.loyaltyPrograms.map((prog) => (
            <div key={prog.code} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-bold text-slate-200">{prog.name}</p>
                  <span className="text-xs text-slate-500">{prog.tier} status</span>
                </div>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400">
                  {prog.value}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-black text-slate-100">
                    {prog.points.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500">points balance</p>
                </div>
                <button className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-400 hover:border-emerald-500/40 hover:text-emerald-400 transition-all">
                  Sync Balance
                </button>
              </div>
            </div>
          ))}
          <div className="rounded-2xl border border-dashed border-slate-700 p-5 text-center">
            <button className="text-sm font-semibold text-slate-400 hover:text-emerald-400 transition-colors">
              + Add Loyalty Program
            </button>
          </div>
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
            <p className="text-xs font-semibold text-amber-400 mb-1">⚡ Transfer Bonus Alert</p>
            <p className="text-sm text-slate-300">Amex → Avios: 30% transfer bonus active until March 31. Transfer now to maximise your Avios balance.</p>
          </div>
        </div>
      )}

      {tab === "Savings" && (
        <div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-200">All Savings</h3>
              <span className="text-lg font-black text-emerald-400">£{totalSaved.toFixed(2)} saved</span>
            </div>
            <div className="space-y-3">
              {MOCK_USER.recentSavings.map((s, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-slate-800/60 last:border-0">
                  <div>
                    <p className="text-sm text-slate-300 font-semibold">{s.item}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{s.method} · {s.date}</p>
                  </div>
                  <span className="text-sm font-black text-emerald-400">+£{s.saving.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
              Savings by method
            </p>
            {[
              { method: "TopCashback", amount: 56.90, count: 4 },
              { method: "Quidco", amount: 18.00, count: 1 },
              { method: "Voucher codes", amount: 12.50, count: 2 },
            ].map((row) => (
              <div key={row.method} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">{row.method}</span>
                  <span className="text-slate-300 font-semibold">£{row.amount}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                    style={{ width: `${(row.amount / 87.4) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
