import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CommunitySection from "@/components/community/CommunitySection";

export const metadata: Metadata = {
  title: "Community — Travel OS",
  description:
    "Submit travel deals, hacks, voucher codes, and scam alerts. Join 12,000+ travelers sharing intelligence to beat the travel industry.",
};

export default function CommunityPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="bg-slate-950 pt-12 pb-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400 mb-2">
              Travel OS
            </p>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-100 mb-3">
              Community Intelligence
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl">
              Every deal you submit, every scam you report, every hack you
              share makes Travel OS smarter. Earn reputation points and unlock
              contributor tiers.
            </p>
          </div>
        </div>
        <CommunitySection />
      </main>
      <Footer />
    </>
  );
}
