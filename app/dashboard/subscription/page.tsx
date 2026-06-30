import {
  ShieldCheck,
  CreditCard,
  Clock3,
  BadgeCheck,
  Zap,
  Check,
  Home,
  Star,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getShopByUser } from "@/app/actions/settings";
import PaystackCheckout from "@/app/components/dashboard/PaystackCheckout";
import { Plan } from "@prisma/client";

export const dynamic = "force-dynamic";

const WHATSAPP = "2348098069257";

const PLANS = {
  free: {
    label: "Free Plan",
    limit: 10,
    price: null,
    features: [
      "10 products",
      "Trazo branding on storefront",
      "Unlimited WhatsApp orders",
    ],
  },
  growth: {
    label: "Growth Plan",
    limit: 50,
    price: 1500,
    features: [
      "50 products",
      "No Trazo branding — your store looks 100% yours",
      "Unlimited WhatsApp orders",
      "Priority support on WhatsApp",
    ],
  },
  pro: {
    label: "Pro Plan",
    limit: 999,
    price: 3500,
    features: [
      "Unlimited products",
      "No Trazo branding",
      "Unlimited WhatsApp orders",
      "Priority support on WhatsApp",
      "Early access to new features",
    ],
  },
};

interface Props {
  // Next.js 15: searchParams is a Promise
  searchParams: Promise<{ success?: string }>;
}

export default async function SubscriptionPage({ searchParams }: Props) {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const shop = await getShopByUser();
  if (!shop) redirect("/onboarding");

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress ?? "";

  // Await searchParams before reading — required in Next.js 15
  const { success } = await searchParams;
  const justUpgraded = success === "true";

  const plan = shop.plan as Plan;
  const isPaid = plan !== "free";
  const currentPlan = PLANS[plan];

  // Only "growth" | "pro" are valid for PaystackCheckout
  const paidPlan = isPaid ? (plan as Exclude<Plan, "free">) : null;

  const daysIntoCycle = shop.planActivatedAt
    ? Math.floor(
        (+new Date() - new Date(shop.planActivatedAt).getTime()) /
          (1000 * 60 * 60 * 24),
      )
    : null;
  const daysLeft =
    daysIntoCycle !== null ? Math.max(0, 30 - daysIntoCycle) : null;

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
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-primary font-medium transition-colors"
        >
          <Home className="h-3.5 w-3.5" />
          Back to Website
        </Link>

        {/* Success banner */}
        {justUpgraded && (
          <div className="bg-bubble-out border border-primary/20 rounded-2xl p-4 flex items-center gap-3">
            <div className="h-8 w-8 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-text">Plan activated 🎉</p>
              <p className="text-xs text-text-muted mt-0.5">
                You&apos;re now on the {currentPlan.label}. Your store is fully
                unlocked.
              </p>
            </div>
          </div>
        )}

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
          <div className="flex items-end justify-between mb-4">
            <p className="text-2xl font-black">{currentPlan.label}</p>
            {isPaid && daysLeft !== null && (
              <div className="text-right">
                <p className="text-3xl font-black">{daysLeft}</p>
                <p className="text-white/60 text-xs">days left</p>
              </div>
            )}
          </div>
          <ul className="space-y-1.5 border-t border-white/15 pt-3">
            {currentPlan.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 text-sm text-white/85"
              >
                <Check className="h-3.5 w-3.5 mt-0.5 shrink-0 text-white/60" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Safety notice */}
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

        {/* ── UPGRADE — free plan only ─────────────────────────── */}
        {!isPaid && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-text px-1">
              Upgrade your plan
            </h2>

            {/* Growth plan */}
            <div className="bg-surface border border-border rounded-2xl p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="h-4 w-4 text-primary" />
                    <p className="font-bold text-text">Growth</p>
                  </div>
                  <p className="text-xs text-text-muted">What you get</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-text">₦1,500</p>
                  <p className="text-xs text-text-muted">/month</p>
                </div>
              </div>
              <ul className="space-y-2 bg-surface-alt rounded-xl p-4">
                {PLANS.growth.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-text"
                  >
                    <Check className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <PaystackCheckout
                plan="growth"
                email={email}
                shopName={shop.shopName}
              />
              <p className="text-[11px] text-text-muted text-center">
                Secured by Paystack · Card, bank transfer & USSD accepted
              </p>
            </div>

            {/* Pro plan */}
            <div className="bg-surface border border-border rounded-2xl p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="h-4 w-4 text-primary" />
                    <p className="font-bold text-text">Pro</p>
                  </div>
                  <p className="text-xs text-text-muted">For serious sellers</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-text">₦3,500</p>
                  <p className="text-xs text-text-muted">/month</p>
                </div>
              </div>
              <ul className="space-y-2 bg-surface-alt rounded-xl p-4">
                {PLANS.pro.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-text"
                  >
                    <Check className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <PaystackCheckout
                plan="pro"
                email={email}
                shopName={shop.shopName}
              />
              <p className="text-[11px] text-text-muted text-center">
                Secured by Paystack · Card, bank transfer & USSD accepted
              </p>
            </div>
          </div>
        )}

        {/* ── RENEW — paid plan only ───────────────────────────── */}
        {isPaid && paidPlan && (
          <div className="bg-surface border border-border rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              <h2 className="font-bold text-text">Renew subscription</h2>
            </div>
            <p className="text-xs text-text-muted">
              Your plan renews manually. Pay before your {daysLeft} days run out
              to avoid any interruption.
            </p>
            <PaystackCheckout
              plan={paidPlan}
              email={email}
              shopName={shop.shopName}
            />
            <p className="text-[11px] text-text-muted text-center">
              Secured by Paystack · Card, bank transfer & USSD accepted
            </p>
          </div>
        )}

        {/* Support */}
        <div className="text-center space-y-1 pb-4">
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
