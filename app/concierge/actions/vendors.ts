"use server";

import { randomUUID } from "crypto";
import { requireConcierge } from "../../lib/concierge";
import { db } from "../../lib/db";

export type ConciergeProductInput = {
  name: string;
  price: number;
  imageUrl: string;
  available: boolean;
  stock: number | null;
  negotiable: boolean;
};

export type CreateVendorInput = {
  shopName: string;
  slug: string;
  whatsappNumber: string;
  description: string;
  logoUrl: string;
  products: ConciergeProductInput[];
};

export type CreateVendorResult =
  | { ok: true; slug: string; url: string }
  | { ok: false; error: string };

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function normalizeWhatsapp(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0") && digits.length === 11)
    return "234" + digits.slice(1);
  return digits;
}

export async function createVendorShop(
  input: CreateVendorInput,
): Promise<CreateVendorResult> {
  await requireConcierge();

  const shopName = input.shopName.trim();
  const slug = input.slug.trim().toLowerCase();
  const whatsappNumber = normalizeWhatsapp(input.whatsappNumber);

  if (!shopName) return { ok: false, error: "Shop name is required." };
  if (!SLUG_RE.test(slug))
    return {
      ok: false,
      error: "Slug can only use lowercase letters, numbers and single hyphens.",
    };
  if (whatsappNumber.length < 10)
    return { ok: false, error: "Enter a valid WhatsApp number." };

  const products = input.products
    .filter((p) => p.name.trim())
    .map((p) => ({
      name: p.name.trim(),
      price: Math.round(Number(p.price)),
      imageUrl: p.imageUrl || "",
      available: p.available,
      stock:
        p.stock === null || Number.isNaN(p.stock)
          ? null
          : Math.max(0, Math.round(p.stock)),
      negotiable: p.negotiable,
    }));

  if (products.some((p) => !Number.isFinite(p.price) || p.price < 0)) {
    return { ok: false, error: "Every product needs a valid price." };
  }

  // Temporary owner: a placeholder User the vendor can claim later.
  // No Clerk account, no password, no real email.
  const ownerId = `concierge_${randomUUID()}`;

  try {
    // One nested create = one atomic write: User + Shop + Products, or nothing.
    await db.user.create({
      data: {
        id: ownerId,
        email: `${ownerId}@concierge.trazo.invalid`,
        shop: {
          create: {
            shopName,
            slug,
            whatsappNumber,
            description: input.description.trim(),
            logoUrl: input.logoUrl || "",
            products: { create: products },
          },
        },
      },
    });
  } catch (e: unknown) {
    if (
      typeof e === "object" &&
      e &&
      "code" in e &&
      (e as { code: string }).code === "P2002"
    ) {
      return { ok: false, error: "That slug is already taken. Try another." };
    }
    console.error("createVendorShop failed", e);
    return {
      ok: false,
      error: "Could not create the shop. Nothing was saved.",
    };
  }

  const base =
    process.env.NEXT_PUBLIC_APP_URL || "https://trazo-omega.vercel.app";
  return { ok: true, slug, url: `${base.replace(/\/$/, "")}/store/${slug}` };
}
