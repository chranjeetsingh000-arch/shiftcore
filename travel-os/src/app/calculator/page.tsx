import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TripCostCalculator from "@/components/calculator/TripCostCalculator";
import TourismCards from "@/components/calculator/TourismCards";

export const metadata: Metadata = {
  title: "Trip Cost Calculator — Travel OS",
  description:
    "Calculate the true all-in cost of your trip including hidden fees, baggage charges, resort fees, transfers, and cashback. No more surprise costs at checkout.",
};

export default function CalculatorPage() {
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
              True Cost Calculator
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl">
              What does your trip actually cost? We show you everything the
              booking platform doesn&apos;t — baggage fees, resort fees,
              transfers, and the cashback you could be earning.
            </p>
          </div>
        </div>
        <TripCostCalculator />
        <TourismCards />
      </main>
      <Footer />
    </>
  );
}
