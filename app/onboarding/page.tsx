"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle,
  Store,
  MessageCircle,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import ImageUpload from "../components/ui/ImageUpload";
import { createShop, checkSlugAvailable } from "../actions/settings";
import logo from "../../public/trazo_omega.png";
import { cn } from "../lib/utils";

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 40);
}

const STEPS = [
  {
    number: 1,
    icon: Store,
    title: "Name your shop",
    hint: "This is what customers will see when they visit your store.",
  },
  {
    number: 2,
    icon: MessageCircle,
    title: "Add your WhatsApp",
    hint: "All customer orders land here. Make sure it's correct.",
  },
  {
    number: 3,
    icon: ImageIcon,
    title: "Add a logo",
    hint: "A face to your brand. You can always change this later.",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
  const [checkingSlug, setCheckingSlug] = useState(false);
  const [slugError, setSlugError] = useState("");
  const [whatsappError, setWhatsappError] = useState("");

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

  const handleNext = () => {
    if (step === 1) {
      if (!form.shopName.trim()) return;
      if (slugAvailable === false) return;
    }
    if (step === 2) {
      const num = form.whatsappNumber.replace(/\s/g, "");
      if (!num || !/^[0-9]{10,15}$/.test(num)) {
        setWhatsappError(
          "Enter a valid number with country code e.g. 2348012345678",
        );
        return;
      }
      setWhatsappError("");
    }
    setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await createShop(form);
      router.push("/dashboard");
    } catch {
      setLoading(false);
    }
  };

  const current = STEPS[step - 1];
  const Icon = current.icon;

  return (
    <div className="min-h-screen bg-surface-alt flex flex-col">
      {/* Header */}
      <div className="bg-header px-4 py-3 flex items-center gap-2">
        <Image src={logo} alt="Trazo" className="h-7 w-7 brightness-0 invert" />
        <span className="font-bold text-white text-sm">Trazo</span>
      </div>

      {/* Progress */}
      <div className="flex gap-1.5 px-4 pt-4">
        {STEPS.map((s) => (
          <div
            key={s.number}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-300",
              s.number <= step ? "bg-primary" : "bg-border",
            )}
          />
        ))}
      </div>

      {/* Step content */}
      <div className="flex-1 flex flex-col max-w-lg w-full mx-auto px-4 py-8">
        {/* Step header */}
        <div className="flex items-start gap-3 mb-6">
          <div className="h-10 w-10 bg-bubble-out rounded-2xl flex items-center justify-center shrink-0">
            <Icon className="h-5 w-5 text-primary-dark" />
          </div>
          <div>
            <p className="text-[11px] text-text-muted font-medium uppercase tracking-widest mb-0.5">
              Step {step} of {STEPS.length}
            </p>
            <h1 className="text-lg font-bold text-text leading-tight">
              {current.title}
            </h1>
            <p className="text-xs text-text-muted mt-0.5">{current.hint}</p>
          </div>
        </div>

        {/* ── STEP 1: Shop identity ── */}
        {step === 1 && (
          <div className="space-y-3">
            <Input
              label="Shop name"
              placeholder="e.g. Omega Boutique"
              value={form.shopName}
              onChange={(e) => update("shopName", e.target.value)}
              autoFocus
            />

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
          </div>
        )}

        {/* ── STEP 2: WhatsApp + description ── */}
        {step === 2 && (
          <div className="space-y-3">
            <Input
              label="WhatsApp number"
              placeholder="e.g. 2348012345678"
              type="tel"
              value={form.whatsappNumber}
              onChange={(e) => update("whatsappNumber", e.target.value)}
              error={whatsappError}
              autoFocus
            />
            <p className="text-[11px] text-text-muted px-0.5">
              Include your country code. Nigerian numbers start with{" "}
              <span className="font-semibold text-text">234</span>.
            </p>

            <div className="flex flex-col gap-1.5 pt-1">
              <label className="text-xs font-medium text-text">
                Shop description{" "}
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
          </div>
        )}

        {/* ── STEP 3: Logo ── */}
        {step === 3 && (
          <div className="space-y-3">
            <ImageUpload
              value={form.logoUrl}
              onChange={(url) => update("logoUrl", url)}
            />
            <p className="text-[11px] text-text-muted text-center">
              You can skip this and add a logo later in settings.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 space-y-2">
          {step < 3 ? (
            <Button
              onClick={handleNext}
              disabled={
                step === 1 && (!form.shopName.trim() || slugAvailable === false)
              }
              className="w-full bg-header hover:bg-primary-dark disabled:bg-surface disabled:border disabled:border-border disabled:text-text-muted text-white font-bold py-3 rounded-2xl transition-colors"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <>
              <Button
                onClick={handleSubmit}
                loading={loading}
                className="w-full bg-header hover:bg-primary-dark text-white font-bold py-3 rounded-2xl transition-colors"
              >
                Launch store <ArrowRight className="h-4 w-4" />
              </Button>
              {!loading && (
                <button
                  onClick={handleSubmit}
                  className="w-full text-xs text-text-muted hover:text-text py-2 transition-colors"
                >
                  Skip for now
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
