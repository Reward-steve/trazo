"use client";

import { useState, useEffect } from "react";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { LayoutDashboard, LogOut } from "lucide-react";

const DISMISS_KEY = "trazo_landing_overlay_dismissed";

export default function SignedInOverlay({
  dashboardHref,
}: {
  dashboardHref: string;
}) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem(DISMISS_KEY);
  });
  const { signOut } = useClerk();

  useEffect(() => {
    if (!visible) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [visible]);

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="signed-in-overlay-title"
    >
      <div className="w-full max-w-sm rounded-3xl border border-white/[0.08] bg-[#111] p-6 text-center shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
          <LayoutDashboard className="h-6 w-6" />
        </div>

        <h2
          id="signed-in-overlay-title"
          className="text-lg font-black text-white"
        >
          You&apos;re already signed in
        </h2>
        <p className="mt-1.5 text-sm text-gray-400">
          Head to your dashboard, or keep browsing the site.
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <Link
            href={dashboardHref}
            className="w-full rounded-2xl bg-emerald-500 py-3 text-sm font-bold text-black transition-colors hover:bg-emerald-400"
          >
            Go to dashboard
          </Link>

          <button
            onClick={dismiss}
            className="w-full rounded-2xl border border-white/[0.08] py-3 text-sm font-semibold text-gray-300 transition-colors hover:bg-white/[0.04] hover:text-white"
          >
            Continue browsing
          </button>

          <button
            onClick={() => signOut({ redirectUrl: "/" })}
            className="mt-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-gray-500 transition-colors hover:text-red-400"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out instead
          </button>
        </div>
      </div>
    </div>
  );
}
