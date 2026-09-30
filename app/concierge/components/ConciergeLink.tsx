import Link from "next/link";
import { ConciergeBell } from "lucide-react";
import { isConcierge } from "../../lib/concierge";

// Renders nothing for everyone except the concierge user.
export default async function ConciergeLink() {
  if (!(await isConcierge())) return null;

  return (
    <Link
      href="/concierge"
      className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary-dark hover:bg-primary/20"
    >
      <ConciergeBell className="h-3.5 w-3.5" />
      Concierge
    </Link>
  );
}
