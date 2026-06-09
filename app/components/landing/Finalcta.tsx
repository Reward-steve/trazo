import { ArrowRight } from "lucide-react";
import Button from "../landing/Button";

export default function FinalCTA() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/60 via-[#0a0a0a] to-[#0a0a0a]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] bg-emerald-600/12 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-5">
          Stop selling through DMs.
          <br />
          <span className="text-emerald-400">Start selling properly.</span>
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
          Your store is 5 minutes away. No developers, no monthly subscriptions
          to start, no complicated setup.
        </p>
        <Button
          href="/signup"
          variant="primary"
          size="lg"
          className="w-full sm:w-auto justify-center"
        >
          Create my store — it&apos;s free
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
        <p className="text-gray-600 text-sm mt-4">
          No credit card required. Setup takes less than 3 minutes.
        </p>
      </div>
    </section>
  );
}
