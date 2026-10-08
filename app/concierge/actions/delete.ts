"use server";

import { revalidatePath } from "next/cache";
import { db } from "../../lib/db";
import { requireConcierge } from "../../lib/concierge";

export type DeleteResult = { ok: boolean; error?: string };

/** Delete an unclaimed concierge shop (and its products + placeholder owner). */
export async function deleteConciergeShop(slug: string): Promise<DeleteResult> {
  await requireConcierge();

  const shop = await db.shop.findUnique({
    where: { slug },
    select: { id: true, ownerId: true, _count: { select: { orders: true } } },
  });
  if (!shop) return { ok: false, error: "Shop not found." };
  if (!shop.ownerId.startsWith("concierge_")) {
    return {
      ok: false,
      error: "Only shops still waiting for handover can be deleted here.",
    };
  }
  if (shop._count.orders > 0) {
    return {
      ok: false,
      error: "This shop has orders, so it can't be deleted.",
    };
  }

  try {
    // Products cascade with the shop. Placeholder owner goes with it.
    await db.$transaction([
      db.shop.delete({ where: { id: shop.id } }),
      db.user.delete({ where: { id: shop.ownerId } }),
    ]);
  } catch (e) {
    console.error("deleteConciergeShop failed", e);
    return {
      ok: false,
      error: "Could not delete the shop. Nothing was changed.",
    };
  }

  revalidatePath("/concierge");
  revalidatePath(`/store/${slug}`);
  return { ok: true };
}
