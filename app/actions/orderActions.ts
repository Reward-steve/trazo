// actions/orderActions.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { OrderItem } from "../types";
import { db } from "../lib/db";
import { generateOrderRef } from "../lib/utils";

export async function createOrder(data: {
  shopId: string;
  items: { name: string; quantity: number; price: number; imageUrl: string }[];
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  total: number;
}) {
  const shop = await db.shop.findUnique({
    where: { id: data.shopId },
    select: {
      bankName: true,
      accountName: true,
      accountNumber: true,
      paymentInstructions: true,
    },
  });

  if (!shop) throw new Error("Shop not found");

  // Collision odds with a 6-char code from a 32-char alphabet are ~1 in
  // 1 billion, but this is a public identifier — worth the retry loop
  // instead of letting a unique-constraint error surface to the customer.
  let order;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      order = await db.order.create({
        data: {
          orderRef: generateOrderRef(),
          shopId: data.shopId,
          items: data.items,
          customerName: data.customerName,
          customerPhone: data.customerPhone,
          customerAddress: data.customerAddress,
          total: data.total,
          paymentBankName: shop.bankName,
          paymentAccountName: shop.accountName,
          paymentAccountNumber: shop.accountNumber,
          paymentInstructions: shop.paymentInstructions,
          status: "pending_payment",
        },
      });
      break;
    } catch (err: unknown) {
      const isUniqueConflict =
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        (err as { code?: string }).code === "P2002";
      if (!isUniqueConflict || attempt === 4) throw err;
      // else loop and try a new code
    }
  }

  try {
    await db.checkoutIntent.updateMany({
      where: {
        shopId: data.shopId,
        customerPhone: data.customerPhone.replace(/\s/g, ""),
      },
      data: { recovered: true },
    });
  } catch (err) {
    console.error("Failed to mark checkout intent recovered:", err);
  }

  return order!;
}

/* ─────────────────────────────
   GET ORDERS (VENDOR, AUTHENTICATED)
   Ownership is enforced by scoping the query to the caller's own shop —
   there's no orderId-based lookup here, so there's nothing to check
   against a different shopId the way product actions do.
───────────────────────────── */
const RECENT_ORDERS_LIMIT = 100;

export async function getOrders() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const shop = await db.shop.findUnique({ where: { ownerId: userId } });
  if (!shop) throw new Error("Shop not found");

  const orders = await db.order.findMany({
    where: { shopId: shop.id },
    orderBy: { createdAt: "desc" },
    take: RECENT_ORDERS_LIMIT,
  });

  // items is stored as Json — cast at the boundary so callers get a typed
  // shape instead of `unknown` scattered through the UI.
  return orders.map((order) => ({
    ...order,
    items: order.items as unknown as OrderItem[],
  }));
}

// actions/orderActions.ts — add this

export async function markOrderAsClaimed(orderId: string) {
  // Public action — customer isn't authenticated. Scoped tightly:
  // only moves pending_payment → customer_claims_paid, nothing else,
  // and only needs the orderId (which the customer already has from
  // their own createOrder response — not guessable from another order).
  const order = await db.order.findUnique({ where: { id: orderId } });
  if (!order) throw new Error("Order not found");

  if (order.status !== "pending_payment") {
    // Already claimed/confirmed — don't let repeated clicks or a stale
    // tab silently overwrite a vendor's later status change.
    return order;
  }

  const updated = await db.order.update({
    where: { id: orderId },
    data: { status: "customer_claims_paid" },
  });

  return updated;
}

// actions/orderActions.ts — add this
export async function updateOrderStatus(
  orderId: string,
  status: "vendor_confirmed" | "vendor_disputed",
) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const shop = await db.shop.findUnique({ where: { ownerId: userId } });
  if (!shop) throw new Error("Shop not found");

  // Ownership enforced in the WHERE clause itself, not a separate check —
  // same pattern as updatePaymentDetails. If the order doesn't belong to
  // this vendor's shop, updateMany matches zero rows instead of updating
  // someone else's order.
  const result = await db.order.updateMany({
    where: { id: orderId, shopId: shop.id },
    data: { status },
  });

  if (result.count === 0) {
    throw new Error("Order not found or not owned by caller");
  }

  return { success: true };
}
