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
import banner_img from "../public/banner.png";

export default function HomePage() {
  return (
    <div className="flex flex-col bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* ── HERO ── */}

      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-emerald-500/15 blur-[150px]" />
          <div className="absolute -bottom-32 left-0 h-[450px] w-[450px] rounded-full bg-yellow-500/10 blur-[130px]" />

          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl items-center px-4 py-16 sm:px-6 lg:grid lg:grid-cols-2 lg:gap-16 lg:px-8">
          {/* LEFT */}
          <div className="z-10 max-w-2xl">
            <HeroBadge />

            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Your products deserve
              <br />
              <span className="text-emerald-400">a real storefront.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-gray-400 sm:text-lg">
              Turn your WhatsApp or Instagram page into a professional store in{" "}
              <span className="font-semibold text-white">under 5 minutes.</span>{" "}
              Customers simply tap your link, browse products, place an order,
              and every order arrives directly in your WhatsApp.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button
                href="/signup"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Start selling free
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                href="/store/demo"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                View demo store
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-12">
              <TrustBadges />
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative mt-16 flex justify-center lg:mt-0">
            <div className="relative w-full max-w-[650px]">
              {/* Glow */}
              <div className="absolute inset-0 scale-95 rounded-full bg-emerald-500/20 blur-[90px]" />

              <Image
                src={banner_img}
                alt="Trazo storefront preview"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="relative h-auto w-full object-contain drop-shadow-[0_25px_80px_rgba(16,185,129,.35)]"
              />
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
