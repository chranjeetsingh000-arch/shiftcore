import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import DealsSection from "@/components/deals/DealsSection";
import TripCostCalculator from "@/components/calculator/TripCostCalculator";
import TourismCards from "@/components/calculator/TourismCards";
import CommunitySection from "@/components/community/CommunitySection";
import Pricing from "@/components/landing/Pricing";
import CTA from "@/components/landing/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <DealsSection />
        <TripCostCalculator />
        <TourismCards />
        <CommunitySection />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
