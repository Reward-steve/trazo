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

  const products = shop.products || [];

  const serializedShop = {
    ...shop,
    products: products.map((p) => ({
      id: p.id,
      available: p.available,
    })),
    createdAt: shop.createdAt
      ? shop.createdAt.toISOString()
      : new Date().toISOString(),
    updatedAt: shop.updatedAt
      ? shop.updatedAt.toISOString()
      : new Date().toISOString(),
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
