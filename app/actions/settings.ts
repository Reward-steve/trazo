"use server";

import { db } from "../lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getShopByUser() {
  const { userId } = await auth();

  if (!userId) return null;

  return db.shop.findUnique({
    where: { ownerId: userId },
    include: { products: true },
  });
}

export async function getShopBySlug(slug: string) {
  return db.shop.findUnique({
    where: { slug },
    include: {
      products: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
}

export async function createShop(data: {
  shopName: string;
  slug: string;
  whatsappNumber: string;
  description: string;
  logoUrl: string;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

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
    where: {
      ownerId: userId,
    },
  });

  if (existingShop) {
    return existingShop;
  }

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

export async function updateShop(data: {
  shopName: string;
  whatsappNumber: string;
  description: string;
  logoUrl: string;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const shop = await db.shop.update({
    where: {
      ownerId: userId,
    },
    data,
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/settings");
  revalidatePath(`/store/${shop.slug}`);

  return shop;
}

export async function checkSlugAvailable(slug: string): Promise<boolean> {
  const existing = await db.shop.findUnique({
    where: { slug },
  });

  return !existing;
}

export function getDaysLeft(shop: {
  trialEndsAt: Date | null;
  subscriptionEndsAt: Date | null;
}): number {
  const now = new Date();

  const end = shop.subscriptionEndsAt ?? shop.trialEndsAt;

  if (!end) return 0;

  const diff = end.getTime() - now.getTime();

  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function isTrialUser(shop: {
  trialEndsAt: Date | null;
  subscriptionEndsAt: Date | null;
}) {
  return (
    !shop.subscriptionEndsAt &&
    !!shop.trialEndsAt &&
    shop.trialEndsAt > new Date()
  );
}

export async function activateShopSubscription(ownerId: string, days = 30) {
  const shop = await db.shop.findUnique({
    where: { ownerId },
  });

  if (!shop) {
    throw new Error("Shop not found");
  }

  const now = new Date();

  const baseDate =
    shop.subscriptionEndsAt && shop.subscriptionEndsAt > now
      ? shop.subscriptionEndsAt
      : now;

  const subscriptionEndsAt = new Date(baseDate);

  subscriptionEndsAt.setDate(subscriptionEndsAt.getDate() + days);

  const updatedShop = await db.shop.update({
    where: { ownerId },
    data: {
      subscriptionEndsAt,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath(`/store/${updatedShop.slug}`);

  return updatedShop;
}

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
    orderBy: {
      createdAt: "desc",
    },
  });
}
