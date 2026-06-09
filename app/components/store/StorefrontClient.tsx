"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { ShoppingBag, Store, Search, ArrowRight } from "lucide-react";
import { Product, ShopSettings, CartItem } from "../../types";
import ProductCard from "../../components/store/ProductCard";
import CartDrawer from "../../components/store/CartDrawer";
import EmptyState from "../../components/ui/EmptyState";
import { formatNaira } from "../../lib/utils";
import { ThemeToggle } from "../ui/ThemeProvider";

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
  const [search, setSearch] = useState("");
  const [cartBump, setCartBump] = useState(false);

  const prevCountRef = useRef(0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // Only bump when count increases (item added), not on removal
  useEffect(() => {
    if (cartCount > prevCountRef.current) {
      setCartBump(true);
      const t = setTimeout(() => setCartBump(false), 400);
      return () => clearTimeout(t);
    }
    prevCountRef.current = cartCount;
  }, [cartCount]);

  const handleAddToCart = useCallback((item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        const limit = item.stock ?? Infinity;
        if (existing.quantity >= limit) return prev;
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, item];
    });
  }, []);

  const handleUpdateQuantity = useCallback((id: string, quantity: number) => {
    setCart((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, quantity } : i)),
    );
  }, []);

  const handleRemove = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );
  const availableProducts = filtered.filter((p) => p.available);
  const outOfStock = filtered.filter((p) => !p.available);
  const hasSearch = search.trim().length > 0;

  return (
    <div className="min-h-screen bg-surface-alt flex flex-col relative">
      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-40 bg-surface border-b border-border">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Shop identity */}
          <div className="flex items-center gap-2.5 min-w-0">
            {settings.logoUrl ? (
              <div className="relative h-8 w-8 rounded-xl overflow-hidden shrink-0 bg-white/10">
                <Image
                  src={settings.logoUrl}
                  alt={settings.shopName}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-8 w-8 rounded-xl bg-text/15 flex items-center justify-center shrink-0">
                <Store className="h-4 w-4 text-text" />
              </div>
            )}
            <div className="min-w-0">
              <p className="font-bold text-text text-sm truncate">
                {settings.shopName}
              </p>
              {settings.description && (
                <p className="text-[11px] text-text/60 truncate hidden sm:block">
                  {settings.description}
                </p>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setDrawerOpen(true)}
              className={`flex items-center gap-2 bg-text/10 hover:bg-text/20 text-text px-3 py-2 rounded-full font-semibold text-sm transition-all active:scale-95 ${
                cartBump ? "scale-110 ring-4 ring-primary/30" : ""
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 ? (
                <>
                  <span className="bg-text/20 rounded-full px-1.5 py-0.5 text-xs font-bold">
                    {cartCount}
                  </span>
                  <span className="hidden sm:inline text-text/60">·</span>
                  <span className="hidden sm:inline font-bold">
                    {formatNaira(cartTotal)}
                  </span>
                </>
              ) : (
                <span className="text-text/60 text-xs hidden sm:inline">
                  Empty
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search — only shown when there are enough products to warrant it */}
        {products.length > 4 && (
          <div className="px-4 pb-3 max-w-4xl mx-auto">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text/40" />
              <input
                type="text"
                placeholder="Search products…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full border border-border text-sm bg-surface-alt text-text placeholder:text-text/40 focus:outline-none focus:bg-text/15"
              />
            </div>
          </div>
        )}
      </nav>

      {/* ── MAIN ── */}
      <main
        className={`flex-1 max-w-4xl mx-auto w-full px-4 py-5 ${cartCount > 0 ? "pb-32" : "pb-8"}`}
      >
        {products.length === 0 ? (
          <EmptyState
            icon={<ShoppingBag className="h-10 w-10" />}
            title="No products yet"
            description="This vendor hasn't added any products yet."
          />
        ) : hasSearch && filtered.length === 0 ? (
          <EmptyState
            icon={<Search className="h-10 w-10" />}
            title={`No results for "${search}"`}
            description="Try a different search term."
          />
        ) : (
          <div className="space-y-8">
            {availableProducts.length > 0 && (
              <section>
                <p className="text-[11px] font-semibold text-text-muted uppercase mb-3">
                  Available
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
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

            {outOfStock.length > 0 && (
              <section>
                <p className="text-[11px] font-semibold text-text-muted uppercase mb-3">
                  Out of stock
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 opacity-60">
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

      {/* ── STICKY CHECKOUT BAR ── */}
      {cartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-border px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] animate-in slide-in-from-bottom duration-300">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-text-muted font-medium">
                {cartCount} {cartCount === 1 ? "item" : "items"}
              </p>
              <p className="text-lg font-bold text-text leading-tight">
                {formatNaira(cartTotal)}
              </p>
            </div>
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              View Cart & Checkout
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
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
