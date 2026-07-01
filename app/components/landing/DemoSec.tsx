"use client";

import { useState } from "react";
import SectionHeader from "./SectionHeader";
import { demoProducts } from "../../constant";
import { MessageCircle, MousePointerClick, ShoppingCart } from "lucide-react";

type CartItem = { name: string; price: number };

export default function DemoSection() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderSent, setOrderSent] = useState(false);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  function addToCart(name: string, price: number) {
    setCart((prev) => [...prev, { name, price }]);
    setJustAdded(name);
    setTimeout(() => setJustAdded(null), 900);
  }

  function sendOrder() {
    if (cart.length === 0) return;
    setOrderSent(true);
  }

  function resetDemo() {
    setCart([]);
    setOrderSent(false);
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <SectionHeader
        badge="See it in action"
        title="This is what your customers see."
        subtitle="Tap a product, add to cart, and watch the order land in WhatsApp — exactly how it works for real."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* ── STOREFRONT PREVIEW ─────────────────────────────── */}
        <div className="bg-[#111] border border-white/[0.07] rounded-2xl overflow-hidden">
          {/* Browser chrome */}
          <div className="bg-[#161616] border-b border-white/[0.06] px-4 py-3 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
            <div className="ml-2 flex-1 bg-white/[0.04] border border-white/[0.07] rounded-md px-3 py-1 text-xs text-gray-500 truncate">
              trazo.store/amaka-fashion
            </div>
          </div>

          {/* Store body */}
          <div className="p-4 sm:p-5">
            {/* Shop header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-black font-black text-sm shrink-0">
                AF
              </div>
              <div className="min-w-0">
                <div className="font-bold text-white text-sm truncate">
                  Amaka Fashion
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Lagos · 47 products
                </div>
              </div>
              <div className="ml-auto flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-1 text-xs text-emerald-400 shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open
              </div>
            </div>

            {/* Interactive hint */}
            {cart.length === 0 && !orderSent && (
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mb-3">
                <MousePointerClick className="h-3 w-3 shrink-0" />
                Try it — tap a product to add it to cart
              </div>
            )}

            {/* Products label */}
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-3">
              Featured products
            </p>

            {/* Product grid — 2 cols on mobile, 3 on sm+ */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 mb-4">
              {demoProducts.map(({ emoji, name, price }) => (
                <div
                  key={name}
                  className="bg-[#1a1a1a] border border-white/[0.07] rounded-xl overflow-hidden"
                >
                  <div className="h-14 sm:h-16 flex items-center justify-center text-2xl sm:text-3xl">
                    {emoji}
                  </div>
                  <div className="p-2 sm:p-2.5">
                    <div className="text-xs font-semibold text-gray-200 leading-tight line-clamp-2">
                      {name}
                    </div>
                    <div className="text-xs sm:text-sm font-black text-emerald-400 mt-1">
                      ₦{price.toLocaleString()}
                    </div>
                    <button
                      onClick={() => addToCart(name, price)}
                      disabled={orderSent}
                      className={`mt-2 w-full text-[11px] font-bold py-1.5 rounded-md border transition-colors ${
                        justAdded === name
                          ? "bg-emerald-500 text-black border-emerald-400"
                          : "bg-emerald-500/15 border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/25"
                      } disabled:opacity-40 disabled:cursor-not-allowed`}
                    >
                      {justAdded === name ? "Added ✓" : "+ Add"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart bar */}
            {cart.length > 0 && !orderSent && (
              <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 sm:px-4 py-3 gap-2">
                <span className="text-sm text-emerald-300 font-semibold flex items-center gap-2 min-w-0">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-emerald-500 text-black text-[10px] font-black shrink-0">
                    {cart.length}
                  </span>
                  <span className="truncate">
                    {cart.length} item{cart.length > 1 ? "s" : ""} ·{" "}
                    <span className="text-white">
                      ₦{total.toLocaleString()}
                    </span>
                  </span>
                </span>
                <button
                  onClick={sendOrder}
                  className="bg-emerald-500 text-black text-xs font-black px-3 sm:px-4 py-2 rounded-lg hover:bg-emerald-400 transition-colors shrink-0"
                >
                  Order via WhatsApp →
                </button>
              </div>
            )}

            {/* Post-order state */}
            {orderSent && (
              <div className="flex items-center justify-between bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-3 gap-2">
                <span className="text-xs sm:text-sm text-gray-300">
                  ✅ Order sent — no checkout page needed.
                </span>
                <button
                  onClick={resetDemo}
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 shrink-0"
                >
                  Try again
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── WHATSAPP PREVIEW ───────────────────────────────── */}
        <div className="bg-[#111] border border-white/[0.07] rounded-2xl overflow-hidden flex flex-col min-h-[380px] lg:min-h-0 lg:h-full">
          {/* WhatsApp header */}
          <div className="bg-[#1f2c25] border-b border-white/[0.06] px-4 py-3 flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
              <MessageCircle className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white leading-tight">
                Amaka Fashion (You)
              </div>
              <div className="text-[11px] text-gray-500">
                Order notifications land here
              </div>
            </div>
          </div>

          {/* Chat body */}
          <div className="flex-1 p-4 flex flex-col justify-end gap-3 bg-[#0b141a] min-h-[280px]">
            {!orderSent ? (
              <div className="flex flex-col items-center justify-center gap-3 my-auto text-center">
                <div className="h-12 w-12 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-gray-600" />
                </div>
                <p className="text-xs text-gray-600 max-w-[200px]">
                  Add products and tap &ldquo;Order via WhatsApp&rdquo; to see
                  how orders arrive.
                </p>
              </div>
            ) : (
              <>
                {/* Timestamp */}
                <p className="text-[10px] text-gray-600 text-center">
                  Today, just now
                </p>

                {/* WhatsApp bubble */}
                <div className="self-end max-w-[85%] bg-[#005c4b] text-white text-xs rounded-2xl rounded-br-sm px-3 py-2.5 leading-relaxed shadow-lg">
                  <p className="font-bold mb-1.5 text-emerald-300">
                    New Order 🛍️
                  </p>
                  <p className="font-semibold text-white/80 mb-1 text-[11px] uppercase tracking-wide">
                    Items ordered:
                  </p>
                  {cart.map((item, i) => (
                    <p key={i} className="text-white/90">
                      • {item.name} — ₦{item.price.toLocaleString()}
                    </p>
                  ))}
                  <div className="mt-2 pt-2 border-t border-white/20">
                    <p className="font-bold text-white">
                      Total: ₦{total.toLocaleString()}
                    </p>
                  </div>
                  <p className="text-[10px] text-white/50 mt-1.5 text-right">
                    ✓✓
                  </p>
                </div>

                {/* Confirmation message */}
                <p className="text-[11px] text-gray-600 text-center">
                  No app to check. No DM chaos. Just a clean order, ready to
                  fulfill.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
