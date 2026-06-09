import SectionHeader from "./SectionHeader";
import DarkCard from "./DarkCard";
import { painPoints } from "../../constant";

export default function PainSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <SectionHeader
        badge="Sound familiar?"
        title="You're running a business inside a chat app."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
        {painPoints.map(({ icon: Icon, text }, i) => (
          <DarkCard
            key={i}
            variant="danger"
            className="flex items-start gap-3 p-4"
          >
            <Icon className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-gray-300 leading-relaxed">{text}</p>
          </DarkCard>
        ))}
      </div>

      <p className="text-gray-400 text-lg leading-relaxed text-center max-w-2xl mx-auto">
        You&apos;re not bad at business. You&apos;re managing orders with tools
        built for chatting, not selling.{" "}
        <span className="text-white font-semibold">That ends today.</span>
      </p>
    </section>
  );
}
