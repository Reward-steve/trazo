import { notFound } from "next/navigation";
import { getShopBySlug } from "../../actions/settings";
import StorefrontClient from "../../components/store/StorefrontClient";
import { Product } from "@prisma/client";
import { getShopStatus } from "../../actions/subscriptionGuard";

export const dynamic = "force-dynamic";

interface StorePageProps {
  params: Promise<{ slug: string }>;
}

export default async function StorePage({ params }: StorePageProps) {
  const { slug } = await params;

  const shop = await getShopBySlug(slug);

  if (!shop) {
    notFound();
  }

  // 🧪 OVERRIDE RULE (SAFE TEST / DEMO MODE)
  const isDemoShop = shop.slug === "demo";

  // 🔐 SUBSCRIPTION CHECK (CORE FREEZE LOGIC)
  const status = getShopStatus(shop);

  const isFrozen = status === "expired" && !isDemoShop;

  // ❄️ FREEZE ONLY REAL SHOPS
  if (isFrozen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 text-center backdrop-blur-md bg-black/10">
        <div className="max-w-sm w-full bg-white/40  border border-white/20  rounded-2xl p-6 shadow-xl backdrop-blur-xl">
          <h1 className="text-lg font-bold text-text">
            Store temporarily unavailable
          </h1>

          <p className="text-sm text-text-muted mt-2 leading-relaxed">
            This store is currently paused. The owner has not renewed their
            subscription.
          </p>

          <p className="text-xs text-text-muted mt-4">
            If you are the owner, please log in to restore access.
          </p>
        </div>
      </div>
    );
  }

  // ✅ NORMAL FLOW (ACTIVE OR TRIAL)
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
