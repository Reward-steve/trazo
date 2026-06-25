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
import Image from "next/image";
import banner_img from "../public/flow.png";

export default function HomePage() {
  return (
    <div className="flex flex-col bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex items-center bg-[#0d0d0d]">
        {/* Ambient glows and texture from original image aesthetic */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content - with user experience in mind */}
          <div className="max-w-xl md:max-w-3xl z-10 text-white">
            <HeroBadge />

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
              Your products deserve
              <br />
              <span className="text-primary">a real storefront.</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 mb-10 leading-relaxed max-w-xl">
              Turn your WhatsApp or Instagram page into a professional store in{" "}
              <span className="text-white font-semibold">under 5 minutes.</span>{" "}
              Your customers don&apos;t need an account — they just tap your
              link, browse, and order. Every order lands neatly in your
              WhatsApp, ready to fulfill.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button
                href="/signup"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90"
              >
                Start selling free
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                href="/store/demo"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-white border-white hover:bg-white/10 hover:text-white"
              >
                View demo store
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <TrustBadges />
          </div>

          {/* Right: Phone Mockup - properly aligned and responsive */}
          <div className="relative order-first md:order-last w-full h-[400px] sm:h-[500px] md:h-full lg:h-[700px] flex justify-center items-center">
            {/* Container for proper scaling of the mock */}
            <div className="relative w-full max-w-[320px] md:max-w-[360px] aspect-[9/16] p-2 bg-black rounded-3xl shadow-2xl overflow-hidden border-2 border-primary/30">
              <Image
                src={banner_img}
                alt={"Trazo Logo Mobile Storefront Mockup"}
                layout="fill"
                objectFit="contain" // Crucial for responsive phone view
                className="rounded-2xl"
                priority // Prioritize loading for hero section
              />
              {/* Floating WhatsApp chat notification (matching original image) */}
              <div className="absolute top-[35%] -right-8 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-xl animate-pulse-subtle pointer-events-none">
                <Image
                  src="/images/icons/whatsapp_icon_white.svg"
                  alt="WhatsApp Icon"
                  width={24}
                  height={24}
                />
              </div>
            </div>
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
