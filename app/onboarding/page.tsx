"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle,
  Store,
  MessageSquare,
  Sparkles,
} from "lucide-react";
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
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-surface font-sans antialiased text-text transition-colors duration-200">
      {/* LEFT PANEL: Context & Branding Showcase */}
      <div className="hidden lg:flex lg:col-span-5 bg-header flex-col justify-between p-12 text-white relative overflow-hidden">
        {/* Subtle decorative overlay matching a soft message layout */}
        <div className="absolute inset-0 bg-black/5 pointer-events-none" />

        {/* Branding header */}
        <div className="flex items-center gap-3 relative z-10">
          <Image
            src={logo}
            alt="logo"
            className="h-9 w-9 brightness-0 invert"
          />
          <span className="font-bold text-xl tracking-tight">Trazo</span>
        </div>

        {/* Core Value Stack */}
        <div className="space-y-6 relative z-10 my-auto max-w-sm">
          <div className="inline-flex items-center gap-2 bg-black/10 border border-white/10 px-3 py-1 rounded-full text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Setup your
            storefront
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
            Launch your WhatsApp business.
          </h1>
          <p className="text-white/80 text-base leading-relaxed">
            Create a custom link, present your brand elegantly, and capture
            customer intent directly into your chats.
          </p>

          <div className="pt-6 space-y-4 border-t border-white/10">
            <div className="flex items-start gap-3.5">
              <div className="p-2 bg-bubble-out text-primary-dark rounded-lg mt-0.5 shadow-sm">
                <Store className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Vanity Link</h4>
                <p className="text-sm text-white/70">
                  Claim your specialized storefront location instantly.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2 bg-bubble-out text-primary-dark rounded-lg mt-0.5 shadow-sm">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white">
                  Direct Chat Linkages
                </h4>
                <p className="text-sm text-white/70">
                  Orders convert seamlessly to message templates on your phone.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-white/50 relative z-10">
          &copy; {new Date().getFullYear()} Trazo. Built for chat commerce.
        </p>
      </div>

      {/* RIGHT PANEL: Form inputs */}
      <div className="col-span-1 lg:col-span-7 flex flex-col justify-between min-h-screen bg-surface-alt lg:bg-surface">
        {/* Mobile Header (Hidden on large displays) */}
        <div className="p-4 bg-header text-white lg:hidden flex items-center gap-3 shadow-md">
          <Image
            src={logo}
            alt="logo"
            className="h-8 w-8 brightness-0 invert"
          />
          <h2 className="text-md font-bold tracking-wide">Onboarding Store</h2>
        </div>

        {/* Main interactive viewport container */}
        <div className="flex-1 max-w-xl w-full mx-auto px-6 py-10 lg:py-16 space-y-10">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-text">
              Store Information
            </h2>
            <p className="text-text-muted text-sm mt-1.5">
              Let&apos;s build your dynamic storefront profile. Don&apos;t
              worry, these data points can be tweaked inside your panel later.
            </p>
          </div>

          <div className="space-y-8">
            {/* SECTION 1: Identity & Slugs */}
            <section className="space-y-5 bg-surface p-5 lg:p-0 rounded-lg shadow-sm lg:shadow-none border border-border lg:border-none">
              <div className="border-b border-border pb-2">
                <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Identity
                </h3>
              </div>

              <Input
                label="Shop Name"
                placeholder="e.g. Omega Boutique"
                value={form.shopName}
                onChange={(e) => update("shopName", e.target.value)}
                className="bg-surface border-border text-text placeholder:text-text-muted"
              />

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text">
                  Store URL
                </label>
                <div className="flex items-center border border-border focus-within:border-primary-dark transition-colors rounded-lg bg-surface-alt overflow-hidden px-3.5">
                  <span className="text-sm text-text-muted select-none pr-1">
                    trazo.com/store/
                  </span>
                  <input
                    className="flex-1 py-3 bg-transparent outline-none text-sm text-text placeholder:text-text-muted"
                    placeholder="omega-boutique"
                    value={form.slug}
                    onChange={(e) => update("slug", e.target.value)}
                    onBlur={handleSlugBlur}
                  />
                  {checkingSlug ? (
                    <span className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                  ) : slugAvailable === true ? (
                    <CheckCircle className="h-5 w-5 text-primary fill-bubble-out" />
                  ) : null}
                </div>
                {slugError && (
                  <p className="text-xs text-red-500 font-medium pl-1">
                    {slugError}
                  </p>
                )}
              </div>
            </section>

            {/* SECTION 2: Communication Hub */}
            <section className="space-y-5 bg-surface p-5 lg:p-0 rounded-lg shadow-sm lg:shadow-none border border-border lg:border-none">
              <div className="border-b border-border pb-2">
                <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Communication
                </h3>
              </div>

              <Input
                label="WhatsApp Number"
                placeholder="e.g. +1234567890"
                value={form.whatsappNumber}
                onChange={(e) => update("whatsappNumber", e.target.value)}
                className="bg-surface border-border text-text placeholder:text-text-muted"
              />

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text">
                  Shop Description
                </label>
                <textarea
                  className="w-full border border-border bg-surface focus:border-primary-dark transition-colors rounded-lg p-3 text-sm text-text outline-none placeholder:text-text-muted"
                  rows={4}
                  placeholder="Welcome your customers, state delivery durations, or add operational context..."
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                />
              </div>
            </section>

            {/* SECTION 3: Visual Identity Assets */}
            <section className="space-y-5 bg-surface p-5 lg:p-0 rounded-lg shadow-sm lg:shadow-none border border-border lg:border-none">
              <div className="border-b border-border pb-2">
                <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Visual Asset
                </h3>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text block">
                  Logo / Avatar
                </label>
                <ImageUpload
                  value={form.logoUrl}
                  onChange={(url) => update("logoUrl", url)}
                />
              </div>
            </section>
          </div>
        </div>

        {/* BOTTOM FIXED CTA ROW */}
        <div className="border-t border-border bg-surface/90 backdrop-blur-md sticky bottom-0 z-20 px-6 py-4">
          <div className="max-w-xl mx-auto flex items-center justify-end">
            <Button
              disabled={!isValid}
              onClick={handleSubmit}
              loading={loading}
              className="w-full lg:w-auto lg:px-10 py-3 rounded-md bg-primary hover:bg-primary-dark text-white disabled:bg-border disabled:text-text-muted text-sm font-bold tracking-wide transition-all duration-150 flex items-center justify-center gap-2 shadow-sm"
            >
              Launch Store <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
