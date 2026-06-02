import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DealsSection from "@/components/deals/DealsSection";

export const metadata: Metadata = {
  title: "Live Travel Deals — Travel OS",
  description:
    "Browse 500+ verified flight, hotel, train, and package deals. Updated every 15 minutes. Every deal confirmed by our AI agent and community.",
};

export default function DealsPage() {
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
              Live Travel Deals
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl">
              Every deal is verified by our AI agent and community before
              publication. Last-verified timestamp on every listing.
            </p>
          </div>
        </div>
        <DealsSection />
      </main>
      <Footer />
    </>
  );
}
