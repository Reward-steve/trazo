"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, ExternalLink, AlertCircle } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import ImageUpload from "../../components/ui/ImageUpload";
import { updateShop } from "../../actions/settings";
import { cn } from "../../lib/utils";

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
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    shopName: shop.shopName,
    whatsappNumber: shop.whatsappNumber,
    description: shop.description,
    logoUrl: shop.logoUrl,
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const update = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setError("");
  };

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.shopName.trim()) e.shopName = "Shop name is required";
    if (!form.whatsappNumber.trim())
      e.whatsappNumber = "WhatsApp number is required";
    if (!/^[0-9]{10,15}$/.test(form.whatsappNumber.replace(/\s/g, "")))
      e.whatsappNumber =
        "Enter a valid number with country code e.g. 2348012345678";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setLoading(true);
    setError("");
    try {
      await updateShop(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const hasChanges =
    form.shopName !== shop.shopName ||
    form.whatsappNumber !== shop.whatsappNumber ||
    form.description !== shop.description ||
    form.logoUrl !== shop.logoUrl;

  return (
    <div className="space-y-5">
      {/* Shop Identity */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-4">
        <h2 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wide">
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
          error={errors.shopName}
        />

        {/* Store URL — read only */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            Store URL
            <span className="text-xs text-gray-400 font-normal bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
              Cannot be changed
            </span>
          </label>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-sm text-gray-500 dark:text-gray-400">
            <span className="truncate">Trazo.com/store/{shop.slug}</span>
            <a
              href={`/store/${shop.slug}`}
              target="_blank"
              className="ml-auto shrink-0 text-emerald-600 hover:text-emerald-700 transition-colors"
              title="Open storefront"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Contact & Orders */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3">
        <h2 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wide">
          Contact & Orders
        </h2>
        <Input
          label="WhatsApp Number"
          placeholder="e.g. 2348012345678"
          value={form.whatsappNumber}
          onChange={(e) => update("whatsappNumber", e.target.value)}
          error={errors.whatsappNumber}
          type="tel"
        />
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Include your country code. Nigerian numbers start with{" "}
          <span className="font-semibold text-gray-600 dark:text-gray-400">
            234
          </span>
          . Every order from customers goes to this number.
        </p>
      </div>

      {/* About Your Shop */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wide">
            About Your Shop
          </h2>
          <span className="text-xs text-gray-400">
            {form.description.length}/200
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Shop Description
            <span className="ml-1 text-xs text-gray-400 font-normal">
              (optional)
            </span>
          </label>
          <textarea
            value={form.description}
            onChange={(e) =>
              update("description", e.target.value.slice(0, 200))
            }
            rows={3}
            placeholder="Tell customers what you sell e.g. Premium thrift fashion for Lagos women..."
            className={cn(
              "w-full px-3 py-2.5 rounded-xl border text-sm resize-none transition",
              "bg-white dark:bg-gray-800 text-gray-900 dark:text-white",
              "placeholder:text-gray-400 dark:placeholder:text-gray-600",
              "border-gray-200 dark:border-gray-700",
              "hover:border-gray-300 dark:hover:border-gray-600",
              "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent",
            )}
          />
          <p className="text-xs text-gray-400 dark:text-gray-500">
            This appears under your shop name on your storefront.
          </p>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl px-4 py-3">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Save button */}
      <Button
        onClick={handleSave}
        loading={loading}
        size="lg"
        disabled={!hasChanges && !loading}
        className={cn(
          "w-full transition-all",
          saved
            ? "bg-emerald-500 hover:bg-emerald-500 cursor-default"
            : hasChanges
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed",
        )}
      >
        {saved ? (
          <>
            <CheckCircle className="h-4 w-4" /> Changes saved
          </>
        ) : (
          "Save Changes"
        )}
      </Button>

      {!hasChanges && !saved && (
        <p className="text-xs text-center text-gray-400">No unsaved changes</p>
      )}
    </div>
  );
}
