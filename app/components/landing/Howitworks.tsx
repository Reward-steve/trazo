import SectionHeader from "./SectionHeader";
import DarkCard from "./DarkCard";
import { steps } from "../../constant";

export default function HowItWorks() {
  return (
    <section className="bg-white/[0.015]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeader
          badge="How it works"
          title="From zero to taking orders in 5 minutes."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map(({ number, title, description }) => (
            <DarkCard key={number} hover className="p-6">
              <div className="text-4xl font-black text-emerald-500/20 font-mono mb-4 leading-none">
                {number}
              </div>
              <h3 className="font-bold text-white text-base mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {description}
              </p>
            </DarkCard>
          ))}
        </div>
      </div>
    </section>
  );
}
