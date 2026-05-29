"use client";

import { useState } from "react";
import { Product } from "../../types";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { createProduct, updateProduct } from "../../actions/product";
import ImageUpload from "../../components/ui/ImageUpload";

interface ProductFormProps {
  product?: Product;
  onSuccess: () => void;
  onCancel: () => void;
}

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
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Product name is required";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      e.price = "Enter a valid price";
    if (!form.imageUrl.trim()) e.imageUrl = "Image URL is required";
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
    <div className="space-y-4">
      <Input
        label="Product Name"
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
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.available}
            onChange={(e) => setForm({ ...form, available: e.target.checked })}
            className="w-4 h-4 rounded accent-emerald-600"
          />
          <span className="text-sm font-medium text-gray-700">In Stock</span>
        </label>
      </div>
      <div className="flex gap-2 pt-2">
        <Button onClick={handleSubmit} loading={loading} className="flex-1">
          {product ? "Save Changes" : "Add Product"}
        </Button>
        <Button variant="secondary" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  );
}
