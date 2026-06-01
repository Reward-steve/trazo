"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Package, Eye, EyeOff, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product } from "../../types";
import { formatNaira, cn } from "../../lib/utils";
import Button from "../../components/ui/Button";
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
  // shopSlug,
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
      <div className="flex items-center justify-between">
        <p className="text-[11px] text-text-muted">
          {products.length === 0
            ? "No products yet"
            : `${products.length} product${products.length !== 1 ? "s" : ""}`}
        </p>
        <Button onClick={() => setModal({ type: "add" })} size="sm">
          <Plus className="h-3.5 w-3.5" /> Add product
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
        <div className="space-y-2">
          {products.map((product) => {
            const isThisPending = pendingId === product.id;
            return (
              <div
                key={product.id}
                className={cn(
                  "flex items-center gap-3 bg-surface border border-border rounded-2xl p-3 transition-all",
                  !product.available && "opacity-50",
                  isThisPending && "opacity-40 pointer-events-none",
                )}
              >
                {/* Image */}
                <div className="relative h-14 w-14 rounded-xl overflow-hidden shrink-0 bg-surface-alt">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-text text-sm truncate leading-tight">
                    {product.name}
                  </p>
                  <p className="text-sm font-bold text-primary-dark mt-0.5">
                    {formatNaira(product.price)}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <div
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        product.available ? "bg-primary" : "bg-border",
                      )}
                    />
                    <span className="text-[11px] text-text-muted">
                      {product.available ? "Visible to customers" : "Hidden"}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  {/* Toggle */}
                  <button
                    onClick={() => handleToggle(product.id, product.available)}
                    disabled={isPending}
                    title={
                      product.available
                        ? "Hide from customers"
                        : "Show to customers"
                    }
                    className={cn(
                      "p-2 rounded-xl transition-colors",
                      product.available
                        ? "text-primary bg-bubble-out hover:opacity-80"
                        : "text-text-muted bg-surface-alt hover:bg-border",
                    )}
                  >
                    {product.available ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => setModal({ type: "edit", product })}
                    title="Edit product"
                    className="p-2 rounded-xl text-text-muted hover:text-text hover:bg-surface-alt transition-colors"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(product.id, product.name)}
                    disabled={isPending}
                    title="Delete product"
                    className="p-2 rounded-xl text-text-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
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
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-surface rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md p-5 max-h-[90vh] overflow-y-auto border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-text text-base">
                {modal.type === "add" ? "Add product" : "Edit product"}
              </h2>
              <button
                onClick={() => setModal(null)}
                className="h-8 w-8 flex items-center justify-center rounded-xl text-text-muted hover:text-text hover:bg-surface-alt transition-colors"
              >
                <X className="h-4 w-4" />
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
