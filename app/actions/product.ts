"use server";

import { db } from "@/app/lib/db";
import { revalidatePath } from "next/cache";

export async function getProducts() {
  return db.product.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createProduct(data: {
  name: string;
  price: number;
  imageUrl: string;
  available: boolean;
}) {
  const product = await db.product.create({ data });
  revalidatePath("/store");
  revalidatePath("/admin");
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
  const product = await db.product.update({ where: { id }, data });
  revalidatePath("/store");
  revalidatePath("/admin");
  return product;
}

export async function deleteProduct(id: string) {
  await db.product.delete({ where: { id } });
  revalidatePath("/store");
  revalidatePath("/admin");
}

export async function toggleProductAvailability(
  id: string,
  available: boolean,
) {
  const product = await db.product.update({
    where: { id },
    data: { available },
  });
  revalidatePath("/store");
  revalidatePath("/admin");
  return product;
}
