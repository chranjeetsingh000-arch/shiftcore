import type { Deal } from "@/lib/data";
import DealStatusBadge from "./DealStatusBadge";
import { cn } from "@/lib/utils";

const TYPE_ICONS: Record<string, string> = {
  flight: "✈️",
  hotel: "🏨",
  train: "🚄",
  package: "🌴",
  voucher: "🎫",
  cashback: "💰",
};

function VerifiedBar({ count, minutesAgo }: { count: number; minutesAgo: number }) {
  const freshness =
    minutesAgo < 30 ? "text-emerald-400" : minutesAgo < 120 ? "text-amber-400" : "text-slate-500";
  return (
    <div className="flex items-center gap-2 text-xs text-slate-500">
      <span className={cn("font-semibold", freshness)}>
        ✓ {count} verified
      </span>
      <span>·</span>
      <span>
        {minutesAgo < 60
          ? `${minutesAgo}m ago`
          : `${Math.round(minutesAgo / 60)}h ago`}
      </span>
    </div>
  );
}

export default function DealCard({ deal }: { deal: Deal }) {
  const icon = TYPE_ICONS[deal.dealType] ?? "🎯";
  const hasDiscount = deal.originalPrice && deal.originalPrice > deal.priceFrom;

  return (
    <article className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-all hover:border-slate-700 hover:bg-slate-900 hover:shadow-xl hover:shadow-slate-950/50">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <DealStatusBadge status={deal.status} />
          {deal.badge && (
            <span className="rounded-full bg-slate-800 border border-slate-700 px-2.5 py-1 text-[10px] font-bold text-slate-300">
              {deal.badge}
            </span>
          )}
        </div>
        <span className="text-xl flex-shrink-0">{icon}</span>
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-slate-100 mb-1.5 leading-snug">
        {deal.title}
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
        {deal.description}
      </p>

      {/* Pricing */}
      <div className="flex items-end justify-between mb-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-100">
              {deal.currency === "GBP" ? "£" : "€"}
              {deal.priceFrom.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-sm text-slate-500 line-through">
                {deal.currency === "GBP" ? "£" : "€"}
                {deal.originalPrice!.toLocaleString()}
              </span>
            )}
          </div>
          {deal.dealType === "hotel" && (
            <p className="text-xs text-slate-500 mt-0.5">per night</p>
          )}
        </div>
        {deal.savingsPercent && (
          <span className="rounded-lg bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 text-sm font-black text-emerald-400">
            -{deal.savingsPercent}%
          </span>
        )}
      </div>

      {/* Conditions */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {deal.conditions.slice(0, 3).map((c) => (
          <span
            key={c}
            className="rounded-md bg-slate-800/80 border border-slate-700/60 px-2 py-0.5 text-[11px] text-slate-400"
          >
            {c}
          </span>
        ))}
      </div>

      {/* Cashback */}
      {deal.cashbackAvailable && (
        <div className="flex items-center gap-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-3 py-2 mb-4">
          <span className="text-xs">💰</span>
          <span className="text-xs font-medium text-cyan-400">
            {deal.cashbackAvailable}
          </span>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <VerifiedBar
          count={deal.verifiedCount}
          minutesAgo={deal.lastVerifiedMinutesAgo}
        />
        {deal.expiresIn && (
          <span className="text-[11px] text-slate-500">
            Expires: {deal.expiresIn}
          </span>
        )}
      </div>

      {/* Destination tags */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {deal.destinations.map((d) => (
          <span
            key={d}
            className="text-[11px] text-slate-500 bg-slate-800/50 rounded px-1.5 py-0.5"
          >
            📍 {d}
          </span>
        ))}
        <span className="text-[11px] text-slate-600 ml-auto">
          via {deal.contributor}
        </span>
      </div>

      {/* CTA overlay on hover */}
      <a
        href={deal.bookingUrl}
        className="absolute inset-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        aria-label={`View deal: ${deal.title}`}
      />
    </article>
  );
}
