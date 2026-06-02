import Link from "next/link";

const PLANS = [
  {
    name: "Free",
    price: 0,
    period: "forever",
    description: "Get started with verified deals and basic tools.",
    features: [
      "Deal feed — top 50 live deals",
      "Tourism card calculator",
      "2 deal alerts",
      "Community read access",
      "Basic cashback lookup",
    ],
    cta: "Get Started Free",
    highlight: false,
  },
  {
    name: "Explorer",
    price: 4.99,
    period: "per month",
    description: "The full deal feed and community contribution tools.",
    features: [
      "Everything in Free",
      "Full deal feed — all 500+ deals",
      "Unlimited deal alerts",
      "Community submit & vote",
      "Price history charts",
      "Full cashback & voucher database",
    ],
    cta: "Start Explorer",
    highlight: false,
    savings: "Pay yearly — save 33%",
  },
  {
    name: "Premium",
    price: 9.99,
    period: "per month",
    description: "Booking path optimizer and AI travel planner.",
    features: [
      "Everything in Explorer",
      "Booking path optimizer",
      "Loyalty portfolio sync",
      "Transfer bonus alerts",
      "AI Travel Planner (unlimited)",
      "Advanced price prediction",
      "Priority deal alerts — 30 min early",
    ],
    cta: "Start Premium",
    highlight: true,
    badge: "Most Popular",
    savings: "Pay yearly — save 33%",
  },
  {
    name: "Pro",
    price: 14.99,
    period: "per month",
    description: "For power travelers, families, and digital nomads.",
    features: [
      "Everything in Premium",
      "Digital nomad base optimizer",
      "Group travel planner",
      "Multi-profile management",
      "2 × custom deal research/month",
      "API access (personal use)",
    ],
    cta: "Start Pro",
    highlight: false,
    savings: "Pay yearly — save 33%",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28 border-t border-slate-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400 mb-3">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-100 mb-4">
            We earn when you save
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Unlike every other travel platform, our revenue comes from your
            subscription — not from booking commissions. That alignment is the
            product.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-6 flex flex-col ${
                plan.highlight
                  ? "border-emerald-500/50 bg-gradient-to-b from-emerald-500/10 to-slate-900/60 shadow-xl shadow-emerald-500/10"
                  : "border-slate-800 bg-slate-900/60"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-3 py-1 text-[10px] font-black text-slate-950">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-5">
                <h3 className="text-lg font-black text-slate-100 mb-1">
                  {plan.name}
                </h3>
                <p className="text-xs text-slate-400 mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  {plan.price === 0 ? (
                    <span className="text-3xl font-black text-slate-100">
                      Free
                    </span>
                  ) : (
                    <>
                      <span className="text-3xl font-black text-slate-100">
                        £{plan.price}
                      </span>
                      <span className="text-sm text-slate-500">
                        /{plan.period}
                      </span>
                    </>
                  )}
                </div>
                {plan.savings && (
                  <p className="text-[11px] text-emerald-400 mt-1">
                    {plan.savings}
                  </p>
                )}
              </div>

              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <span className="text-emerald-500 text-sm mt-0.5 flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-sm text-slate-400">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="#deals"
                className={`block w-full rounded-xl py-3 text-center text-sm font-bold transition-all ${
                  plan.highlight
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
                    : "border border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600 hover:text-slate-100"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-600 mt-8">
          All paid plans include a 14-day free trial. No card required for
          Free plan. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
