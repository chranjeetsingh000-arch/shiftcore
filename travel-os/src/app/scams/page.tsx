import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScamAlerts from "@/components/scams/ScamAlerts";

export const metadata = {
  title: "Travel Scam Alerts — Travel OS",
  description: "Community-reported travel scams, hidden fees, and dodgy booking tactics. Know before you book.",
};

export default function ScamsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        <ScamAlerts />
      </main>
      <Footer />
    </>
  );
}
