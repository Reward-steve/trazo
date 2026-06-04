import {
  Lock,
  MessageSquare,
  ShieldCheck,
  CreditCard,
  Clock3,
} from "lucide-react";
import CopyAccountNumber from "../../components/dashboard/CopyAccountNumber";

const YOUR_WHATSAPP = "2348098069257";

const BANK_NAME = "Opay";
const ACCOUNT_NAME = "Trazo";
const ACCOUNT_NUMBER = "8098069257";

export default function BillingPage() {
  const paymentMessage = encodeURIComponent(
    "Hi, I want to reactivate my Trazo store. I've made a payment of ₦3,000. Please confirm.",
  );

  const supportMessage = encodeURIComponent(
    "Hi, I already paid for my Trazo store. Please activate it.",
  );

  return (
    <div className="min-h-screen bg-surface-alt px-4 py-8">
      <div className="max-w-md mx-auto space-y-4">
        {/* Status Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
            <Lock className="h-3.5 w-3.5" />
            Subscription Expired
          </div>
        </div>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-black text-text">
            Reactivate your store
          </h1>

          <p className="text-sm text-text-muted mt-2 leading-relaxed">
            Your storefront is currently paused. Renew your subscription to
            continue receiving customer orders.
          </p>
        </div>

        {/* Plan Card */}
        <div className="bg-primary-dark rounded-2xl p-5 text-white">
          <p className="text-white/70 text-xs uppercase tracking-wider">
            Current Plan
          </p>

          <div className="flex items-end gap-1 mt-2">
            <span className="text-4xl font-black">₦3,000</span>
          </div>

          <p className="text-white/70 text-sm mt-1">
            Monthly storefront subscription
          </p>
        </div>

        {/* Reassurance */}
        <div className="bg-bubble-out border border-primary/20 rounded-2xl p-4 flex gap-3">
          <ShieldCheck className="h-5 w-5 text-primary-dark shrink-0 mt-0.5" />

          <div>
            <p className="text-sm font-semibold text-text">
              Your store data is safe
            </p>

            <p className="text-xs text-text-muted mt-1 leading-relaxed">
              Products, images, settings and storefront information remain
              saved. Reactivating restores your store immediately after
              approval.
            </p>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-surface border border-border rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="h-4 w-4 text-primary" />
            <h2 className="font-bold text-text">Payment Details</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm text-text-muted">Bank</span>
              <span className="font-medium text-text">{BANK_NAME}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm text-text-muted">Account Name</span>
              <span className="font-medium text-text">{ACCOUNT_NAME}</span>
            </div>

            <CopyAccountNumber accountNumber={ACCOUNT_NUMBER} />
          </div>
        </div>

        {/* Process */}
        <div className="bg-surface border border-border rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Clock3 className="h-4 w-4 text-primary" />
            <h2 className="font-bold text-text">How activation works</h2>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-bubble-out flex items-center justify-center text-xs font-bold text-primary-dark shrink-0">
                1
              </div>

              <p className="text-sm text-text">
                Transfer ₦3,000 using the account above.
              </p>
            </div>

            <div className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-bubble-out flex items-center justify-center text-xs font-bold text-primary-dark shrink-0">
                2
              </div>

              <p className="text-sm text-text">
                Send your payment receipt on WhatsApp.
              </p>
            </div>

            <div className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-bubble-out flex items-center justify-center text-xs font-bold text-primary-dark shrink-0">
                3
              </div>

              <p className="text-sm text-text">
                Your store is reactivated after confirmation.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <a
          href={`https://wa.me/${YOUR_WHATSAPP}?text=${paymentMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 rounded-2xl transition"
        >
          <MessageSquare className="h-4 w-4" />
          Send Payment Proof
        </a>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-text-muted">
            Activation usually takes under 1 hour
          </p>

          <a
            href={`https://wa.me/${YOUR_WHATSAPP}?text=${supportMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-sm text-primary font-medium hover:underline"
          >
            Already paid? Contact support
          </a>
        </div>
      </div>
    </div>
  );
}
