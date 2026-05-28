"use server";

import { db } from "../lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function getUserShop() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  const shop = await db.shop.findUnique({ where: { ownerId: userId } });
  if (!shop) throw new Error("Shop not found");
  return shop;
}

export async function getProducts() {
  const shop = await getUserShop();
  return db.product.findMany({
    where: { shopId: shop.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function createProduct(data: {
  name: string;
  price: number;
  imageUrl: string;
  available: boolean;
}) {
  const shop = await getUserShop();
  const product = await db.product.create({
    data: { ...data, shopId: shop.id },
  });
  revalidatePath("/dashboard/products");
  revalidatePath(`/store/${shop.slug}`);
  return product;
}

export async function updateProduct(
  id: string,
  data: Partial<{
    name: string;
    price: number;
    imageUrl: string;
    available: boolean;
  }>,
) {
  const shop = await getUserShop();
  const product = await db.product.update({ where: { id }, data });
  revalidatePath("/dashboard/products");
  revalidatePath(`/store/${shop.slug}`);
  return product;
}

export async function deleteProduct(id: string) {
  const shop = await getUserShop();
  await db.product.delete({ where: { id } });
  revalidatePath("/dashboard/products");
  revalidatePath(`/store/${shop.slug}`);
}

export async function toggleProductAvailability(
  id: string,
  available: boolean,
) {
  const shop = await getUserShop();
  const product = await db.product.update({
    where: { id },
    data: { available },
  });
  revalidatePath("/dashboard/products");
  revalidatePath(`/store/${shop.slug}`);
  return product;
}
