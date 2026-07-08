import React, { ReactNode } from "react";

type CardVariant = "default" | "danger" | "accent";

interface DarkCardProps {
  children: ReactNode;
  hover?: boolean;
  variant?: CardVariant;
  className?: string;
}

const variants: Record<CardVariant, string> = {
  default: "bg-[#111] border-white/[0.06]",
  danger: "bg-red-500/[0.04] border-red-500/[0.12]",
  accent:
    "bg-gradient-to-b from-emerald-500/[0.06] to-[#111] border-emerald-500/30",
};

// Hover/active accents adapt per variant so a danger card presses red,
// not emerald — the interaction color should match the card's own tone.
const hoverAccents: Record<CardVariant, string> = {
  default:
    "[@media(hover:hover)]:hover:border-emerald-500/20 [@media(hover:hover)]:hover:bg-[#141414] [@media(hover:hover)]:hover:shadow-emerald-500/[0.02]",
  danger:
    "[@media(hover:hover)]:hover:border-red-500/25 [@media(hover:hover)]:hover:bg-red-500/[0.06] [@media(hover:hover)]:hover:shadow-red-500/[0.04]",
  accent:
    "[@media(hover:hover)]:hover:border-emerald-500/40 [@media(hover:hover)]:hover:shadow-emerald-500/[0.04]",
};

const activeAccents: Record<CardVariant, string> = {
  default: "active:border-emerald-500/25 active:bg-[#141414]",
  danger: "active:border-red-500/30 active:bg-red-500/[0.08]",
  accent: "active:border-emerald-500/45",
};

export default function DarkCard({
  children,
  hover = false,
  variant = "default",
  className = "",
}: DarkCardProps) {
  const baseStyle =
    "relative overflow-hidden rounded-3xl border p-6 shadow-lg shadow-black/20 transition-all duration-300";

  const hoverStyle = hover
    ? `group [@media(hover:hover)]:hover:-translate-y-1.5 [@media(hover:hover)]:hover:shadow-2xl ${hoverAccents[variant]}`
    : "";

  const activeStyle = hover
    ? `active:scale-[0.98] active:duration-100 ${activeAccents[variant]}`
    : "";

  return (
    <div
      className={`${baseStyle} ${variants[variant]} ${hoverStyle} ${activeStyle} ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      {children}
    </div>
  );
}
