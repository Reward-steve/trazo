/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode } from "react";

interface DarkCardProps {
  children: ReactNode;
  hover?: boolean;
  className?: string;
  key?: string | number;
}

export default function DarkCard({
  children,
  hover = false,
  className = "",
}: DarkCardProps) {
  const baseStyle =
    "bg-[#111] border border-white/[0.05] rounded-3xl p-6 relative overflow-hidden transition-all duration-500";

  const hoverStyle = hover
    ? "hover:border-emerald-500/20 hover:bg-[#141414] hover:shadow-2xl hover:shadow-emerald-500/[0.02] hover:-translate-y-1.5 group"
    : "";

  return (
    <div className={`${baseStyle} ${hoverStyle} ${className}`}>
      {/* Subtle top highlights to make the card pop */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none" />
      {children}
    </div>
  );
}
