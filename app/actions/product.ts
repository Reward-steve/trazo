"use server";

import { db } from "@/app/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function getShopId() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  const shop = await db.shop.findUnique({ where: { ownerId: userId } });
  if (!shop) throw new Error("Shop not found");
  return { shopId: shop.id, slug: shop.slug };
}

export async function getProducts() {
  const { shopId } = await getShopId();
  return db.product.findMany({
    where: { shopId },
    orderBy: { createdAt: "desc" },
  });
}

export async function createProduct(data: {
  name: string;
  price: number;
  imageUrl: string;
  available: boolean;
}) {
  const { shopId, slug } = await getShopId();
  const product = await db.product.create({
    data: { ...data, shopId },
  });
  revalidatePath("/dashboard/products");
  revalidatePath(`/store/${slug}`);
  return product;
}

export async function updateProduct(
  id: string,
  data: Partial<{
    name: string;
    price: number;
    imageUrl: string;
    available: boolean;
  }>
) {
  const { slug } = await getShopId();
  const product = await db.product.update({ where: { id }, data });
  revalidatePath("/dashboard/products");
  revalidatePath(`/store/${slug}`);
  return product;
}

export async function deleteProduct(id: string) {
  const { slug } = await getShopId();
  await db.product.delete({ where: { id } });
  revalidatePath("/dashboard/products");
  revalidatePath(`/store/${slug}`);
}

export async function toggleProductAvailability(
  id: string,
  available: boolean
) {
  const { slug } = await getShopId();
  const product = await db.product.update({
    where: { id },
    data: { available },
  });
  revalidatePath("/dashboard/products");
  revalidatePath(`/store/${slug}`);
  return product;
}