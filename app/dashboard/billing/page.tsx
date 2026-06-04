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
import CopyAccountNumber from "../../components/dashboard/CopyAccountNumber";
import {
  getShopBillingBanner,
  ShopDates,
} from "../../actions/subscriptionGuard";

const YOUR_WHATSAPP = "2348098069257";

const BANK_NAME = "Opay";
const ACCOUNT_NAME = "Trazo";
const ACCOUNT_NUMBER = "8098069257";

export default function BillingPage({
  shop,
}: {
  shop: ShopDates & { shopName?: string };
}) {
  const banner = getShopBillingBanner(shop);

  const paymentMessage = encodeURIComponent(
    "Hi, I want to reactivate my Trazo store. I've made a payment of ₦3,000. Please confirm.",
  );

  const supportMessage = encodeURIComponent(
    "Hi, I already paid for my Trazo store. Please activate it.",
  );

  const statusConfig = {
    active: {
      icon: BadgeCheck,
      tone: "bg-green-500/15 text-green-600 border-green-200",
      label: "Active subscription",
    },
    trial: {
      icon: Clock3,
      tone: banner.tone
        ? "bg-orange-500/15 text-orange-600 border-orange-200"
        : "bg-blue-500/15 text-blue-600 border-blue-200",
      label: "Free trial",
    },
    expired: {
      icon: Lock,
      tone: "bg-red-500/15 text-red-600 border-red-200",
      label: "Subscription expired",
    },
  };

  const StatusIcon = statusConfig[banner.type].icon;

  return (
    <div className="min-h-screen bg-surface-alt px-4 py-8">
      <div className="max-w-md mx-auto space-y-5">
        {/* STATUS BADGE */}
        <div className="flex justify-center">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${
              statusConfig[banner.type].tone
            }`}
          >
            <StatusIcon className="h-3.5 w-3.5" />
            {statusConfig[banner.type].label}
          </div>
        </div>

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-2xl font-black text-text">
            {banner.type === "active"
              ? "Manage your subscription"
              : "Keep your store running"}
          </h1>

          <p className="text-sm text-text-muted mt-2 leading-relaxed">
            {banner.message}
          </p>
        </div>

        {/* ACTIVE STATE CARD */}
        {banner.type === "active" && (
          <div className="bg-surface border border-border rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-text">
              <Calendar className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold">
                {banner.daysLeft} day{banner.daysLeft !== 1 ? "s" : ""}{" "}
                remaining
              </p>
            </div>

            <div className="h-px bg-border" />

            <Link
              href="/dashboard/billing/renew"
              className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl"
            >
              <RefreshCw className="h-4 w-4" />
              Renew subscription
            </Link>
          </div>
        )}

        {/* TRIAL / EXPIRED REACTIVATION CARD */}
        {banner.type !== "active" && (
          <>
            {/* Plan */}
            <div className="bg-primary-dark rounded-2xl p-5 text-white">
              <p className="text-white/70 text-xs uppercase tracking-wider">
                Monthly plan
              </p>
              <p className="text-4xl font-black mt-2">₦3,000</p>
              <p className="text-white/70 text-sm mt-1">
                Unlimited storefront access
              </p>
            </div>

            {/* SAFETY */}
            <div className="bg-bubble-out border border-primary/20 rounded-2xl p-4 flex gap-3">
              <ShieldCheck className="h-5 w-5 text-primary-dark mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-text">
                  Your store data is safe
                </p>
                <p className="text-xs text-text-muted mt-1">
                  Nothing is deleted when paused. Everything restores instantly
                  after payment.
                </p>
              </div>
            </div>

            {/* PAYMENT DETAILS */}
            <div className="bg-surface border border-border rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="h-4 w-4 text-primary" />
                <h2 className="font-bold text-text">Payment details</h2>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-text-muted">Bank</span>
                  <span>{BANK_NAME}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-text-muted">Account</span>
                  <span>{ACCOUNT_NAME}</span>
                </div>

                <CopyAccountNumber accountNumber={ACCOUNT_NUMBER} />
              </div>
            </div>

            {/* STEPS */}
            <div className="bg-surface border border-border rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-primary" />
                <h2 className="font-bold text-text">How it works</h2>
              </div>

              <div className="space-y-3 text-sm text-text">
                <p>1. Transfer ₦3,000 to the account above</p>
                <p>2. Send payment proof on WhatsApp</p>
                <p>3. Your store is reactivated within minutes</p>
              </div>
            </div>

            {/* CTA */}
            <a
              href={`https://wa.me/${YOUR_WHATSAPP}?text=${paymentMessage}`}
              target="_blank"
              className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 rounded-2xl"
            >
              <MessageSquare className="h-4 w-4" />
              Send payment proof
            </a>
          </>
        )}

        {/* SUPPORT */}
        <div className="text-center">
          <p className="text-xs text-text-muted">
            Need help? We usually respond within 1 hour
          </p>

          <a
            href={`https://wa.me/${YOUR_WHATSAPP}?text=${supportMessage}`}
            className="inline-block mt-3 text-sm text-primary font-medium hover:underline"
          >
            Contact support
          </a>
        </div>
      </div>
    </div>
  );
}
