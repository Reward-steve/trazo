"use client";

import { useRef, useMemo } from "react";
import { usePaystackPayment } from "react-paystack";
import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";
import { Plan } from "@prisma/client";
 

const PLAN_PRICES = {
  growth: 150000, // ₦1,500 in kobo
  pro: 350000,    // ₦3,500 in kobo
};

const PLAN_LABELS = {
  growth: "1,500",
  pro: "3,500",
};

interface PaystackCheckoutProps {
  plan:Plan;
  email: string;
  shopName: string;
}

export default function PaystackCheckout({
  plan,
  email,
  shopName,
}: PaystackCheckoutProps) {
  const router = useRouter();

  // Stable reference — generated once per mount, not on every render
  const reference = useRef(`trazo_${plan}_${Date.now()}`);

  const config = useMemo(
    () => ({
      reference: reference.current,
      email,
      amount: PLAN_PRICES[plan],
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
      metadata: {
        custom_fields: [
          { display_name: "Shop", variable_name: "shop_name", value: shopName },
          { display_name: "Plan", variable_name: "plan", value: plan },
        ],
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // intentionally empty — reference, plan, email, shopName are all fixed at mount
  );

  const initializePayment = usePaystackPayment(config);

  const handleSuccess = (ref: { reference: string }) => {
    router.push(`/api/paystack/verify?ref=${ref.reference}&plan=${plan}`);
  };

  const handleClose = () => {
    // User dismissed — do nothing
  };

  return (
    <button
      onClick={() =>
        initializePayment({ onSuccess: handleSuccess, onClose: handleClose })
      }
      className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-all"
    >
      <Zap className="h-4 w-4" />
      Pay ₦{PLAN_LABELS[plan]} with Paystack
    </button>
  );
}