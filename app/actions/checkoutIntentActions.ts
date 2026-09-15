// actions/checkoutIntentActions.ts
"use server";

import { db } from "../lib/db";

export async function captureCheckoutIntent(data: {
  shopId: string;
  customerName: string;
  customerPhone: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
}) {
  const phone = data.customerPhone.replace(/\s/g, "");
  const name = data.customerName.trim();

  // Only worth recording once we can actually identify + reach them.
  // No auth here by design — this fires from an anonymous customer's
  // browser mid-checkout, same trust level as createOrder.
  if (!name || !/^[0-9]{10,15}$/.test(phone)) return;

  try {
    await db.checkoutIntent.upsert({
      where: {
        shopId_customerPhone: { shopId: data.shopId, customerPhone: phone },
      },
      update: {
        customerName: name,
        items: data.items,
        total: data.total,
        recovered: false, // back with a fresh cart — treat as open again
      },
      create: {
        shopId: data.shopId,
        customerName: name,
        customerPhone: phone,
        items: data.items,
        total: data.total,
      },
    });
  } catch (err) {
    // Best-effort signal — never let this break the checkout experience
    console.error("captureCheckoutIntent failed:", err);
  }
}

export async function getAbandonedCheckouts() {
  const { auth } = await import("@clerk/nextjs/server");
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const shop = await db.shop.findUnique({ where: { ownerId: userId } });
  if (!shop) throw new Error("Shop not found");

  return db.checkoutIntent.findMany({
    where: { shopId: shop.id, recovered: false },
    orderBy: { updatedAt: "desc" },
    take: 50,
  });
}
