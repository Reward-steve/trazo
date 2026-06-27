"use client";

import { useState } from "react";
import SectionHeader from "./SectionHeader";
import { demoProducts } from "../../constant";
import { Zap } from "lucide-react";

type CartItem = { name: string; price: number };

export default function DemoSec                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          () {
  const [cart, setCart] = useState<CartItem[]>([]);

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  function addToCart(name: string, price: number) {
    setCart((prev) => [...prev, { name, price }]);
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

            {/* Products */}
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-3">
              Featured products
            </p>
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
                      className="mt-2 w-full text-[11px] font-bold py-1.5 rounded-md bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/25 transition-colors"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart bar */}
            {cart.length > 0 && (
              <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                <span className="text-sm text-emerald-300 font-semibold">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-emerald-500 text-black text-[10px] font-black mr-2">
                    {cart.length}
                  </span>
                  {cart.length} item{cart.length > 1 ? "s" : ""} ·{" "}
                  <span className="text-white">₦{total.toLocaleString()}</span>
                </span>
                <button className="bg-emerald-500 text-black text-xs font-black px-4 py-2 rounded-lg hover:bg-emerald-400 transition-colors">
                  Order via WhatsApp →
                </button>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </section>
  );
}
