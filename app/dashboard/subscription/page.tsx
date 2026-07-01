import {
  ShieldCheck,
  CreditCard,
  Clock3,
  BadgeCheck,
  Zap,
  Check,
  Home,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getShopByUser } from "../../actions/settings";
import PaystackCheckout from "../../components/dashboard/PaystackCheckout";

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

const ERROR_MESSAGES: Record<string, string> = {
  amount_mismatch: "Payment amount does not match the selected plan.",
  email_mismatch: "Payment email does not match your account.",
  already_used: "This payment has already been applied to an account.",
  payment_failed: "Payment was not completed successfully.",
  server_error: "Something went wrong on our end. Please contact support.",
};

interface Props {
  searchParams: Promise<{ success?: string; error?: string }>;
}

export default async function SubscriptionPage({ searchParams }: Props) {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const shop = await getShopByUser();
  if (!shop) redirect("/onboarding");

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress ?? "";

  // Await searchParams — required in Next.js 15
  const params = await searchParams;
  const justUpgraded = params.success === "true";
  const errorKey = params.error;
  const errorMessage = errorKey ? ERROR_MESSAGES[errorKey] : null;

  const plan = shop.plan as "free" | "growth" | "pro";
  const isPaid = plan !== "free";
  const currentPlan = PLANS[plan];

  const daysIntoCycle = shop.planActivatedAt
    ? Math.floor(
        (+new Date() - new Date(shop.planActivatedAt).getTime()) /
          (1000 * 60 * 60 * 24),
      )
    : null;
  const daysLeft =
    daysIntoCycle !== null ? Math.max(0, 30 - daysIntoCycle) : null;
  const isExpiringSoon = daysLeft !== null && daysLeft <= 5;

  const supportMsg = encodeURIComponent(
    `Hi, I need help with my Trazo subscription for ${shop.shopName}.`,
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
        {/* Back to home */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-primary font-medium transition-colors"
        >
          <Home className="h-3.5 w-3.5" />
          Back to Trazo home
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

        {/* Error banner */}
        {errorMessage && (
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-text">
                Payment could not be verified
              </p>
              <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                {errorMessage}{" "}
                <a
                  href={`https://wa.me/${WHATSAPP}?text=${supportMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Contact support
                </a>{" "}
                if this keeps happening.
              </p>
            </div>
          </div>
        )}

        {/* Expiring soon warning */}
        {isPaid && isExpiringSoon && !justUpgraded && (
          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-text">
                Your plan expires in {daysLeft} day{daysLeft !== 1 ? "s" : ""}
              </p>
              <p className="text-xs text-text-muted mt-0.5">
                Renew now to avoid any interruption to your store.
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
                <p
                  className={`text-3xl font-black ${isExpiringSoon ? "text-amber-300" : "text-white"}`}
                >
                  {daysLeft}
                </p>
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

        {/* ── UPGRADE — free plan ──────────────────────────────── */}
        {!isPaid && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-text px-1">
              Upgrade your plan
            </h2>

            {/* Growth card */}
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
            </div>

            {/* Pro card */}
            <div className="bg-surface border-2 border-primary rounded-2xl p-5 space-y-4 relative">
              <div className="absolute -top-2.5 left-5 bg-primary text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                MOST POPULAR
              </div>
              <div className="flex items-start justify-between pt-1">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <BadgeCheck className="h-4 w-4 text-primary" />
                    <p className="font-bold text-text">Pro</p>
                  </div>
                  <p className="text-xs text-text-muted">What you get</p>
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
            </div>

            <p className="text-[11px] text-text-muted text-center">
              Secured by Paystack · Card, bank transfer & USSD accepted
            </p>
          </div>
        )}

        {/* ── RENEW — paid plan ────────────────────────────────── */}
        {isPaid && (
          <div className="bg-surface border border-border rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              <h2 className="font-bold text-text">Renew subscription</h2>
            </div>
            <p className="text-xs text-text-muted">
              Renew before your {daysLeft} day{daysLeft !== 1 ? "s" : ""} run
              out to keep your store running without interruption.
            </p>

            <PaystackCheckout
              plan={plan}
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
