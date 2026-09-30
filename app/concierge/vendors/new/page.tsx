import { notFound } from "next/navigation";
import { isConcierge } from "../../../lib/concierge";
import VendorForm from "./vendor-form";

export default async function NewVendorPage() {
  if (!(await isConcierge())) notFound();
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-semibold">Create vendor</h1>
      <VendorForm />
    </main>
  );
}
