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
  total: number
): string {
  const itemLines = items
    .map((i) => `  • ${i.quantity}x ${i.name} — ${formatNaira(i.price * i.quantity)}`)
    .join("\n");

  const message = `Hello ${shopName}! 👋 I'd like to place an order:

${itemLines}

*Total: ${formatNaira(total)}*

📦 Delivery Details:
  Name: ${customer.name}
  Phone: ${customer.phone}
  Address: ${customer.address}

Please confirm my order. Thank you!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
