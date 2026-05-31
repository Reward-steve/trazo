import Link from "next/link";
import { Store } from "lucide-react";

export default function StoreNotFound() {
  return (
    <div className="min-h-screen bg-surface-alt flex flex-col items-center justify-center text-center px-4">
      <div className="h-16 w-16 bg-surface border border-border rounded-2xl flex items-center justify-center mb-4">
        <Store className="h-7 w-7 text-text-muted" />
      </div>
      <h1 className="text-lg font-bold text-text mb-1">Shop not found</h1>
      <p className="text-xs text-text-muted mb-6 max-w-xs">
        This store doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/"
        className="bg-header hover:bg-primary-dark text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors"
      >
        Back to Trazo
      </Link>
    </div>
  );
}
