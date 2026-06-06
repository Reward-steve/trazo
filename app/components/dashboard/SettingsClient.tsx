"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  ExternalLink,
  AlertCircle,
  Crown,
  // Package,
  Info,
} from "lucide-react";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import ImageUpload from "../../components/ui/ImageUpload";
import { updateShop } from "../../actions/settings";
import { cn } from "../../lib/utils";
import { Product, ShopPlan } from "../../types";

interface Shop {
  id: string;
  shopName: string;
  slug: string;
  whatsappNumber: string;
  description: string;
  logoUrl: string;
  plan: ShopPlan;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  products: Product[];
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

  const plan = shop.plan ?? "free";
  const productCount = shop.products?.length ?? 0;

  const PLAN_LIMITS = {
    free: 10,
    growth: 50,
  };

  const productLimit = PLAN_LIMITS[plan];

  const update = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setError("");
  };

  const validate = () => {
    const e: Partial<typeof form> = {};

    if (!form.shopName.trim()) e.shopName = "Shop name is required";

    if (!form.whatsappNumber.trim()) {
      e.whatsappNumber = "WhatsApp number is required";
    } else if (!/^[0-9]{10,15}$/.test(form.whatsappNumber.replace(/\s/g, ""))) {
      e.whatsappNumber = "Use country code e.g. 2348012345678";
    }

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
      setTimeout(() => setSaved(false), 2500);
      router.refresh();
    } catch (err) {
      if (err?.message === "SUBSCRIPTION_EXPIRED") {
        setError("Your subscription has expired. Please upgrade.");
      } else {
        setError("Unable to save changes. Try again.");
      }
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
      {/* PLAN STATUS CARD */}
      <div className="bg-surface border border-border rounded-2xl p-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-bubble-out rounded-xl flex items-center justify-center">
            <Crown className="h-4 w-4 text-primary-dark" />
          </div>

          <div>
            <p className="text-sm font-bold text-text capitalize">
              {plan} plan
            </p>

            <p className="text-[11px] text-text-muted">
              {productCount}/{productLimit} products used
            </p>
          </div>
        </div>

        <span className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary-dark border border-primary/20">
          Active
        </span>
      </div>

      {/* SHOP IDENTITY */}
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

        {/* STORE URL */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-text">Store URL</label>

          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-border bg-surface-alt text-xs text-text-muted">
            <span className="truncate flex-1">
              trazo-omega.vercel.app/store/{shop.slug}
            </span>

            <a
              href={`/store/${shop.slug}`}
              target="_blank"
              className="text-primary hover:text-primary-dark"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div className="bg-surface border border-border rounded-2xl p-4 space-y-3">
        <p className="text-[11px] font-semibold text-text-muted uppercase tracking-widest">
          Contact & orders
        </p>

        <Input
          label="WhatsApp number"
          placeholder="2348012345678"
          value={form.whatsappNumber}
          onChange={(e) => update("whatsappNumber", e.target.value)}
          error={errors.whatsappNumber}
        />

        <p className="text-[11px] text-text-muted">
          Orders are sent directly to this WhatsApp number.
        </p>
      </div>

      {/* ABOUT */}
      <div className="bg-surface border border-border rounded-2xl p-4 space-y-3">
        <div className="flex justify-between">
          <p className="text-[11px] font-semibold text-text-muted uppercase tracking-widest">
            About shop
          </p>

          <span className="text-[11px] text-text-muted">
            {form.description.length}/200
          </span>
        </div>

        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value.slice(0, 200))}
          rows={3}
          className={cn(
            "w-full px-3 py-2.5 rounded-xl border text-sm resize-none",
            "bg-surface text-text border-border focus:border-primary",
          )}
          placeholder="Describe your shop..."
        />
      </div>

      {/* PLAN WARNING */}
      {plan === "free" && (
        <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 rounded-2xl p-3">
          <Info className="h-4 w-4 text-amber-500 mt-0.5" />
          <p className="text-[11px] text-amber-600 dark:text-amber-300">
            Free plan is limited to {productLimit} products. Upgrade to Growth
            for more.
          </p>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="flex items-center gap-2 bg-surface border border-red-200 rounded-2xl px-4 py-3">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <p className="text-xs text-red-500">{error}</p>
        </div>
      )}

      {/* SAVE */}
      <Button
        onClick={handleSave}
        loading={loading}
        disabled={!hasChanges && !loading}
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
  );
}
