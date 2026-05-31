"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Package, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product } from "../../types";
import { formatNaira, cn } from "../../lib/utils";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import EmptyState from "../../components/ui/EmptyState";
import ProductForm from "./ProductForm";
import {
  deleteProduct,
  toggleProductAvailability,
} from "../../actions/product";

interface ProductsClientProps {
  products: Product[];
  shopSlug: string;
}

type Modal = { type: "add" } | { type: "edit"; product: Product } | null;

export default function ProductsClient({
  products,
  shopSlug,
}: ProductsClientProps) {
  const router = useRouter();
  const [modal, setModal] = useState<Modal>(null);
  const [isPending, startTransition] = useTransition();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setPendingId(id);
    startTransition(async () => {
      await deleteProduct(id);
      setPendingId(null);
      router.refresh();
    });
  };

  const handleToggle = (id: string, current: boolean) => {
    setPendingId(id);
    startTransition(async () => {
      await toggleProductAvailability(id, !current);
      setPendingId(null);
      router.refresh();
    });
  };

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {products.length === 0
            ? "No products yet"
            : `${products.length} product${products.length !== 1 ? "s" : ""}`}
        </p>
        <Button onClick={() => setModal({ type: "add" })} size="sm">
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      {/* Empty state */}
      {products.length === 0 ? (
        <EmptyState
          icon={<Package className="h-10 w-10" />}
          title="No products yet"
          description="Add your first product so customers can start ordering from your storefront."
          action={
            <Button onClick={() => setModal({ type: "add" })}>
              <Plus className="h-4 w-4" /> Add your first product
            </Button>
          }
        />
      ) : (
        <div className="space-y-2.5">
          {products.map((product) => {
            const isThisPending = pendingId === product.id;
            return (
              <div
                key={product.id}
                className={cn(
                  "flex items-center gap-3 sm:gap-4 bg-white dark:bg-gray-900 p-3 sm:p-4 rounded-2xl border transition-all",
                  product.available
                    ? "border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md"
                    : "border-gray-100 dark:border-gray-800 opacity-60",
                  isThisPending && "opacity-50 pointer-events-none",
                )}
              >
                {/* Image */}
                <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-xl overflow-hidden shrink-0 bg-gray-50 dark:bg-gray-800">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white truncate text-sm">
                    {product.name}
                  </p>
                  <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">
                    {formatNaira(product.price)}
                  </p>
                  <Badge
                    variant={product.available ? "success" : "error"}
                    className="mt-1.5"
                  >
                    {product.available
                      ? "Visible to customers"
                      : "Hidden from customers"}
                  </Badge>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-0.5 shrink-0">
                  <button
                    onClick={() => handleToggle(product.id, product.available)}
                    disabled={isPending}
                    title={
                      product.available
                        ? "Hide from customers"
                        : "Show to customers"
                    }
                    className={cn(
                      "flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all",
                      product.available
                        ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
                        : "text-gray-400 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700",
                    )}
                  >
                    {product.available ? (
                      <>
                        <Eye className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Live</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Hidden</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setModal({ type: "edit", product })}
                    title="Edit product"
                    className="p-2 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id, product.name)}
                    disabled={isPending}
                    title="Delete product"
                    className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-black text-gray-900 dark:text-white text-lg">
                {modal.type === "add" ? "Add New Product" : "Edit Product"}
              </h2>
              <button
                onClick={() => setModal(null)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                ✕
              </button>
            </div>
            <ProductForm
              product={modal.type === "edit" ? modal.product : undefined}
              onSuccess={() => {
                setModal(null);
                router.refresh();
              }}
              onCancel={() => setModal(null)}
            />
          </div>
        </div>
      )}
    </>
  );
}
