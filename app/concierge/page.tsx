import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Plus } from "lucide-react";
import { db } from "../lib/db";
import { isConcierge } from "../lib/concierge";
import ClaimForm from "./components/ClaimForm";

export default async function ConciergePage() {
  if (!(await isConcierge())) notFound();

  const waiting = await db.shop.findMany({
    where: { ownerId: { startsWith: "concierge_" } },
    select: { id: true, shopName: true, slug: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold leading-tight text-text">
            Concierge
          </h1>
          <p className="mt-0.5 text-xs text-text-muted">
            Set up vendors, then hand their shops over.
          </p>
        </div>
        <Link
          href="/concierge/vendors/new"
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary-dark"
        >
          <Plus className="h-3.5 w-3.5" />
          Create vendor
        </Link>
      </div>

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-text">
            Waiting to be handed over
          </h2>
          <span className="text-[11px] text-text-muted">{waiting.length}</span>
        </div>

        {waiting.length === 0 ? (
          <p className="rounded-2xl border border-border bg-surface-alt p-4 text-xs text-text-muted">
            Nothing waiting. Every shop you created has an owner.
          </p>
        ) : (
          waiting.map((s) => (
            <div
              key={s.id}
              className="rounded-2xl border border-border bg-surface p-4"
            >
              <p className="text-sm font-bold text-text">{s.shopName}</p>
              <a
                href={`/store/${s.slug}`}
                target="_blank"
                rel="noreferrer"
                className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-text-muted hover:text-text"
              >
                /store/{s.slug}
                <ExternalLink className="h-3 w-3" />
              </a>
              <ClaimForm slug={s.slug} />
            </div>
          ))
        )}
      </section>
    </div>
  );
}
