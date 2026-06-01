import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const demoUser = await prisma.user.upsert({
    where: { id: "demo-user-id" },
    update: {},
    create: {
      id: "demo-user-id",
      email: "demo@tra.com",
    },
  });

  const demoShop = await prisma.shop.upsert({
    where: { slug: "demo" },
    update: {},
    create: {
      ownerId: demoUser.id,
      shopName: "Alara Lagos",
      slug: "demo",
      whatsappNumber: "08098069257",
      description:
        "Curated contemporary African fashion, design, cuisine, and culture. Delivered direct to your doorstep via WhatsApp.",
      logoUrl:
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=200&h=200",
    },
  });

  console.log(`✓ Demo shop seeded: ${demoShop.shopName}`);

  const existing = await prisma.product.count({
    where: { shopId: demoShop.id },
  });

  if (existing === 0) {
    await prisma.product.createMany({
      data: [
        {
          shopId: demoShop.id,
          name: "Handwoven Ankara Maxi Dress",
          price: 24500,
          imageUrl:
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600",
          available: true,
        },
        {
          shopId: demoShop.id,
          name: "Lagos Streetwear Graphic Tee",
          price: 12000,
          imageUrl:
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600",
          available: true,
        },
        {
          shopId: demoShop.id,
          name: "Genuine Leather Slides (Tan)",
          price: 18500,
          imageUrl:
            "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600",
          available: true,
        },
        {
          shopId: demoShop.id,
          name: "Aso Oke Traditional Cap (Fila)",
          price: 8500,
          imageUrl:
            "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=600",
          available: true,
        },
        {
          shopId: demoShop.id,
          name: "Beaded Statement Coral Necklace",
          price: 35000,
          imageUrl:
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600",
          available: true,
        },
        {
          shopId: demoShop.id,
          name: "Scented Soy Candle — Lekki Breeze",
          price: 9500,
          imageUrl:
            "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600",
          available: false,
        },
      ],
    });
    console.log("✓ 6 demo products seeded");
  } else {
    console.log("Products already exist, skipping.");
  }

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
