"use client";

import { useState, useMemo } from "react";

interface MerchantRate {
  merchant: string;
  category: string;
  logo: string;
  quidco: string | null;
  topcashback: string | null;
  rakuten: string | null;
  best: string;
  bestPlatform: string;
  lastChecked: string;
  hasVoucher: boolean;
  voucherCode?: string;
  voucherDiscount?: string;
  notes?: string;
}

const MERCHANTS: MerchantRate[] = [
  { merchant: "Booking.com", category: "Hotels", logo: "🏨", quidco: "8%", topcashback: "12%", rakuten: "6%", best: "12%", bestPlatform: "TopCashback", lastChecked: "2h ago", hasVoucher: true, voucherCode: "GENIUS20", voucherDiscount: "20% off selected hotels", notes: "Genius Level 2+ required for code" },
  { merchant: "Expedia", category: "Hotels & Flights", logo: "🌐", quidco: "7%", topcashback: "8%", rakuten: "5%", best: "8%", bestPlatform: "TopCashback", lastChecked: "3h ago", hasVoucher: true, voucherCode: "SAVE10EXP", voucherDiscount: "£10 off £100+ spend" },
  { merchant: "Hotels.com", category: "Hotels", logo: "🏩", quidco: "5%", topcashback: "7%", rakuten: "4%", best: "7%", bestPlatform: "TopCashback", lastChecked: "4h ago", hasVoucher: false, notes: "Collect 1 night free after 10 stays" },
  { merchant: "Trainline", category: "Rail", logo: "🚄", quidco: "3%", topcashback: "3.5%", rakuten: "2%", best: "3.5%", bestPlatform: "TopCashback", lastChecked: "1h ago", hasVoucher: false, notes: "Railcard discounts stack with cashback" },
  { merchant: "Eurostar", category: "Rail", logo: "🚅", quidco: "10%", topcashback: "9%", rakuten: "8%", best: "10%", bestPlatform: "Quidco", lastChecked: "2h ago", hasVoucher: true, voucherCode: "EUROSTAR15", voucherDiscount: "15% off advance tickets" },
  { merchant: "DFDS Ferries", category: "Ferries", logo: "⛴️", quidco: "5%", topcashback: "4.5%", rakuten: "3%", best: "5%", bestPlatform: "Quidco", lastChecked: "5h ago", hasVoucher: false },
  { merchant: "Stena Line", category: "Ferries", logo: "🚢", quidco: "4%", topcashback: "4%", rakuten: "3.5%", best: "4%", bestPlatform: "Quidco/TCB", lastChecked: "6h ago", hasVoucher: false },
  { merchant: "Brittany Ferries", category: "Ferries", logo: "⚓", quidco: "3.5%", topcashback: "3%", rakuten: null, best: "3.5%", bestPlatform: "Quidco", lastChecked: "8h ago", hasVoucher: true, voucherCode: "BF10OFF", voucherDiscount: "£10 off foot passenger" },
  { merchant: "Rentalcars.com", category: "Car Hire", logo: "🚗", quidco: "7%", topcashback: "9%", rakuten: "8%", best: "9%", bestPlatform: "TopCashback", lastChecked: "3h ago", hasVoucher: false },
  { merchant: "AutoEurope", category: "Car Hire", logo: "🚙", quidco: "6%", topcashback: "8%", rakuten: "5%", best: "8%", bestPlatform: "TopCashback", lastChecked: "4h ago", hasVoucher: false },
  { merchant: "Hostelworld", category: "Hostels", logo: "🛏️", quidco: "6%", topcashback: "8%", rakuten: null, best: "8%", bestPlatform: "TopCashback", lastChecked: "5h ago", hasVoucher: false },
  { merchant: "Agoda", category: "Hotels", logo: "🏯", quidco: "5%", topcashback: "6%", rakuten: "7%", best: "7%", bestPlatform: "Rakuten", lastChecked: "3h ago", hasVoucher: false, notes: "Best for Asia-Pacific bookings" },
  { merchant: "GetYourGuide", category: "Attractions", logo: "🎡", quidco: null, topcashback: "6%", rakuten: "5%", best: "6%", bestPlatform: "TopCashback", lastChecked: "4h ago", hasVoucher: true, voucherCode: "GYG10", voucherDiscount: "10% off first booking" },
  { merchant: "Klook", category: "Attractions", logo: "🎢", quidco: null, topcashback: "7%", rakuten: "6%", best: "7%", bestPlatform: "TopCashback", lastChecked: "5h ago", hasVoucher: false },
  { merchant: "TUI", category: "Package Holidays", logo: "☀️", quidco: "3%", topcashback: "4%", rakuten: "2%", best: "4%", bestPlatform: "TopCashback", lastChecked: "6h ago", hasVoucher: false },
  { merchant: "easyJet Holidays", category: "Package Holidays", logo: "🧡", quidco: "2%", topcashback: "2.5%", rakuten: null, best: "2.5%", bestPlatform: "TopCashback", lastChecked: "7h ago", hasVoucher: false },
  { merchant: "Airalo eSIM", category: "Travel Tech", logo: "📱", quidco: null, topcashback: "8%", rakuten: "10%", best: "10%", bestPlatform: "Rakuten", lastChecked: "6h ago", hasVoucher: true, voucherCode: "AIRALO5", voucherDiscount: "$5 off first eSIM" },
  { merchant: "World Nomads", category: "Travel Insurance", logo: "🛡️", quidco: "15%", topcashback: "12%", rakuten: null, best: "15%", bestPlatform: "Quidco", lastChecked: "8h ago", hasVoucher: false, notes: "High cashback on insurance is common — always verify before booking" },
];

