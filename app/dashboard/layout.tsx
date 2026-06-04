import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getShopByUser } from "../../app/actions/settings";
import DashboardSidebar from "../../app/components/dashboard/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  // 1. AUTH GUARD
  if (!userId) {
    redirect("/login");
  }

  const shop = await getShopByUser();

  // 2. ONBOARDING GUARD
  if (!shop) {
    redirect("/onboarding");
  }

  // 3. SUBSCRIPTION CHECK (SIMPLE + DIRECT)
  const now = new Date();
  const end = shop.subscriptionEndsAt ?? shop.trialEndsAt;

  const isExpired = !end || end < now;

  // 4. BLOCK EVERYTHING IF EXPIRED
  if (isExpired) {
    redirect("/dashboard/billing");
  }

  // 5. SERIALIZE (ONLY WHAT UI NEEDS)
  const serializedShop = {
    id: shop.id,
    shopName: shop.shopName,
    slug: shop.slug,
    logoUrl: shop.logoUrl,

    products: (shop.products || []).map((p) => ({
      id: p.id,
      available: p.available,
    })),

    trialEndsAt: shop.trialEndsAt?.toISOString() ?? null,
    subscriptionEndsAt: shop.subscriptionEndsAt?.toISOString() ?? null,

    createdAt: shop.createdAt.toISOString(),
    updatedAt: shop.updatedAt.toISOString(),
  };

  return (
    <div className="min-h-screen bg-surface-alt flex flex-col md:flex-row">
      <DashboardSidebar shop={serializedShop} />

      <main className="flex-1 w-full min-w-0 overflow-x-hidden pb-20 md:pb-0">
        {children}
      </main>
    </div>
  );
}
