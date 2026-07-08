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
  Smartphone,
  ShoppingBag,
  Link,
  MessageCircle,
};

export default function HowItWorks() {
  return (
    <section
      id="how-it-works-section"
      className="relative overflow-hidden border-y border-white/[0.04] bg-white/[0.015] py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-emerald-500/[0.02] blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-blue-500/[0.01] blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Fast Setup Flow"
          title="From zero to taking orders in 5 minutes."
          subtitle="No developers, complex merchant account setups, or long learning curves required. Follow these four simple steps."
        />

        <div className="relative mt-4">
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-[90px] z-0 hidden h-px bg-gradient-to-r from-emerald-500/0 via-white/[0.06] to-emerald-500/0 lg:block" />

          <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ number, title, description, iconName }, index) => {
              const Icon = iconMap[iconName] ?? Smartphone;
              const isLast = index === steps.length - 1;

              return (
                <DarkCard
                  key={number}
                  hover
                  className="group relative flex h-full flex-col justify-between p-6 sm:p-8"
                >
                  <div className="pointer-events-none absolute inset-px rounded-[23px] bg-gradient-to-b from-white/[0.04] to-transparent transition-colors duration-500 group-hover:from-emerald-500/10" />

                  <div>
                    <div className="mb-6 flex items-center justify-between">
                      <span className="select-none font-mono text-4xl font-black leading-none tracking-tight text-white/5 transition-colors duration-500 group-hover:text-emerald-500/15">
                        {number}
                      </span>

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.05] bg-white/[0.02] text-gray-400 shadow-md transition-all duration-500 group-hover:border-emerald-500/20 group-hover:bg-emerald-500/10 group-hover:text-emerald-400">
                        <Icon className="h-5 w-5 transition-transform duration-500 group-hover:scale-110" />
                      </div>
                    </div>

                    <h3 className="mb-3 text-base font-black tracking-tight text-white transition-colors duration-300 group-hover:text-emerald-300 sm:text-lg">
                      {title}
                    </h3>
                    <p className="text-xs font-medium leading-relaxed text-gray-400 sm:text-sm">
                      {description}
                    </p>
                  </div>

                  {!isLast && (
                    <div className="absolute -bottom-3 right-1/2 z-20 hidden h-6 w-6 translate-x-1/2 items-center justify-center rounded-full border border-white/[0.08] bg-[#111] text-gray-600 sm:flex lg:hidden">
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  )}
                </DarkCard>
              );
            })}
          </div>
        </div>

        <p className="mt-14 text-center font-mono text-xs text-gray-500">
          💡 Setup is fully managed through a casual chat interface. No
          programming skills required.
        </p>
      </div>
    </section>
  );
}
