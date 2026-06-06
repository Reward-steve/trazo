import {
  Lock,
  MessageSquare,
  ShieldCheck,
  CreditCard,
  Clock3,
  BadgeCheck,
  Calendar,
  RefreshCw,
} from "lucide-react";

import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import CopyAccountNumber from "../../components/dashboard/CopyAccountNumber";
import { getShopByUser } from "../../actions/settings";
import { Shop } from "@prisma/client";

export const dynamic = "force-dynamic";

const WHATSAPP = "2348098069257";

const BANK = "Opay";
const ACCOUNT_NAME = "Trazo";
const ACCOUNT_NUMBER = "8098069257";

/**
 * PURE LOGIC FROM YOUR SCHEMA
 */
function getSubscriptionState(shop: Shop) {
  const plan = shop.plan; // free | growth | pro

  if (!shop.isActive) {
    return {
      type: "expired",
      message:
        "Your store is currently inactive. Subscribe to reactivate access.",
      daysLeft: 0,
    };
  }

  if (plan === "free") {
    return {
      type: "free",
      message:
        "You are on the free plan. Upgrade to unlock full storefront features.",
      daysLeft: null,
    };
  }

  // paid plans
  return {
    type: "active",
    message: `You are on the ${plan.toUpperCase()} plan.`,
    daysLeft: shop.planActivatedAt
      ? Math.max(
          0,
          30 -
            Math.floor(
              (Date.now() - new Date(shop.planActivatedAt).getTime()) /
                (1000 * 60 * 60 * 24),
            ),
        )
      : null,
  };
}

export default async function SubscriptionPage() {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const shop = await getShopByUser();
  if (!shop) redirect("/onboarding");

  const state = getSubscriptionState(shop);

  const payMsg = encodeURIComponent(
    "Hi, I’ve made payment for my Trazo subscription. Please activate my store.",
  );

  const supportMsg = encodeURIComponent(
    "Hi, I need help with my Trazo subscription.",
  );

  const statusUI = {
    active: {
      icon: BadgeCheck,
      tone: "bg-green-500/15 text-green-600 border-green-200",
      label: "Active",
    },
    free: {
      icon: Clock3,
      tone: "bg-blue-500/15 text-blue-600 border-blue-200",
      label: "Free plan",
    },
    expired: {
      icon: Lock,
      tone: "bg-red-500/15 text-red-600 border-red-200",
      label: "Inactive",
    },
  };

  const Icon = statusUI[state.type].icon;

  return (
    <div className="min-h-screen bg-surface-alt px-4 py-8">
      <div className="max-w-md mx-auto space-y-5">
        {/* STATUS */}
        <div className="flex justify-center">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${
              statusUI[state.type].tone
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {statusUI[state.type].label}
          </div>
        </div>

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-2xl font-black text-text">Subscription</h1>

          <p className="text-sm text-text-muted mt-2">{state.message}</p>
        </div>

        {/* ACTIVE */}
        {state.type === "active" && (
          <div className="bg-surface border border-border rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold">
                {state.daysLeft !== null
                  ? `${state.daysLeft} days into cycle`
                  : "Active subscription"}
              </p>
            </div>

            <div className="h-px bg-border" />

            <Link
              href="/dashboard/subscription/renew"
              className="flex items-center justify-center gap-2 w-full bg-primary text-white font-semibold py-3 rounded-xl"
            >
              <RefreshCw className="h-4 w-4" />
              Manage subscription
            </Link>
          </div>
        )}

        {/* FREE / INACTIVE */}
        {state.type !== "active" && (
          <>
            {/* PLAN */}
            <div className="bg-primary-dark text-white rounded-2xl p-5">
              <p className="text-white/70 text-xs uppercase tracking-wider">
                Plans
              </p>
              <p className="text-3xl font-black mt-2">₦3,000 / month</p>
              <p className="text-white/70 text-sm mt-1">
                Unlock full storefront access
              </p>
            </div>

            {/* SAFETY */}
            <div className="bg-bubble-out border border-primary/20 rounded-2xl p-4 flex gap-3">
              <ShieldCheck className="h-5 w-5 text-primary-dark mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-text">
                  Your data is safe
                </p>
                <p className="text-xs text-text-muted mt-1">
                  Nothing is deleted. Reactivation restores everything
                  instantly.
                </p>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="bg-surface border border-border rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="h-4 w-4 text-primary" />
                <h2 className="font-bold text-text">Payment</h2>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-border py-2">
                  <span className="text-text-muted">Bank</span>
                  <span>{BANK}</span>
                </div>

                <div className="flex justify-between border-b border-border py-2">
                  <span className="text-text-muted">Account</span>
                  <span>{ACCOUNT_NAME}</span>
                </div>

                <CopyAccountNumber accountNumber={ACCOUNT_NUMBER} />
              </div>
            </div>

            {/* CTA */}
            <a
              href={`https://wa.me/${WHATSAPP}?text=${payMsg}`}
              target="_blank"
              className="flex items-center justify-center gap-2 w-full bg-primary text-white font-semibold py-3.5 rounded-2xl"
            >
              <MessageSquare className="h-4 w-4" />
              Send payment proof
            </a>
          </>
        )}

        {/* SUPPORT */}
        <div className="text-center">
          <p className="text-xs text-text-muted">
            Need help? Support responds quickly
          </p>

          <a
            href={`https://wa.me/${WHATSAPP}?text=${supportMsg}`}
            className="inline-block mt-3 text-sm text-primary font-medium hover:underline"
          >
            Contact support
          </a>
        </div>
      </div>
    </div>
  );
}
