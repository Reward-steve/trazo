"use client";

import { useState } from "react";
import { Product } from "../../types";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { createProduct, updateProduct } from "../../actions/product";
import ImageUpload from "../ui/ImageUpload";

interface ProductFormProps {
  product?: Product;
  onSuccess: () => void;
  onCancel: () => void;
}
//up to data
export default function ProductForm({
  product,
  onSuccess,
  onCancel,
}: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: product?.name ?? "",
    price: product?.price?.toString() ?? "",
    imageUrl: product?.imageUrl ?? "",
    available: product?.available ?? true,
    trackStock: product?.stock !== null && product?.stock !== undefined,
    stock: product?.stock?.toString() ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Product name is required";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      e.price = "Enter a valid price";
    if (!form.imageUrl.trim()) e.imageUrl = "Product image is required";
    if (form.trackStock) {
      if (!form.stock || isNaN(Number(form.stock)) || Number(form.stock) < 0)
        e.stock = "Enter a valid stock quantity";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const data = {
        name: form.name.trim(),
        price: Math.round(Number(form.price)),
        imageUrl: form.imageUrl.trim(),
        available: form.available,
        stock: form.trackStock ? Math.round(Number(form.stock)) : null,
      };
      if (product) {
        await updateProduct(product.id, data);
      } else {
        await createProduct(data);
      }
      onSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <Input
        label="Product name"
        placeholder="e.g. Handwoven Ankara Maxi Dress"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        error={errors.name}
      />
      <Input
        label="Price (₦)"
        placeholder="e.g. 24500"
        type="number"
        min="0"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        error={errors.price}
      />
      <ImageUpload
        value={form.imageUrl}
        onChange={(url) => setForm({ ...form, imageUrl: url })}
        error={errors.imageUrl}
      />

      {/* Stock tracking toggle */}
      <div className="bg-surface-alt rounded-xl p-4 space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.trackStock}
            onChange={(e) =>
              setForm({ ...form, trackStock: e.target.checked, stock: "" })
            }
            className="mt-0.5 w-4 h-4 rounded accent-primary"
          />
          <div>
            <p className="text-sm font-medium text-text">
              Track stock quantity
            </p>
            <p className="text-xs text-text-muted mt-0.5">
              Customers won&apos;t be able to order more than you have
              available. Leave off for unlimited or made-to-order items.
            </p>
          </div>
        </label>

        {form.trackStock && (
          <Input
            label="Stock Quantity"
            placeholder="e.g. 3"
            type="number"
            min="0"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            error={errors.stock}
          />
        )}
      </div>

      {/* Availability toggle */}
      <label className="flex items-center justify-between p-3 bg-surface border border-border rounded-2xl cursor-pointer group">
        <div>
          <p className="text-sm font-medium text-text">In stock</p>
          <p className="text-[11px] text-text-muted mt-0.5">
            {form.available ? "Visible to customers" : "Hidden from storefront"}
          </p>
        </div>
        <div
          onClick={() => setForm({ ...form, available: !form.available })}
          className={`relative w-10 h-6 rounded-full transition-colors ${
            form.available ? "bg-primary" : "bg-border"
          }`}
        >
          <div
            className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${
              form.available ? "left-5" : "left-1"
            }`}
          />
        </div>
      </label>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <Button onClick={handleSubmit} loading={loading} className="flex-1">
          {product ? "Save changes" : "Add product"}
        </Button>
        <Button variant="secondary" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  );
}
