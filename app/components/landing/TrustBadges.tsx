import { CheckCircle } from "lucide-react";
import { trustBadges } from "../../constant";

export default function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
      {trustBadges.map((text) => (
        <span key={text} className="flex items-center gap-1.5">
          <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
          {text}
        </span>
      ))}
    </div>
  );
}
