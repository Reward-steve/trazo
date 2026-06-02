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
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-surface">
      {/* LEFT PANEL: Marketing & Visuals (Hidden on mobile) */}
      <div className="hidden lg:flex lg:col-span-5 bg-zinc-900 flex-col justify-between p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent pointer-events-none" />

        {/* Top Branding */}
        <div className="flex items-center gap-3 relative z-10">
          <Image
            src={logo}
            alt="logo"
            className="h-9 w-9 brightness-0 invert"
          />
          <span className="font-bold text-xl tracking-tight">Trazo</span>
        </div>

        {/* Value Proposition */}
        <div className="space-y-6 relative z-10 my-auto">
          <h1 className="text-4xl font-extrabold tracking-tight leading-none text-balance">
            Your commerce journey starts here.
          </h1>
          <p className="text-zinc-400 text-lg text-balance">
            Setup your beautiful custom storefront in minutes. No complexities,
            just straightforward selling.
          </p>

          <div className="pt-4 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-zinc-800 rounded-lg text-indigo-400">
                <Store className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium text-zinc-200">Custom Brand Hub</h4>
                <p className="text-sm text-zinc-400">
                  Get a vanity URL customized uniquely to your store.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-zinc-800 rounded-lg text-green-400">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium text-zinc-200">WhatsApp Engine</h4>
                <p className="text-sm text-zinc-400">
                  Convert traffic seamlessly directly into high-intent chats.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-xs text-zinc-500 relative z-10">
          © {new Date().getFullYear()} Trazo Inc. All rights reserved.
        </p>
      </div>

      {/* RIGHT PANEL: Form inputs */}
      <div className="col-span-1 lg:col-span-7 flex flex-col justify-between min-h-screen bg-white">
        {/* Mobile Header Block */}
        <div className="p-6 border-b border-zinc-100 lg:hidden flex items-center gap-3">
          <Image src={logo} alt="logo" className="h-8 w-8" />
          <h2 className="text-lg font-bold text-zinc-950">Setup Shop</h2>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 max-w-xl w-full mx-auto px-6 py-10 lg:py-16 space-y-10">
          <div>
            <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-indigo-600 tracking-wider uppercase mb-2">
              <Sparkles className="h-3.5 w-3.5" /> Getting Started
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
              Create your shop
            </h2>
            <p className="text-zinc-500 mt-2">
              Set up your modern storefront. Don&apos;t sweat the details; you
              can modify all configurations post-launch.
            </p>
          </div>

          <div className="space-y-8">
            {/* SECTION 1: Identity */}
            <section className="space-y-5">
              <div className="border-b border-zinc-100 pb-2">
                <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider">
                  Shop Details
                </h3>
              </div>

              <Input
                label="Shop Name"
                placeholder="e.g. Omega Apparel"
                value={form.shopName}
                onChange={(e) => update("shopName", e.target.value)}
              />

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700">
                  Store URL
                </label>
                <div className="flex items-center border border-zinc-300 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100 transition-all rounded-xl bg-zinc-50/50 overflow-hidden px-3.5">
                  <span className="text-sm text-zinc-400 select-none pr-1">
                    trazo.com/store/
                  </span>
                  <input
                    className="flex-1 py-3 bg-transparent outline-none text-sm text-zinc-900 placeholder:text-zinc-400"
                    placeholder="omega-apparel"
                    value={form.slug}
                    onChange={(e) => update("slug", e.target.value)}
                    onBlur={handleSlugBlur}
                  />
                  {checkingSlug ? (
                    <span className="animate-spin h-4 w-4 border-2 border-indigo-600 border-t-transparent rounded-full" />
                  ) : slugAvailable === true ? (
                    <CheckCircle className="h-5 w-5 text-emerald-500 fill-emerald-50" />
                  ) : null}
                </div>
                {slugError && (
                  <p className="text-xs text-rose-500 font-medium pl-1">
                    {slugError}
                  </p>
                )}
              </div>
            </section>

            {/* SECTION 2: Contact */}
            <section className="space-y-5">
              <div className="border-b border-zinc-100 pb-2">
                <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider">
                  Contact & Bio
                </h3>
              </div>

              <Input
                label="WhatsApp Number"
                placeholder="+1 (555) 000-0000"
                value={form.whatsappNumber}
                onChange={(e) => update("whatsappNumber", e.target.value)}
              />

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700">
                  Description
                </label>
                <textarea
                  className="w-full border border-zinc-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all rounded-xl p-3.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                  rows={4}
                  placeholder="Tell customers what your store offers..."
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                />
              </div>
            </section>

            {/* SECTION 3: Visuals */}
            <section className="space-y-5">
              <div className="border-b border-zinc-100 pb-2">
                <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider">
                  Storefront Design
                </h3>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700 block">
                  Logo
                </label>
                <ImageUpload
                  value={form.logoUrl}
                  onChange={(url) => update("logoUrl", url)}
                />
              </div>
            </section>
          </div>
        </div>

        {/* BOTTOM FIXED CTA STRIP */}
        <div className="border-t border-zinc-100 bg-white/80 backdrop-blur-md sticky bottom-0 z-20 px-6 py-4 lg:py-5">
          <div className="max-w-xl mx-auto flex items-center justify-end">
            <Button
              disabled={!isValid}
              onClick={handleSubmit}
              loading={loading}
              className="w-full lg:w-auto lg:px-8 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-zinc-100 disabled:text-zinc-400 text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              Launch Shop <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
