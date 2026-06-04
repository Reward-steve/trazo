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
  if (!userId) redirect("/login");

  const shop = await getShopByUser();
  if (!shop) redirect("/onboarding");

  // ─────────────────────────────
  // SUBSCRIPTION GATE (ONLY HERE)
  // ─────────────────────────────
  const now = new Date();
  const end = shop.subscriptionEndsAt ?? shop.trialEndsAt;

  const isExpired = !end || end < now;

  // HARD RULE:
  // allow ONLY billing page when expired
  if (isExpired) {
    redirect("/dashboard/billing");
  }

  // ─────────────────────────────
  // SERIALIZE (SAFE FOR CLIENT)
  // ─────────────────────────────
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
