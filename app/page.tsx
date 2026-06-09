import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import Button from "./components/landing/Button";
import HeroBadge from "./components/landing/HeroBadge";
import SocialProofBar from "./components/landing/SocialProofBar";
import PainSection from "./components/landing/PainSection";
import DemoSec from "./components/landing/DemoSec";
import HowItWorks from "./components/landing/Howitworks";
import FeaturesSection from "./components/landing/FeaturesSection";
import PricingSection from "./components/landing/PricingSeciton";
import Footer from "./components/landing/Footer";
import TrustBadges from "./components/landing/TrustBadges";
import FinalCTA from "./components/landing/Finalcta";

export default function HomePage() {
  return (
    <div className="flex flex-col bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Ambient glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-3xl">
            <HeroBadge />

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
              Your products deserve
              <br />
              <span className="text-emerald-400">a real storefront.</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 mb-10 leading-relaxed max-w-xl">
              Turn your WhatsApp or Instagram page into a professional store in{" "}
              <span className="text-white font-semibold">under 5 minutes.</span>{" "}
              Customers browse, tap, and order — every order lands neatly in
              your WhatsApp, ready to fulfill.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button
                href="/signup"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Start selling free
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                href="/store/demo"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-white hover:text-text"
              >
                View demo store
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <TrustBadges />
          </div>
        </div>
      </section>

      <SocialProofBar />
      <PainSection />
      <DemoSec />
      <HowItWorks />
      <FeaturesSection />
      <PricingSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}
