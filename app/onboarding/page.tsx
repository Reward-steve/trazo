"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle } from "lucide-react";
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
  const [slugError, setSlugError] = useState<string>("");

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

    if (field !== "slug") {
      setSlugError("");
    }
  };

  const handleSlugBlur = async () => {
    if (!form.slug) return;

    setCheckingSlug(true);

    try {
      const available = await checkSlugAvailable(form.slug);
      setSlugAvailable(available);

      if (!available) {
        setSlugError("This URL is already taken");
      }
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
    <div className="min-h-screen bg-surface-alt px-6 py-10">
      {/* HEADER */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Image src={logo} alt="logo" className="h-10 w-10" />
          <h1 className="text-2xl font-bold text-text">
            Create your shop in minutes
          </h1>
        </div>
        <p className="text-text-muted">
          Set up your storefront. You can change everything later.
        </p>
      </div>

      {/* FORM */}
      <div className="max-w-3xl mx-auto space-y-10">
        {/* SHOP INFO */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-text">Shop Info</h2>

          <Input
            label="Shop Name"
            value={form.shopName}
            onChange={(e) => update("shopName", e.target.value)}
          />

          <div>
            <label className="text-sm font-medium">Store URL</label>

            <div className="flex items-center border rounded-xl bg-surface-alt px-3">
              <span className="text-xs text-muted">trazo.com/store/</span>

              <input
                className="flex-1 p-2 bg-transparent outline-none text-sm"
                value={form.slug}
                onChange={(e) => update("slug", e.target.value)}
                onBlur={handleSlugBlur}
              />

              {checkingSlug ? (
                <span className="animate-spin h-4 w-4 border rounded-full" />
              ) : slugAvailable === true ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : null}
            </div>

            {slugError && (
              <p className="text-sm text-red-500 mt-1">{slugError}</p>
            )}
          </div>
        </section>

        {/* CONTACT */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-text">Contact</h2>

          <Input
            label="WhatsApp Number"
            value={form.whatsappNumber}
            onChange={(e) => update("whatsappNumber", e.target.value)}
          />

          <textarea
            className="w-full border rounded-xl p-3"
            rows={3}
            placeholder="Describe your shop..."
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </section>

        {/* BRANDING */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-text">Branding</h2>

          <ImageUpload
            value={form.logoUrl}
            onChange={(url) => update("logoUrl", url)}
          />
        </section>

        {/* CTA */}
        <div className="sticky bottom-0 bg-surface-alt py-4 border-t">
          <Button
            disabled={!isValid}
            onClick={handleSubmit}
            loading={loading}
            className="w-full"
          >
            Launch Shop <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
