// actions/paymentActions.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../lib/db";

export async function updatePaymentDetails(data: {
  bankName: string;
  accountName: string;
  accountNumber: string;
  paymentInstructions?: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Ownership enforced at the WHERE clause, not just a pre-check —
  // this is the fix for the mutable-reference IDOR pattern you hit before.
  const result = await db.shop.updateMany({
    where: { ownerId: userId },
    data: {
      bankName: data.bankName,
      accountName: data.accountName,
      accountNumber: data.accountNumber,
      paymentInstructions: data.paymentInstructions ?? null,
      paymentUpdatedAt: new Date(),
    },
  });

  if (result.count === 0) {
    throw new Error("Shop not found or not owned by caller");
  }

  // Masked audit log — never log the raw account number
  console.log(
    `[payment-update] user=${userId} account=****${data.accountNumber.slice(-4)} at=${new Date().toISOString()}`
  );

  return { success: true };
}

export async function getPaymentDetails() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const shop = await db.shop.findUnique({
    where: { ownerId: userId },
    select: {
      bankName: true,
      accountName: true,
      accountNumber: true,
      paymentInstructions: true,
      paymentUpdatedAt: true,
    },
  });

  if (!shop) throw new Error("Shop not found");
  return shop;
}