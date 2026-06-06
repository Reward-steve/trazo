import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getShopByUser } from "../actions/settings";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import { ShopPlan } from "../types";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const shop = await getShopByUser();
  if (!shop) redirect("/onboarding");

  const serializedShop = {
    id: shop.id,
    shopName: shop.shopName,
    slug: shop.slug,
    logoUrl: shop.logoUrl,
    plan: shop.plan as ShopPlan,
    products: (shop.products || []).map((p) => ({
      id: p.id,
      available: p.available,
    })),
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
