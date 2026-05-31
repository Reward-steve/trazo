"use client";

import { useState } from "react";
import { Copy, CheckCircle } from "lucide-react";

export default function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
    >
      {copied ? (
        <>
          <CheckCircle className="h-3.5 w-3.5" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          Copy link
        </>
      )}
    </button>
  );
}
