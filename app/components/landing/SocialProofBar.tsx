import { proofStats } from "../../constant";

export default function SocialProofBar() {
  return (
    <div className="border-y border-emerald-500/10 bg-emerald-500/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center justify-center gap-8 sm:gap-16">
        {proofStats.map(({ num, label }) => (
          <div key={label} className="text-center">
            <div className="text-2xl font-black text-emerald-400">{num}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
