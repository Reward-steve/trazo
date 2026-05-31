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

  // Safety Guard: Fallback to an empty array if products somehow don't exist
  const products = shop.products || [];

  // Serialize dates safely before passing to client component
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
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <DashboardSidebar shop={serializedShop} />
      <main className="flex-1 w-full min-w-0 overflow-x-hidden pb-16 md:pb-0">
        {children}
      </main>
    </div>
  );
}
