"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Settings,
  Package,
} from "lucide-react";
import { Product, ShopSettings } from "../../types";
import { formatNaira } from "../../lib/utils";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import EmptyState from "../../components/ui/EmptyState";
import ProductForm from "../../components/admin/ProductForm";
import SettingsForm from "../../components/admin/SettingsForm";
import {
  deleteProduct,
  toggleProductAvailability,
} from "../../actions/product";
import { useRouter } from "next/navigation";

interface AdminClientProps {
  products: Product[];
  settings: ShopSettings;
}

type Modal = { type: "add" } | { type: "edit"; product: Product } | null;
type Tab = "products" | "settings";

export default function AdminClient({ products, settings }: AdminClientProps) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("products");
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

  const handleFormSuccess = () => {
    setModal(null);
    router.refresh();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">{settings.shopName}</p>
        </div>
        {tab === "products" && (
          <Button onClick={() => setModal({ type: "add" })}>
            <Plus className="h-4 w-4" /> Add Product
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-6">
        {(["products", "settings"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
              tab === t
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t === "products" ? (
              <Package className="h-4 w-4" />
            ) : (
              <Settings className="h-4 w-4" />
            )}
            {t}
          </button>
        ))}
      </div>

      {/* Products tab */}
      {tab === "products" && (
        <>
          {products.length === 0 ? (
            <EmptyState
              icon={<Package className="h-10 w-10" />}
              title="No products yet"
              description="Add your first product to get started."
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
                    <p className="font-semibold text-gray-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-sm text-emerald-700 font-bold">
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
                      onClick={() =>
                        handleToggle(product.id, product.available)
                      }
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
        </>
      )}

      {/* Settings tab */}
      {tab === "settings" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-lg">
          <h2 className="font-bold text-gray-900 mb-4">Shop Settings</h2>
          <SettingsForm
            settings={settings}
            onSuccess={() => router.refresh()}
          />
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
              onSuccess={handleFormSuccess}
              onCancel={() => setModal(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
