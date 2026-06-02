import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Dashboard from "@/components/dashboard/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard — Travel OS",
  description: "Your Travel OS dashboard. Saved deals, alerts, loyalty balances, and personalised savings.",
};

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main>
        <Dashboard />
      </main>
      <Footer />
    </>
  );
}
