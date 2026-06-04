import { Lock, MessageSquare, Copy } from "lucide-react";

const YOUR_WHATSAPP = "2348098069257";

const ACCOUNT_NAME = "Trazo";
const ACCOUNT_NUMBER = "8098069257";
const BANK_NAME = "Opay";

export default async function BillingPage() {
  const message = encodeURIComponent(
    `Hi, I want to reactivate my Trazo store. I’ve made a payment of ₦3,000. Please confirm.`,
  );

  return (
    <div className="min-h-screen bg-surface-alt flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="bg-surface border border-border rounded-xl p-6 text-center mb-4">
          <div className="h-14 w-14 mx-auto bg-surface-alt border border-border rounded-xl flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-text-muted" />
          </div>

          <h1 className="text-lg font-bold text-text">
            Store currently paused
          </h1>

          <p className="text-sm text-text-muted mt-2 leading-relaxed">
            Your store is safe. Reactivate to continue receiving customer
            orders.
          </p>
        </div>

        {/* Pricing */}
        <div className="bg-surface border border-border rounded-xl p-6 mb-4">
          <div className="text-center mb-6">
            <p className="text-xs text-text-muted uppercase tracking-wide font-semibold">
              Reactivation fee
            </p>
            <p className="text-3xl font-bold text-text mt-1">₦3,000</p>
            <p className="text-sm text-text-muted">per month</p>
          </div>

          {/* Payment Details */}
          <div className="space-y-4 text-sm text-text">
            <div>
              <p className="text-text-muted text-xs mb-1">Bank Name</p>
              <p>{BANK_NAME}</p>
            </div>

            <div>
              <p className="text-text-muted text-xs mb-1">Account Name</p>
              <p>{ACCOUNT_NAME}</p>
            </div>

            <div className="flex items-center justify-between bg-surface-alt border border-border rounded-lg p-3">
              <div>
                <p className="text-text-muted text-xs mb-1">Account Number</p>
                <p className="font-medium">{ACCOUNT_NUMBER}</p>
              </div>

              <button
                onClick={() => navigator.clipboard.writeText(ACCOUNT_NUMBER)}
                className="text-text-muted hover:text-text transition"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Steps */}
          <div className="mt-5 space-y-2 text-xs text-text-muted">
            <p>1. Transfer ₦3,000 to the account above</p>
            <p>2. Send receipt on WhatsApp for activation</p>
          </div>

          {/* Primary CTA */}
          <a
            href={`https://wa.me/${YOUR_WHATSAPP}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition"
          >
            <MessageSquare className="h-4 w-4" />
            Send Payment Proof
          </a>

          <p className="text-xs text-text-muted text-center mt-3">
            Activation usually takes under 1 hour
          </p>
        </div>

        {/* Secondary Action */}
        <div className="text-center text-xs text-text-muted">
          Already paid?{" "}
          <a
            href={`https://wa.me/${YOUR_WHATSAPP}?text=${encodeURIComponent(
              "Hi, I already paid for my Trazo store. Please activate it.",
            )}`}
            className="text-text hover:underline"
          >
            Contact support
          </a>
        </div>
      </div>
    </div>
  );
}
