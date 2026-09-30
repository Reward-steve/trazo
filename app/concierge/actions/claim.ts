"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "../../lib/db";
import { requireConcierge } from "../../lib/concierge";

export type TransferResult = { ok: boolean; error?: string };

/**
 * Hand a concierge-created shop to the vendor's real Trazo account.
 * The vendor must have signed up first; we find them by email.
 */
export async function transferShopToVendor(
  slug: string,
  vendorEmail: string,
): Promise<TransferResult> {
  await requireConcierge();

  const email = vendorEmail.trim().toLowerCase();
  if (!email) return { ok: false, error: "Enter the vendor's email." };

  const shop = await db.shop.findUnique({
    where: { slug },
    select: { id: true, ownerId: true },
  });
  if (!shop) return { ok: false, error: "Shop not found." };
  if (!shop.ownerId.startsWith("concierge_")) {
    return { ok: false, error: "This shop already belongs to a real account." };
  }

  const client = await clerkClient();
  const { data } = await client.users.getUserList({ emailAddress: [email] });
  const vendor = data[0];
  if (!vendor) {
    return {
      ok: false,
      error:
        "No Trazo account with that email. Ask the vendor to sign up first.",
    };
  }

  const existing = await db.shop.findUnique({
    where: { ownerId: vendor.id },
    select: { id: true },
  });
  if (existing) {
    return {
      ok: false,
      error: "That account already has a shop. Delete it first, then retry.",
    };
  }

  const primaryEmail =
    vendor.emailAddresses.find((e) => e.id === vendor.primaryEmailAddressId)
      ?.emailAddress ?? email;
  const oldOwnerId = shop.ownerId;

  try {
    await db.$transaction([
      db.user.upsert({
        where: { id: vendor.id },
        update: {},
        create: { id: vendor.id, email: primaryEmail },
      }),
      db.shop.update({ where: { id: shop.id }, data: { ownerId: vendor.id } }),
      db.user.delete({ where: { id: oldOwnerId } }),
    ]);
  } catch (e) {
    console.error("transferShopToVendor failed", e);
    return { ok: false, error: "Transfer failed. Nothing was changed." };
  }

  revalidatePath("/concierge");
  return { ok: true };
}
