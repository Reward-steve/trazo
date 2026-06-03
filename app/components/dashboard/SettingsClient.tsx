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

  const buttonVariant = hasChanges || saved ? "primary" : "secondary";
  return (
    <div className="space-y-3">
      {/* Shop identity */}
      <div className="bg-surface border border-border rounded-2xl p-4 space-y-4">
        <p className="text-[11px] font-semibold text-text-muted uppercase tracking-widest">
          Shop identity
        </p>

        <ImageUpload
          value={form.logoUrl}
          onChange={(url) => update("logoUrl", url)}
        />

        <Input
          label="Shop name"
          value={form.shopName}
          onChange={(e) => update("shopName", e.target.value)}
          error={errors.shopName}
        />

        {/* Store URL — read only */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-text">Store URL</label>
            <span className="text-[10px] text-text-muted bg-surface-alt border border-border px-2 py-0.5 rounded-full">
              Cannot be changed
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-border bg-surface-alt text-xs text-text-muted">
            <span className="truncate flex-1">
              trazo-omega.vercel.app/store/{shop.slug}
            </span>
            <a
              href={`/store/${shop.slug}`}
              target="_blank"
              className="shrink-0 text-primary hover:text-primary-dark transition-colors"
              title="Open storefront"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Contact & orders */}
      <div className="bg-surface border border-border rounded-2xl p-4 space-y-3">
        <p className="text-[11px] font-semibold text-text-muted uppercase tracking-widest">
          Contact & orders
        </p>
        <Input
          label="WhatsApp number"
          placeholder="e.g. 2348012345678"
          value={form.whatsappNumber}
          onChange={(e) => update("whatsappNumber", e.target.value)}
          error={errors.whatsappNumber}
          type="tel"
        />
        <p className="text-[11px] text-text-muted leading-relaxed">
          Enter your WhatsApp number with the country code. Customers will send
          their orders directly to this number.
        </p>
      </div>

      {/* About */}
      <div className="bg-surface border border-border rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold text-text-muted uppercase tracking-widest">
            About your shop
          </p>
          <span className="text-[11px] text-text-muted tabular-nums">
            {form.description.length}/200
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-text">
            Description{" "}
            <span className="text-text-muted font-normal">(optional)</span>
          </label>
          <textarea
            value={form.description}
            onChange={(e) =>
              update("description", e.target.value.slice(0, 200))
            }
            rows={3}
            placeholder="Tell customers what you sell e.g. Premium thrift fashion for Lagos women..."
            className={cn(
              "w-full px-3 py-2.5 rounded-xl border text-sm resize-none transition-colors",
              "bg-surface text-text placeholder:text-text-muted",
              "border-border hover:border-primary/40",
              "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60",
            )}
          />
          <p className="text-[11px] text-text-muted">
            Appears under your shop name on your storefront.
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2.5 bg-surface border border-red-200 dark:border-red-900/40 rounded-2xl px-4 py-3">
          <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
          <p className="text-xs text-red-500">{error}</p>
        </div>
      )}

      {/* Save */}
      <div className="space-y-2 pt-1">
        <Button
          onClick={handleSave}
          loading={loading}
          size="lg"
          disabled={!hasChanges && !loading}
          variant={buttonVariant}
          className="w-full"
        >
          {saved ? (
            <>
              <CheckCircle className="h-4 w-4" />
              Saved
            </>
          ) : (
            "Save changes"
          )}
        </Button>

        {!hasChanges && !saved && (
          <p className="text-[11px] text-center text-text-muted">
            No unsaved changes
          </p>
        )}
      </div>
    </div>
  );
}
