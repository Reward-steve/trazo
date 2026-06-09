"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  Package,
  Eye,
  EyeOff,
  X,
  AlertTriangle,
} from "lucide-react";
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
  productLimit: number; // NEW
  plan: string; // NEW
}

type Modal = { type: "add" } | { type: "edit"; product: Product } | null;

export default function ProductsClient({
  products,
  productLimit,
  plan,
}: ProductsClientProps) {
  const router = useRouter();
  const [modal, setModal] = useState<Modal>(null);
  const [isPending, startTransition] = useTransition();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const atLimit = products.length >= productLimit;

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;

    setPendingId(id);
    startTransition(async () => {
      try {
        await deleteProduct(id);
        router.refresh();
      } finally {
        setPendingId(null);
      }
    });
  };

  const handleToggle = (id: string, current: boolean) => {
    setPendingId(id);

    startTransition(async () => {
      try {
        await toggleProductAvailability(id, !current);
        router.refresh();
      } finally {
        setPendingId(null);
      }
    });
  };

  const openAddModal = () => {
    if (atLimit) {
      setError(
        `You’ve reached your ${plan} plan limit (${productLimit} products). Upgrade to add more.`,
      );
      return;
    }
    setModal({ type: "add" });
  };

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <p className="text-[11px] text-text-muted">
          {products.length} / {productLimit} products
        </p>

        <Button onClick={openAddModal} size="sm" disabled={atLimit}>
          <Plus className="h-3.5 w-3.5" />
          Add product
        </Button>
      </div>

      {/* LIMIT WARNING */}
      {atLimit && (
        <div className="flex items-center gap-2 bg-amber-500/20 rounded-2xl px-4 py-3">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <p className="text-xs text-amber-500">
            Product limit reached for your {plan} plan. Upgrade to continue
            adding products.
          </p>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="flex items-center justify-between bg-red-500/20 border rounded-2xl px-4 py-3">
          <p className="text-xs text-red-500">{error}</p>
          <button onClick={() => setError("")}>
            <X className="h-4 w-4 text-red-500" />
          </button>
        </div>
      )}

      {/* EMPTY STATE */}
      {products.length === 0 ? (
        <EmptyState
          icon={<Package className="h-10 w-10" />}
          title="No products yet"
          description="Add your first product so customers can start ordering."
          action={
            <Button onClick={openAddModal}>
              <Plus className="h-4 w-4" />
              Add product
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
                {/* IMAGE */}
                <div className="relative h-14 w-14 rounded-xl overflow-hidden shrink-0 bg-surface-alt">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* INFO */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-text text-sm truncate">
                    {product.name}
                  </p>
                  <p className="text-sm font-bold text-primary-dark mt-0.5">
                    {formatNaira(product.price)}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleToggle(product.id, product.available)}
                    className="p-2 rounded-xl bg-surface-alt"
                  >
                    {product.available ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </button>

                  <button
                    onClick={() => setModal({ type: "edit", product })}
                    className="p-2 rounded-xl"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(product.id, product.name)}
                    className="p-2 rounded-xl text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-surface rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md p-5 max-h-[90vh] overflow-y-auto border border-border">
            <div className="flex justify-between mb-4">
              <h2 className="font-bold text-text">
                {modal.type === "add" ? "Add product" : "Edit product"}
              </h2>

              <button onClick={() => setModal(null)}>
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
