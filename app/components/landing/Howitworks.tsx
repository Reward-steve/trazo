import React, { ComponentType } from "react";
import { steps } from "../../constant";
import { Smartphone, ShoppingBag, Link, MessageCircle } from "lucide-react";
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

        {/* MOBILE / TABLET — vertical timeline. The connecting rail is a real
            flex column (circle + flex-1 line), so it always matches the
            height of whatever text sits beside it — no pixel-guessing. */}
        <ol className="mt-12 lg:hidden">
          {steps.map(({ number, title, description, iconName }, index) => {
            const Icon = iconMap[iconName] ?? Smartphone;
            const isLast = index === steps.length - 1;

            return (
              <li key={number} className="group relative flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#111] font-mono text-xs font-bold text-emerald-400 transition-colors duration-300 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10">
                    {number}
                  </div>
                  {!isLast && (
                    <div
                      aria-hidden="true"
                      className="my-2 w-px flex-1 bg-gradient-to-b from-white/10 to-white/[0.02]"
                    />
                  )}
                </div>

                <div className={isLast ? "pb-0" : "pb-9"}>
                  <div className="flex items-center gap-2 pt-1.5">
                    <Icon className="h-4 w-4 shrink-0 text-emerald-400" />
                    <h3 className="text-base font-black tracking-tight text-white transition-colors duration-300 group-hover:text-emerald-300">
                      {title}
                    </h3>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-400">
                    {description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="relative mt-16 hidden lg:block">
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-6 h-px bg-gradient-to-r from-white/0 via-white/10 to-white/0"
          />
          <ol className="relative grid grid-cols-4 gap-8">
            {steps.map(({ number, title, description, iconName }) => {
              const Icon = iconMap[iconName] ?? Smartphone;

              return (
                <li
                  key={number}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#111] font-mono text-sm font-bold text-emerald-400 transition-colors duration-300 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10">
                    {number}
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0 text-emerald-400" />
                    <h3 className="text-base font-black tracking-tight text-white transition-colors duration-300 group-hover:text-emerald-300">
                      {title}
                    </h3>
                  </div>
                  <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-gray-400">
                    {description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        <p className="mt-14 text-center font-mono text-xs text-gray-500">
          💡 Setup is fully managed through a casual chat interface. No
          programming skills required.
        </p>
      </div>
    </section>
  );
}
