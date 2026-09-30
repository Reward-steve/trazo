"use client";

import { useState, useTransition } from "react";
import { Check } from "lucide-react";
import Button from "../../components/ui/Button";
import { transferShopToVendor } from "../actions/claim";

export default function ClaimForm({ slug }: { slug: string }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [pending, start] = useTransition();

  if (done) {
    return (
      <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary-dark">
        <Check className="h-3.5 w-3.5" />
        Transferred. The vendor can log in and manage it.
      </p>
    );
  }

  return (
    <div className="mt-3 space-y-2">
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Vendor's signup email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-border bg-surface-alt px-3 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none"
        />
        <Button
          loading={pending}
          onClick={() =>
            start(async () => {
              setError("");
              const res = await transferShopToVendor(slug, email);
              if (res.ok) setDone(true);
              else setError(res.error ?? "Something went wrong.");
            })
          }
          className="shrink-0 rounded-xl bg-primary px-4 text-xs font-bold text-white transition-all hover:bg-primary-dark active:scale-[0.98]"
        >
          Transfer
        </Button>
      </div>
      {error && <p className="text-[11px] text-red-600">{error}</p>}
    </div>
  );
}
