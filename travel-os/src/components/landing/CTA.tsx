import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900/50 to-cyan-900/30 border border-emerald-500/20 p-10 sm:p-16 text-center">
          {/* BG decoration */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[300px] w-[300px] rounded-full bg-emerald-500/10 blur-[80px]" />
          </div>

          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400 mb-4">
              Ready to save?
            </p>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-100 mb-4">
              Join 12,000+ travelers who{" "}
              <br className="hidden sm:block" />
              never overpay
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10">
              Free forever for core features. Start finding savings in the next
              60 seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/signup"
                className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-10 py-4 text-base font-bold text-slate-950 shadow-xl shadow-emerald-500/30 transition-all hover:shadow-emerald-500/50 hover:scale-105"
              >
                Get Started Free →
              </Link>
              <Link
                href="/auth/signup"
                className="text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
              >
                View live deals first
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
