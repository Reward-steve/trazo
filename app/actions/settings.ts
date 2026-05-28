"use server";

import { db } from "../../lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

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
    include: { products: { orderBy: { createdAt: "desc" } } },
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
  if (!userId) throw new Error("Unauthorized");

  const user = await currentUser();

  // Ensure user exists in our DB
  await db.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      email: user?.emailAddresses?.[0]?.emailAddress ?? "",
    },
  });

  const shop = await db.shop.create({
    data: { ...data, ownerId: userId },
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

export async function checkSlugAvailable(slug: string): Promise<boolean> {
  const existing = await db.shop.findUnique({ where: { slug } });
  return !existing;
}
