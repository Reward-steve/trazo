import React, { ReactNode } from "react";

interface DarkCardProps {
  children: ReactNode;
  hover?: boolean;
  className?: string;
}

export default function DarkCard({
  children,
  hover = false,
  className = "",
}: DarkCardProps) {
  const baseStyle =
    "relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[#111] p-6 shadow-lg shadow-black/20 transition-all duration-300";

  // Mouse/trackpad users: full hover treatment, gated to hover-capable devices
  // so it never triggers "stuck hover" on tap.
  const hoverStyle = hover
    ? "group [@media(hover:hover)]:hover:border-emerald-500/20 [@media(hover:hover)]:hover:bg-[#141414] [@media(hover:hover)]:hover:shadow-2xl [@media(hover:hover)]:hover:shadow-emerald-500/[0.02] [@media(hover:hover)]:hover:-translate-y-1.5"
    : "";

  // Touch users: immediate press feedback that resolves on release —
  // gives the same "this responded to me" signal hover gives mouse users.
  const activeStyle = hover
    ? "active:scale-[0.98] active:border-emerald-500/25 active:bg-[#141414] active:duration-100"
    : "";

  return (
    <div className={`${baseStyle} ${hoverStyle} ${activeStyle} ${className}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      {children}
    </div>
  );
}
