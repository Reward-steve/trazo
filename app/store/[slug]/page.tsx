import { notFound } from "next/navigation";
import { getShopBySlug } from "@/app/actions/settings";
import StorefrontClient from "@/app/components/store/StorefrontClient";
import { Product } from "@prisma/client";

export const dynamic = "force-dynamic";

interface StorePageProps {
  params: Promise<{ slug: string }>;
}

export default async function StorePage({ params }: StorePageProps) {
  const { slug } = await params;
  const shop = await getShopBySlug(slug);

  if (!shop) notFound();

  const serializedProducts = shop.products.map((p: Product) => ({
    ...p,
    createdAt: new Date(p.createdAt),
  }));

  const serializedSettings = {
    id: shop.id,
    shopName: shop.shopName,
    whatsappNumber: shop.whatsappNumber,
    description: shop.description,
    logoUrl: shop.logoUrl,
    updatedAt: new Date(shop.updatedAt),
  };

  return (
    <StorefrontClient
      products={serializedProducts}
      settings={serializedSettings}
    />
  );
}
