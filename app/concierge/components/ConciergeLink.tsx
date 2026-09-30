import Link from "next/link";
import { isConcierge } from "../../lib/concierge";

// Renders nothing for everyone except the concierge user.
export default async function ConciergeLink() {
  if (!(await isConcierge())) return null;
  return (
    <Link href="/concierge" className="text-sm font-medium underline">
      Concierge
    </Link>
  );
}
