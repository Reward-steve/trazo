"use client";

import Image from "next/image";
import { ShoppingCart, CheckCircle, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { Product, CartItem } from "../../types";
import { formatNaira } from "../../lib/utils";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

interface ProductCardProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
  cartQuantity?: number; // how many already in cart
}

export default function ProductCard({
  product,
  onAddToCart,
  cartQuantity = 0,
}: ProductCardProps) {
  const [added, setAdded] = useState(false);

  const isTracked = product.stock !== null && product.stock !== undefined;
  const stockLeft = isTracked ? (product.stock ?? 0) - cartQuantity : Infinity;
  const isOutOfStock =
    !product.available || (isTracked && (product.stock ?? 0) === 0);
  const isMaxedInCart = isTracked && stockLeft <= 0;
  const isLowStock =
    isTracked && (product.stock ?? 0) > 0 && (product.stock ?? 0) <= 5;

  const handleAdd = () => {
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
    <div className="bg-surface-alt rounded-2xl shadow-text-muted border border-border overflow-hidden hover:shadow-text-muted transition-all duration-300 hover:-translate-y-0.5 flex flex-col">
      {/* Image */}
      <div className="relative aspect-square bg-surface overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
            <Badge variant="error">Out of Stock</Badge>
          </div>
        )}

        {/* Low stock badge — top left */}
        {!isOutOfStock && isLowStock && (
          <div className="absolute top-2 left-2">
            <span className="flex items-center gap-1 bg-amber-500 text-text text-[10px] font-bold px-2 py-0.5 rounded-full">
              <AlertTriangle className="h-2.5 w-2.5" />
              Only {product.stock} left
            </span>
          </div>
        )}

        {/* Already maxed in cart badge */}
        {!isOutOfStock && isMaxedInCart && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
            <span className="bg-surface text-text text-xs font-bold px-3 py-1.5 rounded-full">
              Max in cart
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 gap-3">
        <h3 className="text-sm font-semibold text-text line-clamp-2 leading-snug flex-1">
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
            className="shrink-0 text-xs"
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

        {/* Stock count — visible when tracked and not out of stock */}
        {isTracked && !isOutOfStock && !isLowStock && (
          <p className="text-[10px] text-text-muted">
            {product.stock} in stock
          </p>
        )}
      </div>
    </div>
  );
}
