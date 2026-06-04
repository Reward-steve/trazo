import { getShopStatus } from "../actions/settings";

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
  // Pad helper to create a clean, right-aligned receipt column layout
  const itemLines = items
    .map((i) => {
      const qtyAndName = `${i.quantity}x ${i.name}`;
      const priceStr = formatNaira(i.price * i.quantity);
      return `${qtyAndName.padEnd(22, " ")}${priceStr.padStart(10, " ")}`;
    })
    .join("\n");

  const message = [
    `*NEW ORDER • ${shopName.toUpperCase()}*`,
    "````",
    `--------------------------------`,
    `${itemLines}`,
    `--------------------------------`,
    `TOTAL:${formatNaira(total).padStart(26, " ")}`,
    `--------------------------------`,
    "````",
    `*CUSTOMER DETAILS*`,
    `_*Name:*_ ${customer.name}`,
    `_*Phone:*_ ${customer.phone}`,
    `_*Delivery Address:*_ ${customer.address}`,
    ``,
    `_Please confirm this order and provide payment details._`,
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

export function canAccessStore(shop: {
  trialEndsAt: Date | null;
  subscriptionEndsAt: Date | null;
}) {
  return getShopStatus(shop) !== "expired";
}
