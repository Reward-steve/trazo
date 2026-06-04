import { Lock, MessageSquare } from "lucide-react";
import CopyAccountNumber from "../../components/dashboard/CopyAccountNumber";

const YOUR_WHATSAPP = "2348098069257";
const BANK_NAME = "Opay";
const ACCOUNT_NAME = "Trazo";
const ACCOUNT_NUMBER = "8098069257";

export default function BillingPage() {
  const message = encodeURIComponent(
    `Hi, I want to reactivate my Trazo store. I've made a payment of ₦3,000. Please confirm.`,
  );

  const alreadyPaidMessage = encodeURIComponent(
    "Hi, I already paid for my Trazo store. Please activate it.",
  );

  return (
    <div className="min-h-screen bg-surface-alt flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-4">
        {/* Header */}
        <div className="bg-surface border border-border rounded-xl p-6 text-center">
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

        {/* Payment card */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="text-center mb-6">
            <p className="text-xs text-text-muted uppercase tracking-wide font-semibold">
              Reactivation fee
            </p>
            <p className="text-3xl font-bold text-text mt-1">₦3,000</p>
            <p className="text-sm text-text-muted">per month</p>
          </div>

          {/* Bank details */}
          <div className="space-y-3 text-sm text-text mb-5">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-muted">Bank</span>
              <span className="font-medium">{BANK_NAME}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-muted">Account Name</span>
              <span className="font-medium">{ACCOUNT_NAME}</span>
            </div>
            <CopyAccountNumber accountNumber={ACCOUNT_NUMBER} />
          </div>

          {/* Steps */}
          <div className="bg-surface-alt rounded-lg p-3 space-y-1.5 text-xs text-text-muted mb-5">
            <p>1. Transfer ₦3,000 to the account above</p>
            <p>2. Take a screenshot of your receipt</p>
            <p>3. Send it on WhatsApp using the button below</p>
            <p>4. We activate your store within 1 hour</p>
          </div>

          {/* CTA */}
          <a
            href={`https://wa.me/${YOUR_WHATSAPP}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-all"
          >
            <MessageSquare className="h-4 w-4" />
            Send Payment Proof on WhatsApp
          </a>

          <p className="text-xs text-text-muted text-center mt-3">
            Activation usually takes under 1 hour
          </p>
        </div>

        {/* Support */}
        <p className="text-center text-xs text-text-muted">
          Already paid?{" "}
          <a
            href={`https://wa.me/${YOUR_WHATSAPP}?text=${alreadyPaidMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            Contact support on WhatsApp
          </a>
        </p>
      </div>
    </div>
  );
}
