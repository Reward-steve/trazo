"use client";

import { useState, useCallback } from "react";
import { ShoppingBag } from "lucide-react";
import { Product, ShopSettings, CartItem } from "@/app/types";
import ProductCard from "@/app/components/store/ProductCard";
import CartDrawer from "@/app/components/store/CartDrawer";
import EmptyState from "@/app/components/ui/EmptyState";
// import Button from "@/app/components/ui/Button";
import { formatNaira } from "@/app/lib/utils";

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
    <>
      {/* Shop header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-gray-900">
              {settings.shopName}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5 max-w-md line-clamp-2">
              {settings.description}
            </p>
          </div>
          {cartCount > 0 && (
            <button
              onClick={() => setDrawerOpen(true)}
              className="shrink-0 flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-emerald-700 transition shadow-sm"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-white/20 rounded-full px-1.5 py-0.5 text-xs font-bold">
                {cartCount}
              </span>
              <span className="hidden sm:inline text-emerald-200">·</span>
              <span className="hidden sm:inline">{formatNaira(cartTotal)}</span>
            </button>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {products.length === 0 ? (
          <EmptyState
            icon={<ShoppingBag className="h-10 w-10" />}
            title="No products yet"
            description="The vendor hasn't added any products to this store yet."
          />
        ) : (
          <>
            {availableProducts.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {availableProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}

            {outOfStock.length > 0 && (
              <div className="mt-10">
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Out of Stock
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {outOfStock.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Sticky mobile cart button */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 sm:hidden">
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-3 bg-emerald-600 text-white px-6 py-3.5 rounded-2xl font-bold shadow-xl hover:bg-emerald-700 transition"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount} item{cartCount > 1 ? "s" : ""} ·{" "}
            {formatNaira(cartTotal)}
          </button>
        </div>
      )}

      <CartDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
        settings={settings}
      />
    </>
  );
}
