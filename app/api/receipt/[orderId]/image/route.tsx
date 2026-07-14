// app/api/receipt/[orderId]/image/route.tsx
import { ImageResponse } from "next/og";
import { db } from "../../../../lib/db";
import { formatNaira } from "../../../../lib/utils";

// Must be nodejs — Prisma doesn't work on edge runtime
export const runtime = "nodejs";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ orderId: string }> },
) {
  const { orderId } = await params;

  const order = await db.order.findUnique({
    where: { id: orderId },
    include: { shop: true },
  });

  if (!order) {
    return new Response("Order not found", { status: 404 });
  }

  const items = order.items as unknown as OrderItem[];

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: "#0a0a0a",
        padding: "48px",
        fontFamily: "sans-serif",
        color: "white",
      }}
    >
      {/* Header */}
      <div
        style={{ display: "flex", flexDirection: "column", marginBottom: 24 }}
      >
        <div
          style={{
            fontSize: 14,
            color: "#10b981",
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          NEW ORDER
        </div>
        <div style={{ fontSize: 32, fontWeight: 900, marginTop: 4 }}>
          {order.shop.shopName}
        </div>
      </div>

      {/* Items */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          background: "#141414",
          borderRadius: 20,
          padding: 24,
          gap: 12,
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 18,
              color: "#e5e5e5",
            }}
          >
            <div style={{ display: "flex" }}>
              {item.quantity}x {item.name}
            </div>
            <div style={{ display: "flex", fontWeight: 700 }}>
              {formatNaira(item.price * item.quantity)}
            </div>
          </div>
        ))}

        {/* Total */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #333",
            paddingTop: 16,
            marginTop: 8,
            fontSize: 22,
            fontWeight: 900,
            color: "#10b981",
          }}
        >
          <div style={{ display: "flex" }}>Total</div>
          <div style={{ display: "flex" }}>{formatNaira(order.total)}</div>
        </div>
      </div>

      {/* Customer details */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 24,
          fontSize: 16,
          color: "#a3a3a3",
          gap: 4,
        }}
      >
        <div style={{ display: "flex" }}>
          <strong style={{ color: "white", marginRight: 8 }}>Name:</strong>
          {order.customerName}
        </div>
        <div style={{ display: "flex" }}>
          <strong style={{ color: "white", marginRight: 8 }}>Phone:</strong>
          {order.customerPhone}
        </div>
        <div style={{ display: "flex" }}>
          <strong style={{ color: "white", marginRight: 8 }}>Address:</strong>
          {order.customerAddress}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          marginTop: "auto",
          fontSize: 12,
          color: "#404040",
        }}
      >
        Powered by Trazo
      </div>
    </div>,
    { width: 600, height: 700 },
  );
}
