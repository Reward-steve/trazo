import { CheckCircle } from "lucide-react";
import SectionHeader from "./SectionHeader";
import DarkCard from "./DarkCard";
import Button from "../landing/Button";
import { pricingTiers } from "../../constant";

interface PricingTier {
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  isPro?: boolean;
}

function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <DarkCard
      hover
      variant={tier.isPro ? "accent" : "default"}
      className={`flex w-full flex-col p-8 sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] ${
        tier.isPro ? "sm:-translate-y-2" : ""
      }`}
    >
      {tier.isPro && (
        <>
          <span className="absolute right-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-black tracking-wide text-black">
            POPULAR
          </span>
          <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-emerald-500/10 blur-2xl" />
        </>
      )}

      <p
        className={`mb-2 text-xs font-bold uppercase tracking-widest ${
          tier.isPro ? "text-emerald-400" : "text-gray-500"
        }`}
      >
        {tier.name}
      </p>

      <div className="mb-6 flex items-baseline gap-1.5">
        <span className="text-4xl font-black text-white">{tier.price}</span>
        <span className="text-sm text-gray-500">{tier.period}</span>
      </div>

      <ul className="mb-8 flex-1 space-y-3">
        {tier.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-sm text-gray-300"
          >
            <CheckCircle
              className={`mt-0.5 h-4 w-4 shrink-0 ${
                tier.isPro ? "text-emerald-400" : "text-emerald-600"
              }`}
            />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        href="/signup"
        variant={tier.isPro ? "primary" : "outline"}
        size="lg"
        className={`w-full justify-center ${
          tier.isPro
            ? "bg-emerald-500 font-bold text-black shadow-lg shadow-emerald-500/20 hover:bg-emerald-400"
            : "text-gray-300 hover:text-white"
        }`}
      >
        {tier.cta}
      </Button>
    </DarkCard>
  );
}

export default function PricingSection() {
  return (
    <section className="bg-white/[0.015]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader badge="Pricing" title="Simple. No surprises." />

        <div className="flex flex-wrap justify-center gap-6">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
}
