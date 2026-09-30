import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import VendorForm from "../../components/vendor-form";
import { isConcierge } from "../../../lib/concierge";


export default async function NewVendorPage() {
  if (!(await isConcierge())) notFound();

  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-6">
      <Link
        href="/concierge"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-text-muted hover:text-text"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Concierge
      </Link>
      <div>
        <h1 className="text-lg font-bold leading-tight text-text">
          Create vendor
        </h1>
        <p className="mt-0.5 text-xs text-text-muted">
          Set up their storefront and products.
        </p>
      </div>
      <VendorForm />
    </div>
  );
}
