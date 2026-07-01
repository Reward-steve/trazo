"use client";

import { useState } from "react";
import SectionHeader from "./SectionHeader";
import { demoProducts } from "../../constant";
import { MessageCircle, MousePointerClick } from "lucide-react";

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
        badge="What your store looks like"
        title="A real storefront. Takes minutes to build."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Store preview */}
        <div className="bg-[#111] border border-white/[0.07] rounded-2xl overflow-hidden">
          {/* Browser chrome */}
          <div className="bg-[#161616] border-b border-white/[0.06] px-4 py-3 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
            <div className="ml-2 flex-1 bg-white/[0.04] border border-white/[0.07] rounded-md px-3 py-1 text-xs text-gray-500">
              trazo.store/amaka-fashion
            </div>
          </div>

          {/* Store body */}
          <div className="p-5">
            {/* Store header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-black font-black text-base shrink-0">
                AF
              </div>
              <div>
                <div className="font-bold text-white text-sm">
                  Amaka Fashion
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Lagos · 47 products
                </div>
              </div>
              <div className="ml-auto flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-1 text-xs text-emerald-400 shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Open
              </div>
            </div>

            {/* Interactive hint — only shows before first interaction */}
            {cart.length === 0 && (
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mb-3">
                <MousePointerClick className="h-3 w-3" />
                Try it — tap a product to add it to cart
              </div>
            )}

            {/* Products */}
            {cart.length > 0 && (
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-3">
                Featured products
              </p>
            )}
            <div className="grid grid-cols-3 gap-2.5 mb-4">
              {demoProducts.map(({ emoji, name, price }) => (
                <div
                  key={name}
                  className="bg-[#1a1a1a] border border-white/[0.07] rounded-xl overflow-hidden"
                >
                  <div className="h-16 flex items-center justify-center text-3xl">
                    {emoji}
                  </div>
                  <div className="p-2.5">
                    <div className="text-xs font-semibold text-gray-200 leading-tight">
                      {name}
                    </div>
                    <div className="text-sm font-black text-emerald-400 mt-1">
                      ₦{price.toLocaleString()}
                    </div>
                    <button
                      onClick={() => addToCart(name, price)}
                      className={`mt-2 w-full text-[11px] font-bold py-1.5 rounded-md border transition-colors ${
                        justAdded === name
                          ? "bg-emerald-500 text-black border-emerald-400"
                          : "bg-emerald-500/15 border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/25"
                      }`}
                    >
                      {justAdded === name ? "Added ✓" : "+ Add"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart bar */}
            {cart.length > 0 && !orderSent && (
              <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                <span className="text-sm text-emerald-300 font-semibold">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-emerald-500 text-black text-[10px] font-black mr-2">
                    {cart.length}
                  </span>
                  {cart.length} item{cart.length > 1 ? "s" : ""} ·{" "}
                  <span className="text-white">₦{total.toLocaleString()}</span>
                </span>
                <button
                  onClick={sendOrder}
                  className="bg-emerald-500 text-black text-xs font-black px-4 py-2 rounded-lg hover:bg-emerald-400 transition-colors"
                >
                  Order via WhatsApp →
                </button>
              </div>
            )}

            {/* Post-order state */}
            {orderSent && (
              <div className="flex items-center justify-between bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-3">
                <span className="text-sm text-gray-300">
                  Order sent — no checkout page needed.
                </span>
                <button
                  onClick={resetDemo}
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  Reset demo
                </button>
              </div>
            )}
          </div>
        </div>

        {/* WhatsApp preview — what the seller receives */}
        <div className="bg-[#111] border border-white/[0.07] rounded-2xl overflow-hidden flex flex-col h-full min-h-[420px]">
          <div className="bg-[#1f2c25] border-b border-white/[0.06] px-4 py-3 flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
              <MessageCircle className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white leading-tight">
                Amaka Fashion (You)
              </div>
              <div className="text-[11px] text-gray-500">
                New order notification
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 flex flex-col justify-end gap-2 bg-[#0b141a]">
            {!orderSent ? (
              <p className="text-xs text-gray-600 text-center my-auto">
                Orders placed on your storefront land here — no separate app to
                check.
              </p>
            ) : (
              <div className="self-end max-w-[85%] bg-emerald-600/90 text-white text-xs rounded-2xl rounded-br-md px-3 py-2.5 leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className="font-semibold mb-1">New order 🛍️</p>
                {cart.map((item, i) => (
                  <p key={i}>
                    • {item.name} — ₦{item.price.toLocaleString()}
                  </p>
                ))}
                <p className="mt-1 font-semibold border-t border-white/20 pt-1">
                  Total: ₦{total.toLocaleString()}
                </p>
                <p className="text-[10px] text-white/70 mt-1">Just now</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
