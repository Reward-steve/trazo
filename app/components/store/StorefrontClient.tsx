"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Store } from "lucide-react";
import { Product, ShopSettings, CartItem } from "../../types";
import ProductCard from "../../components/store/ProductCard";
import CartDrawer from "../../components/store/CartDrawer";
import EmptyState from "../../components/ui/EmptyState";
import { formatNaira } from "../../lib/utils";

interface StorefrontClientProps {
  products: Product[];
  settings: ShopSettings;
}

export default function StorefrontClient({
  products,
  settings,
}: StorefrontClientProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleAddToCart = useCallback((item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, item];
    });
  }, []);

  const handleUpdateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((i) => i.id !== id));
    } else {
      setCart((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity } : i)),
      );
    }
  }, []);

  const handleRemove = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const availableProducts = products.filter((p) => p.available);
  const outOfStock = products.filter((p) => !p.available);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── STOREFRONT NAVBAR ─────────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Shop identity */}
          <div className="flex items-center gap-3 min-w-0">
            {settings.logoUrl ? (
              <div className="relative h-9 w-9 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                <Image
                  src={settings.logoUrl}
                  alt={settings.shopName}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-9 w-9 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0">
                <Store className="h-5 w-5 text-white" />
              </div>
            )}
            <div className="min-w-0">
              <p className="font-bold text-gray-900 truncate leading-tight">
                {settings.shopName}
              </p>
              <p className="text-xs text-gray-400 truncate hidden sm:block max-w-xs">
                {settings.description}
              </p>
            </div>
          </div>

          {/* Cart button — always visible */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="relative shrink-0 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow-md"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 ? (
              <>
                <span className="bg-white/20 rounded-full px-1.5 py-0.5 text-xs font-bold">
                  {cartCount}
                </span>
                <span className="hidden sm:inline text-emerald-200">·</span>
                <span className="hidden sm:inline font-bold">
                  {formatNaira(cartTotal)}
                </span>
              </>
            ) : (
              <span className="text-emerald-200 text-xs hidden sm:inline">
                0 items
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* ── PRODUCTS ──────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {products.length === 0 ? (
          <EmptyState
            icon={<ShoppingBag className="h-10 w-10" />}
            title="No products yet"
            description="This vendor hasn't added any products yet. Check back soon."
          />
        ) : (
          <div className="space-y-10">
            {/* Available products */}
            {availableProducts.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                    {availableProducts.length} item
                    {availableProducts.length > 1 ? "s" : ""} available
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {availableProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Out of stock */}
            {outOfStock.length > 0 && (
              <section>
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                  Out of Stock
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 opacity-60">
                  {outOfStock.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      {/* ── STICKY MOBILE CART ────────────────────────────────────────── */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 inset-x-4 z-40 sm:hidden">
          <button
            onClick={() => setDrawerOpen(true)}
            className="w-full flex items-center justify-between bg-gray-900 text-white px-5 py-4 rounded-2xl font-bold shadow-2xl hover:bg-gray-800 transition-all"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              <span>
                {cartCount} item{cartCount > 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-black">
                {formatNaira(cartTotal)}
              </span>
              <span className="text-gray-400 text-sm">· View cart</span>
            </div>
          </button>
        </div>
      )}

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <p className="line-clamp-1 text-center sm:text-left">
            {settings.shopName} · Orders via WhatsApp
          </p>
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors font-medium"
          >
            <div className="h-5 w-5 bg-emerald-600 rounded flex items-center justify-center text-white text-[10px] font-black">
              ₦
            </div>
            Powered by Trazo
          </Link>
        </div>
      </footer>

      {/* ── CART DRAWER ───────────────────────────────────────────────── */}
      <CartDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
        settings={settings}
      />
    </div>
  );
}
