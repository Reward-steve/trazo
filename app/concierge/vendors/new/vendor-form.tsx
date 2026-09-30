"use client";

import { useState, useTransition } from "react";
import {
  createVendorShop,
  type ConciergeProductInput,
} from "../../_actions/vendors";

type DraftProduct = {
  name: string;
  price: string;
  imageUrl: string;
  available: boolean;
  stock: string;
  negotiable: boolean;
};

const emptyProduct = (): DraftProduct => ({
  name: "",
  price: "",
  imageUrl: "",
  available: true,
  stock: "",
  negotiable: false,
});

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Unsigned Cloudinary upload. Swap for your existing uploader if you have one.
async function uploadImage(file: File): Promise<string> {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (!cloud || !preset) throw new Error("Cloudinary env vars missing");
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", preset);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud}/image/upload`,
    { method: "POST", body: fd },
  );
  if (!res.ok) throw new Error("Upload failed");
  return (await res.json()).secure_url as string;
}

const input = "w-full rounded-md border border-neutral-300 px-3 py-2 text-sm";

export default function VendorForm() {
  const [shopName, setShopName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");
  const [description, setDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [products, setProducts] = useState<DraftProduct[]>([emptyProduct()]);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ url: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [pending, start] = useTransition();

  const updateProduct = (i: number, patch: Partial<DraftProduct>) =>
    setProducts((ps) =>
      ps.map((p, idx) => (idx === i ? { ...p, ...patch } : p)),
    );

  async function upload(file: File | undefined, onDone: (url: string) => void) {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      onDone(await uploadImage(file));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function submit() {
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
        description,
        logoUrl,
        products: payload,
      });
      if (res.ok) setResult({ url: res.url });
      else setError(res.error);
    });
  }

  if (result) {
    return (
      <div className="space-y-4">
        <p className="font-medium">Shop created successfully</p>
        <p className="break-all rounded-md bg-neutral-100 p-3 text-sm">
          {result.url}
        </p>
        <div className="flex gap-3">
          <a
            href={result.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-black px-4 py-2 text-white"
          >
            Open storefront
          </a>
          <button
            className="rounded-md border border-neutral-300 px-4 py-2"
            onClick={async () => {
              await navigator.clipboard.writeText(result.url);
              setCopied(true);
            }}
          >
            {copied ? "Copied" : "Copy link"}
          </button>
          <a
            href="/concierge/vendors/new"
            className="rounded-md border border-neutral-300 px-4 py-2"
          >
            Create another
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h2 className="font-medium">Shop</h2>
        <input
          className={input}
          placeholder="Shop name"
          value={shopName}
          onChange={(e) => {
            setShopName(e.target.value);
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
        />
        <input
          className={input}
          placeholder="Slug (e.g. amaka-fabrics)"
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(slugify(e.target.value));
          }}
        />
        <input
          className={input}
          placeholder="WhatsApp number (e.g. 08012345678)"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
        />
        <textarea
          className={input}
          rows={3}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex items-center gap-3">
          {logoUrl && (
            <img
              src={logoUrl}
              alt="Logo"
              className="h-12 w-12 rounded-md object-cover"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => upload(e.target.files?.[0], setLogoUrl)}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-medium">Products</h2>
        {products.map((p, i) => (
          <div
            key={i}
            className="space-y-3 rounded-md border border-neutral-200 p-4"
          >
            <input
              className={input}
              placeholder="Product name"
              value={p.name}
              onChange={(e) => updateProduct(i, { name: e.target.value })}
            />
            <div className="flex gap-3">
              <input
                className={input}
                type="number"
                min={0}
                placeholder="Price (₦)"
                value={p.price}
                onChange={(e) => updateProduct(i, { price: e.target.value })}
              />
              <input
                className={input}
                type="number"
                min={0}
                placeholder="Stock (optional)"
                value={p.stock}
                onChange={(e) => updateProduct(i, { stock: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-3">
              {p.imageUrl && (
                <img
                  src={p.imageUrl}
                  alt=""
                  className="h-12 w-12 rounded-md object-cover"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  upload(e.target.files?.[0], (url) =>
                    updateProduct(i, { imageUrl: url }),
                  )
                }
              />
            </div>
            <div className="flex gap-6 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={p.available}
                  onChange={(e) =>
                    updateProduct(i, { available: e.target.checked })
                  }
                />
                Available
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={p.negotiable}
                  onChange={(e) =>
                    updateProduct(i, { negotiable: e.target.checked })
                  }
                />
                Negotiable
              </label>
              {products.length > 1 && (
                <button
                  className="ml-auto text-red-600"
                  onClick={() =>
                    setProducts((ps) => ps.filter((_, idx) => idx !== i))
                  }
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
          onClick={() => setProducts((ps) => [...ps, emptyProduct()])}
        >
          Add product
        </button>
      </section>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        disabled={pending || uploading}
        onClick={submit}
        className="rounded-md bg-black px-5 py-2.5 text-white disabled:opacity-50"
      >
        {uploading ? "Uploading image…" : pending ? "Creating…" : "Create shop"}
      </button>
    </div>
  );
}
