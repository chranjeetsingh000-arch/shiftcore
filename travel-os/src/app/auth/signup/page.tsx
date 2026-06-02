import type { Metadata } from "next";
import AuthCard from "@/components/auth/AuthCard";

export const metadata: Metadata = {
  title: "Sign Up Free — Travel OS",
  description:
    "Create your free Travel OS account. Access 500+ verified deals, the true cost calculator, and community travel intelligence.",
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-16">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-emerald-500/8 blur-[100px]" />
      </div>
      <div className="relative w-full max-w-md">
        {/* Benefits strip above card */}
        <div className="flex justify-center gap-6 mb-6 flex-wrap">
          {["✅ Free forever", "🚫 No card needed", "⚡ Instant access"].map(
            (b) => (
              <span key={b} className="text-xs font-semibold text-slate-400">
                {b}
              </span>
            )
          )}
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 backdrop-blur">
          <AuthCard mode="signup" />
        </div>
      </div>
    </div>
  );
}
