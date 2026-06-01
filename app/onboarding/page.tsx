"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle, Store } from "lucide-react";
import Image from "next/image";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import ImageUpload from "../components/ui/ImageUpload";
import { createShop, checkSlugAvailable } from "../actions/settings";
import logo from "@/public/trazo_omega.png";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 40);
}

const steps = ["Shop Info", "Contact", "Branding"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
  const [checkingSlug, setCheckingSlug] = useState(false);

  const [form, setForm] = useState({
    shopName: "",
    slug: "",
    whatsappNumber: "",
    description: "",
    logoUrl: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const update = (field: keyof typeof form, value: string) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "shopName") {
        updated.slug = generateSlug(value);
        setSlugAvailable(null);
      }
      return updated;
    });
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSlugBlur = async () => {
    if (!form.slug) return;
    setCheckingSlug(true);
    const available = await checkSlugAvailable(form.slug);
    setSlugAvailable(available);
    setCheckingSlug(false);
  };

  const validateStep = () => {
    const e: Partial<typeof form> = {};
    if (step === 0) {
      if (!form.shopName.trim()) e.shopName = "Shop name is required";
      if (!form.slug.trim()) e.slug = "Shop URL is required";
      if (slugAvailable === false) e.slug = "This URL is already taken";
    }
    if (step === 1) {
      if (!form.whatsappNumber.trim())
        e.whatsappNumber = "WhatsApp number is required";
      if (!/^[0-9]{10,15}$/.test(form.whatsappNumber.replace(/\s/g, "")))
        e.whatsappNumber =
          "Enter a valid number with country code e.g. 2348012345678";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await createShop({
        shopName: form.shopName.trim(),
        slug: form.slug.trim(),
        whatsappNumber: form.whatsappNumber.trim(),
        description: form.description.trim(),
        logoUrl: form.logoUrl,
      });
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setErrors({ shopName: "Something went wrong. Please try again." });
      setStep(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-alt flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <div className="relative h-10 w-10 rounded-xl overflow-hidden mb-6">
        <Image src={logo} alt="Trazo logo" fill className="object-cover" />
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl shadow-lg overflow-hidden">
        {/* Card header — step indicator */}
        <div className="bg-header px-6 py-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-9 w-9 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
              <Store className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white leading-tight">
                Create your shop
              </h1>
              <p className="text-xs text-white/60">
                Step {step + 1} of {steps.length} — {steps[step]}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  i <= step ? "bg-primary" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Card body */}
        <div className="px-6 py-6 space-y-5">
          {/* ── STEP 0: Shop Info ─────────────────────────────── */}
          {step === 0 && (
            <>
              <Input
                label="Shop Name"
                placeholder="e.g. Chisom Fashion House"
                value={form.shopName}
                onChange={(e) => update("shopName", e.target.value)}
                error={errors.shopName}
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text">
                  Your Store URL
                </label>
                <div className="relative flex items-center bg-surface-alt border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary transition">
                  <span className="pl-3 text-text-muted text-xs select-none whitespace-nowrap shrink-0">
                    trazo.com/store/
                  </span>
                  <input
                    value={form.slug}
                    onChange={(e) => {
                      update(
                        "slug",
                        e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                      );
                      setSlugAvailable(null);
                    }}
                    onBlur={handleSlugBlur}
                    placeholder="your-shop"
                    className="flex-1 py-2.5 pr-10 bg-transparent text-text text-sm focus:outline-none placeholder:text-text-muted"
                  />
                  {/* Availability indicator */}
                  <div className="absolute right-3 flex items-center">
                    {checkingSlug && (
                      <div className="h-4 w-4 border-2 border-border border-t-primary rounded-full animate-spin" />
                    )}
                    {!checkingSlug && slugAvailable === true && (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    )}
                    {!checkingSlug && slugAvailable === false && (
                      <span className="text-red-400 text-xs font-medium">
                        Taken
                      </span>
                    )}
                  </div>
                </div>
                {errors.slug && (
                  <p className="text-xs text-red-400">{errors.slug}</p>
                )}
                <p className="text-xs text-text-muted">
                  This is the link you share with customers. Choose carefully —
                  it can&apos;t be changed later.
                </p>
              </div>
            </>
          )}

          {/* ── STEP 1: Contact ───────────────────────────────── */}
          {step === 1 && (
            <>
              <div className="flex flex-col gap-1.5">
                <Input
                  label="WhatsApp Number"
                  placeholder="e.g. 2348012345678"
                  value={form.whatsappNumber}
                  onChange={(e) => update("whatsappNumber", e.target.value)}
                  error={errors.whatsappNumber}
                  type="tel"
                />
                <p className="text-xs text-text-muted">
                  Include your country code. Nigerian numbers start with{" "}
                  <span className="font-semibold text-text">234</span>. All
                  customer orders go to this number.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text">
                  Shop Description{" "}
                  <span className="text-text-muted font-normal text-xs">
                    (optional)
                  </span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  placeholder="Tell customers what you sell e.g. Premium thrift fashion for Lagos women..."
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-surface-alt text-text text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-text-muted transition"
                />
              </div>
            </>
          )}

          {/* ── STEP 2: Branding ──────────────────────────────── */}
          {step === 2 && (
            <>
              <p className="text-sm text-text-muted">
                Add a logo so customers recognise your shop. You can always
                update this later.
              </p>

              <ImageUpload
                value={form.logoUrl}
                onChange={(url) => update("logoUrl", url)}
              />

              {/* Storefront URL preview */}
              <div className="bg-bubble-out border border-primary/20 rounded-xl p-4">
                <p className="text-xs text-primary font-semibold mb-1">
                  Your storefront link
                </p>
                <p className="text-sm text-text font-mono break-all">
                  trazo.com/store/{form.slug || "your-shop"}
                </p>
                <p className="text-xs text-text-muted mt-1">
                  Share this in your Instagram bio or WhatsApp status
                </p>
              </div>
            </>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            {step > 0 && (
              <Button
                variant="ghost"
                onClick={() => setStep((s) => s - 1)}
                className="flex-1 text-text-muted hover:text-text hover:bg-surface-alt"
              >
                Back
              </Button>
            )}
            {step < steps.length - 1 ? (
              <Button
                onClick={handleNext}
                className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                loading={loading}
                className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold"
              >
                Launch my shop
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <p className="text-text-muted text-xs mt-6 text-center">
        You can edit all of this later from your dashboard.
      </p>
    </div>
  );
}
