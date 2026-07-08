/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import SectionHeader from "./SectionHeader";

import {
  MessageCircle,
  MousePointerClick,
  ShoppingCart,
  Check,
  ArrowRight,
  RotateCcw,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface CartItem {
  name: string;
  price: number;
}

export interface Product {
  emoji: string;
  name: string;
  price: number;
}

export const demoProducts: Product[] = [
  { emoji: "👗", name: "Ankara Flare Dress", price: 25000 },
  { emoji: "👜", name: "Leather Tote Bag", price: 18000 },
  { emoji: "👡", name: "Adire Velvet Slides", price: 12000 },
  { emoji: "🎗️", name: "Silk Hair Scarf", price: 6500 },
];

export default function DemoSection() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderSent, setOrderSent] = useState(false);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  function addToCart(name: string, price: number) {
    setCart((prev) => [...prev, { name, price }]);
    setJustAdded(name);
    setActiveStep(2); // Auto-focus step 2 "Add to cart"
    setTimeout(() => setJustAdded(null), 900);
  }

  function sendOrder() {
    if (cart.length === 0) return;
    setOrderSent(true);
    setActiveStep(4); // Auto-focus step 4 "Fulfill the order"
  }

  function resetDemo() {
    setCart([]);
    setOrderSent(false);
    setActiveStep(1); // Reset back to step 1
  }

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
      id="interactive-demo"
    >
      <SectionHeader
        badge="Live Simulator"
        title="Experience it like a customer"
        subtitle="Tap a product, add it to the cart, and send the order. Witness the lightning-fast checkout land instantly in the WhatsApp interface."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* ── STOREFRONT PREVIEW ─────────────────────────────── */}
        <div className="bg-[#121212] border border-white/[0.06] rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
          <div>
            {/* Browser top chrome */}
            <div className="bg-[#1a1a1a] border-b border-white/[0.06] px-4 py-3.5 flex items-center gap-2">
              <div className="flex gap-1.5 shrink-0">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="ml-3 flex-1 bg-white/[0.03] border border-white/[0.07] rounded-lg px-3 py-1 text-xs text-gray-400 font-mono tracking-wide truncate flex items-center justify-between">
                <span>trazo.store/amaka-fashion</span>
                <ExternalLink className="h-2.5 w-2.5 text-gray-600" />
              </div>
            </div>

            {/* Store body */}
            <div className="p-5 sm:p-6">
              {/* Shop header info block */}
              <div className="flex items-center gap-3.5 mb-6">
                <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-black font-black text-sm shrink-0 shadow-lg shadow-emerald-500/10">
                  AF
                </div>
                <div className="min-w-0">
                  <div className="font-sans font-extrabold text-white text-base truncate flex items-center gap-1.5">
                    Amaka Fashion
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    Lagos, NG · 47 products listed
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 text-xs text-emerald-400 shrink-0 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Open Shop
                </div>
              </div>

              {/* Interactive hint instruction */}
              {cart.length === 0 && !orderSent && (
                <div className="flex items-center gap-2 text-xs bg-emerald-500/5 border border-emerald-500/10 text-gray-300 rounded-xl px-3 py-2.5 mb-5 animate-fade-in">
                  <MousePointerClick className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>
                    <strong>Try it out:</strong> Tap on products below to
                    experience the real customer flow.
                  </span>
                </div>
              )}

              {/* Products label */}
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  Featured Products
                </p>
                <span className="text-[10px] text-gray-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.03]">
                  Nigeria (NGN)
                </span>
              </div>

              {/* Product grid — 2 cols on mobile, 3 on sm+ */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {demoProducts.map(({ emoji, name, price }) => {
                  const isJustAdded = justAdded === name;
                  return (
                    <div
                      key={name}
                      className="bg-[#181818] border border-white/[0.05] rounded-2xl overflow-hidden hover:border-white/[0.1] transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div className="h-16 sm:h-20 bg-[#1f1f1f] flex items-center justify-center text-3xl sm:text-4xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        <span className="group-hover:scale-110 transition-transform duration-300">
                          {emoji}
                        </span>
                      </div>
                      <div className="p-3 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-semibold text-gray-200 leading-snug line-clamp-2 mb-1 group-hover:text-white transition-colors">
                            {name}
                          </div>
                          <div className="text-sm font-black text-emerald-400">
                            ₦{price.toLocaleString()}
                          </div>
                        </div>

                        <button
                          onClick={() => addToCart(name, price)}
                          disabled={orderSent}
                          className={`mt-3 w-full text-xs font-bold py-2 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-center gap-1 ${
                            isJustAdded
                              ? "bg-emerald-500 text-black border-emerald-400 font-extrabold shadow-md shadow-emerald-500/10"
                              : "bg-emerald-500/10 hover:bg-emerald-500/25 border-emerald-500/20 text-emerald-400"
                          } disabled:opacity-30 disabled:cursor-not-allowed`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="h-3 w-3 stroke-[3]" />
                              <span>Added ✓</span>
                            </>
                          ) : (
                            <span>+ Add to Cart</span>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Checkout Bar Container at bottom */}
          <div className="p-4 sm:p-5 border-t border-white/[0.05] bg-[#161616]/50 rounded-b-3xl">
            <AnimatePresence mode="wait">
              {cart.length > 0 && !orderSent ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex flex-col sm:flex-row items-center justify-between bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-4 py-3.5 gap-3"
                >
                  <div className="flex items-center gap-3 text-sm text-emerald-300 font-semibold min-w-0 self-start sm:self-center">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-emerald-500 text-black text-xs font-black shrink-0 shadow">
                      {cart.length}
                    </span>
                    <span className="truncate">
                      {cart.length} item{cart.length > 1 ? "s" : ""} selected ·{" "}
                      <span className="text-white font-extrabold text-base">
                        ₦{total.toLocaleString()}
                      </span>
                    </span>
                  </div>
                  <button
                    onClick={sendOrder}
                    className="w-full sm:w-auto bg-emerald-500 text-black text-xs font-black px-5 py-3 rounded-xl hover:bg-emerald-400 transition-all duration-300 shadow-md hover:shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <span>Order via WhatsApp</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              ) : orderSent ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col sm:flex-row items-center justify-between bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 gap-3 text-center sm:text-left"
                >
                  <div className="min-w-0">
                    <span className="text-xs sm:text-sm text-gray-300 font-bold block">
                      🎉 Checkout Successful!
                    </span>
                    <span className="text-[11px] text-gray-500 mt-0.5 block leading-normal">
                      No sign-up forms, email confirmations, or processing
                      queues. Just a clean invoice.
                    </span>
                  </div>
                  <button
                    onClick={resetDemo}
                    className="w-full sm:w-auto text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center justify-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 rounded-xl hover:bg-emerald-500/15 transition-all cursor-pointer shrink-0"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset Simulator
                  </button>
                </motion.div>
              ) : (
                <div className="py-4 text-center">
                  <p className="text-xs text-gray-500">
                    Your cart is currently empty. Add products above to unlock
                    checkout.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── WHATSAPP PREVIEW ───────────────────────────────── */}
        <div className="bg-[#0b141a] border border-white/[0.06] rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between min-h-[460px] lg:min-h-0 relative">
          {/* WhatsApp top bar header */}
          <div className="bg-[#1f2c25] border-b border-white/[0.05] px-5 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <MessageCircle className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-1.5 leading-tight">
                  Amaka Fashion
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[11px] text-gray-400 font-medium">
                  Direct merchant inbox
                </div>
              </div>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono tracking-widest bg-emerald-500/10 border border-emerald-500/15 rounded-md px-2 py-0.5">
              LIVE SIMULATION
            </span>
          </div>

          {/* Chat message body area */}
          <div className="flex-1 p-5 sm:p-6 flex flex-col justify-end gap-4 overflow-y-auto min-h-[320px]">
            <AnimatePresence mode="wait">
              {!orderSent ? (
                <motion.div
                  key="empty-chat"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center gap-4 my-auto text-center p-6"
                >
                  <div className="h-14 w-14 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shadow-inner">
                    <ShoppingCart className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-gray-300 mb-1">
                      WhatsApp Order Box
                    </h5>
                    <p className="text-xs text-gray-500 max-w-[240px] leading-relaxed mx-auto">
                      Add items to your cart on the left storefront and tap
                      &ldquo;Order via WhatsApp&rdquo; to watch the magic
                      happen.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="active-chat"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="space-y-4"
                >
                  {/* System Date Badge */}
                  <p className="text-[10px] text-gray-500 bg-white/[0.04] border border-white/[0.02] rounded-full px-3 py-1 self-center text-center max-w-fit mx-auto shadow-sm">
                    Today, Just Now
                  </p>

                  {/* Customer WhatsApp message bubble */}
                  <div className="self-end ml-auto max-w-[85%] bg-[#005c4b] text-white text-xs rounded-2xl rounded-tr-none px-4 py-3.5 leading-relaxed shadow-lg border border-white/[0.03]">
                    <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/10">
                      <span className="font-extrabold text-emerald-300 flex items-center gap-1 uppercase tracking-wider text-[10px]">
                        🛍️ New Order Notification
                      </span>
                      <span className="text-[9px] text-white/50 bg-black/10 px-1.5 py-0.5 rounded">
                        Invoice
                      </span>
                    </div>

                    <p className="font-bold text-white/90 mb-1 text-[11px] uppercase tracking-wide">
                      Selected Items:
                    </p>
                    <div className="space-y-1 my-2">
                      {cart.map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-start text-white/95"
                        >
                          <span>• {item.name}</span>
                          <span className="font-mono text-[11px] font-semibold text-emerald-200 shrink-0 ml-4">
                            ₦{item.price.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-white/20 flex justify-between items-center">
                      <span className="font-bold text-white text-xs">
                        Total Bill:
                      </span>
                      <span className="font-mono text-sm font-black text-white bg-black/10 px-2 py-0.5 rounded border border-white/5">
                        ₦{total.toLocaleString()}
                      </span>
                    </div>

                    <div className="mt-2 text-[10px] text-emerald-200 italic leading-snug bg-black/10 rounded p-1.5 border border-emerald-400/5">
                      🚚 Delivery: Please confirm ship times for Victoria
                      Island, Lagos. Thank you!
                    </div>

                    <div className="flex justify-end items-center gap-1 mt-2 text-[9px] text-white/40">
                      <span>16:03</span>
                      <span className="text-emerald-300 font-bold">✓✓</span>
                    </div>
                  </div>

                  {/* Secondary helper messaging */}
                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 text-center max-w-md mx-auto">
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      💡 <strong>No backend complexity needed:</strong> This
                      layout is compiled purely into a URL query parameter
                      string (`https://wa.me/phone?text=...`) which
                      automatically wakes up the user&apos;s local WhatsApp app
                      instantly.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Simulated keyboard message input bar at bottom */}
          <div className="bg-[#1f2c25]/30 border-t border-white/[0.05] p-3 flex items-center gap-2.5 shrink-0 rounded-b-3xl">
            <div className="flex-1 bg-[#2a3942]/60 rounded-xl px-4 py-2.5 text-xs text-gray-400 flex items-center justify-between">
              <span>
                {orderSent
                  ? "Reply to Amaka Fashion..."
                  : "Type order details..."}
              </span>
              <span className="text-sm">😊</span>
            </div>
            <div className="h-9 w-9 bg-emerald-500 rounded-full flex items-center justify-center text-black font-extrabold shadow-md">
              <MessageCircle className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
