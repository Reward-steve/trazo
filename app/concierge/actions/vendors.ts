"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { db } from "../../lib/db";
import { requireConcierge } from "../../lib/concierge";

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
  vendorEmail?: string;
  description: string;
  logoUrl: string;
  products: ConciergeProductInput[];
};

export type CreateVendorResult = {
  ok: boolean;
  slug?: string;
  url?: string;
  error?: string;
};

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fail = (error: string): CreateVendorResult => ({ ok: false, error });

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
  const vendorEmail = (input.vendorEmail ?? "").trim().toLowerCase();

  if (!shopName) return fail("Shop name is required.");
  if (!SLUG_RE.test(slug))
    return fail(
      "Slug can only use lowercase letters, numbers and single hyphens.",
    );
  if (whatsappNumber.length < 10) return fail("Enter a valid WhatsApp number.");
  if (vendorEmail && !EMAIL_RE.test(vendorEmail))
    return fail("Enter a valid vendor email.");

  const products = input.products
    .filter((p) => p.name.trim())
    .map((p) => ({
      name: p.name.trim(),
      price: Math.round(Number(p.price)),
      imageUrl: p.imageUrl || "",
      available: p.available,
      stock:
        p.stock == null || !Number.isFinite(p.stock)
          ? null
          : Math.max(0, Math.round(p.stock)),
      negotiable: p.negotiable,
    }));

  if (products.length === 0) return fail("Add at least one product.");
  if (products.some((p) => !Number.isFinite(p.price) || p.price < 0)) {
    return fail("Every product needs a valid price.");
  }

  // Placeholder owner. The vendor's email (if given) is embedded so the shop
  // can be auto-claimed when they sign up. No password, no Clerk account.
  const ownerId = `concierge_${randomUUID()}`;
  const placeholderEmail = vendorEmail
    ? `${ownerId}__${vendorEmail}`
    : `${ownerId}@concierge.trazo.invalid`;

  try {
    // Single nested create: User + Shop + Products are saved together or not at all.
    await db.user.create({
      data: {
        id: ownerId,
        email: placeholderEmail,
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
      return fail("That slug is already taken. Try another.");
    }
    console.error("createVendorShop failed", e);
    return fail("Could not create the shop. Nothing was saved.");
  }

  revalidatePath("/concierge");

  const base =
    process.env.NEXT_PUBLIC_APP_URL || "https://trazo-omega.vercel.app";
  return { ok: true, slug, url: `${base.replace(/\/$/, "")}/store/${slug}` };
}
