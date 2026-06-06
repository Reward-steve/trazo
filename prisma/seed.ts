import { PrismaClient } from "@prisma/client";
import { ShopPlan } from "../app/types";

const prisma = new PrismaClient();

const DEMO_USER_ID = "demo-user-id";
const DEMO_SHOP_SLUG = "demo";
const DEMO_PLAN = "growth";

const shopData = {
  shopName: "Alara Lagos",
  slug: DEMO_SHOP_SLUG,
  whatsappNumber: "08098069257",
  description:
    "Curated contemporary African fashion, design, cuisine, and culture. Delivered directly through WhatsApp.",
  logoUrl:
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=200&h=200",
  plan: DEMO_PLAN as ShopPlan,
  planActivatedAt: new Date(),
  isActive: true,
};

const products = [
  {
    name: "Handwoven Ankara Maxi Dress",
    price: 24500,
    imageUrl:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600",
    available: true,
    stock: 12,
  },
  {
    name: "Lagos Streetwear Graphic Tee",
    price: 12000,
    imageUrl:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600",
    available: true,
    stock: 35,
  },
  {
    name: "Genuine Leather Slides (Tan)",
    price: 18500,
    imageUrl:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600",
    available: true,
    stock: 18,
  },
  {
    name: "Aso Oke Traditional Cap (Fila)",
    price: 8500,
    imageUrl:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=600",
    available: true,
    stock: 20,
  },
  {
    name: "Beaded Statement Coral Necklace",
    price: 35000,
    imageUrl:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600",
    available: true,
    stock: 5,
  },
  {
    name: "Scented Soy Candle — Lekki Breeze",
    price: 9500,
    imageUrl:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600",
    available: false,
    stock: 0,
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.$transaction(async (tx) => {
    const demoUser = await tx.user.upsert({
      where: { id: DEMO_USER_ID },
      update: {
        email: "demo@tra.com",
      },
      create: {
        id: DEMO_USER_ID,
        email: "demo@tra.com",
      },
    });

    const demoShop = await tx.shop.upsert({
      where: {
        slug: DEMO_SHOP_SLUG,
      },
      update: shopData,
      create: {
        ownerId: demoUser.id,
        ...shopData,
      },
    });

    console.log(`✅ Shop seeded: ${demoShop.shopName}`);

    // Safety guard
    if (demoShop.slug !== DEMO_SHOP_SLUG) {
      throw new Error(
        "Refusing to modify products because this is not the demo shop.",
      );
    }

    // Clean demo products
    await tx.product.deleteMany({
      where: {
        shopId: demoShop.id,
      },
    });

    // Recreate demo products
    await tx.product.createMany({
      data: products.map((product) => ({
        ...product,
        shopId: demoShop.id,
      })),
    });

    console.log(`✅ ${products.length} products seeded`);
  });

  console.log("🎉 Database seeded successfully");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
