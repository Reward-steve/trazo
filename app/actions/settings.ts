"use server";

import { db } from "../lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

/* ─────────────────────────────
   GET SHOP (AUTHENTICATED)
───────────────────────────── */
export async function getShopByUser() {
  const { userId } = await auth();
  if (!userId) return null;

  return db.shop.findUnique({
    where: { ownerId: userId },
    include: { products: true },
  });
}

/* ─────────────────────────────
   GET SHOP BY SLUG (PUBLIC)
───────────────────────────── */
export async function getShopBySlug(slug: string) {
  return db.shop.findUnique({
    where: { slug },
    include: {
      products: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

/* ─────────────────────────────
   CREATE SHOP
───────────────────────────── */
export async function createShop(data: {
  shopName: string;
  slug: string;
  whatsappNumber: string;
  description: string;
  logoUrl: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await currentUser();

  await db.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      email: user?.emailAddresses?.[0]?.emailAddress ?? "",
    },
  });

  const existingShop = await db.shop.findUnique({
    where: { ownerId: userId },
  });

  if (existingShop) return existingShop;

  const shop = await db.shop.create({
    data: {
      ...data,
      ownerId: userId,
      plan: "free",
      planActivatedAt: new Date(),
      isActive: true,
    },
  });

  revalidatePath("/dashboard");
  return shop;
}

/* ─────────────────────────────
   UPDATE SHOP SETTINGS
───────────────────────────── */
export async function updateShop(data: {
  shopName: string;
  whatsappNumber: string;
  description: string;
  logoUrl: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const shop = await db.shop.update({
    where: { ownerId: userId },
    data,
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/settings");
  revalidatePath(`/store/${shop.slug}`);

  return shop;
}

/* ─────────────────────────────
   SLUG CHECK
───────────────────────────── */
export async function checkSlugAvailable(slug: string) {
  const existing = await db.shop.findUnique({
    where: { slug },
  });

  return !existing;
}

/* ─────────────────────────────
   ADMIN QUERY (UPDATED)
───────────────────────────── */
export async function getAllSubscriptions() {
  return db.shop.findMany({
    select: {
      id: true,
      ownerId: true,
      shopName: true,
      slug: true,
      plan: true,
      isActive: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
}