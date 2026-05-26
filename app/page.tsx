import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  Store,
  TrendingUp,
  CheckCircle,
  Star,
  Zap,
  ChevronRight,
  ShoppingBag,
  Clock,
  XCircle,
} from "lucide-react";

// ─── Static data ────────────────────────────────────────────────────────────

const painPoints = [
  { icon: XCircle, text: "Customer DMs you asking for prices" },
  { icon: XCircle, text: "You reply, they ask if it's available" },
  { icon: XCircle, text: "They say they want it, you send account number" },
  { icon: XCircle, text: "They send a blurry receipt screenshot" },
  { icon: XCircle, text: "Order gets buried under 60 other DMs" },
  { icon: XCircle, text: "You miss the order. Customer never comes back." },
];

const steps = [
  {
    number: "01",
    title: "Create your shop",
    description:
      "Sign up, add your shop name, WhatsApp number and logo. Takes less than 3 minutes.",
  },
  {
    number: "02",
    title: "Add your products",
    description:
      "Upload product photos from your phone, set prices, toggle availability on or off anytime.",
  },
  {
    number: "03",
    title: "Share your link",
    description:
      "Put your storefront link in your Instagram bio, WhatsApp status, or anywhere you sell.",
  },
  {
    number: "04",
    title: "Receive structured orders",
    description:
      "Every order arrives on your WhatsApp already formatted — name, items, quantity, address. Zero chaos.",
  },
];

const features = [
  {
    icon: MessageCircle,
    title: "Orders straight to WhatsApp",
    description:
      "No new app to learn. Orders land exactly where you already work — your WhatsApp inbox, perfectly formatted.",
  },
  {
    icon: Store,
    title: "Your own storefront link",
    description:
      "A clean, fast mobile page your customers can browse. Put it in your bio and let it work for you 24/7.",
  },
  {
    icon: Zap,
    title: "Live in under 5 minutes",
    description:
      "No developer needed. No technical knowledge required. Sign up, add products, share your link.",
  },
  {
    icon: TrendingUp,
    title: "Never miss an order again",
    description:
      "Every customer fills their own details before ordering. No more chasing names and addresses.",
  },
  {
    icon: ShoppingBag,
    title: "No payment gateway headache",
    description:
      "Accept bank transfer, cash on delivery, or whatever works for you. We don't touch your money.",
  },
  {
    icon: Clock,
    title: "Save hours every week",
    description:
      "Stop typing the same price replies 50 times a day. Your storefront answers for you.",
  },
];

