"use client";

import { useState, useTransition, type ReactNode } from "react";
import Link from "next/link";
import {
  Check,
  Copy,
  ExternalLink,
  ImagePlus,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import Button from "../../components/ui/Button";
import {
  createVendorShop,
  type ConciergeProductInput,
} from "../../concierge/actions/vendors";

type DraftProduct = {
  name: string;
  price: string;
  stock: string;
  imageUrl: string;
  available: boolean;
  negotiable: boolean;
};

const emptyProduct = (): DraftProduct => ({
  name: "",
  price: "",
  stock: "",
  imageUrl: "",
  available: true,
  negotiable: false,
});

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const inputCls =
  "w-full rounded-xl border border-border bg-surface-alt px-3 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none";

// Unsigned Cloudinary upload straight from the browser.
async function uploadImage(file: File): Promise<string> {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (!cloud || !preset) throw new Error("Cloudinary env vars are missing.");
  const body = new FormData();
  body.append("file", file);
  body.append("upload_preset", preset);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud}/image/upload`,
    { method: "POST", body },
  );
  if (!res.ok) throw new Error("Image upload failed.");
  return (await res.json()).secure_url as string;
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-1">
      <span className="text-[11px] font-semibold text-text-muted">{label}</span>
      {children}
      {hint && (
        <span className="block text-[11px] text-text-muted">{hint}</span>
      )}
    </label>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-xs text-text">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-primary"
      />
      {label}
    </label>
  );
}

function ImageUpload({
  value,
  label,
  onChange,
  onBusy,
  onError,
}: {
  value: string;
  label: string;
  onChange: (url: string) => void;
  onBusy: (delta: 1 | -1) => void;
  onError: (msg: string) => void;
}) {
  const [busy, setBusy] = useState(false);

  async function handle(file?: File) {
    if (!file) return;
    setBusy(true);
    onBusy(1);
    onError("");
    try {
      onChange(await uploadImage(file));
    } catch (e) {
      onError(e instanceof Error ? e.message : "Image upload failed.");
    } finally {
      setBusy(false);
      onBusy(-1);
    }
  }

  return (
    <label className="relative flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-surface-alt hover:border-primary">
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="h-full w-full object-cover" />
      ) : (
        <ImagePlus className="h-5 w-5 text-text-muted" />
      )}
      {busy && (
        <span className="absolute inset-0 flex items-center justify-center bg-surface/70">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </span>
      )}
      <input
        type="file"
        accept="image/*"
        aria-label={label}
        className="sr-only"
        onChange={(e) => {
          handle(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
    </label>
  );
}

export default function VendorForm() {
  const [shopName, setShopName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");
  const [vendorEmail, setVendorEmail] = useState("");
  const [description, setDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [products, setProducts] = useState<DraftProduct[]>([emptyProduct()]);

  const [uploads, setUploads] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ url: string; email: string } | null>(
    null,
  );
  const [copied, setCopied] = useState(false);
  const [pending, start] = useTransition();

  const trackUpload = (delta: 1 | -1) => setUploads((n) => n + delta);

  const updateProduct = (i: number, patch: Partial<DraftProduct>) =>
    setProducts((ps) =>
      ps.map((p, idx) => (idx === i ? { ...p, ...patch } : p)),
    );

  function validate(): string {
    if (!shopName.trim()) return "Shop name is required.";
    if (!slug) return "Slug is required.";
    if (whatsapp.replace(/\D/g, "").length < 10)
      return "Enter a valid WhatsApp number.";
    const filled = products.filter((p) => p.name.trim());
    if (filled.length === 0) return "Add at least one product.";
    if (filled.some((p) => p.price === "" || Number(p.price) < 0))
      return "Every product needs a price.";
    return "";
  }

  function submit() {
    const problem = validate();
    if (problem) return setError(problem);
    setError("");

    const payload: ConciergeProductInput[] = products
      .filter((p) => p.name.trim())
      .map((p) => ({
        name: p.name,
        price: Number(p.price),
        imageUrl: p.imageUrl,
        available: p.available,
        stock: p.stock === "" ? null : Number(p.stock),
        negotiable: p.negotiable,
      }));

    start(async () => {
      const res = await createVendorShop({
        shopName,
        slug,
        whatsappNumber: whatsapp,
        vendorEmail,
        description,
        logoUrl,
        products: payload,
      });
      if (res.ok && res.url)
        setResult({ url: res.url, email: vendorEmail.trim() });
      else setError(res.error ?? "Something went wrong.");
    });
  }

  if (result) {
    return (
      <div className="space-y-4">
        <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary-dark" />
            <p className="text-sm font-bold text-text">Shop created</p>
          </div>
          <p className="mt-3 break-all rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-text">
            {result.url}
          </p>
          <p className="mt-3 text-[11px] text-text-muted">
            {result.email
              ? `When ${result.email} signs up on Trazo, this shop attaches to their account automatically.`
              : "No vendor email saved. Hand the shop over later from the concierge page."}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <a
            href={result.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary-dark"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open storefront
          </a>
          <button
            onClick={async () => {
              await navigator.clipboard.writeText(result.url);
              setCopied(true);
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-xs font-bold text-text hover:border-primary"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            {copied ? "Copied" : "Copy link"}
          </button>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-xs font-bold text-text hover:border-primary"
          >
            <Plus className="h-3.5 w-3.5" />
            Create another
          </button>
          <Link
            href="/concierge"
            className="inline-flex items-center rounded-full px-4 py-2 text-xs font-bold text-text-muted hover:text-text"
          >
            Back to concierge
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Shop */}
      <section className="space-y-3 rounded-2xl border border-border bg-surface p-4">
        <h2 className="text-sm font-bold text-text">Shop</h2>

        <div className="flex items-start gap-3">
          <ImageUpload
            value={logoUrl}
            label="Shop logo"
            onChange={setLogoUrl}
            onBusy={trackUpload}
            onError={setError}
          />
          <div className="min-w-0 flex-1">
            <Field label="Shop name">
              <input
                className={inputCls}
                placeholder="Amaka Fabrics"
                value={shopName}
                onChange={(e) => {
                  setShopName(e.target.value);
                  if (!slugTouched) setSlug(slugify(e.target.value));
                }}
              />
            </Field>
          </div>
        </div>

        <Field
          label="Storefront slug"
          hint={slug ? `/store/${slug}` : undefined}
        >
          <input
            className={inputCls}
            placeholder="amaka-fabrics"
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(slugify(e.target.value));
            }}
          />
        </Field>

        <Field label="WhatsApp number">
          <input
            className={inputCls}
            inputMode="tel"
            placeholder="08012345678"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />
        </Field>

        <Field
          label="Vendor email (optional)"
          hint="They must sign up with this email. The shop then attaches to their account automatically."
        >
          <input
            className={inputCls}
            type="email"
            placeholder="vendor@email.com"
            value={vendorEmail}
            onChange={(e) => setVendorEmail(e.target.value)}
          />
        </Field>

        <Field label="Description">
          <textarea
            className={inputCls}
            rows={3}
            placeholder="What do they sell?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>
      </section>

      {/* Products */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-text">Products</h2>
          <span className="text-[11px] text-text-muted">
            {products.length} added
          </span>
        </div>

        {products.map((p, i) => (
          <div
            key={i}
            className="space-y-3 rounded-2xl border border-border bg-surface p-4"
          >
            <div className="flex items-start gap-3">
              <ImageUpload
                value={p.imageUrl}
                label={`Product ${i + 1} image`}
                onChange={(url) => updateProduct(i, { imageUrl: url })}
                onBusy={trackUpload}
                onError={setError}
              />
              <div className="min-w-0 flex-1">
                <Field label={`Product ${i + 1}`}>
                  <input
                    className={inputCls}
                    placeholder="Ankara fabric, 6 yards"
                    value={p.name}
                    onChange={(e) => updateProduct(i, { name: e.target.value })}
                  />
                </Field>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Price (₦)">
                <input
                  className={inputCls}
                  type="number"
                  inputMode="numeric"
                  min={0}
                  placeholder="15000"
                  value={p.price}
                  onChange={(e) => updateProduct(i, { price: e.target.value })}
                />
              </Field>
              <Field label="Stock (optional)">
                <input
                  className={inputCls}
                  type="number"
                  inputMode="numeric"
                  min={0}
                  placeholder="10"
                  value={p.stock}
                  onChange={(e) => updateProduct(i, { stock: e.target.value })}
                />
              </Field>
            </div>

            <div className="flex items-center gap-5">
              <Toggle
                label="Available"
                checked={p.available}
                onChange={(v) => updateProduct(i, { available: v })}
              />
              <Toggle
                label="Negotiable"
                checked={p.negotiable}
                onChange={(v) => updateProduct(i, { negotiable: v })}
              />
              {products.length > 1 && (
                <button
                  onClick={() =>
                    setProducts((ps) => ps.filter((_, idx) => idx !== i))
                  }
                  className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-600"
                  aria-label={`Remove product ${i + 1}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}

        <button
          onClick={() => setProducts((ps) => [...ps, emptyProduct()])}
          className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-dashed border-border py-3 text-xs font-bold text-text-muted hover:border-primary hover:text-text"
        >
          <Plus className="h-3.5 w-3.5" />
          Add product
        </button>
      </section>

      {error && (
        <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-600">
          {error}
        </p>
      )}

      <Button
        onClick={submit}
        loading={pending}
        disabled={uploads > 0}
        className="w-full rounded-2xl bg-primary py-3 font-bold text-white transition-all hover:bg-primary-dark active:scale-[0.98] disabled:opacity-50"
      >
        {uploads > 0 ? "Uploading images…" : "Create shop"}
      </Button>
    </div>
  );
}
