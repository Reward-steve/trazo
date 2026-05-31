"use client";

import Image from "next/image";
import { ShoppingCart, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Product, CartItem } from "../../types";
import { formatNaira } from "../../lib/utils";
import Button from "../../components/ui/Button";

interface ProductCardProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative aspect-square bg-surface-alt overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {!product.available && (
          <div className="absolute inset-0 bg-surface/80 flex items-center justify-center">
            <span className="text-[11px] font-semibold text-text-muted bg-surface border border-border px-2.5 py-1 rounded-full">
              Out of stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1 gap-2.5">
        <h3 className="text-sm font-semibold text-text line-clamp-2 leading-snug flex-1">
          {product.name}
        </h3>
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-bold text-primary-dark shrink-0">
            {formatNaira(product.price)}
          </span>
          <Button
            size="sm"
            onClick={handleAdd}
            disabled={!product.available}
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
      </div>
    </div>
  );
}
