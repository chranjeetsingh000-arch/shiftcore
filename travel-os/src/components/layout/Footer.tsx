import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-pink-500 text-sm font-black text-white">
                ✈
              </div>
              <span className="text-lg font-black tracking-tight">
                Travel<span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">OS</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Never overpay for travel again. Verified deals, hidden fee
              detection, and community intelligence.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5">
              {["Deal Feed", "Cost Calculator", "Tourism Cards", "Cashback"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              Community
            </h4>
            <ul className="space-y-2.5">
              {[
                "Submit a Deal",
                "Travel Hacks",
                "Scam Database",
                "Leaderboard",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {["About", "Privacy Policy", "Affiliate Disclosure", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © 2025 Travel OS. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 text-center sm:text-right max-w-md">
            We may earn affiliate commission when you book through our links.
            This never affects our rankings or recommendations.{" "}
            <Link href="#" className="text-gray-400 hover:text-slate-300 underline">
              Learn more
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
