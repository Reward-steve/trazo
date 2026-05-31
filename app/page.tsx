import Link from "next/link";
import { ArrowRight, CheckCircle, Star, ChevronRight } from "lucide-react";
import Button from "./components/ui/Button";
import SectionHeader from "./components/landing/SectionHeader";
import DarkCard from "./components/landing/DarkCard";
import {
  trustBadges,
  testimonials,
  steps,
  features,
  pricingTiers,
  painPoints,
} from "./constant";

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="flex flex-col bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center">
        {/* Ambient glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-3xl">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-sm text-emerald-400 mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Built for Nigerian vendors who are tired of DM chaos
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
              Your customers{" "}
              <span className="text-emerald-400">order themselves.</span>
              <br />
              You just confirm.
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 mb-10 leading-relaxed max-w-xl">
              Turn your Instagram or WhatsApp page into a real storefront in
              under 5 minutes. Customers browse, pick items, fill their details
              — a clean order lands straight in your WhatsApp.
            </p>

            <div className="flex flex-wrap gap-4 mb-12 w-full sm:w-auto">
              <Button
                href="/signup"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Create your shop
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                href="/store/demo"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                See a live demo
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              {trustBadges.map((text) => (
                <span key={text} className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PAIN ─────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeader
          badge="Sound familiar?"
          title="Every single day, this is what selling looks like."
          accentColor="amber"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto mb-10">
          {painPoints.map(({ icon: Icon, text }, i) => (
            <DarkCard
              key={i}
              variant="danger"
              className="flex items-start gap-3 p-4"
            >
              <Icon className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300">{text}</p>
            </DarkCard>
          ))}
        </div>
        <p className="text-gray-400 text-lg leading-relaxed text-center max-w-2xl mx-auto">
          You&apos;re not bad at business. You&apos;re just managing orders with
          tools that were never built for selling.{" "}
          <span className="text-white font-semibold">That ends today.</span>
        </p>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeader
          badge="How it works"
          title="From zero to taking orders in 5 minutes."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ number, title, description }) => (
            <div key={number} className="relative">
              <div className="hidden lg:block absolute top-8 left-[60%] w-full h-px bg-gradient-to-r from-emerald-500/30 to-transparent" />
              <DarkCard hover className="p-6">
                <div className="text-4xl font-black text-emerald-500/20 mb-4 font-mono">
                  {number}
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {description}
                </p>
              </DarkCard>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeader
          badge="What you get"
          title="Everything a serious vendor needs. Nothing that wastes your time."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, description }) => (
            <DarkCard key={title} hover className="group p-6">
              <div className="h-11 w-11 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-emerald-500/20 transition-colors">
                <Icon className="h-5 w-5 text-emerald-400" />
              </div>
              <h3 className="font-bold text-white text-base mb-2">{title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {description}
              </p>
            </DarkCard>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeader
          badge="Vendor stories"
          title="Vendors who stopped drowning in DMs."
          accentColor="amber"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ name, business, quote, stars }) => (
            <DarkCard key={name} className="p-6 flex flex-col gap-4">
              <div className="flex gap-0.5">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed flex-1">
                &ldquo;{quote}&rdquo;
              </p>
              <div className="border-t border-white/5 pt-4">
                <p className="font-bold text-white text-sm">{name}</p>
                <p className="text-xs text-gray-500">{business}</p>
              </div>
            </DarkCard>
          ))}
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeader badge="Pricing" title="Simple. No surprises." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {pricingTiers.map((tier) => (
            <DarkCard
              key={tier.name}
              variant={tier.isPro ? "accent" : "default"}
              className="p-8 relative overflow-hidden"
            >
              {tier.isPro && (
                <>
                  <div className="absolute top-4 right-4 bg-emerald-500 text-black text-xs font-black px-3 py-1 rounded-full">
                    POPULAR
                  </div>
                  <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                </>
              )}
              <p
                className={`text-sm font-medium mb-2 ${tier.isPro ? "text-emerald-400" : "text-gray-400"}`}
              >
                {tier.name}
              </p>
              <p className="text-4xl font-black text-white mb-1">
                {tier.price}
              </p>
              <p className="text-gray-500 text-sm mb-6">{tier.period}</p>
              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 text-sm text-gray-300"
                  >
                    <CheckCircle
                      className={`h-4 w-4 shrink-0 ${tier.isPro ? "text-emerald-400" : "text-emerald-500"}`}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                href="/signup"
                variant={tier.isPro ? "primary" : "outline"}
                size="lg"
                className={`w-full justify-center ${tier.isPro ? "bg-emerald-500 hover:bg-emerald-400 text-black font-bold shadow-lg shadow-emerald-500/20" : ""}`}
              >
                {tier.cta}
              </Button>
            </DarkCard>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-[#0a0a0a] to-[#0a0a0a]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-600/15 rounded-full blur-[80px]" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Your next order shouldn&apos;t start
            <br />
            with a DM.
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto">
            Join vendors across Nigeria who replaced their DM chaos with a
            storefront that works while they sleep.
          </p>
          <Button
            href="/signup"
            variant="primary"
            size="lg"
            className="group bg-emerald-500 hover:bg-emerald-400 text-black font-bold shadow-xl shadow-emerald-500/20 hover:-translate-y-0.5 text-lg px-8"
          >
            Create your shop now
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-gray-600 text-sm mt-4">
            Takes less than 3 minutes.
          </p>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2 font-bold text-white">
            <div className="h-7 w-7 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-sm font-black">
              ₦
            </div>
            Trazo
          </div>
          <p>
            Built for the Nigerian hustle. &copy; {new Date().getFullYear()}
          </p>
          <div className="flex gap-5">
            <Link
              href="/store/demo"
              className="hover:text-white transition-colors"
            >
              Demo Store
            </Link>
            <Link href="/signup" className="hover:text-white transition-colors">
              Sign Up
            </Link>
            <Link href="/login" className="hover:text-white transition-colors">
              Log In
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
