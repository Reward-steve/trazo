import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const SETTINGS_ID = "default-shop-settings";

async function main() {
  console.log("Seeding database...");

  await prisma.shopSettings.upsert({
    where: { id: SETTINGS_ID },
    update: {},
    create: {
      id: SETTINGS_ID,
      shopName: "Alara Lagos",
      whatsappNumber: "2348012345678",
      description:
        "Curated contemporary African fashion, design, cuisine, and culture. Delivered direct to your doorstep via WhatsApp.",
      logoUrl:
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=200&h=200",
    },
  });

  console.log("✓ Shop settings seeded");

  const existing = await prisma.product.count();
  if (existing === 0) {
    await prisma.product.createMany({
      data: [
        {
          name: "Handwoven Ankara Maxi Dress",
          price: 24500,
          imageUrl:
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600",
          available: true,
        },
        {
          name: "Lagos Streetwear Graphic Tee",
          price: 12000,
          imageUrl:
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600",
          available: true,
        },
        {
          name: "Genuine Leather Slides (Tan)",
          price: 18500,
          imageUrl:
            "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600",
          available: true,
        },
        {
          name: "Aso Oke Traditional Cap (Fila)",
          price: 8500,
          imageUrl:
            "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=600",
          available: true,
        },
        {
          name: "Beaded Statement Coral Necklace",
          price: 35000,
          imageUrl:
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600",
          available: true,
        },
        {
          name: "Scented Soy Candle — Lekki Breeze",
          price: 9500,
          imageUrl:
            "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600",
          available: false,
        },
      ],
    });
    console.log("✓ 6 products seeded");
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
