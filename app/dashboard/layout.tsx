import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getShopByUser } from "../../app/actions/settings";
import DashboardSidebar from "../../app/components/dashboard/DashboardSidebar";
import { getShopStatus } from "../actions/subscriptionGuard";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  // ─────────────────────────────────────────
  // 1. AUTH GUARD
  // ─────────────────────────────────────────
  if (!userId) {
    redirect("/login");
  }

  const shop = await getShopByUser();

  // ─────────────────────────────────────────
  // 2. ONBOARDING GUARD
  // ─────────────────────────────────────────
  if (!shop) {
    redirect("/onboarding");
  }

  // ─────────────────────────────────────────
  // 3. SUBSCRIPTION CHECK (CORE LOGIC)
  // ─────────────────────────────────────────
  const status = getShopStatus(shop);

  const isExpired = status === "expired";

  // IMPORTANT:
  // Allow access to billing page even when expired.
  // We detect route via headers workaround later if needed.
  // For now, we assume layout-level gating only blocks dashboard.

  if (isExpired) {
    redirect("/dashboard/billing");
  }

  // ─────────────────────────────────────────
  // 4. SAFE SERIALIZATION FOR CLIENT COMPONENTS
  // ─────────────────────────────────────────
  const serializedShop = {
    id: shop.id,
    shopName: shop.shopName,
    slug: shop.slug,
    logoUrl: shop.logoUrl,

    products: (shop.products || []).map((p) => ({
      id: p.id,
      available: p.available,
    })),

    trialEndsAt: shop.trialEndsAt ? shop.trialEndsAt.toISOString() : null,

    subscriptionEndsAt: shop.subscriptionEndsAt
      ? shop.subscriptionEndsAt.toISOString()
      : null,

    createdAt: shop.createdAt.toISOString(),
    updatedAt: shop.updatedAt.toISOString(),
  };

  // ─────────────────────────────────────────
  // 5. RENDER
  // ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-surface-alt flex flex-col md:flex-row">
      <DashboardSidebar shop={serializedShop} />

      <main className="flex-1 w-full min-w-0 overflow-x-hidden pb-20 md:pb-0">
        {children}
      </main>
    </div>
  );
}
