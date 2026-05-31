"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Store, Search } from "lucide-react";
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
  const [search, setSearch] = useState("");

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleAddToCart = useCallback((item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        // Enforce stock limit
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

  // Filter by search
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );
  const availableProducts = filtered.filter((p) => p.available);
  const outOfStock = filtered.filter((p) => !p.available);
  const hasSearch = search.trim().length > 0;

  return (
    <div className="min-h-screen bg-surface-alt flex flex-col">
      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-40 bg-header border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          {/* Shop identity */}
          <div className="flex items-center gap-2.5 min-w-0">
            {settings.logoUrl ? (
              <div className="relative h-8 w-8 rounded-xl overflow-hidden shrink-0 bg-white/10">
                <Image
                  src={settings.logoUrl}
                  alt={settings.shopName}
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
            ) : (
              <div className="h-8 w-8 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <Store className="h-4 w-4 text-white" />
              </div>
            )}
            <div className="min-w-0">
              <p className="font-bold text-white text-sm truncate leading-tight">
                {settings.shopName}
              </p>
              {settings.description && (
                <p className="text-[11px] text-white/60 truncate hidden sm:block max-w-xs">
                  {settings.description}
                </p>
              )}
            </div>
          </div>

          {/* Cart button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="relative shrink-0 flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-full font-semibold text-sm transition-colors active:scale-95"
          >
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 ? (
              <>
                <span className="bg-white/20 rounded-full px-1.5 py-0.5 text-xs font-bold">
                  {cartCount}
                </span>
                <span className="hidden sm:inline text-white/60">·</span>
                <span className="hidden sm:inline font-bold">
                  {formatNaira(cartTotal)}
                </span>
              </>
            ) : (
              <span className="text-white/60 text-xs hidden sm:inline">
                Empty
              </span>
            )}
          </button>
        </div>

        {/* Search */}
        {products.length > 4 && (
          <div className="px-4 pb-3 max-w-4xl">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40" />
              <input
                type="text"
                placeholder="Search products…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full border border-white/10 text-sm bg-white/10 text-white placeholder:text-white/40 focus:outline-none focus:bg-white/15 transition-colors"
              />
            </div>
          </div>
        )}
      </nav>

      {/* ── PRODUCTS ── */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-5 pb-28 sm:pb-8">
        {products.length === 0 ? (
          <EmptyState
            icon={<ShoppingBag className="h-10 w-10" />}
            title="No products yet"
            description="This vendor hasn't added any products yet. Check back soon."
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
                <p className="text-[11px] font-semibold text-text-muted uppercase tracking-widest mb-3">
                  {hasSearch
                    ? `${availableProducts.length} result${availableProducts.length !== 1 ? "s" : ""}`
                    : `${availableProducts.length} item${availableProducts.length !== 1 ? "s" : ""} available`}
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
                <p className="text-[11px] font-semibold text-text-muted uppercase tracking-widest mb-3">
                  Out of stock
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 opacity-50">
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

      {/* ── STICKY MOBILE CART ── */}
      {cartCount > 0 && (
        <div className="fixed bottom-4 inset-x-4 z-40 sm:hidden">
          <button
            onClick={() => setDrawerOpen(true)}
            className="w-full flex items-center justify-between bg-header text-white px-5 py-4 rounded-2xl font-bold transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span className="text-sm">
                {cartCount} item{cartCount > 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-black text-sm">
                {formatNaira(cartTotal)}
              </span>
              <span className="text-white/60 text-xs">· Checkout</span>
            </div>
          </button>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer className="border-t border-border bg-surface mt-auto">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-text-muted">
            {settings.shopName} · Orders via WhatsApp
          </p>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-[11px] text-text-muted hover:text-primary transition-colors font-medium"
          >
            <div className="h-5 w-5 bg-header rounded flex items-center justify-center text-white text-[10px] font-black">
              ₦
            </div>
            Powered by Trazo
          </Link>
        </div>
      </footer>

      {/* ── CART DRAWER ── */}
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
