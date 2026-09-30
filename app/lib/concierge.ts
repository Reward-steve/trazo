import { auth } from "@clerk/nextjs/server";

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
