import { ShopPlan } from "../types";

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function generateWhatsAppURL(
  phone: string,
  shopName: string,
  items: { name: string; quantity: number; price: number }[],
  customer: { name: string; phone: string; address: string },
  total: number,
): string {
  const SEP = "───────────────────────";

  const itemLines = items
    .map(
      (i) =>
        `  • ${i.quantity}x ${i.name} — ${formatNaira(i.price * i.quantity)}`,
    )
    .join("\n");

  const message = [
    `🛒 *NEW ORDER — ${shopName.toUpperCase()}*`,
    ``,
    `*ITEMS*`,
    SEP,
    itemLines,
    SEP,
    `*Total:* ${formatNaira(total)}`,
    ``,
    `*CUSTOMER*`,
    SEP,
    `*Name:* ${customer.name}`,
    `*Phone:* ${customer.phone}`,
    `*Address:* ${customer.address}`,
    ``,
    `_Please confirm this order and send payment details._`,
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
