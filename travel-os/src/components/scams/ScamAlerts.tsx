"use client";

import { useState, useMemo } from "react";

type ScamCategory = "hidden_fee" | "fake_deal" | "phishing" | "price_bait" | "dodgy_policy";

interface ScamReport {
  id: string;
  title: string;
  category: ScamCategory;
  company: string;
  description: string;
  howToAvoid: string;
  reportedBy: string;
  reports: number;
  confirmedAt: string;
  severity: "low" | "medium" | "high";
}

const SCAMS: ScamReport[] = [
  {
    id: "s1",
    title: "Ryanair 'Flexi Plus' added at checkout without consent",
    category: "hidden_fee",
    company: "Ryanair",
    description: "Flexi Plus (£45+) pre-ticked at checkout. Easy to miss if you click through quickly.",
    howToAvoid: "Always review every checkbox on the extras page. Untick before hitting 'Continue'.",
    reportedBy: "TravelWatcher_UK",
    reports: 284,
    confirmedAt: "2 days ago",
    severity: "high",
  },
  {
    id: "s2",
    title: "Booking.com 'genius' price shown only on login — higher on checkout",
    category: "price_bait",
    company: "Booking.com",
    description: "Logged-in Genius members shown a 'member price' that disappears by checkout and reverts to standard pricing.",
    howToAvoid: "Screenshot the price on listing page. If checkout price differs, use incognito + compare.",
    reportedBy: "HotelHack_Maya",
    reports: 156,
    confirmedAt: "5 days ago",
    severity: "medium",
  },
  {
    id: "s3",
    title: "Fake 'BA Executive Club' phishing emails circulating",
    category: "phishing",
    company: "Impersonating British Airways",
    description: "Emails claiming you have expiring Avios send to a lookalike site that harvests credentials.",
    howToAvoid: "BA never asks for your password via email. Always navigate to ba.com directly, never via email links.",
    reportedBy: "ScamAlert_Dave",
    reports: 412,
    confirmedAt: "1 day ago",
    severity: "high",
  },
  {
    id: "s4",
    title: "Skyscanner deal links to OTA charging 3× the shown price",
    category: "fake_deal",
    company: "Third-party OTA (via Skyscanner)",
    description: "Flight shown at £89 on Skyscanner meta-search. Clicking through to the OTA shows £267 after 'seat selection required' added.",
    howToAvoid: "Always filter Skyscanner results to airline direct or well-known OTAs (Expedia, CheapFlights). Avoid unknown OTA names.",
    reportedBy: "FlightWatch_UK",
    reports: 98,
    confirmedAt: "1 week ago",
    severity: "high",
  },
  {
    id: "s5",
    title: "easyJet 'Standard' fare loses seat selection at checkin",
    category: "dodgy_policy",
    company: "easyJet",
    description: "Standard fares now include random seat assignment. Families end up separated unless they pay £4–12/seat/segment.",
    howToAvoid: "Book 'FLEXI' or pay for seats upfront if travelling as a group. Factor into true cost comparison.",
    reportedBy: "FamilyFlight_Sara",
    reports: 203,
    confirmedAt: "3 days ago",
    severity: "medium",
  },
  {
    id: "s6",
    title: "Hotels.com price match 'valid only within 24 hours of booking'",
    category: "dodgy_policy",
    company: "Hotels.com",
    description: "Price match guarantee is marketed as 'Best Price Guarantee' but has a 24-hour window that isn't disclosed prominently.",
    howToAvoid: "Check the price immediately after booking and claim within 24h if cheaper elsewhere.",
    reportedBy: "SmartStay_Jo",
    reports: 67,
    confirmedAt: "2 weeks ago",
    severity: "low",
  },
];

const CATEGORY_LABELS: Record<ScamCategory, string> = {
  hidden_fee: "Hidden Fee",
  fake_deal: "Fake Deal",
  phishing: "Phishing",
  price_bait: "Price Bait",
  dodgy_policy: "Dodgy Policy",
};