const CATEGORIES = ["All", "Hotels", "Rail", "Ferries", "Car Hire", "Attractions", "Package Holidays", "Hostels", "Travel Tech", "Travel Insurance", "Hotels & Flights"];

export default function CashbackTable() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [voucherOnly, setVoucherOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"best" | "merchant">("best");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let data = [...MERCHANTS];
    if (category !== "All") data = data.filter((m) => m.category === category);
    if (voucherOnly) data = data.filter((m) => m.hasVoucher);
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (m) =>
          m.merchant.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q)
      );
    }
    if (sortBy === "best") {
      data.sort((a, b) => parseFloat(b.best) - parseFloat(a.best));
    } else {
      data.sort((a, b) => a.merchant.localeCompare(b.merchant));
    }
    return data;
  }, [search, category, voucherOnly, sortBy]);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Info banner */}
        <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4 mb-8 flex items-start gap-3">
          <span className="text-xl flex-shrink-0">💡</span>
          <div>
            <p className="text-sm font-semibold text-violet-600">
              How to use this table
            </p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Always activate cashback <strong>before</strong> clicking through
              to the merchant. Open your cashback portal, search for the
              merchant, click through from there, then complete your booking in
              the same browser session without closing tabs.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            placeholder="Search merchants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm text-gray-800 placeholder-slate-500 focus:outline-none focus:border-violet-400 min-w-[200px]"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-violet-400"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-gray-50">
                {c}
              </option>
            ))}
          </select>
          <button
            onClick={() => setVoucherOnly(!voucherOnly)}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${
              voucherOnly
                ? "border-violet-400 bg-violet-50 text-violet-600"
                : "border-gray-300 bg-white text-gray-500 hover:border-gray-400"
            }`}
          >
            🎫 Has voucher code
          </button>
          <div className="flex items-center gap-1 rounded-xl border border-gray-300 bg-white p-1">
            {(["best", "merchant"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  sortBy === s
                    ? "bg-slate-700 text-gray-900"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {s === "best" ? "Best rate" : "A–Z"}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-400 mb-4">
          Showing {filtered.length} merchants · Rates updated daily
        </p>

        {/* Table */}
        <div className="rounded-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            <div className="col-span-4">Merchant</div>
            <div className="col-span-2 text-center">Quidco</div>
            <div className="col-span-2 text-center">TopCashback</div>
            <div className="col-span-2 text-center">Rakuten</div>
            <div className="col-span-2 text-center">Best Rate</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-800/60">
            {filtered.map((m) => (
              <div key={m.merchant} className="bg-gray-50 hover:bg-gray-50 transition-colors">
                {/* Main row */}
                <div className="grid grid-cols-12 gap-2 px-4 py-4 items-center">
                  <div className="col-span-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{m.logo}</span>
                      <div>
                        <p className="text-sm font-bold text-gray-800">
                          {m.merchant}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-gray-400 bg-gray-100 rounded px-1.5 py-0.5">
                            {m.category}
                          </span>
                          {m.hasVoucher && (
                            <span className="text-[10px] text-violet-600 bg-violet-50 rounded px-1.5 py-0.5 border border-violet-200">
                              🎫 Code
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {[
                    { rate: m.quidco, platform: "Quidco" },
                    { rate: m.topcashback, platform: "TopCashback" },
                    { rate: m.rakuten, platform: "Rakuten" },
                  ].map(({ rate, platform }) => (
                    <div key={platform} className="col-span-2 text-center">
                      {rate ? (
                        <span
                          className={`text-sm font-bold ${
                            rate === m.best
                              ? "text-violet-600"
                              : "text-gray-500"
                          }`}
                        >
                          {rate}
                        </span>
                      ) : (
                        <span className="text-slate-700 text-sm">—</span>
                      )}
                    </div>
                  ))}

                  <div className="col-span-2 text-center">
                    <div className="inline-flex flex-col items-center">
                      <span className="text-sm font-black text-violet-600">
                        {m.best}
                      </span>
                      <span className="text-[9px] text-gray-400 mt-0.5">
                        {m.bestPlatform}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Voucher row */}
                {m.hasVoucher && m.voucherCode && (
                  <div className="px-4 pb-3 flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2 rounded-lg bg-gray-100/80 border border-gray-300 px-3 py-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                        Code:
                      </span>
                      <code className="text-sm font-bold text-violet-600 font-mono">
                        {m.voucherCode}
                      </code>
                      <button
                        onClick={() => copyCode(m.voucherCode!)}
                        className="ml-1 rounded px-2 py-0.5 text-[10px] font-semibold bg-slate-700 text-gray-700 hover:bg-emerald-500/20 hover:text-violet-600 transition-all"
                      >
                        {copiedCode === m.voucherCode ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                    {m.voucherDiscount && (
                      <span className="text-xs text-gray-500">
                        {m.voucherDiscount}
                      </span>
                    )}
                    <span className="text-[10px] text-gray-400 ml-auto">
                      Checked {m.lastChecked}
                    </span>
                  </div>
                )}

                {/* Notes */}
                {m.notes && (
                  <div className="px-4 pb-3">
                    <p className="text-[11px] text-gray-400 flex items-start gap-1.5">
                      <span>ℹ️</span>
                      {m.notes}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg font-semibold text-gray-500">
              No merchants match your filters
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setVoucherOnly(false);
              }}
              className="mt-3 text-sm text-violet-600 hover:text-violet-500 underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 mt-6 text-center">
          Cashback rates change frequently. Always verify current rates on the
          cashback platform before booking. Travel OS earns a small referral fee
          when you sign up to cashback platforms via our links. This never
          affects displayed rates.
        </p>
      </div>
    </section>
  );
}