const testimonials = [
  {
    name: "Chisom A.",
    business: "Thrift & Fashion, Yaba",
    quote:
      "Before this I was spending 3 hours daily just answering price DMs. Now my customers order themselves and I just confirm on WhatsApp. My head is free.",
    stars: 5,
  },
  {
    name: "Tunde B.",
    business: "Sneakers & Streetwear, Ikeja",
    quote:
      "I put the link in my Instagram bio on a Friday. By Sunday I had 11 orders waiting for me, all with full details. No confusion, no back and forth.",
    stars: 5,
  },
  {
    name: "Amaka O.",
    business: "Skincare & Beauty, Abuja",
    quote:
      "My customers always complained ordering from me was stressful. Now they send me voice notes saying how easy it is. That alone is worth everything.",
    stars: 5,
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="flex flex-col bg-[#0a0a0a] text-white font-sans overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center">
        {/* Ambient background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-sm text-emerald-400 mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Built for Nigerian vendors who are tired of DM chaos
            </div>

            {/* Headline */}
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6"
              style={{ fontFamily: "'Georgia', serif" }}
            >
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

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/signup"
                className="group inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-7 py-4 rounded-2xl text-base transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/30 hover:-translate-y-0.5"
              >
                Create your free shop
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/store/demo"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium px-7 py-4 rounded-2xl text-base transition-all duration-200"
              >
                See a live demo
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Social proof bar */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                Free to start
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                No technical knowledge needed
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                Works on any phone
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE PAIN ─────────────────────────────────────────────────────── */}
      <section className="bg-[#111111] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-amber-400 font-bold text-sm uppercase tracking-widest mb-3">
              Sound familiar?
            </p>
            <h2
              className="text-3xl sm:text-4xl font-black text-white leading-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Every single day, this is what selling looks like.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto mb-10">
            {painPoints.map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-red-950/20 border border-red-900/20 rounded-xl p-4"
              >
                <Icon className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-300">{text}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-400 text-lg leading-relaxed">
              You&apos;re not bad at business. You&apos;re just managing orders
              with tools that were never built for selling.{" "}
              <span className="text-white font-semibold">That ends today.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-emerald-400 font-bold text-sm uppercase tracking-widest mb-3">
              How it works
            </p>
            <h2
              className="text-3xl sm:text-4xl font-black text-white"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              From zero to taking orders in 5 minutes.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ number, title, description }) => (
              <div key={number} className="relative">
                {/* Connector line */}
                <div className="hidden lg:block absolute top-8 left-[60%] w-full h-px bg-gradient-to-r from-emerald-500/30 to-transparent" />
                <div className="bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-emerald-500/20 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-4xl font-black text-emerald-500/20 mb-4 font-mono">
                    {number}
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-emerald-400 font-bold text-sm uppercase tracking-widest mb-3">
              What you get
            </p>
            <h2
              className="text-3xl sm:text-4xl font-black text-white"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Everything a serious vendor needs.
              <br />
              Nothing that wastes your time.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-emerald-500/30 hover:bg-emerald-950/10 transition-all duration-300"
              >
                <div className="h-11 w-11 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-emerald-500/20 transition-colors">
                  <Icon className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="font-bold text-white text-base mb-2">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-amber-400 font-bold text-sm uppercase tracking-widest mb-3">
              Vendor stories
            </p>
            <h2
              className="text-3xl sm:text-4xl font-black text-white"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Vendors who stopped drowning in DMs.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, business, quote, stars }) => (
              <div
                key={name}
                className="bg-[#111] border border-white/5 rounded-2xl p-6 flex flex-col gap-4"
              >
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-emerald-400 font-bold text-sm uppercase tracking-widest mb-3">
              Pricing
            </p>
            <h2
              className="text-3xl sm:text-4xl font-black text-white"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Simple. No surprises.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Free */}
            <div className="bg-[#111] border border-white/5 rounded-2xl p-8">
              <p className="text-gray-400 text-sm font-medium mb-2">Starter</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-black text-white">Free</span>
              </div>
              <p className="text-gray-500 text-sm mb-6">
                Forever. No card needed.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "1 storefront",
                  "Up to 20 products",
                  "Unlimited WhatsApp orders",
                  "Mobile-optimised storefront",
                  "Basic shop customisation",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 text-sm text-gray-300"
                  >
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="block w-full text-center bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-6 py-3 rounded-xl transition-all"
              >
                Get started free
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-emerald-500 text-black text-xs font-black px-3 py-1 rounded-full">
                POPULAR
              </div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl" />
              <p className="text-emerald-400 text-sm font-medium mb-2">Pro</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-black text-white">₦5,000</span>
              </div>
              <p className="text-gray-500 text-sm mb-6">per month</p>
              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Starter",
                  "Unlimited products",
                  "Custom shop domain",
                  "Order history & tracking",
                  "Priority support",
                  "Remove NaijaCart branding",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 text-sm text-gray-300"
                  >
                    <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="block w-full text-center bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
              >
                Start free, upgrade anytime
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-[#0a0a0a] to-[#0a0a0a]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-600/15 rounded-full blur-[80px]" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2
            className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Your next order shouldn&apos;t start
            <br />
            with a DM.
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto">
            Join vendors across Nigeria who replaced their DM chaos with a
            storefront that works while they sleep.
          </p>
          <Link
            href="/signup"
            className="group inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-4 rounded-2xl text-lg transition-all duration-200 shadow-xl shadow-emerald-500/20 hover:-translate-y-0.5"
          >
            Create your free shop now
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-gray-600 text-sm mt-4">
            Free forever. No credit card. Takes 3 minutes.
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
            NaijaCart
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
