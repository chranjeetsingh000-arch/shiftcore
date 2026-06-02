import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CashbackTable from "@/components/cashback/CashbackTable";

export const metadata: Metadata = {
  title: "Cashback & Voucher Codes — Travel OS",
  description:
    "The most complete travel cashback database. Find the best cashback rates across Quidco, TopCashback, and Rakuten for every travel merchant.",
};

export default function CashbackPage() {
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
              Cashback &amp; Voucher Codes
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl">
              Every travel merchant, every cashback platform, one table.
              Updated daily. Never leave money on the table again.
            </p>
          </div>
        </div>
        <CashbackTable />
      </main>
      <Footer />
    </>
  );
}
