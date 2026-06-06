"use server";

import { db } from "../lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { getProductLimit } from "./subscriptionGuard";
import { normalizePlan } from "../lib/utils";

/* ─────────────────────────────
   GET SHOP WITH SAFETY CHECKS
───────────────────────────── */
async function getUserShop() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const shop = await db.shop.findUnique({
    where: {
      ownerId: userId,
    },
  });

  if (!shop) {
    throw new Error("Shop not found");
  }

  if (!shop.isActive) {
    throw new Error("SHOP_INACTIVE");
  }

  return shop;
}

/* ─────────────────────────────
   VERIFY PRODUCT OWNERSHIP
───────────────────────────── */
async function getOwnedProduct(productId: string, shopId: string) {
  const product = await db.product.findFirst({
    where: {
      id: productId,
      shopId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
}

/* ─────────────────────────────
   GET PRODUCTS
───────────────────────────── */
export async function getProducts() {
  const shop = await getUserShop();

  return db.product.findMany({
    where: {
      shopId: shop.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

/* ─────────────────────────────
   CREATE PRODUCT (PLAN ENFORCED)
───────────────────────────── */
export async function createProduct(data: {
  name: string;
  price: number;
  imageUrl: string;
  available: boolean;
  stock: number | null;
}) {
  const shop = await getUserShop();

  const currentCount = await db.product.count({
    where: {
      shopId: shop.id,
    },
  });

  const limit = getProductLimit(normalizePlan(shop.plan));

  if (currentCount >= limit) {
    throw new Error("PRODUCT_LIMIT_REACHED");
  }

  const product = await db.product.create({
    data: {
      ...data,
      shopId: shop.id,
    },
  });

  revalidatePath("/dashboard/products");
  revalidatePath(`/store/${shop.slug}`);

  return product;
}

/* ─────────────────────────────
   UPDATE PRODUCT
───────────────────────────── */
export async function updateProduct(
  id: string,
  data: Partial<{
    name: string;
    price: number;
    imageUrl: string;
    available: boolean;
    stock: number | null;
  }>,
) {
  const shop = await getUserShop();

  await getOwnedProduct(id, shop.id);

  const product = await db.product.update({
    where: {
      id,
    },
    data,
  });

  revalidatePath("/dashboard/products");
  revalidatePath(`/store/${shop.slug}`);

  return product;
}

/* ─────────────────────────────
   DELETE PRODUCT
───────────────────────────── */
export async function deleteProduct(id: string) {
  const shop = await getUserShop();

  await getOwnedProduct(id, shop.id);

  await db.product.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/products");
  revalidatePath(`/store/${shop.slug}`);
}

/* ─────────────────────────────
   TOGGLE AVAILABILITY
───────────────────────────── */
export async function toggleProductAvailability(
  id: string,
  available: boolean,
) {
  const shop = await getUserShop();

  await getOwnedProduct(id, shop.id);

  const product = await db.product.update({
    where: {
      id,
    },
    data: {
      available,
    },
  });

  revalidatePath("/dashboard/products");
  revalidatePath(`/store/${shop.slug}`);

  return product;
}
