import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const demoUser = await prisma.user.upsert({
    where: {
      id: "demo-user-id",
    },
    update: {
      email: "demo@tra.com",
    },
    create: {
      id: "demo-user-id",
      email: "demo@tra.com",
    },
  });

  const demoShop = await prisma.shop.upsert({
    where: {
      slug: "demo",
    },
    update: {
      shopName: "Alara Lagos",
      whatsappNumber: "08098069257",
      description:
        "Curated contemporary African fashion, design, cuisine, and culture. Delivered directly through WhatsApp.",
      logoUrl:
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=200&h=200",
    },
    create: {
      ownerId: demoUser.id,
      shopName: "Alara Lagos",
      slug: "demo",
      whatsappNumber: "08098069257",
      description:
        "Curated contemporary African fashion, design, cuisine, and culture. Delivered directly through WhatsApp.",
      logoUrl:
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=200&h=200",
    },
  });

  console.log(`✅ Shop seeded: ${demoShop.shopName}`);

  // Remove existing products for clean reseeding
  await prisma.product.deleteMany({
    where: {
      shopId: demoShop.id,
    },
  });

  await prisma.product.createMany({
    data: [
      {
        shopId: demoShop.id,
        name: "Handwoven Ankara Maxi Dress",
        price: 24500,
        imageUrl:
          "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600",
        available: true,
        stock: 12,
      },
      {
        shopId: demoShop.id,
        name: "Lagos Streetwear Graphic Tee",
        price: 12000,
        imageUrl:
          "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600",
        available: true,
        stock: 35,
      },
      {
        shopId: demoShop.id,
        name: "Genuine Leather Slides (Tan)",
        price: 18500,
        imageUrl:
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600",
        available: true,
        stock: 18,
      },
      {
        shopId: demoShop.id,
        name: "Aso Oke Traditional Cap (Fila)",
        price: 8500,
        imageUrl:
          "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=600",
        available: true,
        stock: 20,
      },
      {
        shopId: demoShop.id,
        name: "Beaded Statement Coral Necklace",
        price: 35000,
        imageUrl:
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600",
        available: true,
        stock: 5,
      },
      {
        shopId: demoShop.id,
        name: "Scented Soy Candle — Lekki Breeze",
        price: 9500,
        imageUrl:
          "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600",
        available: false,
        stock: 0,
      },
    ],
  });

  console.log("✅ 6 products seeded");
  console.log("🎉 Database seeded successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
