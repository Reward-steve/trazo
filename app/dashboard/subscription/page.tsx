import {
  Lock,
  MessageSquare,
  ShieldCheck,
  CreditCard,
  Clock3,
  BadgeCheck,
  Zap,
} from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getShopByUser } from "../../actions/settings";
import CopyAccountNumber from "../../components/dashboard/CopyAccountNumber";

export const dynamic = "force-dynamic";

const WHATSAPP = "2348098069257";
const BANK = "Opay";
const ACCOUNT_NAME = "Trazo";
const ACCOUNT_NUMBER = "8098069257";

const PLANS = {
  free: { label: "Free Plan", limit: 10, price: null },
  growth: { label: "Growth Plan", limit: 50, price: 1500 },
  pro: { label: "Pro Plan", limit: 999, price: 3500 },
};

export default async function SubscriptionPage() {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const shop = await getShopByUser();
  if (!shop) redirect("/onboarding");

  const plan = shop.plan as "free" | "growth" | "pro";
  const isPaid = plan !== "free";
  const currentPlan = PLANS[plan];

  // Days into current paid cycle
  const daysIntoCycle = shop.planActivatedAt
    ? Math.floor(
        (+new Date() - new Date(shop.planActivatedAt).getTime()) /
          (1000 * 60 * 60 * 24),
      )
    : null;
  const daysLeft =
    daysIntoCycle !== null ? Math.max(0, 30 - daysIntoCycle) : null;

  const payMsg = encodeURIComponent(
    `Hi, I want to upgrade my Trazo store (${shop.shopName}) to Growth plan. Sending ₦1,500 now.`,
  );
  const renewMsg = encodeURIComponent(
    `Hi, I want to renew my Trazo ${plan} plan for ${shop.shopName}. Sending payment now.`,
  );
  const supportMsg = encodeURIComponent(
    "Hi, I need help with my Trazo subscription.",
  );

  const statusConfig = {
    free: {
      icon: Clock3,
      tone: "bg-surface-alt text-text-muted border-border",
      label: "Free Plan",
    },
    growth: {
      icon: BadgeCheck,
      tone: "bg-bubble-out text-primary-dark border-primary/20",
      label: "Growth Plan",
    },
    pro: {
      icon: BadgeCheck,
      tone: "bg-bubble-out text-primary-dark border-primary/20",
      label: "Pro Plan",
    },
  };

  const StatusIcon = statusConfig[plan].icon;

  return (
    <div className="min-h-screen bg-surface-alt px-4 py-8">
      <div className="max-w-md mx-auto space-y-5">
        {/* Status badge */}
        <div className="flex justify-center">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${statusConfig[plan].tone}`}
          >
            <StatusIcon className="h-3.5 w-3.5" />
            {statusConfig[plan].label}
          </div>
        </div>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-black text-text">Subscription</h1>
          <p className="text-sm text-text-muted mt-2">
            {isPaid
              ? `Your store is active on the ${currentPlan.label}.`
              : "You're on the free plan. Upgrade to unlock more products and remove Trazo branding."}
          </p>
        </div>

        {/* Current plan card */}
        <div className="bg-primary-dark text-white rounded-2xl p-5">
          <p className="text-white/60 text-xs uppercase tracking-wider mb-2">
            Current plan
          </p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-black">{currentPlan.label}</p>
              <p className="text-white/70 text-sm mt-0.5">
                Up to{" "}
                {currentPlan.limit === 999 ? "unlimited" : currentPlan.limit}{" "}
                products
              </p>
            </div>
            {isPaid && daysLeft !== null && (
              <div className="text-right">
                <p className="text-3xl font-black">{daysLeft}</p>
                <p className="text-white/60 text-xs">days left</p>
              </div>
            )}
          </div>
        </div>

        {/* Safety notice — always shown */}
        <div className="bg-bubble-out border border-primary/20 rounded-2xl p-4 flex gap-3">
          <ShieldCheck className="h-5 w-5 text-primary-dark mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-text">
              Your data is always safe
            </p>
            <p className="text-xs text-text-muted mt-1 leading-relaxed">
              Products, images and settings are never deleted regardless of
              plan.
            </p>
          </div>
        </div>

        {/* Upgrade options — shown for free plan */}
        {!isPaid && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-text px-1">
              Upgrade your plan
            </h2>

            {/* Growth */}
            <div className="bg-surface border border-border rounded-2xl p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="h-4 w-4 text-primary" />
                    <p className="font-bold text-text">Growth</p>
                  </div>
                  <p className="text-xs text-text-muted">
                    50 products · No Trazo branding
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-text">₦1,500</p>
                  <p className="text-xs text-text-muted">/month</p>
                </div>
              </div>

              {/* Payment details */}
              <div className="bg-surface-alt rounded-xl p-4 space-y-3 text-sm">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">
                  Pay via bank transfer
                </p>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-text-muted">Bank</span>
                  <span className="font-medium text-text">{BANK}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-text-muted">Account name</span>
                  <span className="font-medium text-text">{ACCOUNT_NAME}</span>
                </div>
                <CopyAccountNumber accountNumber={ACCOUNT_NUMBER} />
              </div>

              <a
                href={`https://wa.me/${WHATSAPP}?text=${payMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-all"
              >
                <MessageSquare className="h-4 w-4" />
                Send payment proof
              </a>
            </div>
          </div>
        )}

        {/* Renew — shown for paid plan */}
        {isPaid && (
          <div className="bg-surface border border-border rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <CreditCard className="h-4 w-4 text-primary" />
              <h2 className="font-bold text-text">Renew subscription</h2>
            </div>

            <div className="bg-surface-alt rounded-xl p-4 space-y-3 text-sm">
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-text-muted">Bank</span>
                <span className="font-medium text-text">{BANK}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-text-muted">Account name</span>
                <span className="font-medium text-text">{ACCOUNT_NAME}</span>
              </div>
              <CopyAccountNumber accountNumber={ACCOUNT_NUMBER} />
            </div>

            <a
              href={`https://wa.me/${WHATSAPP}?text=${renewMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-all"
            >
              <MessageSquare className="h-4 w-4" />
              Send renewal payment
            </a>
          </div>
        )}

        {/* Support */}
        <div className="text-center space-y-1">
          <p className="text-xs text-text-muted">Questions? We respond fast.</p>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${supportMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm text-primary font-medium hover:underline"
          >
            Contact support on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
