"use client";

import Image from "next/image";
import {
  ShoppingCart,
  CheckCircle,
  AlertTriangle,
  X,
  Info,
} from "lucide-react";
import { useState } from "react";
import { Product, CartItem } from "../../types";
import { formatNaira } from "../../lib/utils";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

interface ProductCardProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
  cartQuantity?: number;
}

export default function ProductCard({
  product,
  onAddToCart,
  cartQuantity = 0,
}: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isTracked = product.stock !== null && product.stock !== undefined;
  const stockLeft = isTracked ? (product.stock ?? 0) - cartQuantity : Infinity;
  const isOutOfStock =
    !product.available || (isTracked && (product.stock ?? 0) === 0);
  const isMaxedInCart = isTracked && stockLeft <= 0;
  const isLowStock =
    isTracked && (product.stock ?? 0) > 0 && (product.stock ?? 0) <= 5;

  const handleAdd = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isOutOfStock || isMaxedInCart) return;
    onAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
      stock: product.stock ?? null,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <>
      {/* ── CARD ──────────────────────────────────────────────── */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="bg-surface rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col cursor-pointer group"
      >
        {/* Image */}
        <div className="relative aspect-square bg-surface-alt overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Quick view hint */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <span className="bg-surface/90 backdrop-blur-md text-text text-xs font-medium px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <Info className="h-3.5 w-3.5" /> Quick View
            </span>
          </div>

          {/* Out of stock */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-surface/70 backdrop-blur-sm flex items-center justify-center z-10">
              <Badge variant="error">Out of Stock</Badge>
            </div>
          )}

          {/* Low stock */}
          {!isOutOfStock && isLowStock && (
            <div className="absolute top-2 left-2 z-10">
              <span className="flex items-center gap-1 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                <AlertTriangle className="h-2.5 w-2.5" />
                Only {product.stock} left
              </span>
            </div>
          )}

          {/* Maxed in cart */}
          {!isOutOfStock && isMaxedInCart && (
            <div className="absolute inset-0 bg-surface/60 backdrop-blur-sm flex items-center justify-center z-10">
              <span className="bg-surface text-text text-xs font-bold px-3 py-1.5 rounded-full border border-border">
                Max in cart
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3 sm:p-4 flex flex-col flex-1 gap-2.5">
          <h3 className="text-sm font-semibold text-text line-clamp-2 leading-snug flex-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm sm:text-base font-bold text-primary shrink-0">
              {formatNaira(product.price)}
            </span>
            <Button
              size="sm"
              onClick={handleAdd}
              disabled={isOutOfStock || isMaxedInCart}
              variant={added ? "secondary" : "primary"}
              className="shrink-0 text-xs relative z-10"
            >
              {added ? (
                <>
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Added</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Add</span>
                </>
              )}
            </Button>
          </div>
          {isTracked && !isOutOfStock && !isLowStock && (
            <p className="text-[10px] text-text-muted">
              {product.stock} in stock
            </p>
          )}
        </div>
      </div>

      {/* ── MODAL ─────────────────────────────────────────────── */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-surface rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-border flex flex-col md:flex-row relative max-h-[90vh] animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 z-20 bg-surface/80 backdrop-blur-md p-1.5 rounded-full border border-border hover:bg-surface-alt text-text transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Image */}
            <div className="relative w-full md:w-1/2 aspect-square bg-surface-alt shrink-0">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Low stock on modal image */}
              {!isOutOfStock && isLowStock && (
                <div className="absolute top-3 left-3">
                  <span className="flex items-center gap-1 bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    <AlertTriangle className="h-3 w-3" />
                    Only {product.stock} left
                  </span>
                </div>
              )}
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col justify-between flex-1 gap-5 overflow-y-auto">
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-text leading-tight pr-8">
                  {product.name}
                </h2>
                <p className="text-2xl font-extrabold text-primary">
                  {formatNaira(product.price)}
                </p>
                <hr className="border-border" />

                {/* Stock status */}
                <div className="flex flex-wrap gap-2 items-center text-xs">
                  {isOutOfStock ? (
                    <Badge variant="error">Out of Stock</Badge>
                  ) : isMaxedInCart ? (
                    <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-lg font-semibold">
                      Maximum quantity in cart
                    </span>
                  ) : isLowStock ? (
                    <span className="flex items-center gap-1 text-amber-600 font-semibold bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      Only {product.stock} items left
                    </span>
                  ) : isTracked ? (
                    <span className="text-text-muted font-medium bg-bubble-out px-2.5 py-1 rounded-lg">
                      {product.stock} available
                    </span>
                  ) : (
                    <span className="text-primary font-semibold bg-bubble-out px-2.5 py-1 rounded-lg">
                      Available
                    </span>
                  )}
                </div>
              </div>

              {/* CTA */}
              <Button
                onClick={() => {
                  handleAdd();
                  if (!isMaxedInCart && !isOutOfStock) setIsModalOpen(false);
                }}
                disabled={isOutOfStock || isMaxedInCart}
                variant={added ? "secondary" : "primary"}
                className="w-full py-3 text-sm font-semibold"
              >
                {added ? (
                  <>
                    <CheckCircle className="h-4 w-4" /> Added to cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart — {formatNaira(product.price)}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
