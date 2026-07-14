// app/receipt/[orderId]/page.tsx
import { Metadata } from "next";
import { db } from "../../lib/db";
import { formatNaira } from "../../lib/utils";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ orderId: string }>;
}): Promise<Metadata> {
  const { orderId } = await params;

  const order = await db.order.findUnique({
    where: { id: orderId },
    include: { shop: true },
  });

  const title = order ? `New order — ${order.shop.shopName}` : "Order receipt";

  return {
    title,
    openGraph: {
      title,
      images: [
        `${process.env.NEXT_PUBLIC_APP_URL}/api/receipt/${orderId}/image`,
      ],
    },
  };
}

export default async function ReceiptPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  const order = await db.order.findUnique({
    where: { id: orderId },
    include: { shop: true },
  });

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4 text-center text-white">
        <p className="text-sm text-gray-400">
          This order couldn&apos;t be found. It may have been removed.
        </p>
      </div>
    );
  }

  const items = order.items as unknown as OrderItem[];

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 py-10 text-white">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            New order
          </p>
          <h1 className="mt-1 text-2xl font-black">{order.shop.shopName}</h1>
        </div>

        {/* Items card */}
        <div className="rounded-3xl border border-white/[0.06] bg-[#141414] p-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
            Items
          </p>
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-300">
                  {item.quantity}x {item.name}
                </span>
                <span className="font-semibold text-white">
                  {formatNaira(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between border-t border-white/[0.08] pt-4">
            <span className="text-sm font-bold text-gray-400">Total</span>
            <span className="text-lg font-black text-emerald-400">
              {formatNaira(order.total)}
            </span>
          </div>
        </div>

        {/* Customer card */}
        <div className="mt-4 rounded-3xl border border-white/[0.06] bg-[#141414] p-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
            Customer
          </p>
          <div className="space-y-2 text-sm text-gray-300">
            <p>
              <span className="font-semibold text-white">Name: </span>
              {order.customerName}
            </p>
            <p>
              <span className="font-semibold text-white">Phone: </span>
              {order.customerPhone}
            </p>
            <p>
              <span className="font-semibold text-white">Address: </span>
              {order.customerAddress}
            </p>
          </div>
        </div>

        <a
          href={`https://wa.me/${order.customerPhone.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 block w-full rounded-2xl bg-emerald-500 py-3 text-center text-sm font-bold text-black transition-colors hover:bg-emerald-400"
        >
          Message customer on WhatsApp
        </a>

        <p className="mt-6 text-center text-xs text-gray-600">
          Powered by Trazo
        </p>
      </div>
    </div>
  );
}
