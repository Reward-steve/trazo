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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-surface-alt/40 backdrop-blur-md">
        <div className="max-w-sm w-full bg-surface/70 border border-border/50 rounded-3xl p-6 shadow-xl backdrop-blur-xl text-center">
          {/* WhatsApp Green Icon Badge */}
          <div className="h-14 w-14 mx-auto rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
            <Store className="h-6 w-6 text-primary" />
          </div>

          <h1 className="text-xl font-bold text-text">
            Store taking a short break
          </h1>

          <p className="text-sm text-text-muted mt-2 leading-relaxed">
            This store is temporarily offline for maintenance and updates.
            Please check back again soon!
          </p>

          {/* Re-styled as a WhatsApp "System Message" box */}
          <div className="mt-4 bg-surface-alt/60 border border-border/40 rounded-xl p-3">
            <p className="text-xs text-text-muted leading-relaxed">
              Your shopping cart and history are safe. Services will resume as
              soon as updates are complete.
            </p>
          </div>

          {/* Subtle, private call-to-action just for the owner */}
          <p className="text-xs text-text-muted/70 mt-5 pt-4 border-t border-border/40">
            Store administrator?{" "}
            <span className="text-primary font-medium cursor-pointer">
              Sign in to your dashboard
            </span>{" "}
            to manage your status.
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
