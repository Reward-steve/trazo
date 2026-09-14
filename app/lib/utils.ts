import { ShopPlan } from "../types";

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

// lib/utils.ts
export function generateWhatsAppURL(
  phone: string,
  shopName: string,
  orderId: string,     // cuid — used for the receipt link only
  orderRef: string,    // short code — used for display only
  items: OrderItem[],
  customer: { name: string; phone: string; address: string },
  total: number,
  paymentClaimed: boolean,
): string {
  const receiptUrl = `${process.env.NEXT_PUBLIC_APP_URL}/receipt/${orderId}`;

  const itemLines = items
    .map((item, i) => `${i + 1}. ${item.name} x${item.quantity} — ${formatNaira(item.price * item.quantity)}`)
    .join("\n");

  const statusLine = paymentClaimed
    ? `💬 Customer says they've made the transfer — please verify before shipping.`
    : `⏳ Customer has not yet confirmed payment.`;

  const message = [
    `📦 *NEW ORDER — ${shopName.toUpperCase()}* (#${orderRef})`,
    ``,
    itemLines,
    ``,
    `*Total: ${formatNaira(total)}*`,
    ``,
    statusLine,
    ``,
    `👤 ${customer.name}`,
    `📞 ${customer.phone}`,
    `📍 ${customer.address}`,
    ``,
    `Click for full details: ${receiptUrl}`,
  ].join("\n");

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function generateSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 40);
}

export function normalizePlan(plan: string): ShopPlan {
  const p = plan.toLowerCase().trim();

  if (p === "growth" || p === "pro" || p === "free") {
    return p;
  }

  return "free";
}

export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

// lib/orderRef.ts
const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O, 1/I — avoids misreads when a customer types it in

export function generateOrderRef(length = 6): string {
  let code = "";
  for (let i = 0; i < length; i++) {
    code += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return code;
}
