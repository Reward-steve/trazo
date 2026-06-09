import Link from "next/link";
import { CheckCircle } from "lucide-react";
import SectionHeader from "./SectionHeader";
import DarkCard from "./DarkCard";
import Button from "../landing/Button";
import { pricingTiers } from "../../constant";

export default function PricingSection() {
  return (
    <section className="bg-white/[0.015]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeader badge="Pricing" title="Simple. No surprises." />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
          {pricingTiers.map((tier) => (
            <DarkCard
              key={tier.name}
              variant={tier.isPro ? "accent" : "default"}
              className="p-8 relative overflow-hidden flex flex-col"
            >
              {tier.isPro && (
                <>
                  <div className="absolute top-4 right-4 bg-emerald-500 text-black text-[10px] font-black px-3 py-1 rounded-full tracking-wide">
                    POPULAR
                  </div>
                  <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                </>
              )}

              <p
                className={`text-xs font-bold uppercase tracking-widest mb-2 ${
                  tier.isPro ? "text-emerald-400" : "text-gray-500"
                }`}
              >
                {tier.name}
              </p>
              <p className="text-4xl font-black text-white mb-1">
                {tier.price}
              </p>
              <p className="text-sm text-gray-500 mb-6">{tier.period}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-gray-300"
                  >
                    <CheckCircle
                      className={`h-4 w-4 shrink-0 mt-0.5 ${
                        tier.isPro ? "text-emerald-400" : "text-emerald-600"
                      }`}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                href="/signup"
                variant={tier.isPro ? "primary" : "outline"}
                size="lg"
                className={`w-full justify-center ${
                  tier.isPro
                    ? "bg-emerald-500 hover:bg-emerald-400 text-black font-bold shadow-lg shadow-emerald-500/20"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {tier.cta}
              </Button>
            </DarkCard>
          ))}
        </div>
      </div>
    </section>
  );
}
