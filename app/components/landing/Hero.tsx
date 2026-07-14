import { ArrowRight, ChevronRight } from "lucide-react";
import Button from "./Button";
import HeroBadge from "./HeroBadge";
import TrustBadges from "./TrustBadges";
import FlowIllustration from "./FlowIllustration";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0">
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

      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col items-center justify-center px-4 py-16 sm:px-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 xl:gap-20">
        {/* LEFT — copy */}
        <div className="z-10 flex w-full max-w-2xl flex-col items-center text-center lg:items-start lg:text-left">
          <HeroBadge />

          <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight 2xl:text-7xl">
            Your products deserve
            <br />
            <span className="text-emerald-400">a real storefront.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-gray-400 sm:text-lg">
            Turn your WhatsApp or Instagram page into a professional store in{" "}
            <span className="font-semibold text-white">under 5 minutes.</span>{" "}
            Customers simply tap your link, browse products, place an order, and
            every order arrives directly in your WhatsApp.
          </p>

          <div className="mt-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
            <Button
              href="/signup"
              variant="primary"
              size="lg"
              className="group w-full sm:w-auto"
            >
              Start selling free
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>

            <Button
              href="#interactive-demo"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              Live store simulator
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-12">
            <TrustBadges />
          </div>
        </div>

        {/* RIGHT — flow illustration */}
        <div className="relative mt-14 flex w-full items-center justify-center lg:mt-0">
          <div className="absolute inset-0 scale-90 rounded-full bg-emerald-500/10 blur-[80px]" />
          <div className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[520px] xl:max-w-[580px]">
            <FlowIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
