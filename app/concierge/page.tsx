import Link from "next/link";
import { notFound } from "next/navigation";
import { isConcierge } from "../lib/concierge";

export default async function ConciergePage() {
  if (!(await isConcierge())) notFound();

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold">Concierge</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Set up a vendor&apos;s storefront for them.
      </p>
      <Link
        href="/concierge/vendors/new"
        className="mt-6 inline-block rounded-md bg-black px-4 py-2 text-white"
      >
        Create vendor
      </Link>
    </main>
  );
}
