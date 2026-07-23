import { CheckCircle } from "lucide-react";
import SectionHeader from "./SectionHeader";
import DarkCard from "./DarkCard";
import Button from "../landing/Button";
import { PLAN_ORDER, PLANS, type PlanDefinition } from "../../lib/plans";

// Which plan gets the "POPULAR" badge + accent styling.
// `isPro` in plans.ts means "paid tier" (true for both growth & pro),
// so it can't be reused here — this is a separate, presentation-only choice.
const FEATURED_PLAN_KEY = "growth";

function formatPrice(plan: PlanDefinition): string {
  if (plan.price === null) return "Free";
  return `₦${plan.price.toLocaleString()}`;
}

function PricingCard({ plan }: { plan: PlanDefinition }) {
  const isFeatured = plan.key === FEATURED_PLAN_KEY;

  return (
    <DarkCard
      hover
      variant={isFeatured ? "accent" : "default"}
      padding="p-8"
      className={`flex w-full flex-col sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] ${
        isFeatured ? "sm:-translate-y-2" : ""
      }`}
    >
      {isFeatured && (
        <>
          <span className="absolute right-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-black tracking-wide text-black">
            POPULAR
          </span>
          <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-emerald-500/10 blur-2xl" />
        </>
      )}

      <p
        className={`mb-2 text-xs font-bold uppercase tracking-widest ${
          isFeatured ? "text-emerald-400" : "text-gray-500"
        }`}
      >
        {plan.label}
      </p>

      <div className="mb-6 flex items-baseline gap-1.5">
        <span className="text-4xl font-black text-white">
          {formatPrice(plan)}
        </span>
        <span className="text-sm text-gray-500">{plan.period}</span>
      </div>

      <ul className="mb-8 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-sm text-gray-300"
          >
            <CheckCircle
              className={`mt-0.5 h-4 w-4 shrink-0 ${
                isFeatured ? "text-emerald-400" : "text-emerald-600"
              }`}
            />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        href="/signup"
        variant={isFeatured ? "primary" : "outline"}
        size="lg"
        className={`w-full justify-center ${
          isFeatured
            ? "bg-emerald-500 font-bold text-black shadow-lg shadow-emerald-500/20 hover:bg-emerald-400"
            : "text-gray-300 hover:text-white"
        }`}
      >
        {plan.cta}
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
          {PLAN_ORDER.map((key) => (
            <PricingCard key={key} plan={PLANS[key]} />
          ))}
        </div>
      </div>
    </section>
  );
}
