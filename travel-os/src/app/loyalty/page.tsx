import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoyaltyTracker from "@/components/loyalty/LoyaltyTracker";

export const metadata = { title: "Loyalty Tracker — Travel OS" };

export default function LoyaltyPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        <LoyaltyTracker />
      </main>
      <Footer />
    </>
  );
}
