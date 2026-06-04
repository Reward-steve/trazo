import { notFound } from "next/navigation";
import { getShopBySlug } from "../../actions/settings";
import StorefrontClient from "../../components/store/StorefrontClient";
import { Product } from "@prisma/client";
import { getShopStatus } from "../../actions/subscriptionGuard";
import { Store } from "lucide-react";

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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/10 backdrop-blur-md">
        <div className="max-w-sm w-full bg-white/40 border border-white/20 rounded-3xl p-6 shadow-xl backdrop-blur-xl text-center">
          <div className="h-14 w-14 mx-auto rounded-2xl bg-white/50 border border-white/30 flex items-center justify-center mb-4">
            <Store className="h-6 w-6 text-text" />
          </div>

          <h1 className="text-xl font-black text-text">
            Store temporarily paused
          </h1>

          <p className="text-sm text-text-muted mt-2 leading-relaxed">
            This storefront is currently unavailable while the owner renews
            their Trazo subscription.
          </p>

          <div className="mt-4 bg-white/30 border border-white/20 rounded-2xl p-3">
            <p className="text-xs text-text-muted leading-relaxed">
              The store&apos;s products and information are still محفوظ and can
              be restored once the subscription is renewed.
            </p>
          </div>

          <p className="text-xs text-text-muted mt-4">
            Are you the owner? Sign in to your dashboard to reactivate your
            store.
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
