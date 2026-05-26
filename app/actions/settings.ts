"use server";

import { db } from "@/app/lib/db";
import { revalidatePath } from "next/cache";

const SETTINGS_ID = "default-shop-settings";

export async function getSettings() {
  let settings = await db.shopSettings.findUnique({
    where: { id: SETTINGS_ID },
  });

  if (!settings) {
    settings = await db.shopSettings.create({
      data: {
        id: SETTINGS_ID,
        shopName: "Alara Lagos",
        whatsappNumber: "2348012345678",
        description:
          "Curated contemporary African fashion, design, cuisine, and culture.",
        logoUrl:
          "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=200&h=200",
      },
    });
  }

  return settings;
}

export async function updateSettings(data: {
  shopName: string;
  whatsappNumber: string;
  description: string;
  logoUrl: string;
}) {
  const settings = await db.shopSettings.upsert({
    where: { id: SETTINGS_ID },
    update: data,
    create: { id: SETTINGS_ID, ...data },
  });
  revalidatePath("/store");
  revalidatePath("/admin");
  revalidatePath("/");
  return settings;
}
