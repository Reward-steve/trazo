"use client";

import { useState } from "react";
import { Copy, CheckCircle } from "lucide-react";

export default function CopyAccountNumber({
  accountNumber,
}: {
  accountNumber: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <span className="text-text-muted">Account Number</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-medium text-text">{accountNumber}</span>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg text-text-muted hover:text-primary hover:bg-surface-alt transition-all"
          title="Copy account number"
        >
          {copied ? (
            <CheckCircle className="h-4 w-4 text-primary" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
