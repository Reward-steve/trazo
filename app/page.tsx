"use client";

import Hero from "./components/landing/Hero";
import SocialProofBar from "./components/landing/SocialProofBar";
import PainSection from "./components/landing/PainSection";
import HowItWorks from "./components/landing/Howitworks";
import FeaturesSection from "./components/landing/FeaturesSection";
import PricingSection from "./components/landing/PricingSeciton";
import FinalCTA from "./components/landing/Finalcta";
import Footer from "./components/landing/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col overflow-x-hidden bg-[#0a0a0a] text-white">
      <Hero />
      <SocialProofBar />
      <PainSection />
      <HowItWorks />
      <FeaturesSection />
      <PricingSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}
