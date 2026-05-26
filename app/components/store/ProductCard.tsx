"use client";

import Image from "next/image";
import { ShoppingCart, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Product, CartItem } from "@/app/types";
import { formatNaira } from "@/app/lib/utils";
import Badge from "@/app/components/ui/Badge";
import Button from "@/app/components/ui/Button";

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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col">
      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {!product.available && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
            <Badge variant="error">Out of Stock</Badge>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-base font-bold text-emerald-700">
            {formatNaira(product.price)}
          </span>
          <Button
            size="sm"
            onClick={handleAdd}
            disabled={!product.available}
            variant={added ? "secondary" : "primary"}
            className="shrink-0"
          >
            {added ? (
              <>
                <CheckCircle className="h-3.5 w-3.5" /> Added
              </>
            ) : (
              <>
                <ShoppingCart className="h-3.5 w-3.5" /> Add
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
