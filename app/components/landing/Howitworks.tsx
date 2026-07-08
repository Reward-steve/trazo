/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ComponentType } from "react";
import DarkCard from "./DarkCard";
import { steps } from "../../constant";
import {
  Smartphone,
  ShoppingBag,
  Link,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import SectionHeader from "./SectionHeader";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Smartphone: Smartphone,
  ShoppingBag: ShoppingBag,
  Link: Link,
  MessageCircle: MessageCircle,
};

export default function HowItWorks() {
  return (
    <section
      className="bg-white/[0.015] border-y border-white/[0.04] py-20 sm:py-24 relative overflow-hidden"
      id="how-it-works-section"
    >
      {/* Background ambient decorative shapes */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/[0.02] rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/[0.01] rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Fast Setup Flow"
          title="From zero to taking orders in 5 minutes."
          subtitle="No developers, complex merchant account setups, or long learning curves required. Follow these four simple steps."
        />

        {/* Card Grid Container with glowing connector track lines on desktop */}
        <div className="relative mt-4">
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-[90px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-emerald-500/0 via-white/[0.06] to-emerald-500/0 z-0 pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map(({ number, title, description, iconName }, index) => {
              const IconComponent = iconMap[iconName] || Smartphone;
              return (
                <DarkCard
                  key={number}
                  hover
                  className="p-6 sm:p-8 flex flex-col justify-between group h-full relative"
                >
                  {/* Outer edge highlight on hover */}
                  <div className="absolute inset-px rounded-[23px] bg-gradient-to-b from-white/[0.04] to-transparent group-hover:from-emerald-500/10 pointer-events-none transition-all duration-500" />

                  <div>
                    {/* Header Row: Step Number & Custom Styled Icon */}
                    <div className="flex items-center justify-between mb-6">
                      {/* Breathtaking Glowing Number */}
                      <div className="text-4xl font-black text-white/5 font-mono group-hover:text-emerald-500/15 tracking-tight transition-colors duration-500 leading-none select-none">
                        {number}
                      </div>

                      {/* Premium Floating Icon Container */}
                      <div className="h-12 w-12 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-gray-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all duration-500 shadow-md">
                        <IconComponent className="h-5 w-5 transition-transform duration-500 group-hover:scale-110" />
                      </div>
                    </div>

                    {/* Step Text Information */}
                    <h3 className="font-sans font-black text-white text-base sm:text-lg mb-3 tracking-tight group-hover:text-emerald-300 transition-colors duration-300">
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans font-medium">
                      {description}
                    </p>
                  </div>

                  {/* Decorative indicator showing progression */}
                  {index < steps.length - 1 && (
                    <div className="hidden sm:flex lg:hidden absolute -bottom-3 right-1/2 translate-x-1/2 h-6 w-6 rounded-full bg-[#111] border border-white/[0.08] items-center justify-center text-gray-600 rotate-90 z-20">
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  )}
                </DarkCard>
              );
            })}
          </div>
        </div>

        {/* Bottom micro-conversion text */}
        <div className="mt-14 text-center">
          <p className="text-xs text-gray-500 font-mono">
            💡 Setup is fully managed through a casual chat interface. No
            programming skills required.
          </p>
        </div>
      </div>
    </section>
  );
}
