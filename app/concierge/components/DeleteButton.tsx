"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteConciergeShop } from "../../concierge/actions/delete";

export default function DeleteButton({ slug }: { slug: string }) {
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");
  const [pending, start] = useTransition();

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-600"
        aria-label={`Delete ${slug}`}
      >
        <Trash2 className="h-3.5 w-3.5" />
        Delete
      </button>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-2 text-xs">
        <span className="text-text-muted">Delete shop and its products?</span>
        <button
          disabled={pending}
          onClick={() =>
            start(async () => {
              setError("");
              const res = await deleteConciergeShop(slug);
              if (!res.ok) setError(res.error ?? "Something went wrong.");
            })
          }
          className="font-bold text-red-600 hover:text-red-700 disabled:opacity-50"
        >
          {pending ? "Deleting…" : "Yes, delete"}
        </button>
        <button
          disabled={pending}
          onClick={() => {
            setConfirming(false);
            setError("");
          }}
          className="font-semibold text-text-muted hover:text-text"
        >
          Cancel
        </button>
      </div>
      {error && <p className="text-[11px] text-red-600">{error}</p>}
    </div>
  );
}
