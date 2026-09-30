import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "../lib/db";

/** True only for the Clerk user whose ID is in CONCIERGE_USER_ID. */
export async function isConcierge(): Promise<boolean> {
  const { userId } = await auth();
  const allowed = process.env.CONCIERGE_USER_ID;
  return Boolean(userId && allowed && userId === allowed);
}

/** Call at the top of every concierge server action. */
export async function requireConcierge(): Promise<void> {
  if (!(await isConcierge())) throw new Error("Unauthorized");
}

/**
 * Auto-claim: if the logged-in user has a verified email that matches the
 * vendor email saved on a concierge shop, move that shop to their account.
 * Call it on /onboarding. Returns true if a shop was claimed.
 */
export async function claimConciergeShop(): Promise<boolean> {
  const user = await currentUser();
  if (!user) return false;

  const emails = user.emailAddresses
    .filter((e) => e.verification?.status === "verified")
    .map((e) => e.emailAddress.toLowerCase());
  if (emails.length === 0) return false;

  const alreadyHasShop = await db.shop.findUnique({
    where: { ownerId: user.id },
    select: { id: true },
  });
  if (alreadyHasShop) return false;

  const placeholder = await db.user.findFirst({
    where: {
      id: { startsWith: "concierge_" },
      OR: emails.map((e) => ({ email: { endsWith: `__${e}` } })),
      shop: { isNot: null },
    },
    select: { id: true, shop: { select: { id: true } } },
  });
  if (!placeholder?.shop) return false;

  const primary =
    user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? emails[0];

  try {
    await db.$transaction([
      db.user.upsert({
        where: { id: user.id },
        update: {},
        create: { id: user.id, email: primary },
      }),
      db.shop.update({
        where: { id: placeholder.shop.id },
        data: { ownerId: user.id },
      }),
      db.user.delete({ where: { id: placeholder.id } }),
    ]);
    return true;
  } catch (e) {
    console.error("claimConciergeShop failed", e);
    return false;
  }
}
