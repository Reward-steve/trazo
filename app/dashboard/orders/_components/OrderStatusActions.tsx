"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, AlertTriangle, Clock, Check } from "lucide-react";
import { updateOrderStatus } from "../../../actions/orderActions";
import { cn } from "../../../lib/utils";
import { OrderStatus } from "@prisma/client";

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; className: string; icon: React.ReactNode }
> = {
  pending_payment: {
    label: "Awaiting payment",
    className: "bg-surface-alt text-text-muted",
    icon: <Clock className="h-3 w-3" />,
  },
  customer_claims_paid: {
    label: "Customer says paid",
    className: "bg-amber-500/10 text-amber-600",
    icon: <AlertTriangle className="h-3 w-3" />,
  },
  vendor_confirmed: {
    label: "Payment confirmed",
    className: "bg-primary/10 text-primary-dark",
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
  vendor_disputed: {
    label: "Disputed",
    className: "bg-red-500/10 text-red-600",
    icon: <AlertTriangle className="h-3 w-3" />,
  },
  fulfilled: {
    label: "Fulfilled",
    className: "bg-emerald-500/10 text-emerald-600",
    icon: <Check className="h-3 w-3" />,
  },
};

export default function OrderStatusActions({
  orderId,
  initialStatus,
}: {
  orderId: string;
  initialStatus: OrderStatus;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<OrderStatus>(initialStatus);
  const [loading, setLoading] = useState<"confirm" | "dispute" | null>(null);
  const [error, setError] = useState("");

  const config = STATUS_CONFIG[status];

  const handleUpdate = async (next: "vendor_confirmed" | "vendor_disputed") => {
    setLoading(next === "vendor_confirmed" ? "confirm" : "dispute");
    setError("");
    try {
      await updateOrderStatus(orderId, next);
      setStatus(next);
      router.refresh();
    } catch {
      setError("Couldn't update — try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-2">
      <span
        className={cn(
          "inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full",
          config.className,
        )}
      >
        {config.icon}
        {config.label}
      </span>

      {/* Only actionable while the customer has claimed payment and the
          vendor hasn't already ruled on it — prevents re-confirming or
          flip-flopping after a decision is made. */}
      {status === "customer_claims_paid" && (
        <div className="flex gap-2">
          <button
            onClick={() => handleUpdate("vendor_confirmed")}
            disabled={loading !== null}
            className="flex-1 text-xs font-semibold bg-primary text-white rounded-lg py-2 disabled:opacity-50"
          >
            {loading === "confirm" ? "Confirming…" : "Confirm payment"}
          </button>
          <button
            onClick={() => handleUpdate("vendor_disputed")}
            disabled={loading !== null}
            className="flex-1 text-xs font-semibold bg-red-500/10 text-red-600 rounded-lg py-2 disabled:opacity-50"
          >
            {loading === "dispute" ? "Marking…" : "Not received"}
          </button>
        </div>
      )}

      {error && <p className="text-[11px] text-red-500">{error}</p>}
    </div>
  );
}
