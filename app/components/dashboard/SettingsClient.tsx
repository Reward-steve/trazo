"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, ExternalLink } from "lucide-react";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import ImageUpload from "@/app/components/ui/ImageUpload";
import { updateShop } from "@/app/actions/settings";

interface Shop {
  shopName: string;
  slug: string;
  whatsappNumber: string;
  description: string;
  logoUrl: string;
}

export default function SettingsClient({ shop }: { shop: Shop }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    shopName: shop.shopName,
    whatsappNumber: shop.whatsappNumber,
    description: shop.description,
    logoUrl: shop.logoUrl,
  });

  const update = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateShop(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Shop identity */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
          Shop Identity
        </h2>
        <ImageUpload
          value={form.logoUrl}
          onChange={(url) => update("logoUrl", url)}
        />
        <Input
          label="Shop Name"
          value={form.shopName}
          onChange={(e) => update("shopName", e.target.value)}
        />
        {/* Slug is read-only — can't change it */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Store URL
            <span className="ml-2 text-xs text-gray-400 font-normal">
              Cannot be changed
            </span>
          </label>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-100 bg-gray-50 text-sm text-gray-500">
            <span>naijacart.com/store/{shop.slug}</span>
            <a
              href={`/store/${shop.slug}`}
              target="_blank"
              className="ml-auto text-emerald-600 hover:text-emerald-700"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
          Contact & Orders
        </h2>
        <Input
          label="WhatsApp Number"
          placeholder="e.g. 2348012345678"
          value={form.whatsappNumber}
          onChange={(e) => update("whatsappNumber", e.target.value)}
        />
        <p className="text-xs text-gray-400 -mt-2">
          All customer orders are sent to this number. Include country code.
        </p>
      </div>

      {/* Description */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
          About Your Shop
        </h2>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Shop Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            rows={3}
            placeholder="Tell customers what you sell..."
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-gray-300 transition"
          />
        </div>
      </div>

      {/* Save */}
      <Button
        onClick={handleSave}
        loading={loading}
        size="lg"
        className="w-full"
      >
        {saved ? (
          <>
            <CheckCircle className="h-4 w-4" /> Saved!
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
    </div>
  );
}
