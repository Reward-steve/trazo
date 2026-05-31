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

  // Serialize dates before passing to client component
  const serializedShop = {
    ...shop,
    products: shop.products.map((p) => ({
      id: p.id,
      available: p.available,
    })),
    createdAt: shop.createdAt.toISOString(),
    updatedAt: shop.updatedAt.toISOString(),
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      <DashboardSidebar shop={serializedShop} />
      <main className="flex-1 min-w-0 overflow-x-hidden">{children}</main>
    </div>
  );
}
