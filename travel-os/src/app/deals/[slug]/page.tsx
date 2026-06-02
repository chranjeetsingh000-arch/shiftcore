import type { Metadata } from "next";
import { DEALS } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import DealStatusBadge from "@/components/deals/DealStatusBadge";
import PriceHistoryChart from "@/components/deals/PriceHistoryChart";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export async function generateStaticParams() {
  return DEALS.map((deal) => ({ slug: deal.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const deal = DEALS.find((d) => d.id === slug);
  if (!deal) return { title: "Deal not found" };
  return {
    title: `${deal.title} — Travel OS`,
    description: deal.description,
  };
}

const TYPE_ICONS: Record<string, string> = {
  flight: "✈️",
  hotel: "🏨",
  train: "🚄",
  package: "🌴",
  voucher: "🎫",
  cashback: "💰",
};

const FAKE_VERIFICATIONS = [
  { user: "DealHunter_Maya", tier: "Travel Expert", result: "confirmed", time: "12 min ago", price: null },
  { user: "FlightWatch_UK", tier: "Travel Expert", result: "confirmed", time: "34 min ago", price: null },
  { user: "ScotDeals", tier: "Deal Hunter", result: "confirmed", time: "1h ago", price: null },
  { user: "AI Agent", tier: "System", result: "price-checked", time: "15 min ago", price: true },
];

export default async function DealPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const deal = DEALS.find((d) => d.id === slug);
  if (!deal) notFound();

  const icon = TYPE_ICONS[deal.dealType] ?? "🎯";
  const curr = deal.currency === "GBP" ? "£" : "€";
  const hasDiscount = deal.originalPrice && deal.originalPrice > deal.priceFrom;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-gray-700 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/#deals" className="hover:text-gray-700 transition-colors">
            Deals
          </Link>
          <span>/</span>
          <span className="text-gray-500 truncate max-w-xs">{deal.title}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <DealStatusBadge status={deal.status} />
                  {deal.badge && (
                    <span className="rounded-full bg-gray-100 border border-gray-300 px-2.5 py-1 text-[10px] font-bold text-gray-700">
                      {deal.badge}
                    </span>
                  )}
                </div>
                <span className="text-3xl">{icon}</span>
              </div>

              <h1 className="text-2xl font-black text-gray-900 mb-2 leading-snug">
                {deal.title}
              </h1>
              <p className="text-gray-500 leading-relaxed mb-6">
                {deal.description}
              </p>

              {/* Pricing */}
              <div className="flex items-end gap-4 mb-6">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-black text-gray-900">
                      {curr}{deal.priceFrom.toLocaleString()}
                    </span>
                    {hasDiscount && (
                      <span className="text-lg text-gray-400 line-through">
                        {curr}{deal.originalPrice!.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {deal.dealType === "hotel" && (
                    <p className="text-sm text-gray-400 mt-1">per night</p>
                  )}
                </div>
                {deal.savingsPercent && (
                  <span className="rounded-xl bg-violet-50 border border-violet-200 px-3 py-1.5 text-lg font-black text-violet-600">
                    -{deal.savingsPercent}%
                  </span>
                )}
              </div>

              {/* Destinations */}
              <div className="flex flex-wrap gap-2 mb-4">
                {deal.destinations.map((d) => (
                  <span
                    key={d}
                    className="flex items-center gap-1.5 rounded-lg bg-gray-100 border border-gray-300 px-3 py-1.5 text-sm text-gray-700"
                  >
                    📍 {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Conditions */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="text-base font-bold text-gray-900 mb-4">
                ⚠️ Conditions &amp; Terms
              </h2>
              <ul className="space-y-2.5">
                {deal.conditions.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <span className="text-gray-400 mt-0.5">•</span>
                    <span className="text-sm text-gray-700">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cashback */}
            {deal.cashbackAvailable && (
              <div className="rounded-2xl border border-violet-200 bg-violet-50 p-6">
                <h2 className="text-base font-bold text-violet-600 mb-2">
                  💰 Cashback Available
                </h2>
                <p className="text-sm text-gray-700">{deal.cashbackAvailable}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Always activate cashback before clicking through to the
                  merchant. Open in the same browser session.
                </p>
              </div>
            )}

            {/* Price history chart */}
            <PriceHistoryChart
              dealId={deal.id}
              currentPrice={deal.priceFrom}
              currency={deal.currency}
            />

            {/* Verification history */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-bold text-gray-900">
                  ✅ Verification History
                </h2>
                <span className="text-sm text-gray-400">
                  {deal.verifiedCount} total verifications
                </span>
              </div>
              <div className="space-y-3">
                {FAKE_VERIFICATIONS.map((v, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0"
                  >
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        v.tier === "System"
                          ? "bg-violet-50 text-violet-600"
                          : "bg-emerald-500/20 text-violet-600"
                      }`}
                    >
                      {v.tier === "System" ? "🤖" : v.user[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-700">
                        {v.user}
                      </p>
                      <p className="text-xs text-gray-400">{v.tier}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          v.result === "confirmed"
                            ? "bg-violet-50 text-violet-600"
                            : "bg-violet-50 text-violet-600"
                        }`}
                      >
                        {v.result === "price-checked"
                          ? "✓ Price verified"
                          : "✓ Confirmed"}
                      </span>
                      <p className="text-[10px] text-gray-400 mt-1">{v.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full rounded-xl border border-gray-300 bg-gray-50 py-2.5 text-sm font-semibold text-gray-500 hover:border-emerald-500/40 hover:text-violet-600 transition-all">
                + Verify this deal
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Book CTA */}
            <div className="rounded-2xl border border-violet-200 bg-gray-50 p-5 sticky top-20">
              <div className="text-center mb-4">
                <p className="text-3xl font-black text-gray-900">
                  {curr}{deal.priceFrom.toLocaleString()}
                </p>
                {hasDiscount && (
                  <p className="text-sm text-gray-400 line-through">
                    {curr}{deal.originalPrice!.toLocaleString()}
                  </p>
                )}
                {deal.expiresIn && (
                  <p className="text-xs text-amber-400 mt-1">
                    ⏱ Expires: {deal.expiresIn}
                  </p>
                )}
              </div>

              <a
                href={deal.bookingUrl}
                className="block w-full rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-violet-200 transition-all hover:shadow-violet-200 mb-3"
              >
                Book This Deal →
              </a>

              {deal.cashbackAvailable && (
                <a
                  href="#"
                  className="block w-full rounded-xl border border-violet-200 bg-violet-50 py-3 text-center text-sm font-semibold text-violet-600 hover:bg-violet-50 transition-all"
                >
                  💰 Activate Cashback First
                </a>
              )}

              <p className="text-[10px] text-gray-400 text-center mt-3">
                We may earn affiliate commission. This never affects our
                recommendations.
              </p>
            </div>

            {/* Deal meta */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h3 className="text-sm font-bold text-gray-700 mb-4">
                Deal Details
              </h3>
              <div className="space-y-2.5">
                {[
                  { label: "Type", value: deal.dealType.toUpperCase() },
                  { label: "Status", value: deal.status },
                  {
                    label: "Last verified",
                    value:
                      deal.lastVerifiedMinutesAgo < 60
                        ? `${deal.lastVerifiedMinutesAgo}m ago`
                        : `${Math.round(deal.lastVerifiedMinutesAgo / 60)}h ago`,
                  },
                  { label: "Verifications", value: `${deal.verifiedCount}` },
                  { label: "Submitted by", value: deal.contributor },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between items-center"
                  >
                    <span className="text-xs text-gray-400">{row.label}</span>
                    <span className="text-xs font-semibold text-gray-700">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Set alert */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h3 className="text-sm font-bold text-gray-700 mb-2">
                🔔 Price Drop Alert
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                Get notified if this route gets cheaper.
              </p>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-400 mb-2.5"
              />
              <button className="w-full rounded-lg bg-gray-100 border border-gray-300 py-2.5 text-sm font-semibold text-gray-700 hover:border-emerald-500/40 hover:text-violet-600 transition-all">
                Set Alert
              </button>
            </div>
          </div>
        </div>

        {/* Related deals */}
        <div className="mt-12">
          <h2 className="text-xl font-black text-gray-900 mb-5">
            More deals you might like
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEALS.filter(
              (d) => d.id !== deal.id && d.dealType === deal.dealType
            )
              .slice(0, 3)
              .map((related) => (
                <Link
                  key={related.id}
                  href={`/deals/${related.id}`}
                  className="rounded-2xl border border-gray-200 bg-white p-4 hover:border-gray-300 hover:bg-gray-50 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <DealStatusBadge status={related.status} />
                  </div>
                  <p className="text-sm font-bold text-gray-800 mb-1">
                    {related.title}
                  </p>
                  <p className="text-lg font-black text-violet-600">
                    {related.currency === "GBP" ? "£" : "€"}
                    {related.priceFrom.toLocaleString()}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
