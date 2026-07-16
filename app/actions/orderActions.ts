// actions/orderActions.ts
"use server";

import { db } from "../lib/db";

export async function createOrder(data: {
  shopId: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    imageUrl: string;
  }[];
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  total: number;
}) {
  const order = await db.order.create({
    data: {
      shopId: data.shopId,
      items: data.items,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerAddress: data.customerAddress,
      total: data.total,
    },
  });

  return order;
}
