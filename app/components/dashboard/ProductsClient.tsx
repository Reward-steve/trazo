"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Package,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Product } from "../../types";
import { formatNaira } from "../../lib/utils";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import EmptyState from "../../components/ui/EmptyState";
import ProductForm from "../../components/admin/ProductForm";
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

  const handleDelete = (id: string) => {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    startTransition(async () => {
      await deleteProduct(id);
      router.refresh();
    });
  };

  const handleToggle = (id: string, current: boolean) => {
    startTransition(async () => {
      await toggleProductAvailability(id, !current);
      router.refresh();
    });
  };

  return (
    <>
      {/* Header actions */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {products.length} product{products.length !== 1 ? "s" : ""}
        </p>
        <Button onClick={() => setModal({ type: "add" })} size="sm">
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      {/* Product list */}
      {products.length === 0 ? (
        <EmptyState
          icon={<Package className="h-10 w-10" />}
          title="No products yet"
          description="Add your first product to start receiving orders."
          action={
            <Button onClick={() => setModal({ type: "add" })}>
              <Plus className="h-4 w-4" /> Add Product
            </Button>
          }
        />
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="relative h-16 w-16 rounded-xl overflow-hidden shrink-0 bg-gray-50">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate text-sm">
                  {product.name}
                </p>
                <p className="text-sm font-bold text-emerald-700 mt-0.5">
                  {formatNaira(product.price)}
                </p>
                <Badge
                  variant={product.available ? "success" : "error"}
                  className="mt-1"
                >
                  {product.available ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleToggle(product.id, product.available)}
                  disabled={isPending}
                  title="Toggle availability"
                  className="p-2 rounded-xl text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition"
                >
                  {product.available ? (
                    <ToggleRight className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <ToggleLeft className="h-5 w-5" />
                  )}
                </button>
                <button
                  onClick={() => setModal({ type: "edit", product })}
                  className="p-2 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  disabled={isPending}
                  className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="font-bold text-gray-900 text-lg mb-4">
              {modal.type === "add" ? "Add New Product" : "Edit Product"}
            </h2>
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
