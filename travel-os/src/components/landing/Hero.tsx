import Link from "next/link";

const STATS = [
  { value: "500+", label: "Live verified deals" },
  { value: "£340", label: "Avg saved per trip" },
  { value: "94%", label: "Deal accuracy rate" },
  { value: "12K+", label: "Community members" },
];

const TRUST_BADGES = [
  "✅ Verified deals only",
  "🔒 No hidden affiliate bias",
  "🤝 Community powered",
  "⚡ Updated every 15 min",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute top-60 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/8 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            500+ live deals verified right now
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
            Never Overpay
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              For Travel Again
            </span>
          </h1>

          {/* Sub */}
          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
            Travel OS combines verified flight &amp; hotel deals, hidden fee
            detection, community travel hacks, and AI-powered savings into one
            intelligence platform. The travel industry profits from your
            ignorance. We don&apos;t.
          </p>

          {/* CTA group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/deals"
              className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 text-base font-bold text-slate-950 shadow-xl shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:scale-105"
            >
              Browse Live Deals →
            </Link>
            <Link
              href="/calculator"
              className="w-full sm:w-auto rounded-xl border border-slate-700 bg-slate-800/50 px-8 py-4 text-base font-semibold text-slate-200 transition-all hover:border-slate-600 hover:bg-slate-800"
            >
              Calculate True Trip Cost
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {TRUST_BADGES.map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-slate-800/60 border border-slate-700/60 px-3 py-1.5 text-xs font-medium text-slate-400"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <div className="text-3xl font-black text-slate-100 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
