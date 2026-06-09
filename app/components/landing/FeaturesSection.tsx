import SectionHeader from "./SectionHeader";
import DarkCard from "./DarkCard";
import { features } from "../../constant";

export default function FeaturesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <SectionHeader
        badge="What you get"
        title="Everything a serious vendor needs. Nothing that wastes your time."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map(({ icon: Icon, title, description }) => (
          <DarkCard key={title} hover className="group p-6">
            <div className="h-11 w-11 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-emerald-500/20 transition-colors">
              <Icon className="h-5 w-5 text-emerald-400" />
            </div>
            <h3 className="font-bold text-white text-base mb-2">{title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
          </DarkCard>
        ))}
      </div>
    </section>
  );
}