const CATEGORY_COLORS: Record<ScamCategory, string> = {
  hidden_fee: "bg-orange-500/15 text-orange-400 border-orange-500/20",
  fake_deal: "bg-red-500/15 text-red-400 border-red-500/20",
  phishing: "bg-red-600/15 text-red-500 border-red-600/20",
  price_bait: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  dodgy_policy: "bg-slate-700/50 text-gray-500 border-gray-300",
};

const SEVERITY_COLORS = {
  low: "bg-slate-700 text-gray-500",
  medium: "bg-amber-500/20 text-amber-400",
  high: "bg-red-500/20 text-red-400",
};

export default function ScamAlerts() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"all" | ScamCategory>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return SCAMS.filter((s) => {
      if (category !== "all" && s.category !== category) return false;
      if (search) {
        const q = search.toLowerCase();
        return s.title.toLowerCase().includes(q) || s.company.toLowerCase().includes(q);
      }
      return true;
    });
  }, [search, category]);

  return (
    <div>
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-400 mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400" />
          </span>
          Community-verified warnings
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-2">Travel Scam Alerts</h1>
        <p className="text-gray-500 max-w-2xl">
          Real warnings from the Travel OS community. Hidden fees, fake deals, phishing attempts, and booking traps — all vetted and confirmed.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
          <p className="text-2xl font-black text-gray-900">{SCAMS.length}</p>
          <p className="text-xs text-gray-400">Active alerts</p>
        </div>
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-center">
          <p className="text-2xl font-black text-red-400">
            {SCAMS.filter((s) => s.severity === "high").length}
          </p>
          <p className="text-xs text-gray-400">High severity</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
          <p className="text-2xl font-black text-gray-900">
            {SCAMS.reduce((s, r) => s + r.reports, 0).toLocaleString()}
          </p>
          <p className="text-xs text-gray-400">Total reports</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by company or scam type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-xl border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-400"
        />
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setCategory("all")}
            className={`rounded-lg px-3 py-2 text-xs font-bold transition-all ${category === "all" ? "bg-slate-700 text-gray-800" : "text-gray-400 hover:text-gray-700"}`}
          >
            All
          </button>
          {(Object.keys(CATEGORY_LABELS) as ScamCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-lg px-3 py-2 text-xs font-bold transition-all ${category === cat ? "bg-slate-700 text-gray-800" : "text-gray-400 hover:text-gray-700"}`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Scam list */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-400">
            No alerts matching your filter.
          </div>
        )}
        {filtered.map((scam) => (
          <div
            key={scam.id}
            className="rounded-2xl border border-gray-200 bg-white overflow-hidden"
          >
            <div
              className="p-5 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setExpanded(expanded === scam.id ? null : scam.id)}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${CATEGORY_COLORS[scam.category]}`}>
                      {CATEGORY_LABELS[scam.category]}
                    </span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${SEVERITY_COLORS[scam.severity]}`}>
                      {scam.severity.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-gray-400">{scam.reports} reports · {scam.confirmedAt}</span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 leading-snug">{scam.title}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{scam.company}</p>
                </div>
                <span className="text-gray-400 text-sm flex-shrink-0">
                  {expanded === scam.id ? "▲" : "▼"}
                </span>
              </div>
            </div>

            {expanded === scam.id && (
              <div className="border-t border-gray-200 px-5 pb-5 pt-4 space-y-3">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">What happens</p>
                  <p className="text-sm text-gray-700">{scam.description}</p>
                </div>
                <div className="rounded-xl bg-violet-50 border border-violet-200 p-3">
                  <p className="text-xs font-semibold text-violet-600 mb-1">✓ How to avoid it</p>
                  <p className="text-sm text-gray-700">{scam.howToAvoid}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">Reported by {scam.reportedBy}</p>
                  <button className="text-xs text-gray-400 hover:text-red-400 transition-colors">
                    + I&apos;ve seen this too
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Report CTA */}
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 text-center">
        <p className="text-gray-700 font-semibold mb-1">Spotted a scam we haven&apos;t listed?</p>
        <p className="text-sm text-gray-400 mb-4">Report it and earn 30 reputation points. Helps protect the whole community.</p>
        <a
          href="/community"
          className="inline-block rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 px-6 py-3 text-sm font-bold text-white"
        >
          Report a Scam →
        </a>
      </div>
    </div>
  );
}
