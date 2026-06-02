"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Store,
  MessageCircle,
  Image as ImageIcon,
  ChevronDown,
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

const COUNTRY_CODES = [
  { code: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "+1", flag: "🇺🇸", name: "USA / Canada" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+233", flag: "🇬🇭", name: "Ghana" },
  { code: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "+255", flag: "🇹🇿", name: "Tanzania" },
  { code: "+256", flag: "🇺🇬", name: "Uganda" },
  { code: "+251", flag: "🇪🇹", name: "Ethiopia" },
  { code: "+212", flag: "🇲🇦", name: "Morocco" },
  { code: "+20", flag: "🇪🇬", name: "Egypt" },
  { code: "+225", flag: "🇨🇮", name: "Côte d'Ivoire" },
  { code: "+221", flag: "🇸🇳", name: "Senegal" },
  { code: "+237", flag: "🇨🇲", name: "Cameroon" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
];

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
  const [countryCode, setCountryCode] = useState("+234");
  const [localNumber, setLocalNumber] = useState("");
  const [showCountryPicker, setShowCountryPicker] = useState(false);

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
      return updated;
    });
  };

  const handleSlugCheck = async (slug: string) => {
    if (!slug) return;
    setCheckingSlug(true);
    try {
      const available = await checkSlugAvailable(slug);
      setSlugAvailable(available);
      if (!available) setSlugError("This URL is already taken");
      else setSlugError("");
    } catch {
      setSlugError("Could not verify URL availability");
    } finally {
      setCheckingSlug(false);
    }
  };

  const handleNameBlur = () => {
    if (form.slug) handleSlugCheck(form.slug);
  };

  const handleNext = () => {
    if (step === 1) {
      if (!form.shopName.trim()) return;
      if (slugAvailable === false) return;
    }
    if (step === 2) {
      const digits = localNumber.replace(/\s/g, "");
      if (!digits || digits.length < 7) {
        setWhatsappError("Enter a valid local number");
        return;
      }
      const full = `${countryCode.replace("+", "")}${digits}`;
      update("whatsappNumber", full);
      setWhatsappError("");
    }
    setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    setLoading(true);
    const digits = localNumber.replace(/\s/g, "");
    const full = `${countryCode.replace("+", "")}${digits}`;
    try {
      await createShop({ ...form, whatsappNumber: full });
      router.push("/dashboard");
    } catch {
      setLoading(false);
    }
  };

  const current = STEPS[step - 1];
  const Icon = current.icon;
  const selectedCountry =
    COUNTRY_CODES.find((c) => c.code === countryCode) ?? COUNTRY_CODES[0];

  return (
    <div className="min-h-screen bg-surface-alt flex flex-col">
      {/* ── Header ── */}
      <div className="bg-header px-4 py-3 flex items-center justify-between">
        {/* Back button lives in the header on steps 2+ */}
        {step > 1 && !loading ? (
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <Image src={logo} alt="Trazo" className="h-7 w-7 rounded-sm" />
            <span className="font-bold text-white text-sm">Trazo</span>
          </div>
        )}

        {/* Step counter — always top right */}
        <span className="text-[11px] text-white/50 font-medium tabular-nums">
          {step} / {STEPS.length}
        </span>
      </div>

      {/* ── Progress bar ── */}
      <div className="flex gap-1 bg-header pb-3 px-4">
        {STEPS.map((s) => (
          <div
            key={s.number}
            className={cn(
              "h-1 flex-1 rounded-full transition-all duration-500",
              s.number <= step ? "bg-primary" : "bg-white/15",
            )}
          />
        ))}
      </div>

      {/* ── Step content ── */}
      <div className="flex-1 flex flex-col max-w-lg w-full mx-auto px-4 py-8">
        {/* Step header */}
        <div className="flex items-start gap-3 mb-6">
          <div className="h-10 w-10 bg-bubble-out rounded-2xl flex items-center justify-center shrink-0">
            <Icon className="h-5 w-5 text-primary-dark" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-text leading-tight">
              {current.title}
            </h1>
            <p className="text-xs text-text-muted mt-0.5">{current.hint}</p>
          </div>
        </div>

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <div className="space-y-3">
            <Input
              label="Shop name"
              placeholder="e.g. Omega Boutique"
              value={form.shopName}
              onChange={(e) => update("shopName", e.target.value)}
              onBlur={handleNameBlur}
              autoFocus
            />
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-text">
                  Store URL
                </label>
                <span className="text-[10px] text-text-muted bg-surface border border-border px-2 py-0.5 rounded-full">
                  Auto-generated
                </span>
              </div>
              <div className="flex items-center bg-surface-alt border border-border rounded-xl px-3 py-2.5 gap-1">
                <span className="text-xs text-text-muted shrink-0">
                  trazo-omega.vercel.app/store/
                </span>
                <span className="text-xs text-text font-medium truncate flex-1">
                  {form.slug || (
                    <span className="text-text-muted italic">
                      your-shop-name
                    </span>
                  )}
                </span>
                {checkingSlug && (
                  <span className="h-3.5 w-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin shrink-0" />
                )}
                {!checkingSlug && slugAvailable === true && (
                  <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" />
                )}
              </div>
              {slugError && (
                <p className="text-[11px] text-red-500">{slugError}</p>
              )}
              <p className="text-[11px] text-text-muted">
                Your unique storefront link, generated from your shop name.
              </p>
            </div>
          </div>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <div className="space-y-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-text">
                WhatsApp number
              </label>
              <div className="flex gap-2">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCountryPicker((v) => !v)}
                    className="flex items-center gap-1.5 bg-surface border border-border rounded-xl px-3 py-2.5 text-sm text-text hover:border-primary/40 transition-colors h-full whitespace-nowrap"
                  >
                    <span>{selectedCountry.flag}</span>
                    <span className="font-medium">{selectedCountry.code}</span>
                    <ChevronDown className="h-3 w-3 text-text-muted" />
                  </button>
                  {showCountryPicker && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-surface border border-border rounded-2xl shadow-lg z-50 overflow-hidden">
                      <div className="max-h-52 overflow-y-auto py-1">
                        {COUNTRY_CODES.map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => {
                              setCountryCode(c.code);
                              setShowCountryPicker(false);
                            }}
                            className={cn(
                              "w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left hover:bg-surface-alt transition-colors",
                              countryCode === c.code &&
                                "bg-bubble-out text-primary-dark",
                            )}
                          >
                            <span className="text-base">{c.flag}</span>
                            <span className="flex-1 truncate">{c.name}</span>
                            <span className="text-text-muted text-xs shrink-0">
                              {c.code}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <input
                  type="tel"
                  placeholder="8012345678"
                  value={localNumber}
                  onChange={(e) => {
                    setLocalNumber(e.target.value);
                    setWhatsappError("");
                  }}
                  autoFocus
                  className="flex-1 px-3 py-2.5 rounded-xl border border-border bg-surface text-sm text-text placeholder:text-text-muted transition-colors hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60"
                />
              </div>
              {whatsappError && (
                <p className="text-[11px] text-red-500">{whatsappError}</p>
              )}
              <p className="text-[11px] text-text-muted">
                Enter your number without the country code — we handle that for
                you.
              </p>
            </div>
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

        {/* ── STEP 3 ── */}
        {step === 3 && (
          <div className="flex flex-col items-center gap-3">
            <div className="w-full">
              <ImageUpload
                value={form.logoUrl}
                onChange={(url) => update("logoUrl", url)}
              />
            </div>
          </div>
        )}

        {/* ── Actions ── */}
        <div className="mt-8">
          {step < 3 ? (
            <Button
              onClick={handleNext}
              disabled={
                step === 1 && (!form.shopName.trim() || slugAvailable === false)
              }
              className="w-full bg-primary hover:bg-primary-dark active:scale-[0.98] disabled:bg-surface disabled:border disabled:border-border disabled:text-text-muted text-white font-bold py-3 rounded-2xl transition-all"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <div className="space-y-2">
              <Button
                onClick={handleSubmit}
                loading={loading}
                className="w-full bg-primary hover:bg-primary-dark active:scale-[0.98] text-white font-bold py-3 rounded-2xl transition-all"
              >
                Launch store <ArrowRight className="h-4 w-4" />
              </Button>
              {!loading && (
                /* Skip — sits right below Launch, clearly secondary */
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" />
                  <button
                    onClick={handleSubmit}
                    className="text-xs text-text-muted hover:text-text transition-colors px-2 py-1"
                  >
                    Skip for now
                  </button>
                  <div className="h-px flex-1 bg-border" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
