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

  const trialEndsAt = new Date();
  trialEndsAt.setDate(trialEndsAt.getDate() + 14);

  const shop = await db.shop.create({
    data: {
      ...data,
      ownerId: userId,
      trialEndsAt,
    },
  });

  revalidatePath("/dashboard");
  return shop;
}

/* ─────────────────────────────
   UPDATE SHOP
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
   SUBSCRIPTION ACTION
───────────────────────────── */
export async function activateShopSubscription(ownerId: string, days = 30) {
  const shop = await db.shop.findUnique({
    where: { ownerId },
  });

  if (!shop) throw new Error("Shop not found");

  const now = new Date();

  const baseDate =
    shop.subscriptionEndsAt && shop.subscriptionEndsAt > now
      ? shop.subscriptionEndsAt
      : now;

  const subscriptionEndsAt = new Date(baseDate);
  subscriptionEndsAt.setDate(subscriptionEndsAt.getDate() + days);

  const updatedShop = await db.shop.update({
    where: { ownerId },
    data: { subscriptionEndsAt },
  });

  revalidatePath("/dashboard");
  revalidatePath(`/store/${updatedShop.slug}`);

  return updatedShop;
}

/* ─────────────────────────────
   ADMIN QUERY
───────────────────────────── */
export async function getAllSubscriptions() {
  return db.shop.findMany({
    select: {
      id: true,
      ownerId: true,
      shopName: true,
      slug: true,
      trialEndsAt: true,
      subscriptionEndsAt: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
}
