"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle, Store } from "lucide-react";
import Image from "next/image";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import ImageUpload from "../components/ui/ImageUpload";
import { createShop, checkSlugAvailable } from "../actions/settings";
import logo from "../../public/trazo_omega.png";

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 40);
}

export default function OnboardingPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
  const [checkingSlug, setCheckingSlug] = useState(false);
  const [slugError, setSlugError] = useState("");

  const [form, setForm] = useState({
    shopName: "",
    slug: "",
    whatsappNumber: "",
    description: "",
    logoUrl: "",
  });

  const update = (field: keyof typeof form, value: string) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "shopName") {
        updated.slug = generateSlug(value);
        setSlugAvailable(null);
      }
      if (field === "slug") {
        setSlugAvailable(null);
        setSlugError("");
      }
      return updated;
    });
    if (field !== "slug") setSlugError("");
  };

  const handleSlugBlur = async () => {
    if (!form.slug) return;
    setCheckingSlug(true);
    try {
      const available = await checkSlugAvailable(form.slug);
      setSlugAvailable(available);
      if (!available) setSlugError("This URL is already taken");
    } catch {
      setSlugError("Could not verify URL availability");
    } finally {
      setCheckingSlug(false);
    }
  };

  const isValid =
    form.shopName.trim().length > 0 &&
    form.slug.trim().length > 0 &&
    form.whatsappNumber.trim().length > 0 &&
    slugAvailable !== false;

  const handleSubmit = async () => {
    setLoading(true);
    setSlugError("");
    try {
      await createShop(form);
      router.push("/dashboard");
    } catch {
      setSlugError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-alt flex flex-col">
      {/* Header */}
      <div className="bg-header px-4 py-3 flex items-center gap-2">
        <Image src={logo} alt="Trazo" className="h-7 w-7 brightness-0 invert" />
        <span className="font-bold text-white text-sm">Trazo</span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col max-w-lg w-full mx-auto px-4 py-8 space-y-6">
        {/* Intro */}
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 bg-bubble-out rounded-2xl flex items-center justify-center shrink-0">
            <Store className="h-5 w-5 text-primary-dark" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-text leading-tight">
              Set up your shop
            </h1>
            <p className="text-xs text-text-muted mt-0.5">
              Takes less than 2 minutes. You can edit everything later.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-3">
          {/* Shop name */}
          <Input
            label="Shop name"
            placeholder="e.g. Omega Boutique"
            value={form.shopName}
            onChange={(e) => update("shopName", e.target.value)}
          />

          {/* Store URL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-text">Store URL</label>
            <div className="flex items-center bg-surface border border-border rounded-xl px-3 gap-1 focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary/60 transition-all">
              <span className="text-xs text-text-muted shrink-0 py-2.5">
                trazo.com/store/
              </span>
              <input
                className="flex-1 py-2.5 bg-transparent outline-none text-sm text-text placeholder:text-text-muted"
                placeholder="omega-boutique"
                value={form.slug}
                onChange={(e) => update("slug", e.target.value)}
                onBlur={handleSlugBlur}
              />
              {checkingSlug && (
                <span className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin shrink-0" />
              )}
              {!checkingSlug && slugAvailable === true && (
                <CheckCircle className="h-4 w-4 text-primary shrink-0" />
              )}
            </div>
            {slugError && (
              <p className="text-[11px] text-red-500">{slugError}</p>
            )}
          </div>

          {/* WhatsApp number */}
          <Input
            label="WhatsApp number"
            placeholder="e.g. 2348012345678"
            type="tel"
            value={form.whatsappNumber}
            onChange={(e) => update("whatsappNumber", e.target.value)}
          />
          <p className="text-[11px] text-text-muted -mt-1 px-0.5">
            Include country code. Orders from customers go to this number.
          </p>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-text">
              Description{" "}
              <span className="text-text-muted font-normal">(optional)</span>
            </label>
            <textarea
              rows={3}
              placeholder="Tell customers what you sell…"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-border bg-surface text-sm text-text placeholder:text-text-muted resize-none transition-colors hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60"
            />
          </div>

          {/* Logo */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-text">
              Logo{" "}
              <span className="text-text-muted font-normal">(optional)</span>
            </label>
            <ImageUpload
              value={form.logoUrl}
              onChange={(url) => update("logoUrl", url)}
            />
          </div>
        </div>

        {/* CTA */}
        <Button
          onClick={handleSubmit}
          loading={loading}
          disabled={!isValid}
          className="w-full bg-header hover:bg-primary-dark disabled:bg-surface disabled:border disabled:border-border disabled:text-text-muted text-white font-bold py-3 rounded-2xl transition-colors"
        >
          Launch store <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
