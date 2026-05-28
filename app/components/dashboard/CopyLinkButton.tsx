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
      className="flex items-center gap-2 bg-white text-emerald-700 text-sm font-bold px-4 py-2 rounded-xl transition-all hover:bg-emerald-50"
    >
      {copied ? (
        <>
          <CheckCircle className="h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          Copy link
        </>
      )}
    </button>
  );
}
